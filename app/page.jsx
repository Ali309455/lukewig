"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Truck,
  Award,
  Star,
  RefreshCw,
} from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import BundleCard from "@/components/shop/BundleCard";
import { ProductGridShimmer } from "@/components/common/LoadingShimmer";
import { INITIAL_PRODUCTS, INITIAL_BUNDLES, REVIEWS } from "@/lib/mockData";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate API fetch delay to showcase shimmer loading state
    const timer = setTimeout(() => {
      setProducts(INITIAL_PRODUCTS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. HERO SECTION */}
        {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#fff8f9] via-[#ffeef3] to-[#fff8f8] pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxe-rose/10 text-luxe-rose text-xs font-bold tracking-widest uppercase border border-luxe-rose/20 shadow-sm">
                <Sparkles className="w-4 h-4 text-luxe-gold" />
                <span>VERSATILE BY VERSHA' — ONE WOMAN. EVERY LOOK.</span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-[1.1]">
                Crown Your <br />
                <span className="text-luxe-gold italic font-serif">Confidence</span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Luxurious 100% human hair wigs, HD Swiss lace closures, and custom bundle deals designed for every woman and every look.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/shop?category=bundles"
                  className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-luxe-rose text-luxe-rose hover:bg-luxe-rose hover:text-white font-semibold text-sm transition-all text-center"
                >
                  Browse Bundles
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative flex justify-center">
              <div className="w-[320px] h-[400px] sm:w-[420px] sm:h-[500px] relative rounded-3xl overflow-hidden shadow-2xl animate-float border-4 border-white/80">
                <Image
                  src="/hero.png"
                  alt="Luxe Hair Model"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-pink-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-luxe-gold/20 text-luxe-gold flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">4.9 / 5 Rating</p>
                  <p className="text-[11px] text-gray-500">Over 5,000+ Happy Clients</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      

      {/* 2. FEATURES BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/60 hover:-translate-y-1 transition-all text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-luxe-rose/10 text-luxe-rose flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900">
              100% HD Swiss Lace
            </h3>
            <p className="text-xs text-gray-500">
              Melts seamlessly into all skin tones naturally
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/60 hover:-translate-y-1 transition-all text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-luxe-gold/10 text-luxe-gold flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900">
              Unprocessed Virgin Hair
            </h3>
            <p className="text-xs text-gray-500">
              Bleach & dyeable up to #613 light blondes
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/60 hover:-translate-y-1 transition-all text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-luxe-rose/10 text-luxe-rose flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900">
              Express Delivery
            </h3>
            <p className="text-xs text-gray-500">
              Ships within 2-4 business days worldwide
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/60 hover:-translate-y-1 transition-all text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-luxe-gold/10 text-luxe-gold flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900">
              30-Day Guarantee
            </h3>
            <p className="text-xs text-gray-500">
              Risk-free exchanges & full satisfaction
            </p>
          </div>
        </div>
      </section>

      {/* 3. TRENDING WIGS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest">
            FEATURED SELECTION
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
            Trending Wigs Collection
          </h2>
          <p className="text-gray-500 text-sm">
            Hand-crafted HD lace frontal and glueless wigs designed for instant
            luxury.
          </p>
        </div>

        {loading ? (
          <ProductGridShimmer count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-luxe-rose text-luxe-rose hover:bg-luxe-rose hover:text-white font-semibold text-xs transition-all shadow-sm"
          >
            <span>Explore All Wigs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. BEST SELLING BUNDLE DEALS */}
      <section className="bg-gradient-to-r from-pink-50/50 via-white to-amber-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-luxe-gold uppercase tracking-widest">
              EXCLUSIVE SAVINGS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
              Best Selling Bundle Deals
            </h2>
            <p className="text-gray-500 text-sm">
              Save up to $100 when you purchase complete virgin bundle packages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {INITIAL_BUNDLES.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest">
            REAL REVIEWS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
            Loved By Thousands of Queens
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-luxe-rose">
                  <Image
                    src={rev.image}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">
                    {rev.name}
                  </h4>
                  <span className="text-xs text-luxe-rose font-medium">
                    {rev.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
