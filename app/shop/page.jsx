"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/shop/ProductCard";
import BundleCard from "@/components/shop/BundleCard";
import { ProductGridShimmer } from "@/components/common/LoadingShimmer";
import { SlidersHorizontal, X } from "lucide-react";
import productService from "@/services/ProductService";
import bundleService from "@/services/BundleService";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLengths, setSelectedLengths] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam === "bundles") {
      setViewMode("bundles");
    } else if (["Straight Wigs", "Wave Wigs", "Curly Wigs", "Colored Wigs", "HD Laces & Closures"].includes(categoryParam)) {
      setSelectedCategory(categoryParam);
      setViewMode("all");
    } else {
      setViewMode("all");
      setSelectedCategory("All");
    }
  }, [searchParams]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, bundlesData] = await Promise.all([
          productService.getProducts(),
          bundleService.getBundles(),
        ]);
        setProducts(productsData);
        setBundles(bundlesData);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const categories = ["All", "Straight Wigs", "Wave Wigs", "Curly Wigs", "Colored Wigs", "HD Laces & Closures"];
  const lengths = ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"'];

  const toggleLength = (lengthVal) => {
    setSelectedLengths((prev) =>
      prev.includes(lengthVal)
        ? prev.filter((l) => l !== lengthVal)
        : [...prev, lengthVal]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (p.price > maxPrice) return false;
      if (selectedLengths.length > 0) {
        const hasLength = p.sizes?.some((s) => selectedLengths.includes(s.size));
        if (!hasLength) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [products, maxPrice, selectedCategory, selectedLengths, sortBy]);

  const resetFilters = () => {
    setMaxPrice(500);
    setSelectedCategory("All");
    setSelectedLengths([]);
  };

  const activeFilterCount = (selectedCategory !== "All" ? 1 : 0) + selectedLengths.length + (maxPrice < 500 ? 1 : 0);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    if (isDrawerOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <div className="py-10 space-y-12">

      {/* Header Banner */}
      <section className="bg-linear-to-r from-luxe-rose-light via-pink-100 to-amber-50 py-12 text-center border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest">
            VERSATILE BY VERSHA' — ONE WOMAN. EVERY LOOK.
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-gray-900">
            Shop Luxury Wigs & Bundles
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Find your perfect length, density, and HD lace texture designed for flawless confidence.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {viewMode === "bundles" ? (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest">BUNDLE DEALS</span>
              <h2 className="font-serif text-4xl font-bold text-gray-900">Package Bundle Deals</h2>
              <p className="text-gray-600 text-sm">Save more when you bundle your favorite styles together</p>
            </div>
            {loading ? (
              <ProductGridShimmer count={4} />
            ) : bundles.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 space-y-4">
                <p className="text-lg font-serif text-gray-600">No bundle deals available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {bundles.map((b) => (
                  <BundleCard key={b.id} bundle={b} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl shadow-xs border border-pink-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-luxe-rose text-white text-xs font-semibold hover:bg-luxe-rose-dark transition-all shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <span className="text-xs text-gray-500 font-medium order-last sm:order-none w-full sm:w-auto text-center sm:text-left">
                Showing <strong className="text-gray-900">{filteredProducts.length}</strong> Products
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 hidden sm:inline">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-luxe-rose/10 text-luxe-rose text-[11px] font-semibold rounded-full border border-luxe-rose/20">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("All")} className="hover:bg-luxe-rose/20 rounded-full p-0.5 transition-colors" aria-label="Remove category filter">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedLengths.map((len) => (
                  <span key={len} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-luxe-rose/10 text-luxe-rose text-[11px] font-semibold rounded-full border border-luxe-rose/20">
                    {len}
                    <button onClick={() => toggleLength(len)} className="hover:bg-luxe-rose/20 rounded-full p-0.5 transition-colors" aria-label="Remove length filter">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {maxPrice < 500 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-luxe-rose/10 text-luxe-rose text-[11px] font-semibold rounded-full border border-luxe-rose/20">
                    &lt;${maxPrice}
                    <button onClick={() => setMaxPrice(500)} className="hover:bg-luxe-rose/20 rounded-full p-0.5 transition-colors" aria-label="Remove price filter">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-gray-400 font-semibold hover:text-luxe-rose transition-colors underline underline-offset-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <ProductGridShimmer count={6} />
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 space-y-4">
                <p className="text-lg font-serif text-gray-600">No wigs found matching your filter criteria.</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-luxe-rose text-white text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* HD Lace Spotlight */}
            <div className="pt-10 space-y-6">
              <div className="bg-linear-to-r from-luxe-rose-light via-pink-100 to-amber-50 p-6 sm:p-8 rounded-3xl border border-pink-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-pink-200">
                    REAL INVISIBLE MELT LACE
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-gray-900">HD Swiss Frontals & Closures Collection</h2>
                  <p className="text-xs text-gray-600 max-w-lg">
                    Feather-light 13x4, 13x6, and 5x5 HD Swiss Laces that disappear effortlessly on all skin tones with zero white cast.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCategory("HD Laces & Closures")}
                  className="px-6 py-3 rounded-full bg-luxe-rose text-white text-xs font-bold hover:bg-luxe-rose-dark shadow-md shrink-0"
                >
                  View All HD Laces ({products.filter((p) => p.category === "HD Laces & Closures").length})
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((p) => p.category === "HD Laces & Closures")
                  .map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
              </div>
            </div>

            {/* Bundles Section */}
            {bundles.length > 0 && (
              <div className="pt-10 space-y-6">
                <h2 className="font-serif text-3xl font-bold text-gray-900">Package Bundle Deals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bundles.map((b) => (
                    <BundleCard key={b.id} bundle={b} />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Filter Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div
            ref={drawerRef}
            className="absolute left-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl overflow-y-auto animate-slide-in"
            role="dialog"
            aria-modal="true"
            aria-label="Filter products"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-serif text-2xl font-bold text-gray-900">Filters</h3>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-luxe-rose font-semibold hover:underline transition-colors"
                  >
                    Reset All
                  </button>
                )}
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Category - Pills */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        selectedCategory === cat
                          ? "bg-luxe-rose text-white shadow-xs"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-luxe-rose hover:text-luxe-rose hover:-translate-y-0.5"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price - Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Maximum Price</span>
                  <span className="text-luxe-rose font-serif font-bold text-xl">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="500"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-luxe-rose cursor-pointer h-2 rounded-full appearance-none bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-luxe-rose [&::-webkit-slider-thumb]:shadow-md"
                />
              </div>

              {/* Length - Chips */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hair Length</h4>
                <div className="flex flex-wrap gap-2">
                  {lengths.map((len) => {
                    const active = selectedLengths.includes(len);
                    return (
                      <button
                        key={len}
                        onClick={() => toggleLength(len)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                          active
                            ? "bg-luxe-rose text-white shadow-xs"
                            : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-luxe-rose hover:text-luxe-rose hover:-translate-y-0.5"
                        }`}
                      >
                        {len}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 space-y-3">
              <p className="text-xs text-gray-400 font-medium text-center">
                {activeFilterCount} {activeFilterCount === 1 ? "Filter" : "Filters"} Applied
              </p>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-3 rounded-full bg-luxe-rose text-white text-xs font-bold hover:bg-luxe-rose-dark transition-all shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile FAB */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="sm:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-luxe-rose text-white shadow-lg hover:shadow-xl hover:bg-luxe-rose-dark transition-all flex flex-col items-center justify-center gap-0.5"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span className="text-[9px] font-bold leading-none">Filter</span>
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-luxe-rose text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
            {activeFilterCount}
          </span>
        )}
      </button>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}