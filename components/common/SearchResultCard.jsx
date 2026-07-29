"use client";

import Image from "next/image";
import { getHighlightedSegments } from "@/utils/searchProducts";

export default function SearchResultCard({ item, term, isFocused, onSelect }) {
  const image = item.image || item.images?.[0]?.downloadURL || '';
  const name = item.name || item.title || '';
  const category = item.category || '';
  const price = item.price || 0;
  const rating = item.rating || item.averageRating || 0;

  const nameSegments = getHighlightedSegments(name, term);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
        isFocused ? 'bg-pink-100' : 'hover:bg-pink-50'
      }`}
      role="option"
      aria-selected={isFocused}
    >
      <div className="w-14 h-14 rounded-lg overflow-hidden bg-pink-50 shrink-0 flex items-center justify-center border border-pink-100">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={56}
            height={56}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-[10px] text-gray-400 font-medium">No img</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {nameSegments.map((seg, i) =>
            seg.highlight ? (
              <span key={i} className="text-luxe-rose font-bold">{seg.text}</span>
            ) : (
              <span key={i}>{seg.text}</span>
            )
          )}
        </p>
        <p className="text-xs text-gray-500 truncate">{category || 'Product'}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-gray-900 font-serif">${price}</p>
        {rating > 0 && (
          <p className="text-xs text-amber-500 flex items-center gap-0.5 justify-end">
            <span>★</span>
            <span>{Number(rating).toFixed(1)}</span>
          </p>
        )}
      </div>
    </button>
  );
}
