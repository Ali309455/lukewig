"use client";

import SearchResultCard from "./SearchResultCard";

export default function SearchDropdown({ results, term, focusedIndex, onSelect }) {
  let globalIndex = -1;

  return (
    <div>
      {results.products.length > 0 && (
        <div>
          <p className="px-4 pt-2 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Products
          </p>
          {results.products.map((product) => {
            globalIndex++;
            const currentIndex = globalIndex;
            return (
              <SearchResultCard
                key={`p-${product.id}`}
                item={{ ...product, itemType: 'product', name: product.name }}
                term={term}
                isFocused={focusedIndex === currentIndex}
                onSelect={() => onSelect({ ...product, itemType: 'product' })}
              />
            );
          })}
        </div>
      )}

      {results.bundles.length > 0 && (
        <div>
          <p className="px-4 pt-3 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Bundle Deals
          </p>
          {results.bundles.map((bundle) => {
            globalIndex++;
            const currentIndex = globalIndex;
            return (
              <SearchResultCard
                key={`b-${bundle.id}`}
                item={{
                  ...bundle,
                  itemType: 'bundle',
                  name: bundle.title,
                  category: 'Bundle Deal',
                  image: bundle.image,
                  price: bundle.price,
                  rating: 0
                }}
                term={term}
                isFocused={focusedIndex === currentIndex}
                onSelect={() => onSelect({ ...bundle, itemType: 'bundle' })}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
