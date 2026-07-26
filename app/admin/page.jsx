"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import productService from "@/services/ProductService.js";
import bundleService from "@/services/BundleService.js";
import {
  ShieldCheck,
  PlusCircle,
  Sparkles,
  Package,
  Layers,
  Trash2,
  Edit,
  Tag,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  ImageIcon,
  ChevronDown,
  Minus,
  Plus,
  Search,
  Star,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Straight Wigs",
  "Wave Wigs",
  "Curly Wigs",
  "Colored Wigs",
  "HD Laces & Closures",
];

const SIZE_KEYS = ['12"', '16"', '20"', '24"'];

const EMPTY_FORM = {
  name: "",
  category: "Straight Wigs",
  shortDescription: "",
  fullDescription: "",
  originalPrice: "",
  price: "",
  isOnSale: false,
  discountPercent: 0,
  sizes: SIZE_KEYS.map((size) => ({ size, price: "" })),
  details: { hairType: "", density: "", capSize: "", laceType: "" },
  images: [],
};

const EMPTY_BUNDLE_FORM = {
  title: "",
  price: "",
  originalPrice: "",
  savings: "",
  imageFile: null,
  image: "",
  includes: [""],
  popular: false,
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function calcDiscountedPrice(originalPrice, discountPercent) {
  const orig = parseFloat(originalPrice);
  if (!orig || orig <= 0) return "";
  if (!discountPercent) return orig.toFixed(2);
  return (orig - (orig * discountPercent) / 100).toFixed(2);
}

// ─── Shared primitives ────────────────────────────────────────────────────────

/** Animated toggle switch */
function ToggleSwitch({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-luxe-rose focus-visible:ring-offset-1 ${
        checked ? "bg-luxe-rose" : "bg-gray-200"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/** Reusable labelled field wrapper */
function Field({ label, children, className = "" }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      {children}
    </div>
  );
}

/** Input styling */
const inputCls =
  "w-full px-3.5 py-2.5 border border-pink-200 rounded-xl bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-luxe-rose transition-shadow placeholder:text-gray-300";

/** Section card */
function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-pink-50/30 p-5 space-y-4">
      <p className="text-xs font-bold uppercase tracking-widest text-luxe-rose">
        {title}
      </p>
      {children}
    </div>
  );
}

// ─── Skeleton Loaders ─────────────────────────────────────────────────────────

function SkeletonBar({ className = "" }) {
  return (
    <div className={`animate-pulse bg-pink-100 rounded-xl ${className}`} />
  );
}

function ProductSkeleton() {
  return (
    <div className="divide-y divide-gray-100">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <SkeletonBar className="w-12 h-12 flex-shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
              <SkeletonBar className="h-3.5 w-3/4" />
              <SkeletonBar className="h-2.5 w-1/2" />
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <SkeletonBar className="w-8 h-8 rounded-lg" />
            <SkeletonBar className="w-8 h-8 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

function BundleSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 flex justify-between items-center"
        >
          <div className="flex items-center gap-3 flex-1">
            <SkeletonBar className="w-12 h-12 rounded-xl flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <SkeletonBar className="h-3.5 w-2/3" />
              <SkeletonBar className="h-2.5 w-1/3" />
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <SkeletonBar className="w-8 h-8 rounded-lg" />
            <SkeletonBar className="w-8 h-8 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Image Uploader (multi) ───────────────────────────────────────────────────

function ImageUploader({ files, onChange }) {
  const previews = files.map((f) =>
    f instanceof File ? URL.createObjectURL(f) : f?.downloadURL || f
  );

  const handlePick = (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    onChange([...files, ...picked]);
    e.target.value = "";
  };

  const remove = (idx) => {
    const next = [...files];
    next.splice(idx, 1);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <label className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-pink-200 rounded-xl py-6 cursor-pointer hover:border-luxe-rose hover:bg-pink-50 transition-colors">
        <Upload className="w-6 h-6 text-luxe-rose" />
        <span className="text-xs font-semibold text-gray-500">
          Click to upload product images
        </span>
        <span className="text-[10px] text-gray-400">
          PNG, JPG, WEBP — multiple allowed
        </span>
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handlePick}
        />
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {previews.map((src, i) => (
            <div
              key={i}
              className="relative group aspect-square rounded-xl overflow-hidden border border-pink-100 bg-pink-50"
            >
              {src ? (
                <Image
                  src={src}
                  alt={`preview-${i}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="w-5 h-5 text-gray-300" />
                </div>
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Single Image Uploader (for bundles) ─────────────────────────────────────

function SingleImageUploader({ file, existingUrl, onChange }) {
  const preview = file
    ? URL.createObjectURL(file)
    : existingUrl || null;

  const handlePick = (e) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    onChange(picked);
    e.target.value = "";
  };

  const remove = () => onChange(null);

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative group w-full aspect-video rounded-xl overflow-hidden border border-pink-100 bg-pink-50">
          <Image src={preview} alt="bundle preview" fill className="object-cover" />
          <button
            type="button"
            onClick={remove}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-pink-200 rounded-xl py-6 cursor-pointer hover:border-luxe-rose hover:bg-pink-50 transition-colors">
          <Upload className="w-6 h-6 text-luxe-rose" />
          <span className="text-xs font-semibold text-gray-500">
            Click to upload bundle image
          </span>
          <span className="text-[10px] text-gray-400">PNG, JPG, WEBP</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePick}
          />
        </label>
      )}
    </div>
  );
}

// ─── Discount Input ───────────────────────────────────────────────────────────

function DiscountInput({ value, onChange, disabled }) {
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

// ─── Includes Editor ──────────────────────────────────────────────────────────

function IncludesEditor({ items, onChange }) {
  const addItem = () => onChange([...items, ""]);

  const updateItem = (idx, value) => {
    const next = [...items];
    next[idx] = value;
    onChange(next);
  };

  const removeItem = (idx) => {
    if (items.length === 1) return; // keep at least one row
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

// ─── Product Form ─────────────────────────────────────────────────────────────

function ProductForm({ form, setForm, editingProduct, onSubmit, submitting, onCancel }) {
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

  return (
    <form onSubmit={onSubmit} className="space-y-5 text-xs">

      {/* ── 1. General Information ── */}
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

      {/* ── 2. Pricing ── */}
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

        {/* Toggle row */}
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

        {/* Discount controls */}
        <Field label="Discount Percentage">
          <DiscountInput
            value={form.discountPercent}
            onChange={(v) => setField("discountPercent", v)}
            disabled={!form.isOnSale}
          />
        </Field>

        {/* Discounted price — read-only */}
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

      {/* ── 3. Variant Pricing ── */}
      <Section title="Variant Pricing">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {form.sizes.map((s, i) => (
            <div
              key={s.size}
              className="rounded-xl border border-pink-100 bg-white p-3 space-y-2 text-center shadow-sm"
            >
              <p className="font-bold text-gray-700 text-[11px]">{s.size}</p>
              <div className="relative  ">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0"
                  value={s.price}
                  onChange={(e) => setSizePrice(i, e.target.value)}
                  className="w-full pl-6 pr-2 py-2 border border-pink-200 rounded-lg text-center text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 4. Product Details ── */}
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

      {/* ── 5. Images ── */}
      <Section title="Product Images">
        <ImageUploader
          files={form.images}
          onChange={(imgs) => setField("images", imgs)}
        />
      </Section>

      {/* Submit / Cancel */}
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

// ─── Bundle Form ──────────────────────────────────────────────────────────────

function BundleForm({ form, setForm, editingBundle, onSubmit, submitting, onCancel }) {
  const setField = useCallback(
    (key, value) => setForm((prev) => ({ ...prev, [key]: value })),
    [setForm]
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5 text-xs">

      {/* ── 1. Bundle Info ── */}
      <Section title="Bundle Information">
        <Field label="Bundle Title">
          <input
            required
            type="text"
            placeholder="e.g. 3 Bundles + HD Frontal Deal"
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Original Price ($)">
            <input
              required
              type="number"
              min={0}
              step={0.01}
              placeholder="420"
              value={form.originalPrice}
              onChange={(e) => setField("originalPrice", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Current Price ($)">
            <input
              required
              type="number"
              min={0}
              step={0.01}
              placeholder="320"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Savings Badge">
          <input
            type="text"
            placeholder="e.g. $100 OFF"
            value={form.savings}
            onChange={(e) => setField("savings", e.target.value)}
            className={inputCls}
          />
        </Field>
      </Section>

      {/* ── 2. Image ── */}
      <Section title="Bundle Image">
        <SingleImageUploader
          file={form.imageFile}
          existingUrl={form.image}
          onChange={(f) => setField("imageFile", f)}
        />
      </Section>

      {/* ── 3. Popular Toggle ── */}
      <Section title="Visibility">
        <div className="flex items-center justify-between py-1">
          <div>
            <p className="font-bold text-gray-700 text-[11px] uppercase tracking-wider">
              Mark as Popular
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Highlights this bundle as a featured deal
            </p>
          </div>
          <ToggleSwitch
            checked={form.popular}
            onChange={(v) => setField("popular", v)}
          />
        </div>
      </Section>

      {/* ── 4. Included Items ── */}
      <Section title="Included Items">
        <IncludesEditor
          items={form.includes}
          onChange={(arr) => setField("includes", arr)}
        />
      </Section>

      {/* Submit / Cancel */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-md transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {editingBundle ? "Updating…" : "Creating…"}
            </>
          ) : editingBundle ? (
            "Update Bundle"
          ) : (
            "Create Bundle Deal"
          )}
        </button>

        {editingBundle && (
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("products");

  // ── Products state ──
  const [productList, setProductList] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [productSubmitting, setProductSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [productSearchTerm, setProductSearchTerm] = useState("");

  // ── Bundles state ──
  const [bundleList, setBundleList] = useState([]);
  const [bundleLoading, setBundleLoading] = useState(true);
  const [bundleSubmitting, setBundleSubmitting] = useState(false);
  const [editingBundle, setEditingBundle] = useState(null);
  const [bundleForm, setBundleForm] = useState(EMPTY_BUNDLE_FORM);
  const [bundleSearchTerm, setBundleSearchTerm] = useState("");

  // ── Sale state (kept for the Launch Sales tab — UI only) ──
  const [saleForm, setSaleForm] = useState({
    bannerText: "FREE SHIPPING ON ORDERS OVER $199 ✨ USE CODE LUXE20 FOR EXTRA 20% OFF",
    discountPercent: 20,
    active: true,
  });

  // ── Notifications ──
  const [notification, setNotification] = useState(null); // { type: 'success'|'error', msg }
  const notifyTimerRef = useRef(null);

  const notify = useCallback((msg, type = "success") => {
    if (notifyTimerRef.current) clearTimeout(notifyTimerRef.current);
    setNotification({ msg, type });
    notifyTimerRef.current = setTimeout(() => setNotification(null), 3500);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // ── Data loaders ──
  // ─────────────────────────────────────────────────────────────────────────────

  const loadProducts = useCallback(async () => {
    try {
      setProductLoading(true);
      const products = await productService.getProducts();
      setProductList(products);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setProductLoading(false);
    }
  }, [notify]);

  const loadBundles = useCallback(async () => {
    try {
      setBundleLoading(true);
      const bundles = await bundleService.getBundles();
      setBundleList(bundles);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBundleLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    loadProducts();
    loadBundles();
  }, [loadProducts, loadBundles]);

  // ─────────────────────────────────────────────────────────────────────────────
  // ── Product handlers ──
  // ─────────────────────────────────────────────────────────────────────────────

  const resetProductForm = () => {
    setForm(EMPTY_FORM);
    setEditingProduct(null);
  };

  const buildProductObj = (f) => {
    const origPrice = parseFloat(f.originalPrice) || 0;
    const discPct = f.isOnSale ? f.discountPercent : 0;
    const salePrice = parseFloat(calcDiscountedPrice(origPrice, discPct)) || origPrice;

    return {
      name: f.name.trim(),
      category: f.category,
      shortDescription: f.shortDescription.trim(),
      fullDescription: f.fullDescription.trim(),
      originalPrice: origPrice,
      price: salePrice,
      discountPercent: discPct,
      isOnSale: f.isOnSale,
      sizes: f.sizes.map((s) => ({ size: s.size, price: parseFloat(s.price) || 0 })),
      details: { ...f.details },
      images: [],
      rating: 0,
      reviewsCount: 0,
    };
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setProductSubmitting(true);
    try {
      const productObj = buildProductObj(form);
      const created = await productService.createProduct(productObj);

      const newFiles = form.images.filter((f) => f instanceof File);
      if (newFiles.length && created?.id) {
        await productService.uploadProductImages(created.id, newFiles);
      }

      await loadProducts();
      notify(`"${form.name}" added to catalog!`);
      resetProductForm();
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setProductSubmitting(false);
    }
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || "",
      category: product.category || "Straight Wigs",
      shortDescription: product.shortDescription || "",
      fullDescription: product.fullDescription || product.description || "",
      originalPrice: product.originalPrice || "",
      price: product.price || "",
      isOnSale: product.isOnSale ?? false,
      discountPercent: product.discountPercent ?? 0,
      sizes: SIZE_KEYS.map((sz) => {
        const match = product.sizes?.find((s) => s.size === sz);
        return { size: sz, price: match?.price ?? "" };
      }),
      details: {
        hairType: product.details?.hairType || "",
        density: product.details?.density || "",
        capSize: product.details?.capSize || "",
        laceType: product.details?.laceType || "",
      },
      images: product.images || [],
    });
    document.getElementById("product-form-card")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setProductSubmitting(true);
    try {
      const productObj = buildProductObj(form);
      await productService.updateProduct(editingProduct.id, productObj);

      const newFiles = form.images.filter((f) => f instanceof File);
      if (newFiles.length) {
        await productService.uploadProductImages(editingProduct.id, newFiles);
      }

      await loadProducts();
      notify("Product updated successfully.");
      resetProductForm();
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setProductSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      await loadProducts();
      notify("Product removed from catalog.");
    } catch (err) {
      notify(err.message, "error");
    }
  };

  const handleProductSearch = async (term) => {
    setProductSearchTerm(term);
    try {
      setProductLoading(true);
      const results = await productService.searchProducts(term);
      setProductList(results);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setProductLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // ── Bundle handlers ──
  // ─────────────────────────────────────────────────────────────────────────────

  const resetBundleForm = () => {
    setBundleForm(EMPTY_BUNDLE_FORM);
    setEditingBundle(null);
  };

  const buildBundleObj = (f) => ({
    title: f.title.trim(),
    price: parseFloat(f.price) || 0,
    originalPrice: parseFloat(f.originalPrice) || 0,
    savings: f.savings.trim(),
    image: f.image || "",
    includes: f.includes.filter((item) => item.trim() !== ""),
    popular: f.popular,
  });

  const handleAddBundle = async (e) => {
    e.preventDefault();
    setBundleSubmitting(true);
    try {
      const bundleObj = buildBundleObj(bundleForm);
      const created = await bundleService.createBundle(bundleObj);

      // Upload image after doc is created so we have an ID
      if (bundleForm.imageFile && created?.id) {
        const downloadURL = await bundleService.uploadBundleImage(
          created.id,
          bundleForm.imageFile
        );
        await bundleService.updateBundle(created.id, { image: downloadURL });
      }

      await loadBundles();
      notify(`Bundle "${bundleForm.title}" created!`);
      resetBundleForm();
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBundleSubmitting(false);
    }
  };

  const handleEditBundleClick = (bundle) => {
    setEditingBundle(bundle);
    setBundleForm({
      title: bundle.title || "",
      price: bundle.price || "",
      originalPrice: bundle.originalPrice || "",
      savings: bundle.savings || "",
      imageFile: null,
      image: bundle.image || "",
      includes: bundle.includes?.length > 0 ? bundle.includes : [""],
      popular: bundle.popular ?? false,
    });
    document.getElementById("bundle-form-card")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdateBundle = async (e) => {
    e.preventDefault();
    setBundleSubmitting(true);
    try {
      const bundleObj = buildBundleObj(bundleForm);

      // Upload new image if a new file was selected
      if (bundleForm.imageFile) {
        const downloadURL = await bundleService.uploadBundleImage(
          editingBundle.id,
          bundleForm.imageFile
        );
        bundleObj.image = downloadURL;
      }

      await bundleService.updateBundle(editingBundle.id, bundleObj);
      await loadBundles();
      notify("Bundle updated successfully.");
      resetBundleForm();
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBundleSubmitting(false);
    }
  };

  const handleDeleteBundle = async (id) => {
    try {
      await bundleService.deleteBundle(id);
      await loadBundles();
      notify("Bundle removed.");
    } catch (err) {
      notify(err.message, "error");
    }
  };

  const handleBundleSearch = async (term) => {
    setBundleSearchTerm(term);
    try {
      setBundleLoading(true);
      const results = await bundleService.searchBundles(term);
      setBundleList(results);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBundleLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // ── Sale handler (UI only — future Firebase integration) ──
  // ─────────────────────────────────────────────────────────────────────────────

  const handleUpdateSale = (e) => {
    e.preventDefault();
    notify("Flash Sale campaign launched sitewide!");
  };

  // ── Tab button ──
  const TabBtn = ({ id, label }) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`pb-3 px-5 font-serif text-xl font-bold border-b-2 transition-all ${
        activeTab === id
          ? "border-luxe-rose text-luxe-rose text-2xl"
          : "border-transparent text-gray-400 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // ── Render ──
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">

      {/* Toast */}
      {notification && (
        <div
          className={`fixed top-24 right-4 sm:right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce max-w-xs ${
            notification.type === "error"
              ? "bg-red-600 text-white"
              : "bg-emerald-700 text-white"
          }`}
        >
          {notification.type === "error" ? (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-pink-100 pb-6 gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-36 h-10">
              <Image src="/images/logo.svg" alt="VERSATILE BY VERSHA'" width={140} height={40} className="object-contain" />
            </div>
            <span className="px-3 py-1 rounded-full bg-luxe-rose/10 text-luxe-rose text-xs font-bold border border-luxe-rose/20 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Management Dashboard
            </span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-gray-900 tracking-tight">
            VERSATILE BY VERSHA&apos;{" "}
            <span className="text-luxe-gold font-normal text-xl">| Store Management</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Logged in as: <strong className="text-gray-900 font-bold">{user?.email || "Admin"}</strong>
          </p>
        </div>
        <Link
          href="/shop"
          className="px-5 py-2.5 rounded-full border border-pink-200 text-xs font-bold text-gray-700 hover:bg-luxe-rose hover:text-white hover:border-luxe-rose transition-all shadow-xs whitespace-nowrap"
        >
          View Store Front →
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Sales", value: "$24,850", sub: "+18.4% this month", icon: <DollarSign className="w-5 h-5 text-emerald-500" />, valueClass: "text-gray-900" },
          { label: "Products", value: productList.length, sub: "Catalog Items", icon: <Package className="w-5 h-5 text-luxe-rose" />, valueClass: "text-gray-900" },
          { label: "Active Sale", value: saleForm.active ? `${saleForm.discountPercent}% OFF` : "OFF", sub: "Sitewide Flash", icon: <Tag className="w-5 h-5 text-luxe-gold" />, valueClass: "text-luxe-rose" },
          { label: "Bundle Deals", value: bundleList.length, sub: "Active Packages", icon: <Layers className="w-5 h-5 text-indigo-500" />, valueClass: "text-gray-900" },
        ].map(({ label, value, sub, icon, valueClass }) => (
          <div key={label} className="bg-white p-5 rounded-3xl shadow-sm border border-pink-100 space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
              {icon}
            </div>
            <p className={`font-serif text-2xl sm:text-3xl font-extrabold ${valueClass}`}>{value}</p>
            <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
              {label === "Total Sales" && <TrendingUp className="w-3 h-3 text-emerald-500" />}
              {sub}
            </span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 sm:space-x-4 border-b border-pink-100 overflow-x-auto">
        <TabBtn id="products" label="Product Manager" />
        <TabBtn id="sales" label="Launch Sales" />
        <TabBtn id="bundles" label="Create Bundles" />
      </div>

      {/* ══ TAB: PRODUCT MANAGER ══ */}
      {activeTab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Form ── */}
          <div
            id="product-form-card"
            className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4"
          >
            <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-luxe-rose flex-shrink-0" />
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            {editingProduct && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl text-xs font-semibold text-blue-600">
                <Edit className="w-3.5 h-3.5" />
                Editing: <span className="font-bold">{editingProduct.name}</span>
              </div>
            )}

            <ProductForm
              form={form}
              setForm={setForm}
              editingProduct={editingProduct}
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
              submitting={productSubmitting}
              onCancel={resetProductForm}
            />
          </div>

          {/* ── Catalog List ── */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Current Catalog ({productList.length})
              </h2>
              {/* Product Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products…"
                  value={productSearchTerm}
                  onChange={(e) => handleProductSearch(e.target.value)}
                  className="pl-8 pr-3.5 py-2 border border-pink-200 rounded-xl bg-white text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-luxe-rose transition-shadow placeholder:text-gray-300 w-44"
                />
              </div>
            </div>

            {productLoading ? (
              <ProductSkeleton />
            ) : productList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                <Package className="w-10 h-10" />
                <p className="text-sm font-medium">No products found.</p>
                <button
                  type="button"
                  onClick={() => document.getElementById("product-form-card")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-4 py-2 rounded-full bg-luxe-rose text-white text-xs font-bold hover:bg-luxe-rose-dark transition-all"
                >
                  + Add New Product
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto pr-1 -mr-1">
                {productList.map((p) => (
                  <div key={p.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pink-50 flex-shrink-0 border border-pink-100">
                        {p.image ? (
                          <Image src={p.image} alt={p.name} fill className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <ImageIcon className="w-5 h-5 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-serif text-sm font-bold text-gray-900 truncate">{p.name}</h3>
                        <p className="text-[11px] text-gray-500 font-medium truncate">
                          {p.category} —{" "}
                          <strong className="text-luxe-rose font-bold">${p.price}</strong>
                          {p.isOnSale && (
                            <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-luxe-rose/10 text-luxe-rose text-[9px] font-bold">
                              {p.discountPercent}% OFF
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEditProductClick(p)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ TAB: LAUNCH SALES ══ */}
      {activeTab === "sales" && (
        <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-luxe-rose" />
            Launch Sitewide Flash Sale
          </h2>

          <form onSubmit={handleUpdateSale} className="space-y-4 text-xs">
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
      )}

      {/* ══ TAB: CREATE BUNDLES ══ */}
      {activeTab === "bundles" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── Bundle Form ── */}
          <div
            id="bundle-form-card"
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4"
          >
            <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-luxe-gold flex-shrink-0" />
              {editingBundle ? "Edit Bundle" : "Create Bundle Package"}
            </h2>

            {editingBundle && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl text-xs font-semibold text-blue-600">
                <Edit className="w-3.5 h-3.5" />
                Editing: <span className="font-bold">{editingBundle.title}</span>
              </div>
            )}

            <BundleForm
              form={bundleForm}
              setForm={setBundleForm}
              editingBundle={editingBundle}
              onSubmit={editingBundle ? handleUpdateBundle : handleAddBundle}
              submitting={bundleSubmitting}
              onCancel={resetBundleForm}
            />
          </div>

          {/* ── Bundle List ── */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Active Bundles ({bundleList.length})
              </h2>
              {/* Bundle Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bundles…"
                  value={bundleSearchTerm}
                  onChange={(e) => handleBundleSearch(e.target.value)}
                  className="pl-8 pr-3.5 py-2 border border-pink-200 rounded-xl bg-white text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-luxe-rose transition-shadow placeholder:text-gray-300 w-44"
                />
              </div>
            </div>

            {bundleLoading ? (
              <BundleSkeleton />
            ) : bundleList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                <Layers className="w-10 h-10" />
                <p className="text-sm font-medium">No bundles found.</p>
                <button
                  type="button"
                  onClick={() => document.getElementById("bundle-form-card")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-4 py-2 rounded-full bg-luxe-rose text-white text-xs font-bold hover:bg-luxe-rose-dark transition-all"
                >
                  + Create Bundle
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1 -mr-1">
                {bundleList.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 flex items-center gap-3"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pink-100 flex-shrink-0 border border-pink-200">
                      {b.image ? (
                        <Image src={b.image} alt={b.title} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="w-5 h-5 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-sm font-bold text-gray-900 truncate">
                          {b.title}
                        </h3>
                        {b.popular && (
                          <span className="flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-luxe-gold/10 text-luxe-gold border border-luxe-gold/20 flex-shrink-0">
                            <Star className="w-2.5 h-2.5" />
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-luxe-rose font-semibold">
                        ${b.price}
                        {b.savings && (
                          <span className="ml-1.5 text-gray-500 font-medium">· Save {b.savings}</span>
                        )}
                      </p>
                      {b.includes?.length > 0 && (
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate">
                          {b.includes.join(" · ")}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEditBundleClick(b)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit bundle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBundle(b.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete bundle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
