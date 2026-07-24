"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/shop/ProductCard";
import BundleCard from "@/components/shop/BundleCard";
import { ProductGridShimmer } from "@/components/common/LoadingShimmer";
import { INITIAL_PRODUCTS, INITIAL_BUNDLES } from "@/lib/mockData";
import { SlidersHorizontal, RefreshCw } from "lucide-react";

export default function ShopPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLengths, setSelectedLengths] = useState([]);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(INITIAL_PRODUCTS);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
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
      // Category filter
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      // Price filter
      if (p.price > maxPrice) return false;
      // Length filter
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

  return (
    <div className="py-10 space-y-12">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-luxe-rose-light via-pink-100 to-amber-50 py-12 text-center border-b border-pink-100">
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

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filter Box */}
          <aside className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 space-y-6 h-fit">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-luxe-rose" />
                <span>Filters</span>
              </h3>
              <button
                onClick={() => {
                  setMaxPrice(500);
                  setSelectedCategory("All");
                  setSelectedLengths([]);
                }}
                className="text-xs text-luxe-rose font-semibold hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</h4>
              <div className="flex flex-col space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-sm py-1.5 px-3 rounded-xl font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-luxe-rose text-white font-semibold shadow-sm"
                        : "text-gray-600 hover:bg-pink-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Max Price</span>
                <span className="text-luxe-rose font-serif font-bold text-lg">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-luxe-rose cursor-pointer"
              />
            </div>

            {/* Length Filter Checkboxes */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hair Length</h4>
              <div className="grid grid-cols-3 gap-2">
                {lengths.map((len) => {
                  const active = selectedLengths.includes(len);
                  return (
                    <button
                      key={len}
                      onClick={() => toggleLength(len)}
                      className={`text-xs py-1.5 rounded-lg border font-semibold transition-all ${
                        active
                          ? "bg-luxe-rose text-white border-luxe-rose"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:border-luxe-rose"
                      }`}
                    >
                      {len}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulate Loading State Button */}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 800);
                }}
                className="w-full py-2.5 rounded-xl border border-pink-200 text-xs font-semibold text-gray-600 hover:bg-pink-50 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Simulate Loading Shimmer</span>
              </button>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Sorting & Result Count Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-500 font-medium">
                Showing <strong className="text-gray-900">{filteredProducts.length}</strong> Products
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <ProductGridShimmer count={6} />
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 space-y-4">
                <p className="text-lg font-serif text-gray-600">No wigs found matching your filter criteria.</p>
                <button
                  onClick={() => {
                    setMaxPrice(500);
                    setSelectedCategory("All");
                    setSelectedLengths([]);
                  }}
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

            {/* Dedicated HD Lace & Frontals Spotlight Section */}
            <div className="pt-10 space-y-6">
              <div className="bg-gradient-to-r from-luxe-rose-light via-pink-100 to-amber-50 p-6 sm:p-8 rounded-3xl border border-pink-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
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
                  className="px-6 py-3 rounded-full bg-luxe-rose text-white text-xs font-bold hover:bg-luxe-rose-dark shadow-md flex-shrink-0"
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

            {/* Bundles Section in Shop */}
            <div className="pt-10 space-y-6">
              <h2 className="font-serif text-3xl font-bold text-gray-900">Package Bundle Deals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INITIAL_BUNDLES.map((b) => (
                  <BundleCard key={b.id} bundle={b} />
                ))}
              </div>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
