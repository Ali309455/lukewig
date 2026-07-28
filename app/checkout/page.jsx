"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowLeft,
  AlertCircle,
  Tag,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import orderService from "@/services/OrderService";

export default function CheckoutPage() {
  const {
    cartItems,
    grandTotal,
    subtotal,
    shippingFee,
    discountAmount,
    clearCart,
    applyPromoCode,
    promoCode,
    appliedSale,
    clearPromo,
  } = useCart();
  const { user } = useAuth();
  const { clearWishlist } = useWishlist();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [orderId, setOrderId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState(null);
  const [promoApplying, setPromoApplying] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const missing = [];
    if (!formData.firstName.trim()) missing.push("First Name");
    if (!formData.lastName.trim()) missing.push("Last Name");
    if (!formData.email.trim()) missing.push("Email");
    if (!formData.phone.trim()) missing.push("Phone");
    if (!formData.address.trim()) missing.push("Address");
    if (!formData.city.trim()) missing.push("City");
    if (!formData.zip.trim()) missing.push("Zip Code");
    if (missing.length > 0) {
      setErrorMsg(`Missing required fields: ${missing.join(", ")}`);
      return false;
    }
    return true;
  };

  const handleStripeCheckout = async () => {
    setErrorMsg("");

    if (!validateForm()) return;
    if (cartItems.length === 0) {
      setErrorMsg("Your cart is empty");
      return;
    }
    if (!user) {
      setErrorMsg("Please sign in to place an order");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.productId,
            name: item.name,
            category: item.category || "",
            price: item.price,
            size: item.size,
            image: item.image,
            qty: item.qty,
            itemType: item.itemType || "product",
          })),
          userId: user.uid,
          userName: user.displayName || "",
          email: formData.email,
          phone: formData.phone,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            zip: formData.zip,
          },
          promoCode: promoCode || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session.");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned.");
      }
    } catch (error) {
      console.error("Stripe checkout failed:", error);
      setErrorMsg(error.message || "Failed to start payment. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleCODPayment = async () => {
    setErrorMsg("");

    if (!validateForm()) return;
    if (cartItems.length === 0) {
      setErrorMsg("Your cart is empty");
      return;
    }
    if (!user) {
      setErrorMsg("Please sign in to place an order");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        userId: user.uid,
        userName: user.displayName || "",
        email: formData.email,
        phone: formData.phone,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
        },
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          category: item.category || "",
          price: item.price,
          size: item.size,
          image: item.image,
          qty: item.qty,
          itemType: item.itemType || "product",
        })),
        subtotal,
        discountAmount,
        discountPercent: appliedSale?.discountPercent || 0,
        shippingFee,
        totalAfterDiscount: Math.max(0, subtotal - discountAmount),
        total: grandTotal,
        paymentMethod: "cod",
        orderStatus: "Pending",
        promoCode: promoCode || null,
        appliedSaleId: appliedSale?.id || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const createdOrder = await orderService.createOrder(orderData);
      setOrderId(createdOrder.id);
      setOrderPlaced(true);
      clearCart();
      await clearWishlist();
    } catch (error) {
      console.error("COD order placement failed:", error);
      setErrorMsg(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (paymentMethod === "stripe") {
      await handleStripeCheckout();
    } else {
      await handleCODPayment();
    }
  };

  const handleApplyCheckoutPromo = async (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setPromoApplying(true);
    setPromoMsg(null);
    const res = await applyPromoCode(promoInput);
    setPromoMsg(res);
    if (res.success) setPromoInput("");
    setPromoApplying(false);
  };

  const handleRemovePromo = () => {
    clearPromo();
    setPromoMsg(null);
    setPromoInput("");
  };

  const stripeAvailable =
    typeof process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === "string" &&
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.length > 0;

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="font-serif text-4xl font-extrabold text-gray-900">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
          Thank you for shopping with Versatile by Versha! Your order
          confirmation has been sent to{" "}
          <strong className="text-gray-900">
            {formData.email || "your email"}
          </strong>
          .
        </p>
        <div className="p-4 bg-pink-50 rounded-2xl border border-pink-100 max-w-sm mx-auto text-xs text-gray-600 space-y-1">
          <p>
            Order Reference:{" "}
            <strong className="text-luxe-rose">
              #LX-{orderId?.slice(-8) || "****"}
            </strong>
          </p>
          <p>
            Payment Method: <strong>Cash on Delivery</strong>
          </p>
          <p>
            Estimated Delivery: <strong>5 - 10 Business Days</strong>
          </p>
        </div>
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-luxe-rose text-white font-semibold text-xs shadow-lg hover:bg-luxe-rose-dark transition-all"
        >
          <span>View My Orders</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-pink-100 pb-4">
        <h1 className="font-serif text-4xl font-extrabold text-gray-900">
          Checkout
        </h1>
        <Link
          href="/cart"
          className="text-xs font-semibold text-luxe-rose flex items-center gap-1 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-pink-100 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-luxe-rose" />
              <span>Shipping Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  First Name
                </label>
                <input
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Last Name
                </label>
                <input
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Delivery Street Address
              </label>
              <input
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Luxury Ave, Suite 400"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  City
                </label>
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Zip Code
                </label>
                <input
                  required
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="10001"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-pink-100 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-luxe-gold" />
              <span>Payment Option</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("stripe")}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  paymentMethod === "stripe"
                    ? "border-luxe-rose bg-pink-50/50 shadow-xs"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CreditCard className="w-5 h-5 text-luxe-rose" />
                <div>
                  <p className="text-xs font-bold text-gray-900">
                    Credit / Debit Card
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Pay with Visa, Mastercard, Amex
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  paymentMethod === "cod"
                    ? "border-luxe-rose bg-pink-50/50 shadow-xs"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Truck className="w-5 h-5 text-luxe-gold" />
                <div>
                  <p className="text-xs font-bold text-gray-900">
                    Cash On Delivery
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Pay upon package arrival
                  </p>
                </div>
              </button>
            </div>

            {paymentMethod === "stripe" && (
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                <p className="text-xs text-blue-700 font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  You will be redirected to Stripe's secure checkout page to
                  complete your payment. Your card details are never stored on
                  our servers.
                </p>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                <p className="text-xs text-emerald-700 font-medium flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-500" />
                  Pay when your package arrives. No upfront payment required.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-pink-100 space-y-6 sticky top-28">
            <h3 className="font-serif text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
              Order Items ({cartItems.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-gray-50">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center pt-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-gray-400">
                        {item.size} x {item.qty}
                      </p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-gray-900">
                    ${item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Promo / Coupon Code
              </label>
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700">
                      {promoCode}
                    </span>
                    {appliedSale?.noteText && (
                      <span className="text-[10px] text-emerald-600">
                        {appliedSale.noteText}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="p-1 text-emerald-500 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCheckoutPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs uppercase focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                  />
                  <button
                    type="submit"
                    disabled={promoApplying}
                    className="px-4 py-2 bg-luxe-dark text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors disabled:opacity-50"
                  >
                    {promoApplying ? "..." : "Apply"}
                  </button>
                </form>
              )}
              {promoMsg && (
                <p
                  className={`text-[11px] font-semibold ${
                    promoMsg.success ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {promoMsg.message}
                </p>
              )}
            </div>

            <div className="space-y-2 text-xs border-t border-gray-100 pt-4 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>
                    Discount{" "}
                    {appliedSale ? `(${appliedSale.discountPercent}%)` : ""}
                  </span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? "FREE" : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100 text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span className="font-serif text-2xl text-luxe-rose">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-red-700 font-medium">{errorMsg}</p>
              </div>
            )}

            {!stripeAvailable && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 font-medium">
                  Card payments are currently unavailable. Please use Cash on
                  Delivery.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={
                isProcessing ||
                (paymentMethod === "stripe" && !stripeAvailable)
              }
              className="w-full py-4 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {paymentMethod === "stripe"
                    ? "Redirecting to Stripe..."
                    : "Processing..."}
                </>
              ) : (
                `Pay $${grandTotal.toFixed(2)}`
              )}
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
