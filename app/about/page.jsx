"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Heart, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12">
      
      {/* Header Hero */}
      <section className="bg-gradient-to-br from-[#fff8f9] via-[#ffeef3] to-[#fff8f8] py-16 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest px-3 py-1 bg-luxe-rose/10 rounded-full border border-luxe-rose/20">
                VERSATILE BY VERSHA'
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
                Crafting Confidence, <br />
                <span className="text-luxe-gold italic">One Hair Strand At A Time</span>
              </h1>
              <p className="text-gray-600 text-base leading-relaxed">
                Founded with a mission to make every queen feel bold, glamorous, and naturally confident. We specialize in 100% unprocessed virgin human hair wigs, HD Swiss lace frontals, and closures designed for flawless, scalp-like melts.
              </p>
              <div className="pt-2 flex gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="w-[320px] h-[400px] sm:w-[380px] sm:h-[480px] relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/hero.png"
                  alt="Luxe Hair Craftsmanship"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-luxe-gold uppercase tracking-widest">
            OUR CORE PILLARS
          </span>
          <h2 className="font-serif text-4xl font-bold text-gray-900">Why Queens Choose VERSATILE BY VERSHA'</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4 text-center">
            <div className="w-14 h-14 bg-luxe-rose/10 text-luxe-rose rounded-2xl flex items-center justify-center mx-auto">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-900">100% Single-Donor Virgin Hair</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every bundle and wig is crafted from raw, cuticle-aligned hair that can be bleached, dyed up to #613 blonde, and heat-styled repeatedly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4 text-center">
            <div className="w-14 h-14 bg-luxe-gold/10 text-luxe-gold rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-900">Ultra-Thin Invisible HD Swiss Lace</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our real HD lace is feather-light and transparent, blending seamlessly with every skin tone without harsh lines or thick edges.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4 text-center">
            <div className="w-14 h-14 bg-luxe-rose/10 text-luxe-rose rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-900">Ethically Sourced & Quality Tested</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We adhere to strict ethical sourcing standards. Each unit undergoes rigorous 5-point quality inspection before leaving our atelier.
            </p>
          </div>

        </div>
      </section>

      {/* Customer Community Showcase */}
      <section className="bg-pink-50/50 py-16 border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest">COMMUNITY</span>
            <h2 className="font-serif text-4xl font-bold text-gray-900">The VERSATILE Sisterhood</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md group">
              <Image src="/images/client1.jpg" alt="Luxe Client 1" fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                <span className="font-serif text-lg font-bold">Jessica M.</span>
                <span className="text-xs text-pink-200">Wearing 24" Silky Straight HD Frontal Wig</span>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md group">
              <Image src="/images/client2.jpg" alt="Luxe Client 2" fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                <span className="font-serif text-lg font-bold">Sophia K.</span>
                <span className="text-xs text-pink-200">Wearing 20" Body Wave Glueless Wig</span>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md group">
              <Image src="/images/client3.jpg" alt="Luxe Client 3" fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                <span className="font-serif text-lg font-bold">Amanda L.</span>
                <span className="text-xs text-pink-200">Wearing 13x4 HD Swiss Lace Frontal Deal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
