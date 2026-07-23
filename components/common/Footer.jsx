import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, ShieldCheck, Truck, RefreshCw } from "lucide-react";

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
            <h4 className="font-semibold text-lg">Worldwide Express Shipping</h4>
            <p className="text-gray-400 text-xs mt-1">Free express delivery on all orders over $199</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-luxe-gold/20 text-luxe-gold flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-lg">100% Virgin Hair Guarantee</h4>
            <p className="text-gray-400 text-xs mt-1">Ethically sourced, unprocessed human hair</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-luxe-rose/20 text-luxe-rose flex items-center justify-center mb-3">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-lg">Hassle-Free Returns</h4>
            <p className="text-gray-400 text-xs mt-1">30-day easy exchanges & money-back policy</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <span className="font-serif text-3xl font-bold text-luxe-gold block">Versatile By Versha</span>
          <p className="text-gray-400 text-sm leading-relaxed">
            Crown your confidence with luxury virgin hair wigs designed to make you feel beautiful, bold, and glamorous every day.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-luxe-rose hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-luxe-rose hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-luxe-rose hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-xl font-bold text-white mb-4 border-b border-luxe-rose/40 pb-2 inline-block">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-luxe-rose transition-colors">Home</Link></li>
            <li><Link href="/shop" className="hover:text-luxe-rose transition-colors">Shop All Wigs</Link></li>
            <li><Link href="/shop?category=bundles" className="hover:text-luxe-rose transition-colors">Bundle Deals</Link></li>
            <li><Link href="/cart" className="hover:text-luxe-rose transition-colors">Shopping Cart</Link></li>
            <li><Link href="/login" className="hover:text-luxe-rose transition-colors">My Account</Link></li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h4 className="font-serif text-xl font-bold text-white mb-4 border-b border-luxe-rose/40 pb-2 inline-block">Customer Care</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-luxe-rose transition-colors">Wig Care & Maintenance Guide</a></li>
            <li><a href="#" className="hover:text-luxe-rose transition-colors">Shipping & Delivery Policy</a></li>
            <li><a href="#" className="hover:text-luxe-rose transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-luxe-rose transition-colors">Lace Cap Size Guide</a></li>
            <li><a href="#" className="hover:text-luxe-rose transition-colors">FAQs</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="font-serif text-xl font-bold text-white mb-4 border-b border-luxe-rose/40 pb-2 inline-block">Join Luxe VIP</h4>
          <p className="text-gray-400 text-sm mb-3">Subscribe to unlock secret flash sales, product drops, and 15% off your first order!</p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxe-rose"
            />
            <button className="w-full py-2.5 bg-luxe-rose hover:bg-luxe-rose-dark text-white rounded-xl font-semibold text-sm transition-all shadow-md">
              Subscribe Now
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Vershaa's Collection. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
          <a href="#" className="hover:text-gray-300">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
