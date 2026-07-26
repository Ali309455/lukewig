"use client";

import { Sparkles } from "lucide-react";
import ToggleSwitch from "@/components/admin/common/ToggleSwitch";
import Field from "@/components/admin/common/Field";
import { inputCls } from "@/components/admin/common/constants";

export default function SaleManagerSection({ saleForm, setSaleForm, onUpdateSale }) {
  return (
    <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-6">
      <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-luxe-rose" />
        Launch Sitewide Flash Sale
      </h2>

      <form onSubmit={onUpdateSale} className="space-y-4 text-xs">
        <div className="flex items-center justify-between p-4 bg-pink-50/60 rounded-2xl border border-pink-100">
          <div>
            <p className="font-bold text-gray-900 text-sm">Campaign Active</p>
            <p className="text-[11px] text-gray-500">Toggle sale banner across header</p>
          </div>
          <ToggleSwitch
            checked={saleForm.active}
            onChange={(v) => setSaleForm({ ...saleForm, active: v })}
          />
        </div>

        <Field label="Banner Announcement Text">
          <input
            type="text"
            value={saleForm.bannerText}
            onChange={(e) => setSaleForm({ ...saleForm, bannerText: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Sitewide Discount (%)">
          <input
            type="number"
            value={saleForm.discountPercent}
            onChange={(e) => setSaleForm({ ...saleForm, discountPercent: Number(e.target.value) })}
            className={inputCls}
          />
        </Field>

        <button
          type="submit"
          className="w-full py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-sm shadow-md transition-all"
        >
          Update & Launch Flash Sale
        </button>
      </form>
    </div>
  );
}
