import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, ShieldCheck, Truck, RefreshCw, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxe-dark text-white pt-16 pb-8 border-t border-rose-950">
      
      {/* Value Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-luxe-rose/20 text-luxe-rose flex items-center justify-center mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-lg">Worldwide Express Shipping</h4>
            <p className="text-gray-400 text-xs mt-1">Free express delivery on all orders over $199</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-luxe-gold/20 text-luxe-gold flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-lg">100% Virgin Hair Guarantee</h4>
            <p className="text-gray-400 text-xs mt-1">Ethically sourced, unprocessed human hair</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-luxe-rose/20 text-luxe-rose flex items-center justify-center mb-3">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-lg">Hassle-Free Returns</h4>
            <p className="text-gray-400 text-xs mt-1">30-day easy exchanges & money-back policy</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Brand Info */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center mx-auto sm:mx-0 rounded-full bg-white/10 p-1.5 sm:p-2 border border-white/15 shadow-inner w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="VERSATILE BY VERSHA' Logo"
              width={280}
              height={80}
              className="object-contain w-full h-full"
            />
          </div>
          <p className="text-luxe-gold font-serif text-sm font-semibold italic">
            "One Woman. Every Look."
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            Crown your confidence with luxury virgin hair wigs & HD Swiss lace closures designed to deliver ultimate elegance and style.
          </p>
          <div className="flex justify-center sm:justify-start gap-3 pt-2">
            <a href="#" className="min-w-[44px] min-h-[44px] rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-luxe-rose hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="min-w-[44px] min-h-[44px] rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-luxe-rose hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="min-w-[44px] min-h-[44px] rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-luxe-rose hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col justify-center items-center md:items-start w-full">
          <h4 className="font-serif text-xl font-bold text-white mb-4 border-b border-luxe-rose/40 pb-2 inline-block ">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-luxe-rose transition-colors">Home</Link></li>
            <li><Link href="/shop" className="hover:text-luxe-rose transition-colors">Shop All Wigs</Link></li>
            <li><Link href="/shop?category=bundles" className="hover:text-luxe-rose transition-colors">Bundle Deals</Link></li>
            <li><Link href="/cart" className="hover:text-luxe-rose transition-colors">Shopping Cart</Link></li>
            <li><Link href="/login" className="hover:text-luxe-rose transition-colors">My Account</Link></li>
          </ul>
        </div>



      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>© {new Date().getFullYear()} VERSATILE BY VERSHA'. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
          <a href="#" className="hover:text-gray-300">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
