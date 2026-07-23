"use client";

import "./globals.css";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { CartProvider, useCart } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
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
        <title>Luxe Hair | Luxury Human Hair Wigs & Bundles</title>
        <meta
          name="description"
          content="Shop 100% HD lace human hair wigs, body wave, deep wave, and luxury bundle deals. Crown your confidence with Luxe Hair."
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <AnnouncementBar />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <ToastNotification />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
