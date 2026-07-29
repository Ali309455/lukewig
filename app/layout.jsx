"use client";

import "./globals.css";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CartToast from "@/components/common/CartToast";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Versatile By Versha' | One Woman. Every Look.</title>
        <meta
          name="description"
          content="Shop 100% HD Swiss lace human hair wigs, body wave, deep wave, and luxury bundle deals from VERSATILE BY VERSHA' — One Woman. Every Look."
          
          
        />
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AnnouncementBar />
              <Navbar />
              <main className="grow">{children}</main>
              <CartToast />
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
