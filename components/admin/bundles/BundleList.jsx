"use client";

import Image from "next/image";
import { Layers, Edit, Trash2, ImageIcon, Search, Star } from "lucide-react";

export default function BundleList({
  bundles,
  loading,
  searchTerm,
  onSearch,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-pink-100 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="font-serif text-2xl font-bold text-gray-900">
          Active Bundles ({bundles.length})
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search bundles…"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8 pr-3.5 py-2 border border-pink-200 rounded-xl bg-white text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-luxe-rose transition-shadow placeholder:text-gray-300 w-44"
          />
        </div>
      </div>

      {loading ? (
        <BundleListSkeleton />
      ) : bundles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
          <Layers className="w-10 h-10" />
          <p className="text-sm font-medium">No bundles found.</p>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("bundle-form-card")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-4 py-2 rounded-full bg-luxe-rose text-white text-xs font-bold hover:bg-luxe-rose-dark transition-all"
          >
            + Create Bundle
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1 -mr-1">
          {bundles.map((b) => (
            <div
              key={b.id}
              className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 flex items-center gap-3"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pink-100 shrink-0 border border-pink-200">
                {b.image ? (
                  <Image src={b.image} alt={b.title} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif text-sm font-bold text-gray-900 truncate">
                    {b.title}
                  </h3>
                  {b.popular && (
                    <span className="flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-luxe-gold/10 text-luxe-gold border border-luxe-gold/20 shrink-0">
                      <Star className="w-2.5 h-2.5" />
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-luxe-rose font-semibold">
                  ${b.price}
                  {b.savings && (
                    <span className="ml-1.5 text-gray-500 font-medium">
                      · Save {b.savings}
                    </span>
                  )}
                </p>
                {b.includes?.length > 0 && (
                  <p className="text-[10px] text-gray-400 mt-0.5 truncate">
                    {b.includes.join(" · ")}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onEdit(b)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit bundle"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(b.id)}
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
  );
}

function BundleListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 flex justify-between items-center"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl bg-pink-100 animate-pulse shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3.5 w-2/3 bg-pink-100 rounded-sm animate-pulse" />
              <div className="h-2.5 w-1/3 bg-pink-100 rounded-sm animate-pulse" />
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <div className="w-8 h-8 rounded-lg bg-pink-100 animate-pulse" />
            <div className="w-8 h-8 rounded-lg bg-pink-100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
