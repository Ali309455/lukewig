"use client";

import { useEffect, useState, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import orderService from "@/services/OrderService";
import { ProductGridShimmer } from "@/components/common/LoadingShimmer";
import Link from "next/link";
import Image from "next/image";
import { Package, Clock, ShieldCheck, Truck, CreditCard, ArrowRight } from "lucide-react";

function OrderCard({ order }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "N/A";
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  const getStatusColor = (status) => {
    const statusMap = {
      "Pending": "bg-amber-50 text-amber-700 border-amber-200",
      "Placed": "bg-blue-50 text-blue-700 border-blue-200",
      "Processing": "bg-purple-50 text-purple-700 border-purple-200",
      "Dispatched": "bg-indigo-50 text-indigo-700 border-indigo-200",
      "Delivered": "bg-emerald-50 text-emerald-700 border-emerald-200",
      "Cancelled": "bg-red-50 text-red-700 border-red-200",
      "Refunded": "bg-pink-50 text-pink-700 border-pink-200",
    };
    return statusMap[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getPaymentStatusColor = (status) => {
    const statusMap = {
      "Paid": "bg-emerald-50 text-emerald-700 border-emerald-200",
      "Unpaid": "bg-amber-50 text-amber-700 border-amber-200",
      "Failed": "bg-red-50 text-red-700 border-red-200",
    };
    return statusMap[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const items = order.items || [];
  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="bg-white rounded-3xl border border-pink-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Order</p>
              <p className="font-mono text-lg font-bold text-luxe-rose">#LX-{order.id?.slice(-8)}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{formatDateTime(order.createdAt)}</span>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2">
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border ${getStatusColor(order.orderStatus)}`}>
              {order.orderStatus}
            </span>
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold border ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentMethod === "card" ? "Paid by Card" : "Cash on Delivery"}
            </span>
          </div>
        </div>

        <div className="border-t border-pink-100 pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Items ({items.length})</p>
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={item.productId + item.size + idx} className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-pink-50 shrink-0 border border-pink-100">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} width={64} height={64} className="object-contain w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Package className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base font-bold text-gray-900 truncate">{item.name}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                    <span>Size: <strong className="text-gray-700">{item.size || "N/A"}</strong></span>
                    <span>Qty: <strong className="text-gray-700">{item.qty}</strong></span>
                    {item.price != null && <span className="text-luxe-rose font-semibold">${(item.price * item.qty).toFixed(2)}</span>}
                    {item.itemType === "bundle" && (
                      <span className="px-2 py-0.5 rounded bg-luxe-gold/10 text-luxe-gold text-[10px] font-bold">BUNDLE</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-pink-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            {order.shippingAddress && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Shipping To</p>
                <p className="text-sm text-gray-700 font-medium">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                  {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.zip}
                </p>
              </div>
            )}
          </div>
          <div className="space-y-2 text-right">
            <div className="flex items-center justify-end gap-1.5 text-sm text-gray-600">
              {order.paymentMethod === "card" ? (
                <><CreditCard className="w-4 h-4 text-luxe-rose" /><span>Card Payment</span></>
              ) : (
                <><Truck className="w-4 h-4 text-luxe-gold" /><span>Cash on Delivery</span></>
              )}
            </div>
            <div className="space-y-0.5">
              <p className="text-sm text-gray-500">Subtotal: <span className="text-gray-700">${(order.subtotal || order.total || 0).toFixed(2)}</span></p>
              {order.discountAmount > 0 && (
                <p className="text-sm text-emerald-600">Discount: -${order.discountAmount.toFixed(2)}</p>
              )}
              {order.shippingFee > 0 && (
                <p className="text-sm text-gray-500">Shipping: ${order.shippingFee.toFixed(2)}</p>
              )}
              <p className="font-serif text-xl font-bold text-luxe-rose">
                Total: ${(order.total || order.totalAmount || 0).toFixed(2)}
              </p>
            </div>
            <p className="text-xs text-gray-400">Qty: {totalQty} item{totalQty !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {order.deliveredAt && (
          <div className="flex items-center gap-2 pt-2 border-t border-pink-50 text-xs text-emerald-600 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            Delivered on {formatDateTime(order.deliveredAt)}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyOrdersState() {
  return (
    <div className="bg-white rounded-3xl border border-pink-100 shadow-xs p-12 text-center space-y-6">
      <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto">
        <Package className="w-10 h-10 text-luxe-rose" />
      </div>

      <div className="space-y-2">
        <h2 className="font-serif text-2xl font-bold text-gray-900">No Orders Yet</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          You haven't placed any orders yet. Start shopping our luxurious collection of wigs and bundle deals!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-luxe-rose text-white font-semibold text-sm shadow-lg hover:bg-luxe-rose-dark transition-all"
        >
          <span>Let's Go Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/#"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-luxe-rose text-luxe-rose hover:bg-luxe-rose hover:text-white font-semibold text-sm transition-all"
        >
          <span>Browse Bundles</span>
        </Link>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && user) {
      loadOrders();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [authLoading, user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const userOrders = await orderService.getOrdersByUser(user.uid);
      setOrders(userOrders || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setError(error.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGridShimmer count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-medium">Error: {error}</p>
          <button
            onClick={loadOrders}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-pink-100 shadow-xs p-12 text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Sign In Required</h2>
          <p className="text-gray-600">Please sign in to view your orders</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxe-rose text-white font-semibold text-sm shadow-lg hover:bg-luxe-rose-dark transition-all"
          >
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-pink-100 pb-4">
        <div>
          <h1 className="font-serif text-4xl font-extrabold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage your orders</p>
        </div>
        <div className="hidden sm:block">
          <p className="text-xs text-gray-500">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </p>
        </div>
      </div>

      {loading ? (
        <ProductGridShimmer count={3} />
      ) : orders.length === 0 ? (
        <EmptyOrdersState />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
