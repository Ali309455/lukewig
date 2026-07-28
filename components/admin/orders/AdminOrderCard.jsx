"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Clock,
  User,
  CreditCard,
  Package,
  Truck,
  MapPin,
  Hash,
  Percent,
  Tag,
  DollarSign,
  Copy,
  ChevronUp,
  Receipt,
  ShieldCheck,
  Circle,
} from "lucide-react";
import { ORDER_STATUSES } from "@/services/OrderService";

export default function AdminOrderCard({ order, updating, onStatusChange }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [copied, setCopied] = useState(false);
  const statusRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setShowStatusMenu(false);
      }
    };
    if (showStatusMenu) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showStatusMenu]);

  const getStatusColor = (status) => {
    const map = {
      Pending: "bg-amber-50 text-amber-700 border-amber-200",
      Placed: "bg-blue-50 text-blue-700 border-blue-200",
      Processing: "bg-purple-50 text-purple-700 border-purple-200",
      Dispatched: "bg-indigo-50 text-indigo-700 border-indigo-200",
      Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Cancelled: "bg-red-50 text-red-700 border-red-200",
      Refunded: "bg-pink-50 text-pink-700 border-pink-200",
    };
    return map[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getPaymentStatusColor = (status) => {
    const map = {
      Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Unpaid: "bg-amber-50 text-amber-700 border-amber-200",
      Failed: "bg-red-50 text-red-700 border-red-200",
    };
    return map[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const formatDate = (d) => {
    if (!d) return "N/A";
    const date = d?.toDate?.() || new Date(d);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const customerName =
    order.userName ||
    (order.shippingAddress?.firstName
      ? order.shippingAddress.firstName + " " + (order.shippingAddress?.lastName || "")
      : "") ||
    order.email ||
    "N/A";

  const items = order.items || [];
  const totalQty = items.reduce((sum, i) => sum + (i.qty || 0), 0);

  const orderStatusIndex = useMemo(
    () => ORDER_STATUSES.indexOf(order.orderStatus),
    [order.orderStatus]
  );

  const timelineStatuses = useMemo(() => {
    if (order.orderStatus === "Cancelled" || order.orderStatus === "Refunded") {
      return ORDER_STATUSES.slice(0, orderStatusIndex + 1);
    }
    return ORDER_STATUSES.filter((s) => s !== "Pending");
  }, [order.orderStatus, orderStatusIndex]);

  const handleCopyId = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(order.id || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [order.id]);

  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-200 ">
      {/* Header */}
      <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-pink-100 bg-gradient-to-r from-pink-50/30 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-base sm:text-lg font-bold text-luxe-rose tracking-tight">
              #{order.id?.slice(-8)}
            </span>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.orderStatus)}`}>
              <ShieldCheck className="w-3 h-3" />
              {order.orderStatus}
            </span>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentMethod === "cod" ? "COD" : "Card"} — {order.paymentStatus}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{formatDate(order.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="px-5 py-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Customer */}
        <div className="bg-gray-50/60 rounded-xl p-4 border border-gray-100 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <User className="w-3 h-3" /> Customer
          </p>
          <p className="text-sm font-bold text-gray-900 truncate">{customerName}</p>
          {order.email && (
            <p className="text-xs text-gray-600 truncate">{order.email}</p>
          )}
          {order.phone && (
            <p className="text-xs text-gray-600">{order.phone}</p>
          )}
          {order.id && (
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
              <span className="truncate max-w-[120px]">ID: {order.id}</span>
              <button
                type="button"
                onClick={handleCopyId}
                className="hover:text-luxe-rose transition-colors shrink-0"
                aria-label="Copy order ID"
              >
                {copied ? (
                  <span className="text-emerald-500 text-[9px] font-bold">Copied!</span>
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Shipping */}
        <div className="bg-gray-50/60 rounded-xl p-4 border border-gray-100 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Shipping
          </p>
          {order.shippingAddress ? (
            <div className="text-xs text-gray-700 space-y-0.5">
              <p className="font-semibold">
                {order.shippingAddress.firstName || ""} {order.shippingAddress.lastName || ""}
              </p>
              <p>{order.shippingAddress.address || "N/A"}</p>
              <p>
                {order.shippingAddress.city || ""}{" "}
                {order.shippingAddress.state || ""}{" "}
                {order.shippingAddress.zip || ""}
              </p>
              {order.shippingAddress.country && <p>{order.shippingAddress.country}</p>}
            </div>
          ) : (
            <p className="text-xs text-gray-400">N/A</p>
          )}
        </div>

        {/* Payment */}
        <div className="bg-gray-50/60 rounded-xl p-4 border border-gray-100 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <CreditCard className="w-3 h-3" /> Payment
          </p>
          <div className="flex items-center gap-1.5 text-sm">
            {order.paymentMethod === "cod" ? (
              <Truck className="w-4 h-4 text-luxe-gold" />
            ) : (
              <CreditCard className="w-4 h-4 text-luxe-rose" />
            )}
            <span className="font-semibold text-gray-900 capitalize">
              {order.paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment"}
            </span>
          </div>
          {order.promoCode && (
            <p className="text-xs text-gray-600">Promo: <span className="font-mono font-bold text-luxe-rose">{order.promoCode}</span></p>
          )}
          {order.discountPercent > 0 && (
            <p className="text-xs text-gray-600">Discount: <span className="font-semibold text-emerald-600">{order.discountPercent}%</span></p>
          )}
          {order.stripeSessionId && (
            <p className="text-[10px] text-gray-400 font-mono truncate" title={order.stripeSessionId}>
              Session: {order.stripeSessionId.slice(-12)}
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="bg-gray-50/60 rounded-xl p-4 border border-gray-100 space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Pricing
          </p>
          <div className="space-y-0.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-700">${(order.subtotal || 0).toFixed(2)}</span>
            </div>
            {order.shippingFee > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-700">${order.shippingFee.toFixed(2)}</span>
              </div>
            )}
            {order.discountAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="text-emerald-600">-${order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-1 border-t border-gray-200">
              <span className="font-bold text-gray-700">Total</span>
              <span className="font-bold text-luxe-rose text-base">
                ${(order.total || order.totalAmount || 0).toFixed(2)}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-gray-400">{totalQty} item{totalQty !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Order Items */}
      {items.length > 0 && (
        <div className="px-5 sm:px-6 pb-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5" /> Items ({items.length})
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item, idx) => (
              <div
                key={item.productId + item.size + idx}
                className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-pink-100 hover:shadow-sm transition-all"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-pink-50 shrink-0 border border-pink-100">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} width={56} height={56} className="object-contain w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Package className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm font-semibold text-gray-900 truncate leading-tight">{item.name}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-gray-500">
                    {item.category && <span>Cat: <strong className="text-gray-700">{item.category}</strong></span>}
                    {item.size && <span>Size: <strong className="text-gray-700">{item.size}</strong></span>}
                    <span>Qty: <strong className="text-gray-700">{item.qty}</strong></span>
                    {item.price != null && (
                      <>
                        <span>@ <strong className="text-gray-700">${item.price.toFixed(2)}</strong></span>
                        <span className="text-luxe-rose font-semibold">
                          = ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                  {item.itemType === "bundle" && (
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-sm bg-luxe-gold/10 text-luxe-gold text-[9px] font-bold leading-tight">
                      BUNDLE
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline + Status Update */}
      <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row gap-6 border-t border-pink-100">
        {/* Timeline */}
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1">
            <Receipt className="w-3 h-3" /> Timeline
          </p>
          <div className="flex items-center gap-1 flex-wrap">
            {timelineStatuses.map((status, idx) => {
              const currentIdx = orderStatusIndex;
              const statusIdx = ORDER_STATUSES.indexOf(status);
              const isCompleted = statusIdx <= currentIdx && order.orderStatus !== "Cancelled" && order.orderStatus !== "Refunded";
              const isCurrent = status === order.orderStatus;
              const isOverridden = order.orderStatus === "Cancelled" || order.orderStatus === "Refunded";
              const isCancelledStatus = isOverridden && statusIdx === currentIdx;
              return (
                <div key={status} className="flex items-center gap-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all ${
                      isCancelledStatus
                        ? getStatusColor(order.orderStatus)
                        : isCompleted
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-gray-50 text-gray-400 border-gray-200"
                    } ${isCurrent ? "ring-2 ring-luxe-rose/30" : ""}`}
                  >
                    <Circle className={`w-1.5 h-1.5 fill-current ${isCompleted || isCancelledStatus ? "opacity-100" : "opacity-30"}`} />
                    {status}
                  </span>
                  {idx < timelineStatuses.length - 1 && (
                    <ChevronDown className="w-2.5 h-2.5 text-gray-300 -rotate-90" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Update */}
        <div className="relative shrink-0" ref={statusRef}>
          <button
            type="button"
            disabled={updating === order.id}
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-luxe-rose bg-luxe-rose/5 text-sm font-semibold text-luxe-rose hover:bg-luxe-rose hover:text-white transition-all disabled:opacity-50 flex items-center gap-2 justify-center"
          >
            {updating === order.id ? (
              <span className="w-4 h-4 border-2 border-luxe-rose border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Update Status
                <ChevronDown className={`w-4 h-4 transition-transform ${showStatusMenu ? "rotate-180" : ""}`} />
              </>
            )}
          </button>

          {showStatusMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-pink-100 py-1.5 z-50">
              {ORDER_STATUSES.map((status) => (
                <button
                  key={status}
                  type="button"
                  disabled={status === order.orderStatus}
                  onClick={() => {
                    onStatusChange(order.id, status);
                    setShowStatusMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2 ${
                    status === order.orderStatus
                      ? "text-gray-300 cursor-not-allowed bg-gray-50"
                      : "text-gray-700 hover:bg-pink-50 hover:text-luxe-rose"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(status).split(" ")[0]}`} />
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="border-t border-pink-50">
        <button
          type="button"
          onClick={() => setShowMetadata(!showMetadata)}
          className="w-full flex items-center justify-between px-5 sm:px-6 py-2.5 text-[10px] font-semibold text-gray-400 hover:text-gray-600 hover:bg-gray-50/50 transition-all"
        >
          <span className="flex items-center gap-1">
            <Hash className="w-3 h-3" /> Order Metadata
          </span>
          {showMetadata ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
        {showMetadata && (
          <div className="px-5 sm:px-6 pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-[10px] font-mono text-gray-500">
            <div>
              <span className="text-gray-400">Order ID</span>
              <p className="text-gray-700 font-semibold break-all">{order.id}</p>
            </div>
            <div>
              <span className="text-gray-400">Created</span>
              <p className="text-gray-700">{formatDate(order.createdAt)}</p>
            </div>
            {order.updatedAt && (
              <div>
                <span className="text-gray-400">Updated</span>
                <p className="text-gray-700">{formatDate(order.updatedAt)}</p>
              </div>
            )}
            {order.stripeSessionId && (
              <div>
                <span className="text-gray-400">Stripe Session</span>
                <p className="text-gray-700 break-all">{order.stripeSessionId}</p>
              </div>
            )}
            {order.promoCode && (
              <div>
                <span className="text-gray-400">Promo Code</span>
                <p className="text-luxe-rose font-bold">{order.promoCode}</p>
              </div>
            )}
            {order.appliedSaleId && (
              <div>
                <span className="text-gray-400">Applied Sale</span>
                <p className="text-gray-700">{order.appliedSaleId}</p>
              </div>
            )}
            {order.userId && (
              <div>
                <span className="text-gray-400">User ID</span>
                <p className="text-gray-700 break-all">{order.userId}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
