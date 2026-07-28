"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Heart, Sparkles, CheckCircle2, ArrowRight, Star, Truck, Package } from "lucide-react";

export default function AboutPage() {
  const highlights = [
    { icon: Award, title: "Premium Quality Hair" },
    { icon: Sparkles, title: "100% Virgin Human Hair" },
    { icon: Heart, title: "HD Lace Available" },
    { icon: CheckCircle2, title: "Beginner Friendly Options" },
    { icon: Truck, title: "Fast Shipping" },
    { icon: Package, title: "Secure Checkout" },
  ];

  return (
    <div className="space-y-16 py-12">
      
      {/* Meet the Owner Hero */}
      <section className="bg-linear-to-br from-[#fff8f9] via-luxe-rose-light to-luxe-bg py-16 sm:py-20 border-b border-pink-100
      relative w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/aboutbgimage.png')",
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-white bg-gradient-to-br from-pink-100 to-amber-50 p-6 sm:p-8 rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest px-3 py-1 bg-luxe-rose/10 rounded-full border border-luxe-rose/20">
                MEET THE OWNER
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
                Versha' <br />
                <span className="text-luxe-gold italic">Founder & CEO</span>
              </h1>
              <p className="text-luxe-gold font-serif text-sm font-semibold italic">
                "One Woman. Every Look."
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Hi, I&apos;m Versha' — the founder and heart behind Versatile by Versha'. I created this brand to help women feel confident, beautiful, and versatile through luxury-quality hair. Whether you&apos;re going for a soft everyday look, boss energy, or full glam, I want every customer to feel empowered every time they wear our hair.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Thank you for supporting my dream and becoming part of the Versatile by Versha' family.
              </p>
              <div className="pt-2 flex gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="w-full max-w-[380px] aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-pink-100 to-amber-50">
                <Image
                  src="/images/hero.png"
                  alt="Versha' - Founder & CEO of Versatile by Versha'"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* The Story */}
      <section className="bg-pink-50/50 py-14 border-y border-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest">OUR STORY</span>
            <h2 className="font-serif text-4xl font-bold text-gray-900">About Versatile by Versha'</h2>
          </div>
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xs border border-pink-100 space-y-6 text-gray-600 text-sm leading-relaxed">
            <p>
              Versatile by Versha' was created from one unforgettable experience. For my birthday, I was excited to wear a brand-new wig I had ordered from a company that advertised it as 100% human hair. Like many women, I invested my hard-earned money expecting premium quality. Instead, when it arrived, I realized it was a synthetic blend that didn&apos;t look or feel anything like what was promised.
            </p>
            <p>
              To make it wearable for my birthday, I had to cut so much of the hair off just to create the style I wanted. What should have been an exciting moment turned into frustration and disappointment.
            </p>
            <p>
              That&apos;s when I realized women deserve better. I decided to create a brand built on honesty, quality, and affordability — where customers receive beautiful, luxury-quality human hair without wondering if they&apos;re getting what they paid for.
            </p>
            <p>
              Today, Versatile by Versha' is dedicated to providing premium human hair, beginner-friendly wigs, and versatile styles that help women feel confident for every occasion. Whether you&apos;re going to work, celebrating a special event, traveling, or simply wanting to feel your best, we&apos;re here to make sure your hair never lets you down.
            </p>
            <div className="bg-luxe-rose/5 p-6 rounded-2xl border border-luxe-rose/10 space-y-3">
              <h3 className="font-serif text-xl font-bold text-gray-900">Our Promise</h3>
              <p className="text-gray-600 text-sm">We believe luxury shouldn&apos;t be out of reach. That&apos;s why we&apos;re committed to providing:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {["100% premium human hair", "Soft, full, long-lasting quality", "Beginner-friendly glueless wigs", "Honest product descriptions", "Affordable luxury pricing", "Exceptional customer service"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-luxe-rose shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 text-sm pt-2">Our goal is simple: when you open your package, we want you to feel excited — not disappointed.</p>
            </div>
            <div className="text-center pt-2">
              <p className="font-serif text-lg text-gray-900 font-semibold italic">
                &ldquo;Every woman deserves hair she can trust.&rdquo;
              </p>
              <p className="text-xs text-gray-500 mt-2">— Versha', Founder & CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Letter */}
      <section className="bg-pink-50/50 py-14 border-y border-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest">FOUNDER&apos;S NOTE</span>
            <h2 className="font-serif text-4xl font-bold text-gray-900">A Letter From Versha&apos;</h2>
          </div>
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xs border border-pink-100 space-y-6 text-gray-600 text-sm leading-relaxed">
            <p>
              Hi, I&apos;m Versha&apos;, founder of Versatile by Versha&apos;.
            </p>
            <p>
              What started as a frustrating birthday experience became the inspiration behind this business. I created this brand for every woman who&apos;s ever spent her money on hair that didn&apos;t match the description or live up to the promise.
            </p>
            <p>
              My mission is to offer luxury-quality hair you can trust, so you can focus on feeling beautiful and confident&mdash;not worrying about what arrived in the mail. Thank you for supporting my dream and allowing Versatile by Versha&apos; to be part of your journey.
            </p>
            <div className="border-t border-pink-100 pt-6 space-y-1">
              <p className="text-gray-900 font-serif font-semibold">With love,</p>
              <p className="text-gray-900 font-serif font-bold text-lg">Versha&apos;</p>
              <p className="text-xs text-luxe-rose font-semibold">Founder &amp; CEO</p>
              <p className="text-xs text-gray-500">Versatile by Versha&apos;</p>
              <p className="text-luxe-gold font-serif text-sm font-semibold italic pt-1">&ldquo;One Woman. Every Look.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Customer Community Showcase */}
      <section className="bg-pink-50/50 py-16 border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest">COMMUNITY</span>
            <h2 className="font-serif text-4xl font-bold text-gray-900">The VERSATILE Baddie</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md group">
              <Image src="/images/client1.jpg" alt="Versatile Client 1" fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                <span className="font-serif text-lg font-bold">Jessica M.</span>
                <span className="text-xs text-pink-200">Wearing 24" Silky Straight HD Frontal Wig</span>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md group">
              <Image src="/images/client2.jpg" alt="Versatile Client 2" fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                <span className="font-serif text-lg font-bold">Sophia K.</span>
                <span className="text-xs text-pink-200">Wearing 20" Body Wave Glueless Wig</span>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md group">
              <Image src="/images/client3.jpg" alt="Versatile Client 3" fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                <span className="font-serif text-lg font-bold">Amanda L.</span>
                <span className="text-xs text-pink-200">Wearing 13x4 HD Swiss Lace Frontal Deal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-15">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest">REAL REVIEWS</span>
          <h2 className="font-serif text-4xl font-bold text-gray-900">Loved By Our Queens</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-pink-100 space-y-4">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400" />))}
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed">&quot;The lace literally melted into my skin! Everyone thought it was my real hair.&quot;</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-luxe-rose">
                <Image src="/images/client1.jpg" alt="Jessica M." fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900">Jessica M.</h4>
                <span className="text-xs text-luxe-rose font-medium">Verified Buyer</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-pink-100 space-y-4">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400" />))}
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed">&quot;Super soft human hair, zero shedding even after washing 3 times.&quot;</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-luxe-rose">
                <Image src="/images/client2.jpg" alt="Sophia K." fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900">Sophia K.</h4>
                <span className="text-xs text-luxe-rose font-medium">Verified Buyer</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-pink-100 space-y-4">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400" />))}
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed">&quot;Delivery was lightning fast! The bundle package deal saved me over $100!&quot;</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-luxe-rose">
                <Image src="/images/client3.jpg" alt="Amanda L." fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900">Amanda L.</h4>
                <span className="text-xs text-luxe-rose font-medium">Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
