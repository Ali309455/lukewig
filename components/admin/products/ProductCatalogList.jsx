"use client";

import Image from "next/image";
import { Package, Edit, Trash2, ImageIcon, Search } from "lucide-react";
import productService from "@/services/ProductService";
import { SIZE_KEYS } from "@/components/admin/common/constants";

export default function ProductCatalogList({
  products,
  loading,
  searchTerm,
  onSearch,
  onEdit,
  onDelete,
  onRestock,
  notify,
}) {
  return (
    <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="font-serif text-2xl font-bold text-gray-900">
          Current Catalog ({products.length})
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products…"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8 pr-3.5 py-2 border border-pink-200 rounded-xl bg-white text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-luxe-rose transition-shadow placeholder:text-gray-300 w-44"
          />
        </div>
      </div>

      {loading ? (
        <ProductListSkeleton />
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
          <Package className="w-10 h-10" />
          <p className="text-sm font-medium">No products found.</p>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("product-form-card")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-4 py-2 rounded-full bg-luxe-rose text-white text-xs font-bold hover:bg-luxe-rose-dark transition-all"
          >
            + Add New Product
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto pr-1 -mr-1">
          {products.map((p) => (
            <div
              key={p.id}
              className="py-3.5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pink-50 flex-shrink-0 border border-pink-100">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-sm font-bold text-gray-900 truncate">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium truncate">
                    {p.category} —{" "}
                    <strong className="text-luxe-rose font-bold">
                      ${p.price}
                    </strong>
                    {p.isOnSale && (
                      <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-luxe-rose/10 text-luxe-rose text-[9px] font-bold">
                        {p.discountPercent}% OFF
                      </span>
                    )}
                  </p>
                  {p.sizes?.length > 0 && (
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      {p.sizes.map((s) => {
                        const stock = s.stock ?? 0;
                        return (
                          <span
                            key={s.size}
                            className="text-[9px] px-1.5 py-0.5 rounded-md bg-gray-50 border border-gray-100"
                          >
                            <span className="text-gray-500">{s.size}</span>{" "}
                            <strong className="text-gray-700">
                              ${s.price || 0}
                            </strong>{" "}
                            <span
                              className={`font-semibold ${
                                stock < 10 ? "text-red-500" : "text-gray-500"
                              }`}
                            >
                              · {stock}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => onRestock(p)}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Restock by size"
                >
                  <Package className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(p)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(p.id)}
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
  );
}

function ProductListSkeleton() {
  return (
    <div className="divide-y divide-gray-100">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="py-3.5 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-pink-100 animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-3/4 bg-pink-100 rounded animate-pulse" />
              <div className="h-2.5 w-1/2 bg-pink-100 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-pink-100 animate-pulse" />
            <div className="w-8 h-8 rounded-lg bg-pink-100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
