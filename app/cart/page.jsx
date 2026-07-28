"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Truck, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    discountAmount,
    discountPercent,
    shippingFee,
    grandTotal,
    applyPromoCode,
    promoCode,
    clearPromo,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [promoMessage, setPromoMessage] = useState(null);

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    setPromoMessage(null);
    const res = await applyPromoCode(inputCode);
    setPromoMessage(res);
  };

  const freeShippingThreshold = 199;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-pink-100 text-luxe-rose rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-4xl font-bold text-gray-900">Your Cart is Empty</h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Looks like you haven't added any luxury wigs to your bag yet. Explore our latest collection!
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-lg transition-all"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="flex items-center justify-between border-b border-pink-100 pb-4">
        <h1 className="font-serif text-4xl font-extrabold text-gray-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:text-red-700 font-semibold underline"
        >
          Clear Cart
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-linear-to-r from-pink-50 to-amber-50 p-4 rounded-2xl border border-pink-100 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-gray-800">
            <Truck className="w-4 h-4 text-luxe-rose" />
            {remainingForFreeShipping === 0 ? (
              <strong className="text-emerald-600">Congratulations! You unlocked FREE Express Shipping!</strong>
            ) : (
              <span>Add <strong className="text-luxe-rose">${remainingForFreeShipping}</strong> more for FREE Shipping!</span>
            )}
          </span>
          <span className="text-gray-500">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-luxe-rose to-luxe-gold transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-pink-100 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Length</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Qty</th>
                  <th className="pb-3 text-right">Subtotal</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {cartItems.map((item, idx) => (
                  <tr key={item.id} className="group hover:bg-pink-50/20 transition-colors">
                    
                    {/* Item Image & Title */}
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-1">{item.name}</h4>
                          <span className="text-[11px] text-gray-400">ID: #{item.productId}</span>
                        </div>
                      </div>
                    </td>

                    {/* Size */}
                    <td className="py-4 font-semibold text-xs text-gray-600">{item.size}</td>

                    {/* Unit Price */}
                    <td className="py-4 font-serif font-bold text-gray-900">${item.price}</td>

                    {/* Quantity Controls */}
                    <td className="py-4">
                      <div className="flex items-center space-x-2 border border-gray-200 rounded-full px-2 py-1 bg-gray-50 w-24">
                        <button
                          onClick={() => updateQuantity(idx, item.qty - 1)}
                          className="text-gray-500 hover:text-luxe-rose font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="font-semibold text-xs flex-1 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQuantity(idx, item.qty + 1)}
                          className="text-gray-500 hover:text-luxe-rose font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Item Total */}
                    <td className="py-4 text-right font-serif font-bold text-luxe-rose text-base">
                      ${item.price * item.qty}
                    </td>

                    {/* Remove */}
                    <td className="py-4 text-right pl-4">
                      <button
                        onClick={() => removeItem(idx)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link href="/shop" className="text-xs font-semibold text-luxe-rose hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-pink-100 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
              Order Summary
            </h3>

            {/* Promo Code Section */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Promo / Coupon Code
              </label>
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700">
                      {promoCode} ✓
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { clearPromo(); setPromoMessage(null); }}
                    className="text-[10px] text-emerald-500 hover:text-red-500 font-semibold underline transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Try VERSHA20"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs uppercase focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-luxe-dark text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoMessage && (
                <p className={`text-[11px] font-semibold ${promoMessage.success ? "text-emerald-600" : "text-red-500"}`}>
                  {promoMessage.message}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs border-t border-gray-100 pt-4 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Discount ({discountPercent}%)</span>
                  </span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between pt-3 border-t border-gray-100 text-sm font-bold text-gray-900">
                <span>Grand Total</span>
                <span className="font-serif text-2xl text-luxe-rose">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Encrypted 256-Bit SSL Safe Checkout</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
