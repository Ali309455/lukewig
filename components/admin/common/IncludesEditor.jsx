"use client";

import { Plus, X } from "lucide-react";
import { inputCls } from "./constants";

export default function IncludesEditor({ items, onChange }) {
  const addItem = () => onChange([...items, ""]);

  const updateItem = (idx, value) => {
    const next = [...items];
    next[idx] = value;
    onChange(next);
  };

  const removeItem = (idx) => {
    if (items.length === 1) return;
    const next = [...items];
    next.splice(idx, 1);
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            type="text"
            placeholder={`e.g. 3x Straight Virgin Bundles (18", 20", 22")`}
            value={item}
            onChange={(e) => updateItem(idx, e.target.value)}
            className={`${inputCls} flex-1`}
          />
          <button
            type="button"
            onClick={() => removeItem(idx)}
            disabled={items.length === 1}
            className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl border border-pink-200 text-red-400 hover:bg-red-50 disabled:opacity-30 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1.5 text-xs font-semibold text-luxe-rose hover:text-luxe-rose-dark transition-colors py-1"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Item
      </button>
    </div>
  );
}
