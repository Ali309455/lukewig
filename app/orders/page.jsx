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
      "Pending": "bg-amber-50 text-amber-700 border-amber-200",
      "Failed": "bg-red-50 text-red-700 border-red-200",
    };
    return statusMap[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-gray-500 tracking-wider">Order ID</p>
              <p className="font-mono text-sm font-bold text-luxe-rose">#LX-{order.id.slice(-6)}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock className="w-3.5 h-3.5" />
              <span>Placed on {formatDate(order.createdAt)}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.orderStatus)}`}>
              {order.orderStatus}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentMethod === "card" ? "Paid" : "COD"}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-pink-50 flex-shrink-0 border border-pink-100">
                {order.items && order.items.length > 0 && order.items[0].image ? (
                  <Image src={order.items[0].image} alt={order.items[0].name} width={49} height={48} className="object-contain " />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-sm font-bold text-gray-900 truncate">
                  {order.items && order.items.length > 0 ? order.items[0].name : "Product"}
                  {order.items && order.items.length > 1 && (
                    <span className="text-gray-500"> +{order.items.length - 1} more</span>
                  )}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Qty: {order.items ? order.items.reduce((sum, item) => sum + item.qty, 0) : 0}
                </p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <p className="text-xs text-gray-500">Total</p>
              <p className="font-serif text-lg font-bold text-luxe-rose">
                ${order.total ? order.total.toFixed(2) : "0.00"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              {order.paymentMethod === "card" ? (
                <>
                  <CreditCard className="w-3.5 h-3.5 text-luxe-rose" />
                  <span>Card Payment</span>
                </>
              ) : (
                <>
                  <Truck className="w-3.5 h-3.5 text-luxe-gold" />
                  <span>Cash on Delivery</span>
                </>
              )}
            </div>

            <Link
              href={`/product/${order.items && order.items.length > 0 ? order.items[0].productId : "#"}`}
              className="text-xs font-semibold text-luxe-rose hover:text-luxe-rose-dark flex items-center gap-1 transition-colors"
            >
              <span>View Product</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyOrdersState() {
  return (
    <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-12 text-center space-y-6">
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
        <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-12 text-center space-y-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
