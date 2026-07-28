"use client";

import { useState } from "react";
import { Package, Clock, ChevronDown, ChevronUp } from "lucide-react";
import AdminOrderCard from "./AdminOrderCard";

const INITIAL_LIMIT = 5;

export default function OrdersSection({
  orders,
  loading,
  updating,
  onStatusChange,
  onRefresh,
}) {
  const [showAllToday, setShowAllToday] = useState(false);
  const [showAllEarlier, setShowAllEarlier] = useState(false);

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const todayOrders = orders.filter((o) => {
    const d = o.createdAt?.toDate?.() || new Date(o.createdAt);
    return d.toISOString().slice(0, 10) === todayStr;
  });
  const earlierOrders = orders.filter((o) => {
    const d = o.createdAt?.toDate?.() || new Date(o.createdAt);
    return d.toISOString().slice(0, 10) !== todayStr;
  });

  const visibleToday = showAllToday ? todayOrders : todayOrders.slice(0, INITIAL_LIMIT);
  const visibleEarlier = showAllEarlier ? earlierOrders : earlierOrders.slice(0, INITIAL_LIMIT);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-pink-100 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-5 h-5 text-luxe-rose" />
          All Orders ({orders.length})
        </h2>
        <button
          type="button"
          onClick={onRefresh}
          className="px-4 py-2 rounded-full border border-pink-200 text-xs font-semibold text-gray-600 hover:bg-pink-50 transition-all"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <OrdersSkeleton />
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
          <Package className="w-10 h-10" />
          <p className="text-sm font-medium">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {todayOrders.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-luxe-rose flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Today's Orders ({todayOrders.length})
              </p>
              <div className="grid grid-cols-1 gap-3">
                {visibleToday.map((order) => (
                  <AdminOrderCard
                    key={order.id}
                    order={order}
                    updating={updating}
                    onStatusChange={onStatusChange}
                  />
                ))}
              </div>
              {todayOrders.length > INITIAL_LIMIT && (
                <button
                  type="button"
                  onClick={() => setShowAllToday(!showAllToday)}
                  className="flex items-center gap-1.5 mx-auto text-xs font-semibold text-luxe-rose hover:text-luxe-rose/70 transition-colors"
                >
                  {showAllToday ? (
                    <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                  ) : (
                    <>Show More ({todayOrders.length - INITIAL_LIMIT} more) <ChevronDown className="w-3.5 h-3.5" /></>
                  )}
                </button>
              )}
            </div>
          )}

          {todayOrders.length > 0 && earlierOrders.length > 0 && (
            <div className="border-t border-pink-100" />
          )}

          {earlierOrders.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Earlier Orders ({earlierOrders.length})
              </p>
              <div className="grid grid-cols-1 gap-3">
                {visibleEarlier.map((order) => (
                  <AdminOrderCard
                    key={order.id}
                    order={order}
                    updating={updating}
                    onStatusChange={onStatusChange}
                  />
                ))}
              </div>
              {earlierOrders.length > INITIAL_LIMIT && (
                <button
                  type="button"
                  onClick={() => setShowAllEarlier(!showAllEarlier)}
                  className="flex items-center gap-1.5 mx-auto text-xs font-semibold text-luxe-rose hover:text-luxe-rose/70 transition-colors"
                >
                  {showAllEarlier ? (
                    <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                  ) : (
                    <>Show More ({earlierOrders.length - INITIAL_LIMIT} more) <ChevronDown className="w-3.5 h-3.5" /></>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OrdersSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-2xl border border-pink-100"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="h-4 w-32 bg-pink-100 rounded-sm animate-pulse" />
              <div className="h-3 w-48 bg-pink-100 rounded-sm animate-pulse" />
            </div>
            <div className="h-6 w-24 rounded-full bg-pink-100 animate-pulse" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-100 animate-pulse" />
              <div className="h-3 w-28 bg-pink-100 rounded-sm animate-pulse" />
            </div>
            <div className="h-5 w-16 bg-pink-100 rounded-sm animate-pulse" />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-8 w-28 rounded-full bg-pink-100 animate-pulse" />
            <div className="h-8 w-20 rounded-full bg-pink-100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
