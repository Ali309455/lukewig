import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import dbService from "@/services/DBService";
import productService from "@/services/ProductService";

const ORDERS_COLLECTION = "orders";
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    if (!webhookSecret) {
      console.error(
        "STRIPE_WEBHOOK_SECRET is not set. Webhook signature verification cannot proceed."
      );
      return NextResponse.json(
        { error: "Webhook not configured." },
        { status: 500 }
      );
    }

    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe signature header." },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      console.error("Stripe webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: "Invalid webhook signature." },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        await handlePaymentSuccess(event.data.object);
        break;
      }

      case "checkout.session.async_payment_failed":
      case "payment_intent.payment_failed": {
        await handlePaymentFailed(event.data.object);
        break;
      }

      default:
        console.log(`Unhandled Stripe webhook event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(session) {
  const sessionId = session.id;

  try {
    const order = await findOrderBySessionId(sessionId);

    if (!order) {
      console.error(
        `Webhook: No order found for session ${sessionId}. Order may not have been created during checkout.`
      );
      return;
    }

    if (order.paymentStatus === "Paid") {
      console.log(
        `Webhook: Order ${order.id} already paid for session ${sessionId}. Skipping duplicate.`
      );
      return;
    }

    await dbService.update(ORDERS_COLLECTION, order.id, {
      paymentStatus: "Paid",
      orderStatus: "Placed",
      stripePaymentIntentId: session.payment_intent || null,
      stripeCustomerId: session.customer || null,
      paidAt: new Date().toISOString(),
    });

    if (order.items && Array.isArray(order.items)) {
      for (const item of order.items) {
        if (item.itemType === "bundle") continue;
        if (!item.size || item.size === "Bundle Deal") continue;
        try {
          await productService.decrementVariantStock(
            item.productId,
            item.size,
            item.qty || 1
          );
        } catch (stockError) {
          console.error(
            `Webhook: Failed to decrement stock for ${item.name} (${item.size}):`,
            stockError.message
          );
        }
      }
    }

    console.log(
      `Webhook: Order ${order.id} updated to Paid for session ${sessionId}.`
    );
  } catch (error) {
    console.error(
      `Webhook: Failed to process payment success for session ${sessionId}:`,
      error.message
    );
  }
}

async function handlePaymentFailed(session) {
  const sessionId = session.id;

  try {
    const order = await findOrderBySessionId(sessionId);
    if (order && order.paymentStatus === "Unpaid") {
      await dbService.update(ORDERS_COLLECTION, order.id, {
        orderStatus: "Cancelled",
        paymentStatus: "Failed",
      });
      console.log(
        `Webhook: Order ${order.id} cancelled after payment failure for session ${sessionId}.`
      );
    }

    console.log(`Webhook: Payment for session ${sessionId} marked as Failed.`);
  } catch (error) {
    console.error(
      `Webhook: Failed to handle payment failure for session ${sessionId}:`,
      error.message
    );
  }
}

async function findOrderBySessionId(sessionId) {
  try {
    const { where, orderBy, limit } = await import("firebase/firestore");
    const results = await dbService.query(ORDERS_COLLECTION, [
      where("stripeSessionId", "==", sessionId),
      limit(1),
    ]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error("findOrderBySessionId failed:", error.message);
    return null;
  }
}
