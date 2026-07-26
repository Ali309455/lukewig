"use client";

import { useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { CATEGORIES, SIZE_KEYS, inputCls, calcDiscountedPrice } from "@/components/admin/common/constants";
import Field from "@/components/admin/common/Field";
import Section from "@/components/admin/common/Section";
import ToggleSwitch from "@/components/admin/common/ToggleSwitch";
import DiscountInput from "@/components/admin/common/DiscountInput";
import ImageUploader from "@/components/admin/common/ImageUploader";

export default function ProductForm({ form, setForm, editingProduct, onSubmit, submitting, onCancel }) {
  const discountedPrice = calcDiscountedPrice(
    form.originalPrice,
    form.isOnSale ? form.discountPercent : 0
  );

  const setField = useCallback(
    (key, value) => setForm((prev) => ({ ...prev, [key]: value })),
    [setForm]
  );

  const setDetail = (key, value) =>
    setForm((prev) => ({
      ...prev,
      details: { ...prev.details, [key]: value },
    }));

  const setSizePrice = (idx, value) =>
    setForm((prev) => {
      const sizes = [...prev.sizes];
      sizes[idx] = { ...sizes[idx], price: value };
      return { ...prev, sizes };
    });

  const setSizeStock = (idx, value) =>
    setForm((prev) => {
      const sizes = [...prev.sizes];
      sizes[idx] = { ...sizes[idx], stock: value };
      return { ...prev, sizes };
    });

  return (
    <form onSubmit={onSubmit} className="space-y-5 text-xs">
      <Section title="General Information">
        <Field label="Product Name">
          <input
            required
            type="text"
            placeholder="e.g. Silky Straight HD Lace Wig"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Category">
          <div className="relative">
            <select
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              className={`${inputCls} appearance-none pr-9`}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </Field>

        <Field label="Short Description">
          <input
            type="text"
            placeholder="One-line tagline for this product"
            value={form.shortDescription}
            onChange={(e) => setField("shortDescription", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Full Description">
          <textarea
            rows={4}
            placeholder="Detailed product description…"
            value={form.fullDescription}
            onChange={(e) => setField("fullDescription", e.target.value)}
            className={`${inputCls} resize-none`}
          />
        </Field>
      </Section>

      <Section title="Pricing">
        <Field label="Original Price ($)">
          <input
            required
            type="number"
            min={0}
            step={0.01}
            placeholder="189.00"
            value={form.originalPrice}
            onChange={(e) => setField("originalPrice", e.target.value)}
            className={inputCls}
          />
        </Field>

        <div className="flex items-center justify-between py-1">
          <div>
            <p className="font-bold text-gray-700 text-[11px] uppercase tracking-wider">
              Enable Sale
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Apply discount to this product
            </p>
          </div>
          <ToggleSwitch
            checked={form.isOnSale}
            onChange={(v) => {
              setForm((prev) => ({
                ...prev,
                isOnSale: v,
                discountPercent: v ? prev.discountPercent : 0,
              }));
            }}
          />
        </div>

        <Field label="Discount Percentage">
          <DiscountInput
            value={form.discountPercent}
            onChange={(v) => setField("discountPercent", v)}
            disabled={!form.isOnSale}
          />
        </Field>

        <Field label="Discounted Price (auto-calculated)">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">
              $
            </span>
            <input
              readOnly
              tabIndex={-1}
              value={discountedPrice}
              className={`${inputCls} pl-7 bg-gray-50 text-luxe-rose font-bold cursor-default`}
            />
          </div>
        </Field>
      </Section>

      <Section title="Variant Pricing & Stock">
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
            <div className="col-span-3">Size</div>
            <div className="col-span-4 text-center">Price ($)</div>
            <div className="col-span-5 text-center">Stock</div>
          </div>
          {form.sizes.map((s, i) => (
            <div
              key={s.size}
              className="grid grid-cols-12 gap-2 items-center rounded-xl border border-pink-100 bg-white p-2 sm:p-2.5 shadow-sm"
            >
              <div className="col-span-3 font-bold text-gray-700 text-[11px] sm:text-xs truncate">
                {s.size}
              </div>
              <div className="col-span-4 relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0"
                  value={s.price}
                  onChange={(e) => setSizePrice(i, e.target.value)}
                  className="w-full pl-4 pr-1 py-1.5 border border-pink-200 rounded-lg text-center text-[11px] sm:text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
              <div className="col-span-5">
                <input
                  type="number"
                  min={0}
                  step={1}
                  placeholder="0"
                  value={s.stock}
                  onChange={(e) => setSizeStock(i, e.target.value)}
                  className="w-full px-2 py-1.5 border border-pink-200 rounded-lg text-center text-[11px] sm:text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Product Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: "hairType", label: "Hair Type", placeholder: "100% Virgin Brazilian Human Hair" },
            { key: "density", label: "Density", placeholder: "180% High Density" },
            { key: "capSize", label: "Cap Size", placeholder: 'Medium (Adjustable 22.5")' },
            { key: "laceType", label: "Lace Type", placeholder: "HD Invisible Swiss Lace" },
          ].map(({ key, label, placeholder }) => (
            <Field key={key} label={label}>
              <input
                type="text"
                placeholder={placeholder}
                value={form.details[key]}
                onChange={(e) => setDetail(key, e.target.value)}
                className={inputCls}
              />
            </Field>
          ))}
        </div>
      </Section>

      <Section title="Product Images">
        <ImageUploader
          files={form.images}
          onChange={(imgs) => setField("images", imgs)}
        />
      </Section>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-md transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {editingProduct ? "Updating…" : "Publishing…"}
            </>
          ) : editingProduct ? (
            "Update Product"
          ) : (
            "Save & Publish Product"
          )}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3.5 rounded-full border border-pink-200 text-gray-600 font-semibold text-xs hover:bg-pink-50 transition-all"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}
