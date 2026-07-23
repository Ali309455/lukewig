"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingBag, Eye, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const currentVariant = product.sizes ? product.sizes[selectedSizeIndex] : { size: '20"', price: product.price, image: product.image };

  return (
    <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-100/80 flex flex-col justify-between relative overflow-hidden">
      
      {/* Sale / Discount Badge */}
      {product.isOnSale && (
        <span className="absolute top-6 left-6 z-10 bg-luxe-rose text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase">
          {product.discountPercent}% OFF
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-luxe-rose hover:bg-white transition-all shadow-sm"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-luxe-rose text-luxe-rose" : ""}`} />
      </button>

      {/* Product Image */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden bg-pink-50/50 mb-4 group">
        <Image
          src={currentVariant.image || product.image}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/product/${product.id}`}
            className="px-4 py-2 bg-white text-luxe-dark text-xs font-semibold rounded-full shadow-lg flex items-center gap-1.5 hover:bg-luxe-rose hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </Link>
        </div>
      </div>

      {/* Category & Title */}
      <div>
        <span className="text-[11px] font-semibold text-luxe-rose uppercase tracking-widest block mb-1">
          {product.category}
        </span>
        <Link href={`/product/${product.id}`} className="hover:text-luxe-rose transition-colors">
          <h3 className="font-serif text-xl font-bold text-gray-900 leading-snug line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1 mt-1.5 mb-3">
          <div className="flex text-amber-400 text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[11px] text-gray-500 font-medium">
            ({product.reviewsCount || 128})
          </span>
        </div>

        {/* Variant Size Pills */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-[11px] text-gray-400 font-medium mr-1">Length:</span>
            {product.sizes.map((s, idx) => (
              <button
                key={s.size}
                onClick={() => setSelectedSizeIndex(idx)}
                className={`text-[11px] px-2 py-0.5 rounded-md font-semibold border transition-all ${
                  selectedSizeIndex === idx
                    ? "bg-luxe-rose text-white border-luxe-rose shadow-sm"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-luxe-rose"
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price & Add to Cart */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <span className="font-serif text-2xl font-bold text-gray-900">
            ${currentVariant.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through ml-2">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product, currentVariant, 1)}
          className="px-3.5 py-2 rounded-full bg-luxe-rose text-white hover:bg-luxe-rose-dark shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 text-xs font-semibold"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>

    </div>
  );
}
