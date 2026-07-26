"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Package } from "lucide-react";
import productService from "@/services/ProductService";

export default function RestockModal({ product, onClose, onRestocked }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0].size);
      setQuantity(product.sizes[0].stock ?? 0);
    }
  }, [product]);

  const handleSizeChange = useCallback(
    (size) => {
      setSelectedSize(size);
      const variant = product?.sizes?.find((s) => s.size === size);
      setQuantity(variant?.stock ?? 0);
      setError("");
    },
    [product]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedSize) {
      setError("Please select a size variant.");
      return;
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 0) {
      setError("Please enter a valid non-negative stock quantity.");
      return;
    }

    setIsSubmitting(true);
    try {
      await productService.updateVariantStock(product.id, selectedSize, qty);
      onRestocked?.(product.id, selectedSize, qty);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update stock.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentVariant = product?.sizes?.find((s) => s.size === selectedSize);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between p-5 border-b border-pink-100">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-luxe-rose" />
            <h2 className="font-serif text-xl font-bold text-gray-900">
              Restock Inventory
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <p className="text-xs text-gray-500 font-medium">
            Product: <strong className="text-gray-800">{product.name}</strong>
          </p>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Select Size Variant
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((s) => {
                const isSelected = selectedSize === s.size;
                return (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => handleSizeChange(s.size)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? "bg-luxe-rose text-white border-luxe-rose shadow-sm"
                        : "bg-white text-gray-700 border-pink-200 hover:border-luxe-rose"
                    }`}
                  >
                    {s.size}
                    <span className="ml-1.5 text-[10px] font-normal opacity-70">
                      (current: {s.stock ?? 0})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {currentVariant && (
            <div className="rounded-xl bg-pink-50/50 border border-pink-100 p-3 text-xs text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span className="font-medium">Current stock:</span>
                <span className="font-bold text-gray-800">{currentVariant.stock ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span className="font-bold text-luxe-rose">${currentVariant.price}</span>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
              New Stock Quantity
            </label>
            <input
              type="number"
              min={0}
              step={1}
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-pink-200 rounded-xl bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-luxe-rose transition-shadow"
              placeholder="Enter stock quantity"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-pink-200 text-gray-600 font-semibold text-xs hover:bg-pink-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-md transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                "Confirm Restock"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
