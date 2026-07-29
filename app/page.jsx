"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Truck,
  Award,
  RefreshCw,
} from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import BundleCard from "@/components/shop/BundleCard";
import { ProductGridShimmer } from "@/components/common/LoadingShimmer";
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
      <section
        className="relative w-full h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/bannerimage.png')",
          
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/35" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[125vh] flex-col items-center justify-items-start  gap-6 px-4 pt-4  mt-24   sm:gap-10">
          <h1 className="text-center">
            <span className="block font-serif text-4xl font-bold leading-tight text-white text-shadow-hero sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Crown Your
            </span>
            <span className="block font-serif text-5xl font-bold italic leading-tight text-luxe-gold text-shadow-hero sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Confidence
            </span>
          </h1>

          <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
            <Link
              href="/shop"
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-luxe-rose px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-luxe-rose-dark hover:shadow-xl sm:w-auto sm:px-8 sm:py-4"
            >
              <span>Shop Collection</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>

            <Link
              href="/shop?category=bundles"
              className="flex min-h-[48px] w-full items-center justify-center rounded-full border-2 border-luxe-rose px-6 py-3.5 text-center text-sm font-semibold text-luxe-rose transition-all hover:bg-luxe-rose hover:text-white sm:w-auto sm:px-8 sm:py-4"
            >
              Browse Bundles
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CTA SECTION
      <section className="py-12 lg:py-16 bg-linear-to-br from-[#fff8f9] via-luxe-rose-light to-luxe-bg">
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
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-pink-100/60 hover:-translate-y-1 transition-all text-center space-y-3">
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

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-pink-100/60 hover:-translate-y-1 transition-all text-center space-y-3">
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

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-pink-100/60 hover:-translate-y-1 transition-all text-center space-y-3">
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

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-pink-100/60 hover:-translate-y-1 transition-all text-center space-y-3">
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-luxe-rose text-luxe-rose hover:bg-luxe-rose hover:text-white font-semibold text-xs transition-all shadow-xs"
          >
            <span>Explore All Wigs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. BEST SELLING BUNDLE DEALS */}
      <section className="bg-linear-to-r from-pink-50/50 via-white to-amber-50/50 py-16">
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

    </div>
  );
}
