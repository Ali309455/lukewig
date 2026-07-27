"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShoppingBag, Package, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const { clearWishlist } = useWishlist();

  const [status, setStatus] = useState("verifying");
  const [order, setOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const verifyOrder = useCallback(async () => {
    if (!sessionId) {
      setStatus("error");
      setErrorMsg("No session ID found in the URL.");
      return;
    }

    try {
      const res = await fetch(`/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`);
      const data = await res.json();

      if (data.found && data.order) {
        setOrder(data.order);
        setStatus("confirmed");
        clearCart();
        await clearWishlist();
      } else {
        setStatus("not_found");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setStatus("error");
      setErrorMsg("Could not verify your payment. Please check your orders page.");
    }
  }, [sessionId, clearCart, clearWishlist]);

  useEffect(() => {
    verifyOrder();
    const interval = setInterval(verifyOrder, 3000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (status === "verifying" || status === "not_found") {
        setStatus("timeout");
      }
    }, 30000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [verifyOrder]);

  const orderRef = order?.id ? `#LX-${order.id.slice(-8)}` : "";

  if (status === "verifying" || status === "not_found") {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
        <h1 className="font-serif text-3xl font-extrabold text-gray-900">
          Confirming Your Payment
        </h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
          Your payment was received. We are confirming your order and it will
          appear on your orders page shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxe-dark text-white font-semibold text-xs shadow-lg hover:bg-black transition-all"
          >
            <Package className="w-4 h-4" />
            <span>View My Orders</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  if (status === "timeout") {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-extrabold text-gray-900">
          Payment Successful!
        </h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
          Your payment was processed successfully. Your order is being prepared
          and will appear on your orders page shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxe-rose text-white font-semibold text-xs shadow-lg hover:bg-luxe-rose-dark transition-all"
          >
            <Package className="w-4 h-4" />
            <span>View My Orders</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-extrabold text-gray-900">
          Something Needs Attention
        </h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
          {errorMsg ||
            "We could not verify your payment status. Please check your orders page for confirmation."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxe-rose text-white font-semibold text-xs shadow-lg hover:bg-luxe-rose-dark transition-all"
          >
            <Package className="w-4 h-4" />
            <span>View My Orders</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h1 className="font-serif text-4xl font-extrabold text-gray-900">
        Order Placed Successfully!
      </h1>
      <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
        Thank you for shopping with Versatile by Versha! Your payment has been
        confirmed and your order is being prepared.
      </p>
      <div className="p-4 bg-pink-50 rounded-2xl border border-pink-100 max-w-sm mx-auto text-xs text-gray-600 space-y-1">
        <p>
          Order Reference:{" "}
          <strong className="text-luxe-rose">{orderRef || "Confirmed"}</strong>
        </p>
        <p>
          Payment Method:{" "}
          <strong>Card Payment (Stripe)</strong>
        </p>
        <p>
          Payment Status:{" "}
          <strong className="text-emerald-600">Paid</strong>
        </p>
        <p>
          Estimated Delivery: <strong>2 - 4 Business Days</strong>
        </p>
      </div>

      {order?.items && order.items.length > 0 && (
        <div className="max-w-sm mx-auto bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-left">
            Order Items
          </p>
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-xs text-left"
            >
              {item.image && (
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-gray-400">
                  {item.size} x {item.qty}
                </p>
              </div>
              <span className="font-serif font-bold text-gray-900">
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t border-gray-100 pt-3 space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(order.subtotal || 0).toFixed(2)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount ({order.discountPercent || 0}%)</span>
                <span>-${(order.discountAmount || 0).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.shippingFee > 0 ? `$${(order.shippingFee || 0).toFixed(2)}` : "FREE"}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-2 flex justify-between text-sm font-bold text-gray-900">
            <span>Total Paid</span>
            <span className="font-serif text-xl text-luxe-rose">
              ${(order.total || 0).toFixed(2)}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-luxe-rose text-white font-semibold text-xs shadow-lg hover:bg-luxe-rose-dark transition-all"
        >
          <Package className="w-4 h-4" />
          <span>View My Orders</span>
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}
