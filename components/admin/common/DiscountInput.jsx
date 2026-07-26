"use client";

import { Minus, Plus } from "lucide-react";

export default function DiscountInput({ value, onChange, disabled }) {
  const clamp = (v) => Math.min(100, Math.max(0, v));
  const adjust = (delta) => onChange(clamp(value + delta));

  const handleWheel = (e) => {
    if (disabled) return;
    e.preventDefault();
    adjust(e.deltaY < 0 ? 1 : -1);
  };

  const handleKey = (e) => {
    if (disabled) return;
    if (e.key === "ArrowUp") { e.preventDefault(); adjust(1); }
    if (e.key === "ArrowDown") { e.preventDefault(); adjust(-1); }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => adjust(-1)}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-pink-200 text-gray-600 hover:bg-pink-100 disabled:opacity-40 transition-colors"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <div className="relative flex-1">
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
          onWheel={handleWheel}
          onKeyDown={handleKey}
          className="w-full text-center px-3 py-2.5 border border-pink-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-luxe-rose disabled:opacity-40 disabled:bg-gray-50"
        />
      </div>

      <span className="text-sm font-bold text-gray-500">%</span>

      <button
        type="button"
        disabled={disabled}
        onClick={() => adjust(1)}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-pink-200 text-gray-600 hover:bg-pink-100 disabled:opacity-40 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
