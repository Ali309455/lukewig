"use client";

import { useState, useEffect } from "react";
import { Sparkles, Timer } from "lucide-react";
import saleService from "@/services/SaleService";

export default function AnnouncementBar() {
  const [sale, setSale] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchSale = async () => {
      try {
        const activeSale = await saleService.getActiveSale();
        if (!mounted) return;

        if (activeSale && activeSale.showInHeader) {
          setSale(activeSale);
          if (activeSale.endDate) {
            const diff = new Date(activeSale.endDate).getTime() - Date.now();
            if (diff > 0) {
              const totalSeconds = Math.floor(diff / 1000);
              setTimeLeft({
                hours: Math.floor(totalSeconds / 3600),
                minutes: Math.floor((totalSeconds % 3600) / 60),
                seconds: totalSeconds % 60,
              });
            }
          }
        } else {
          setSale(null);
          setTimeLeft(null);
        }
      } catch (err) {
        console.error("AnnouncementBar: failed to fetch sale", err);
      }
    };

    fetchSale();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (!prev) return null;
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!sale) return null;

  return (
    <div className="bg-gradient-to-r from-luxe-rose-soft via-pink-200 to-luxe-rose-soft text-luxe-dark text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 shadow-inner">
      <Sparkles className="w-4 h-4 text-luxe-rose animate-pulse" />
      <span>{sale.bannerText || sale.title}</span>
      {sale.promoCode && (
        <span className="hidden sm:inline ml-1 bg-white/70 px-2 py-0.5 rounded-full text-xs font-bold text-luxe-rose-dark shadow-sm">
          Use code <span className="uppercase">{sale.promoCode}</span> at checkout
        </span>
      )}
      {timeLeft && (
        <div className="hidden md:flex items-center gap-1 ml-3 bg-white/70 px-2 py-0.5 rounded-full text-xs font-semibold text-luxe-rose-dark shadow-sm">
          <Timer className="w-3.5 h-3.5" />
          <span>
            {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
