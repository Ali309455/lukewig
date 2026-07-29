"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartToast() {
  const { notification, totalItemCount } = useCart();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (notification && totalItemCount > 0) {
      setDismissed(false);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [notification, totalItemCount]);

  if (!notification && !visible) return null;

  return (
    <div
      className={`fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        visible && !dismissed
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <Link
        href="/cart"
        onClick={() => setDismissed(true)}
        className="group relative flex items-center gap-3 px-6 py-3.5 bg-luxe-dark text-white rounded-full shadow-2xl border border-luxe-rose/30 hover:border-luxe-rose/60 hover:shadow-luxe-rose/20 hover:shadow-2xl transition-all duration-300"
      >
        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxe-rose opacity-75" />
          <span className="relative inline-flex rounded-full h-5 w-5 bg-luxe-rose text-white text-[10px] font-bold items-center justify-center">
            {totalItemCount}
          </span>
        </span>

        <div className="w-8 h-8 rounded-full bg-luxe-rose/20 flex items-center justify-center shrink-0 group-hover:bg-luxe-rose/30 transition-colors">
          <ShoppingBag className="w-4 h-4 text-luxe-rose" />
        </div>

        <span className="text-sm font-semibold whitespace-nowrap">
          Go to Cart
        </span>

        <div className="w-6 h-6 rounded-full bg-luxe-rose flex items-center justify-center shrink-0 group-hover:bg-luxe-rose-dark group-hover:translate-x-0.5 transition-all">
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </div>
      </Link>
    </div>
  );
}
