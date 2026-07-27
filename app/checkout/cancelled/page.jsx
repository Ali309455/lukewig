"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingBag, CreditCard } from "lucide-react";

export default function CheckoutCancelledPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-6 animate-fade-in">
      <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
        <XCircle className="w-12 h-12" />
      </div>

      <h1 className="font-serif text-4xl font-extrabold text-gray-900">
        Payment Cancelled
      </h1>

      <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
        Your payment was not completed. No charges have been made. You can try
        again or choose a different payment method.
      </p>

      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 max-w-sm mx-auto text-xs text-gray-600 space-y-2">
        <p className="text-amber-700 font-medium">
          Your cart items are still saved. Nothing has been lost.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Link
          href="/checkout"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-luxe-rose text-white font-semibold text-xs shadow-lg hover:bg-luxe-rose-dark transition-all"
        >
          <CreditCard className="w-4 h-4" />
          <span>Return to Checkout</span>
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="pt-4">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-luxe-rose transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
      </div>
    </div>
  );
}
