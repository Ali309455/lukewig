"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { ShoppingBag, Search, Heart, User, Menu, X, ShieldCheck, LogOut, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

function NavbarContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { totalItemCount } = useCart();
  const { user, isAdmin, logout } = useAuth();

  // Navigation Links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop All", href: "/shop" },
    { name: "HD Laces", href: "/shop?category=HD+Laces+%26+Closures" },
    { name: "Bundle Deals", href: "/shop?category=bundles" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Helper to check active state including search query params
  const isLinkActive = useCallback(
    (href) => {
      const [targetPath, targetQuery] = href.split("?");
      if (pathname !== targetPath) return false;
      if (!targetQuery) {
        if (targetPath === "/shop" && searchParams.get("category")) return false;
        return true;
      }
      const currentCategory = searchParams.get("category");
      const targetCategory = new URLSearchParams(targetQuery).get("category");
      return currentCategory === targetCategory;
    },
    [pathname, searchParams]
  );

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setSearchOpen(false);
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-20 py-2 sm:py-2.5 gap-2">
            
            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex items-center lg:hidden flex-shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-gray-700 hover:text-luxe-rose hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-luxe-rose transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu-drawer"
                aria-label={mobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo - Responsive & Zero Layout Shift */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="group flex items-center focus:outline-none focus:ring-2 focus:ring-luxe-rose rounded-3xl">
                <div className="flex items-center justify-center rounded-2xl sm:rounded-3xl border border-pink-100 bg-gradient-to-br from-white via-pink-50/90 to-rose-50/50 shadow-md shadow-pink-100/40 px-3 py-2 sm:px-5 sm:py-2.5 w-[11.5rem] sm:w-[15.5rem] h-14 sm:h-[4.5rem] overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image
                    src="/images/logo.png"
                    alt="VERSATILE BY VERSHA' Logo"
                    width={260}
                    height={72}
                    priority
                    className="object-contain w-full h-full max-h-10 sm:max-h-[3.25rem]"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center space-x-1 xl:space-x-6 flex-wrap justify-center flex-1 mx-4"
            >
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs xl:text-sm font-medium transition-colors duration-200 tracking-wide relative px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe-rose ${
                      active
                        ? "text-luxe-rose font-semibold bg-pink-50/70"
                        : "text-gray-700 hover:text-luxe-rose hover:bg-pink-50/40"
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-luxe-rose rounded-full animate-fade-in" />
                    )}
                  </Link>
                );
              })}

              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-luxe-rose/10 text-luxe-rose border border-luxe-rose/30 hover:bg-luxe-rose hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </Link>
              )}
            </nav>

            {/* Right Action Icons (Search, Wishlist, Cart, User) */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
              
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-700 hover:text-luxe-rose hover:bg-pink-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                aria-label="Search items"
                title="Search Wigs & Hair"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Wishlist */}
              <Link
                href="/shop"
                className="hidden sm:flex p-2 text-gray-700 hover:text-luxe-rose hover:bg-pink-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>

              {/* Shopping Cart Button */}
              <Link
                href="/cart"
                className="p-2 text-gray-700 hover:text-luxe-rose hover:bg-pink-50 rounded-full transition-colors relative group focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                title="Shopping Cart"
                aria-label={`Shopping cart with ${totalItemCount} items`}
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                {totalItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-luxe-rose text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                    {totalItemCount}
                  </span>
                )}
              </Link>

              {/* Auth / Account Profile */}
              <div className="relative">
                {user ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center space-x-2 p-1.5 rounded-full bg-luxe-rose-light text-luxe-rose-dark border border-luxe-rose-soft hover:bg-luxe-rose hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                      aria-expanded={userDropdownOpen}
                      aria-label="User profile menu"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-xs font-semibold hidden md:inline max-w-[100px] truncate">
                        {user.displayName || "Account"}
                      </span>
                    </button>

                    {/* Profile Dropdown */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl py-2 border border-pink-100 z-50 animate-fade-in">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs font-bold text-gray-900 truncate">{user.displayName}</p>
                          <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                        </div>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-xs text-luxe-rose font-semibold hover:bg-pink-50"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
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
                    className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-luxe-rose text-white hover:bg-luxe-rose-dark shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden xs:inline">Sign In</span>
                  </Link>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              id="mobile-menu-drawer"
              className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto z-50 border-r border-pink-100"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-pink-100">
                <div className="flex items-center justify-center rounded-2xl border border-pink-100 bg-gradient-to-br from-white to-pink-50/80 shadow-sm px-4 py-2.5 w-44 h-14 overflow-hidden">
                    <Image
                      src="/images/logo.png"
                      alt="Luxe Hair Logo"
                      width={200}
                      height={56}
                      className="object-contain w-full h-full max-h-10"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-gray-500 hover:text-luxe-rose hover:bg-pink-50"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="mt-6 space-y-2" aria-label="Mobile Navigation">
                  {navLinks.map((link) => {
                    const active = isLinkActive(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-base font-semibold px-4 py-3 rounded-xl transition-all ${
                          active
                            ? "bg-luxe-rose text-white shadow-md"
                            : "text-gray-800 hover:bg-pink-50 hover:text-luxe-rose"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}

                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-base font-semibold px-4 py-3 rounded-xl bg-luxe-rose/10 text-luxe-rose border border-luxe-rose/30 mt-4"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                </nav>
              </div>

              <div className="pt-6 border-t border-pink-100 text-center space-y-3">
                <div className="flex justify-center items-center gap-2 text-xs font-semibold text-luxe-gold">
                  <Sparkles className="w-4 h-4" />
                  <span>100% Virgin Hair & HD Lace</span>
                </div>
                <p className="text-[11px] text-gray-400">© VERSATILE BY VERSHA'</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-xl shadow-2xl relative animate-fade-in border border-pink-100"
            role="dialog"
            aria-modal="true"
            aria-label="Search products modal"
          >
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close search modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Search VERSATILE Collection
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Find silky straight, body wave, deep wave, or HD lace closures.
            </p>

            <div className="relative">
              <input
                type="text"
                placeholder="Type to search wigs & extensions..."
                className="w-full pl-12 pr-4 py-3.5 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxe-rose text-sm text-gray-800 shadow-sm"
                autoFocus
              />
              <Search className="w-5 h-5 text-luxe-rose absolute left-4 top-4" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-20 bg-white border-b border-pink-100" />}>
      <NavbarContent />
    </Suspense>
  );
}
