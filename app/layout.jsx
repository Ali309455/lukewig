"use client";

import "./globals.css";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { CartProvider, useCart } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CheckCircle } from "lucide-react";

function ToastNotification() {
  const { notification } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-luxe-dark text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-pink-500/30 animate-bounce">
      <CheckCircle className="w-5 h-5 text-luxe-rose" />
      <span className="text-xs font-semibold">{notification}</span>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>VERSATILE BY VERSHA' | One Woman. Every Look.</title>
        <meta
          name="description"
          content="Shop 100% HD Swiss lace human hair wigs, body wave, deep wave, and luxury bundle deals. VERSATILE BY VERSHA' — One Woman. Every Look."
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AnnouncementBar />
              <Navbar />
              <main className="flex-grow">{children}</main>
              <ToastNotification />
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
