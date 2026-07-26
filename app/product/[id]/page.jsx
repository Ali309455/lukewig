"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, ShoppingBag, Truck, ShieldCheck, RefreshCw, Heart, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ProductDetailsShimmer } from "@/components/common/LoadingShimmer";
import ProductCard from "@/components/shop/ProductCard";
import ProductReviews from "@/components/ProductReviews/ProductReviews";
import productService from "@/services/ProductService";
import { INITIAL_PRODUCTS } from "@/lib/mockData";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");


  const loadProducts = useCallback(async () => {
      try {
        const product = await productService.getProduct(params.id);
        setProduct(product);
      } catch (err) {
        console.log(err.message + "error");
      } finally {
        setLoading(false);
      }
    }, []);
  useEffect(() => {

    loadProducts();
    
  }, [params.id]);

  if (loading || !product) {
    return <ProductDetailsShimmer />;
  }

  const currentVariant = product.sizes ? product.sizes[selectedVariantIndex] : { size: '20"', price: product.price, image: product.image };
  const relatedProducts = INITIAL_PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="py-10 space-y-12">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-luxe-rose transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop Collection</span>
        </Link>
      </div>

      {/* Main Product Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Image Gallery */}
        <div className="space-y-4">
          <div className="relative w-full h-[450px] sm:h-[540px] rounded-3xl overflow-hidden bg-[#f9f9fd] shadow-lg border border-pink-100">
            <Image
              src={currentVariant.image || product.image}
              alt={product.name}
              fill
              priority
              className="object-contain object-center"
            />
            {product.isOnSale && (
              <span className="absolute top-6 left-6 bg-luxe-rose text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                SAVE {product.discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.sizes && (
            <div className="flex gap-3 overflow-x-auto p-2">
              {product.sizes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedVariantIndex === idx
                      ? "border-luxe-rose shadow-md scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={s.image} alt={s.size} fill className="object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info Column */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest block mb-1">
              {product.category}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-gray-600 font-medium">
                {product.rating} ({product.reviewsCount} Customer Reviews)
              </span>
            </div>
          </div>

          {/* Dynamic Variant Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-4xl font-bold text-luxe-rose">
              ${currentVariant.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              In Stock & Ready to Ship
            </span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          <hr className="border-pink-100" />

          {/* Size / Length Selector */}
          {product.sizes && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-900 uppercase tracking-wider">Select Hair Length</span>
                <span className="text-luxe-rose font-semibold">Active: {currentVariant.size}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s, idx) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs border transition-all ${
                      selectedVariantIndex === idx
                        ? "bg-luxe-rose text-white border-luxe-rose shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:border-luxe-rose"
                    }`}
                  >
                    {s.size} — ${s.price}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls & Add to Cart */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <div className="flex items-center justify-between border border-gray-200 rounded-full px-4 py-2 bg-gray-50 w-36">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-gray-500 hover:text-luxe-rose text-lg font-bold"
              >
                -
              </button>
              <span className="font-semibold text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-gray-500 hover:text-luxe-rose text-lg font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product, currentVariant, quantity)}
              className="flex-1 py-4 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add To Shopping Bag</span>
            </button>

            <button className="p-4 rounded-full border border-gray-200 hover:border-luxe-rose text-gray-400 hover:text-luxe-rose transition-colors flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Value Props Grid */}
          <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 grid grid-cols-3 gap-2 text-center text-[11px] text-gray-600">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-luxe-rose" />
              <span>Free Delivery &gt;$199</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-luxe-gold" />
              <span>100% HD Swiss Lace</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RefreshCw className="w-4 h-4 text-luxe-rose" />
              <span>Easy 30-Day Return</span>
            </div>
          </div>

        </div>

      </div>

      {/* Product Details Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-pink-100 space-y-6">
          <div className="flex border-b border-gray-100 space-x-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-sm font-serif font-bold transition-all relative ${
                activeTab === "description"
                  ? "text-luxe-rose text-lg"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Description & Quality
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 text-sm font-serif font-bold transition-all relative ${
                activeTab === "specs"
                  ? "text-luxe-rose text-lg"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Hair Specifications
            </button>
          </div>

          {activeTab === "description" ? (
            <div className="text-gray-600 text-sm space-y-3 leading-relaxed">
              {product.fullDescription}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold uppercase">Hair Material</span>
                <p className="font-semibold text-gray-800">{product.details?.hairType || "100% Virgin Hair"}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold uppercase">Cap Size</span>
                <p className="font-semibold text-gray-800">{product.details?.capSize || "Medium 22.5 Inches"}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold uppercase">Density</span>
                <p className="font-semibold text-gray-800">{product.details?.density || "180% High Density"}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold uppercase">Lace Type</span>
                <p className="font-semibold text-gray-800">{product.details?.laceType || "HD Invisible Swiss Lace"}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductReviews productId={product.id} productName={product.name} />
      </div>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <h3 className="font-serif text-3xl font-bold text-gray-900">You May Also Love</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}
