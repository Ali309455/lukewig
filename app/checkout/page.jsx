"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, CreditCard, Truck, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cartItems, grandTotal, subtotal, shippingFee, discountAmount, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="font-serif text-4xl font-extrabold text-gray-900">🎉 Order Placed Successfully!</h1>
        <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
          Thank you for shopping with Luxe Hair! Your order confirmation has been sent to{" "}
          <strong className="text-gray-900">{formData.email || "your email"}</strong>.
        </p>
        <div className="p-4 bg-pink-50 rounded-2xl border border-pink-100 max-w-sm mx-auto text-xs text-gray-600 space-y-1">
          <p>Order Reference: <strong className="text-luxe-rose">#LX-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
          <p>Estimated Delivery: <strong>2 - 4 Business Days</strong></p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-luxe-rose text-white font-semibold text-xs shadow-lg hover:bg-luxe-rose-dark transition-all"
        >
          Return To Home Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="flex items-center justify-between border-b border-pink-100 pb-4">
        <h1 className="font-serif text-4xl font-extrabold text-gray-900">Checkout</h1>
        <Link href="/cart" className="text-xs font-semibold text-luxe-rose flex items-center gap-1 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Shipping & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Shipping Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-luxe-rose" />
              <span>Shipping Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">First Name</label>
                <input
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Last Name</label>
                <input
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Delivery Street Address</label>
              <input
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Luxury Ave, Suite 400"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">City</label>
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Zip Code</label>
                <input
                  required
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="10001"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-luxe-gold" />
              <span>Payment Option</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  paymentMethod === "card"
                    ? "border-luxe-rose bg-pink-50/50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CreditCard className="w-5 h-5 text-luxe-rose" />
                <div>
                  <p className="text-xs font-bold text-gray-900">Credit / Debit Card</p>
                  <p className="text-[10px] text-gray-500">Visa, Mastercard, Amex</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  paymentMethod === "cod"
                    ? "border-luxe-rose bg-pink-50/50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Truck className="w-5 h-5 text-luxe-gold" />
                <div>
                  <p className="text-xs font-bold text-gray-900">Cash On Delivery</p>
                  <p className="text-[10px] text-gray-500">Pay upon package arrival</p>
                </div>
              </button>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Card Number</label>
                  <input
                    required
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="4532 •••• •••• 8912"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Expiry (MM/YY)</label>
                    <input
                      required
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="12/28"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">CVV Security</label>
                    <input
                      required
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="382"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 space-y-6 sticky top-28">
            <h3 className="font-serif text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
              Order Items ({cartItems.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-gray-50">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-gray-400">{item.size} × {item.qty}</p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-gray-900">${item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs border-t border-gray-100 pt-4 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? "FREE" : `$${shippingFee}`}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100 text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span className="font-serif text-2xl text-luxe-rose">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all"
            >
              Complete Order (${grandTotal.toFixed(2)})
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Money-Back Guarantee Protected</span>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}
