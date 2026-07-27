"use client";

import { Sparkles, PlusCircle, Search } from "lucide-react";
import ToggleSwitch from "@/components/admin/common/ToggleSwitch";
import Field from "@/components/admin/common/Field";
import { inputCls, CATEGORIES } from "@/components/admin/common/constants";

export default function SaleManagerSection({
  saleList,
  saleForm,
  setSaleForm,
  onSubmit,
  editingSale,
  onCancel,
  submitting,
  searchTerm,
  onSearch,
  onEdit,
  onDelete,
  onToggleActive,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Sale Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4">
        <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-luxe-rose" />
          {editingSale ? "Edit Sale Campaign" : "Create Sale Campaign"}
        </h2>

        {editingSale && (
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl text-xs font-semibold text-blue-600">
            <Sparkles className="w-3.5 h-3.5" />
            Editing: <span className="font-bold">{editingSale.title}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4 text-xs">

          {/* Sale Title */}
          <Field label="Sale Title">
            <input
              type="text"
              value={saleForm.title}
              onChange={(e) => setSaleForm({ ...saleForm, title: e.target.value })}
              className={inputCls}
              placeholder="e.g. Summer Flash Sale"
              required
            />
          </Field>

          {/* Sale Type */}
          <Field label="Sale Type">
            <select
              value={saleForm.saleType}
              onChange={(e) => setSaleForm({ ...saleForm, saleType: e.target.value })}
              className={inputCls}
            >
              <option value="flash">Flash Sitewide Sale</option>
              <option value="category">Category-wise Sale</option>
            </select>
          </Field>

          {/* Category selector (only for category-wise) */}
          {saleForm.saleType === "category" && (
            <Field label="Target Category">
              <select
                value={saleForm.category}
                onChange={(e) => setSaleForm({ ...saleForm, category: e.target.value })}
                className={inputCls}
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </Field>
          )}

          {/* Promo Code */}
          <Field label="Promo Code">
            <input
              type="text"
              value={saleForm.promoCode}
              onChange={(e) => setSaleForm({ ...saleForm, promoCode: e.target.value.toUpperCase() })}
              className={inputCls + " uppercase"}
              placeholder="e.g. SUMMER20"
            />
          </Field>

          {/* Discount Percent */}
          <Field label="Discount (%)">
            <input
              type="number"
              min="0"
              max="100"
              value={saleForm.discountPercent}
              onChange={(e) =>
                setSaleForm({ ...saleForm, discountPercent: Math.min(100, Math.max(0, Number(e.target.value))) })
              }
              className={inputCls}
              required
            />
          </Field>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date">
              <input
                type="date"
                value={saleForm.startDate ? saleForm.startDate.split("T")[0] : ""}
                onChange={(e) =>
                  setSaleForm({ ...saleForm, startDate: e.target.value ? new Date(e.target.value).toISOString() : "" })
                }
                className={inputCls}
              />
            </Field>
            <Field label="End Date">
              <input
                type="date"
                value={saleForm.endDate ? saleForm.endDate.split("T")[0] : ""}
                onChange={(e) =>
                  setSaleForm({ ...saleForm, endDate: e.target.value ? new Date(e.target.value).toISOString() : "" })
                }
                className={inputCls}
              />
            </Field>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between p-4 bg-pink-50/60 rounded-2xl border border-pink-100">
            <div>
              <p className="font-bold text-gray-900 text-sm">Campaign Active</p>
              <p className="text-[11px] text-gray-500">Toggle sale across the site</p>
            </div>
            <ToggleSwitch
              checked={saleForm.active}
              onChange={(v) => setSaleForm({ ...saleForm, active: v })}
            />
          </div>

          {/* Show in Header Toggle */}
          <div className="flex items-center justify-between p-4 bg-pink-50/60 rounded-2xl border border-pink-100">
            <div>
              <p className="font-bold text-gray-900 text-sm">Show in Header Banner</p>
              <p className="text-[11px] text-gray-500">Display sale announcement in site header</p>
            </div>
            <ToggleSwitch
              checked={saleForm.showInHeader}
              onChange={(v) => setSaleForm({ ...saleForm, showInHeader: v })}
            />
          </div>

          {/* Banner Text */}
          <Field label="Banner Text (shown in header)">
            <textarea
              value={saleForm.bannerText}
              onChange={(e) => setSaleForm({ ...saleForm, bannerText: e.target.value })}
              className={inputCls + " min-h-[60px]"}
              placeholder="FREE SHIPPING ON ORDERS OVER $199"
              rows={2}
            />
          </Field>

          {/* Note Text */}
          <Field label="Note Text (shown in checkout)">
            <input
              type="text"
              value={saleForm.noteText}
              onChange={(e) => setSaleForm({ ...saleForm, noteText: e.target.value })}
              className={inputCls}
              placeholder="Extra 20% off sitewide"
            />
          </Field>

          {/* Button Text */}
          <Field label="Button Text (optional)">
            <input
              type="text"
              value={saleForm.buttonText}
              onChange={(e) => setSaleForm({ ...saleForm, buttonText: e.target.value })}
              className={inputCls}
              placeholder="Shop Now"
            />
          </Field>

          {/* Submit / Cancel */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-sm shadow-md transition-all disabled:opacity-60"
            >
              {submitting
                ? "Saving..."
                : editingSale
                ? "Update Sale Campaign"
                : "Create Sale Campaign"}
            </button>
            {editingSale && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3.5 rounded-full border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Sale List */}
      <div className="space-y-4">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-gray-900">All Campaigns</h3>
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sales..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-luxe-rose"
              />
            </div>
          </div>

          {saleList.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-8">
              No sale campaigns created yet. Create your first campaign.
            </p>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {saleList.map((sale) => (
                <div
                  key={sale.id}
                  className="p-4 rounded-2xl border border-pink-100 bg-white hover:shadow-sm transition-shadow space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className={`w-4 h-4 ${sale.active ? "text-luxe-rose" : "text-gray-300"}`} />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{sale.title}</p>
                        <p className="text-[10px] text-gray-400">
                          {sale.saleType === "flash" ? "Sitewide" : sale.category}
                          {" · "}
                          {sale.discountPercent}% OFF
                          {sale.promoCode && ` · Code: ${sale.promoCode}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleActive(sale.id, !sale.active)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          sale.active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {sale.active ? "Active" : "Inactive"}
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(sale)}
                        className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold hover:bg-blue-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(sale.id)}
                        className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {sale.bannerText && (
                    <p className="text-[11px] text-gray-500 line-clamp-1">{sale.bannerText}</p>
                  )}
                  <div className="flex gap-3 text-[10px] text-gray-400">
                    {sale.startDate && (
                      <span>From: {new Date(sale.startDate).toLocaleDateString()}</span>
                    )}
                    {sale.endDate && (
                      <span>To: {new Date(sale.endDate).toLocaleDateString()}</span>
                    )}
                    {sale.showInHeader && <span className="text-luxe-rose">Shown in header</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
