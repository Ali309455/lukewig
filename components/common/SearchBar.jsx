"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { useThrottledSearch } from "@/hooks/useThrottledSearch";
import SearchDropdown from "./SearchDropdown";
import productService from "@/services/ProductService";
import bundleService from "@/services/BundleService";

const TRENDING = ["HD Lace", "Bundles", "Glueless Wig", "Body Wave"];
const MAX_RECENT = 5;
const STORAGE_KEY = "versatile_recent_searches";

function loadRecentSearches() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentSearches(searches) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
  } catch {}
}

export default function SearchBar({ onClose }) {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);
  const [allBundles, setAllBundles] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { query, setQuery, results, isSearching, clearSearch } = useThrottledSearch(
    allProducts,
    allBundles,
    300
  );

  useEffect(() => {
    const loadData = async () => {
      setDataLoading(true);
      try {
        const [products, bundles] = await Promise.all([
          productService.getProducts(),
          bundleService.getBundles(),
        ]);
        setAllProducts(products);
        setAllBundles(bundles);
      } catch (err) {
        console.error("Search data load failed:", err);
      } finally {
        setDataLoading(false);
      }
    };
    loadData();
    setRecentSearches(loadRecentSearches());
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [results]);

  const allResults = useMemo(() => {
    const items = [];
    for (const p of results.products) {
      items.push({ ...p, itemType: 'product', name: p.name });
    }
    for (const b of results.bundles) {
      items.push({ ...b, name: b.title, itemType: 'bundle' });
    }
    return items;
  }, [results]);

  const totalResults = allResults.length;

  const handleInputChange = useCallback((e) => {
    setQuery(e.target.value);
    setFocusedIndex(-1);
  }, [setQuery]);

  const handleClear = useCallback(() => {
    clearSearch();
    inputRef.current?.focus();
  }, [clearSearch]);

  const handleSelect = useCallback((item) => {
    const term = query.trim();
    if (term) {
      const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, MAX_RECENT);
      setRecentSearches(updated);
      saveRecentSearches(updated);
    }
    if (item.itemType === 'bundle') {
      router.push('/shop?category=bundles');
    } else {
      router.push(`/product/${item.id}`);
    }
    onClose();
  }, [query, recentSearches, router, onClose]);

  const handleRecentClick = useCallback((term) => {
    setQuery(term);
    setFocusedIndex(-1);
  }, [setQuery]);

  const handleClearHistory = useCallback(() => {
    setRecentSearches([]);
    saveRecentSearches([]);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (totalResults === 0) return;
      setFocusedIndex(prev => (prev < totalResults - 1 ? prev + 1 : 0));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (totalResults === 0) return;
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : totalResults - 1));
      return;
    }

    if (e.key === 'Enter' && focusedIndex >= 0 && focusedIndex < totalResults) {
      e.preventDefault();
      handleSelect(allResults[focusedIndex]);
    }
  }, [totalResults, focusedIndex, allResults, handleSelect, onClose]);

  const hasQuery = !!query.trim();
  const noResults = hasQuery && !isSearching && totalResults === 0;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative animate-fade-in border border-pink-100 overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-luxe-rose"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-6 pt-8 pb-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search wigs, bundles, HD lace..."
              className="w-full pl-12 pr-12 py-4 bg-pink-50/50 border-2 border-pink-100 rounded-full focus:outline-hidden focus:border-luxe-rose focus:bg-white text-sm text-gray-800 placeholder-gray-400 transition-all"
              aria-label="Search products"
              aria-expanded={hasQuery || !dataLoading}
              aria-controls="search-dropdown"
              role="combobox"
              aria-autocomplete="list"
              autoComplete="off"
            />
            {isSearching && (
              <div className="absolute right-14 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-luxe-rose border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {hasQuery && !isSearching && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div
          id="search-dropdown"
          className="max-h-96 overflow-y-auto overscroll-contain px-2 pb-4"
          ref={dropdownRef}
          role="listbox"
        >
          {dataLoading && (
            <div className="px-4 py-6 text-center">
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-luxe-rose/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-luxe-rose/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-luxe-rose rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-xs text-gray-400 mt-2">Loading products...</p>
            </div>
          )}

          {!dataLoading && hasQuery && !isSearching && totalResults > 0 && (
            <SearchDropdown
              results={results}
              term={query.trim()}
              focusedIndex={focusedIndex}
              onSelect={handleSelect}
            />
          )}

          {!dataLoading && noResults && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm font-semibold text-gray-900">No products found</p>
              <p className="text-xs text-gray-500 mt-2">Try searching for:</p>
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {["Body Wave", "Straight Wig", "Bundles", "HD Lace"].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleRecentClick(suggestion)}
                    className="px-3 py-1.5 bg-pink-50 text-luxe-rose text-xs font-medium rounded-full hover:bg-luxe-rose hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!dataLoading && !hasQuery && (
            <>
              {recentSearches.length > 0 && (
                <div className="px-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Recent Searches
                    </p>
                    <button
                      type="button"
                      onClick={handleClearHistory}
                      className="text-[11px] text-gray-400 hover:text-luxe-rose transition-colors font-medium"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleRecentClick(term)}
                        className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-full hover:bg-pink-50 hover:text-luxe-rose transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="px-4 py-2 pb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Trending
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleRecentClick(term)}
                      className="px-3 py-1.5 bg-gradient-to-r from-pink-50 to-amber-50 text-luxe-rose text-xs font-medium rounded-full hover:from-luxe-rose hover:to-luxe-rose-dark hover:text-white transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
