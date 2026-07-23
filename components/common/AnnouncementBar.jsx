"use client";

import { useState, useEffect } from "react";
import { Sparkles, Timer } from "lucide-react";
import { ACTIVE_SALE } from "@/lib/mockData";

export default function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!ACTIVE_SALE.active) return null;

  return (
    <div className="bg-gradient-to-r from-luxe-rose-soft via-pink-200 to-luxe-rose-soft text-luxe-dark text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 shadow-inner">
      <Sparkles className="w-4 h-4 text-luxe-rose animate-pulse" />
      <span>{ACTIVE_SALE.bannerText}</span>
      <div className="hidden md:flex items-center gap-1 ml-3 bg-white/70 px-2 py-0.5 rounded-full text-xs font-semibold text-luxe-rose-dark shadow-sm">
        <Timer className="w-3.5 h-3.5" />
        <span>
          {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
