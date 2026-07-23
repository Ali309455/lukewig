"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Heart, User, Menu, X, ShieldCheck, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();

  const { totalItemCount } = useCart();
  const { user, isAdmin, logout } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "HD Laces", href: "/shop?category=HD+Laces+%26+Closures" },
    { name: "Bundle Deals", href: "/shop?category=bundles" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-pink-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-luxe-rose focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="group">
                <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-luxe-gold group-hover:text-luxe-rose transition-colors duration-300">
                  Versatile By Versha
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 tracking-wide relative py-1 ${
                      isActive ? "text-luxe-rose font-semibold" : "text-gray-700 hover:text-luxe-rose"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-luxe-rose rounded-full animate-fade-in" />
                    )}
                  </Link>
                );
              })}

              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-luxe-rose/10 text-luxe-rose border border-luxe-rose/30 hover:bg-luxe-rose hover:text-white transition-all shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              
              {/* Search Icon */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-700 hover:text-luxe-rose transition-colors"
                title="Search Wigs"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Wishlist */}
              <Link
                href="/shop"
                className="hidden sm:block p-2 text-gray-700 hover:text-luxe-rose transition-colors relative"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="p-2 text-gray-700 hover:text-luxe-rose transition-colors relative group"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-luxe-rose text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                    {totalItemCount}
                  </span>
                )}
              </Link>

              {/* Auth / Account Profile */}
              <div className="relative">
                {user ? (
                  <div>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center space-x-2 p-1.5 rounded-full bg-luxe-rose-light text-luxe-rose-dark border border-luxe-rose-soft hover:bg-luxe-rose hover:text-white transition-all"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-xs font-semibold hidden md:inline max-w-[100px] truncate">
                        {user.displayName || "Account"}
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs font-semibold text-gray-900">{user.displayName}</p>
                          <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                        </div>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-4 py-2 text-xs text-luxe-rose font-semibold hover:bg-luxe-rose-light"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-full bg-luxe-rose text-white hover:bg-luxe-rose-dark shadow-md hover:shadow-lg transition-all"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-pink-100 px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-gray-700 hover:text-luxe-rose py-2 border-b border-gray-50"
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-luxe-rose py-2"
              >
                Admin Panel
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Quick Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Search Luxe Collection</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search silky straight, body wave, deep wave wigs..."
                className="w-full pl-12 pr-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxe-rose text-sm text-gray-800"
                autoFocus
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
