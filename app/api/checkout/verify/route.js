import { NextResponse } from "next/server";
import { where, limit } from "firebase/firestore";
import dbService from "@/services/DBService";

export const dynamic = "force-dynamic";

const ORDERS_COLLECTION = "orders";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id parameter." },
        { status: 400 }
      );
    }

    const results = await dbService.query(ORDERS_COLLECTION, [
      where("stripeSessionId", "==", sessionId),
      limit(1),
    ]);

    if (results.length === 0) {
      return NextResponse.json({ found: false });
    }

    const order = results[0];
    return NextResponse.json({
      found: true,
      order: {
        id: order.id,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        subtotal: order.subtotal,
        discountAmount: order.discountAmount,
        discountPercent: order.discountPercent,
        shippingFee: order.shippingFee,
        totalAfterDiscount: order.totalAfterDiscount,
        total: order.total,
        promoCode: order.promoCode,
        createdAt: order.createdAt,
        items: order.items,
      },
    });
  } catch (error) {
    console.error("Order verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify order." },
      { status: 500 }
    );
  }
}
