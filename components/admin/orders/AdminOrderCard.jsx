"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Clock, User, CreditCard } from "lucide-react";
import { ORDER_STATUSES } from "@/services/OrderService";

export default function AdminOrderCard({ order, updating, onStatusChange }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
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
    order.shippingAddress?.firstName + " " + order.shippingAddress?.lastName ||
    order.email ||
    "N/A";

  return (
    <div className="p-4 bg-white rounded-2xl border border-pink-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold text-luxe-rose">
              #{order.id?.slice(-8)}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(
                order.orderStatus
              )}`}
            >
              {order.orderStatus}
            </span>
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(order.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-600 flex-wrap">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3 text-gray-400" />
              {customerName}
            </span>
            <span className="flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-gray-400" />
              {order.paymentMethod === "cod" ? "COD" : "Card"}
              <span
                className={`ml-1 px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                  order.paymentStatus === "Paid"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {order.paymentStatus}
              </span>
            </span>
            <span className="font-serif font-bold text-luxe-rose">
              ${order.total?.toFixed(2) || "0.00"}
            </span>
          </div>

          {order.items?.length > 0 && (
            <div className="flex flex-wrap gap-1 max-w-md">
              {order.items.map((i) => (
                <span
                  key={i.productId + i.size}
                  className="inline-flex items-center gap-1 text-[10px]"
                >
                  <span className="text-gray-400 truncate max-w-[120px]">
                    {i.name}
                  </span>
                  <span className="text-gray-500">
                    ({i.size || "N/A"} x{i.qty})
                  </span>
                  {i.itemType === "bundle" && (
                    <span className="px-1 py-0.5 rounded bg-luxe-gold/10 text-luxe-gold text-[8px] font-bold">
                      BUNDLE
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-shrink-0" ref={statusRef}>
          <button
            type="button"
            disabled={updating === order.id}
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className="px-3.5 py-2 rounded-full border border-pink-200 text-xs font-semibold text-gray-700 hover:bg-pink-50 transition-all disabled:opacity-50 flex items-center gap-1.5"
          >
            {updating === order.id ? (
              <span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Update Status
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>

          {showStatusMenu && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-pink-100 py-1 z-50">
              {ORDER_STATUSES.map((status) => (
                <button
                  key={status}
                  type="button"
                  disabled={status === order.orderStatus}
                  onClick={() => {
                    onStatusChange(order.id, status);
                    setShowStatusMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                    status === order.orderStatus
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-700 hover:bg-pink-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
