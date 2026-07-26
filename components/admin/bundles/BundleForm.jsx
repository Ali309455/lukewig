"use client";

import { useCallback } from "react";
import { inputCls } from "@/components/admin/common/constants";
import Field from "@/components/admin/common/Field";
import Section from "@/components/admin/common/Section";
import ToggleSwitch from "@/components/admin/common/ToggleSwitch";
import SingleImageUploader from "@/components/admin/common/SingleImageUploader";
import IncludesEditor from "@/components/admin/common/IncludesEditor";

export default function BundleForm({ form, setForm, editingBundle, onSubmit, submitting, onCancel }) {
  const setField = useCallback(
    (key, value) => setForm((prev) => ({ ...prev, [key]: value })),
    [setForm]
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5 text-xs">
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

      <Section title="Bundle Image">
        <SingleImageUploader
          file={form.imageFile}
          existingUrl={form.image}
          onChange={(f) => setField("imageFile", f)}
        />
      </Section>

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

      <Section title="Included Items">
        <IncludesEditor
          items={form.includes}
          onChange={(arr) => setField("includes", arr)}
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
