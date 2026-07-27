"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
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
import productService from "@/services/ProductService";
import bundleService from "@/services/BundleService";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [bundles, setbundles] = useState([]);

  const loadProducts = useCallback(async () => {
    try {
      const products = await productService.getProducts();
      setProducts(products);
    } catch (err) {
      console.log(err.message + "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadBundles = useCallback(async () => {
    try {
      const bundles = await bundleService.getBundles();
      console.log(bundles);
      setbundles(bundles);
    } catch (err) {
      console.log(err.message + "error");
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadBundles();
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. HERO BANNER */}
      <section className="relative h-[125%] w-full min-h-[55vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[80vh] overflow-hidden">
        <Image
          src="/images/bannerimage.png"
          alt="Luxe Hair - Premium Wigs Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center h-[125%] w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/35" />
        <div className="absolute inset-0 flex flex-col gap-6 sm:gap-10 items-center justify-center px-4 py-12">
          <h1 className="text-center">
            <span className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white block leading-tight text-shadow-hero">
              Crown Your
            </span>
            <span className="text-luxe-gold italic font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold block leading-tight text-shadow-hero">
              Confidence
            </span>
          </h1> 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </Link>
            <Link
              href="/shop?category=bundles"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-luxe-rose text-luxe-rose hover:bg-luxe-rose hover:text-white font-semibold text-sm transition-all text-center min-h-[48px] flex items-center justify-center"
            >
              Browse Bundles
            </Link>
          </div>
        
        </div>

        
        
      </section>

      {/* 2. CTA SECTION
      <section className="py-12 lg:py-16 bg-gradient-to-br from-[#fff8f9] via-[#ffeef3] to-[#fff8f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
      </section> */}

      {/* 3. FEATURES BANNER */}
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

      {/* 4. TRENDING WIGS SECTION */}
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

      {/* 5. BEST SELLING BUNDLE DEALS */}
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
            {bundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
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
