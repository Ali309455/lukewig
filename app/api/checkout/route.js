import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import productService from "@/services/ProductService";
import bundleService from "@/services/BundleService";
import saleService from "@/services/SaleService";
import dbService from "@/services/DBService";

const ORDERS_COLLECTION = "orders";
const CURRENCY = "usd";
const FREE_SHIPPING_THRESHOLD = 199;
const SHIPPING_COST = 15;

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, userId, email, userName, phone, shippingAddress, promoCode } =
      body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in to checkout." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.firstName || !shippingAddress.lastName) {
      return NextResponse.json(
        { error: "Shipping address is required." },
        { status: 400 }
      );
    }

    const validatedItems = [];
    let subtotal = 0;

    for (const item of items) {
      if (!item.productId) {
        return NextResponse.json(
          { error: "Each item must have a productId." },
          { status: 400 }
        );
      }

      if (!item.qty || item.qty < 1) {
        return NextResponse.json(
          { error: `Invalid quantity for "${item.name || item.productId}".` },
          { status: 400 }
        );
      }

      const qty = item.qty;
      const itemType = item.itemType || "product";

      if (itemType === "bundle") {
        const bundle = await bundleService.getBundle(item.productId);
        if (!bundle) {
          return NextResponse.json(
            { error: `Bundle "${item.name || item.productId}" not found.` },
            { status: 400 }
          );
        }

        const itemTotal = bundle.price * qty;
        subtotal += itemTotal;

        validatedItems.push({
          productId: bundle.id,
          name: bundle.title,
          price: bundle.price,
          qty,
          image: bundle.image || "",
          itemType: "bundle",
          size: "Bundle Deal",
          category: "",
        });
      } else {
        const product = await productService.getProduct(item.productId);
        if (!product) {
          return NextResponse.json(
            { error: `Product "${item.name || item.productId}" not found.` },
            { status: 400 }
          );
        }

        if (!item.size || item.size === "Bundle Deal") {
          return NextResponse.json(
            { error: `Size is required for "${product.name}".` },
            { status: 400 }
          );
        }

        const variant = productService.getVariantBySize(product, item.size);
        if (!variant) {
          return NextResponse.json(
            {
              error: `Size "${item.size}" not available for "${product.name}".`,
            },
            { status: 400 }
          );
        }

        if ((variant.stock ?? 0) < qty) {
          return NextResponse.json(
            {
              error: `Insufficient stock for "${product.name}" (${item.size}). Available: ${variant.stock}, requested: ${qty}.`,
            },
            { status: 400 }
          );
        }

        const itemTotal = variant.price * qty;
        subtotal += itemTotal;

        validatedItems.push({
          productId: product.id,
          name: product.name,
          category: product.category || "",
          price: variant.price,
          size: item.size,
          image: item.image || product.image || "",
          qty,
          itemType: "product",
        });
      }
    }

    let discountAmount = 0;
    let appliedSaleId = null;
    let discountPercent = 0;
    let sale = null;

    if (promoCode && promoCode.trim()) {
      const validation = await saleService.validatePromoCode(promoCode);
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.message || "Invalid promo code." },
          { status: 400 }
        );
      }

      sale = validation.sale;
      discountPercent = sale.discountPercent || 0;

      const discountCalc = await saleService.calculateDiscount(
        promoCode,
        validatedItems
      );

      discountAmount = discountCalc.discountAmount || 0;
      appliedSaleId = discountCalc.saleId || null;
    }

    const shippingFee = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const subtotalRounded = Math.round(subtotal * 100) / 100;
    const discountRounded = Math.round(discountAmount * 100) / 100;

    // Build Stripe line items with per-item discounted pricing
    const itemLineItems = validatedItems.map((item) => {
      let unitAmountCents = Math.round(item.price * 100);

      if (discountPercent > 0 && sale) {
        const isEligible =
          sale.saleType === "flash" ||
          (sale.saleType === "category" &&
            sale.category &&
            item.category === sale.category);

        if (isEligible) {
          const discountedPrice = item.price * (1 - discountPercent / 100);
          unitAmountCents = Math.round(discountedPrice * 100);
        }
      }

      return {
        price_data: {
          currency: CURRENCY,
          product_data: { name: item.name },
          unit_amount: unitAmountCents,
        },
        quantity: item.qty,
      };
    });

    // Compute items-only total after discount (what Stripe charges for goods)
    const stripeItemsCents = itemLineItems.reduce(
      (sum, li) => sum + li.price_data.unit_amount * li.quantity,
      0
    );
    const totalAfterDiscount = Math.max(0, stripeItemsCents / 100);

    // Add shipping as a Stripe line item
    const shippingCents = Math.round(shippingFee * 100);
    if (shippingFee > 0) {
      itemLineItems.push({
        price_data: {
          currency: CURRENCY,
          product_data: { name: "Shipping (Express)" },
          unit_amount: shippingCents,
        },
        quantity: 1,
      });
    }

    // Stripe total = discounted items + shipping
    const finalTotalCents = Math.max(0, stripeItemsCents + shippingCents);
    const finalTotal = finalTotalCents / 100;

    const origin =
      process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: itemLineItems,
      metadata: {
        userId,
        promoCode: promoCode || "",
        discountPercent: String(discountPercent),
        discountAmount: String(discountRounded),
        subtotal: String(subtotalRounded),
        shippingFee: String(shippingFee),
        totalAfterDiscount: String(totalAfterDiscount),
        total: String(finalTotal),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancelled`,
    });

    const orderData = {
      userId,
      userName: userName || "",
      email,
      phone: phone || "",
      shippingAddress,
      items: validatedItems,
      subtotal: subtotalRounded,
      discountAmount: discountRounded,
      discountPercent,
      shippingFee,
      totalAfterDiscount,
      total: finalTotal,
      paymentMethod: "stripe",
      orderStatus: "Pending",
      promoCode: promoCode && promoCode.trim() ? promoCode.trim().toUpperCase() : null,
      appliedSaleId,
      stripeSessionId: session.id,
      createdAt: new Date().toISOString(),
    };

    await dbService.create(ORDERS_COLLECTION, orderData);

    // Decrement stock immediately (don't rely solely on webhook)
    for (const item of validatedItems) {
      if (item.itemType === "bundle") continue;
      if (!item.size || item.size === "Bundle Deal") continue;
      try {
        await productService.decrementVariantStock(item.productId, item.size, item.qty || 1);
      } catch (stockError) {
        console.error(`Checkout: Failed to decrement stock for ${item.name} (${item.size}):`, stockError.message);
      }
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session. Please try again." },
      { status: 500 }
    );
  }
}
