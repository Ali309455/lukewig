"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import wishlistService from "@/services/WishlistService";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshWishlist = useCallback(async () => {
    if (!user) {
      setWishlist(null);
      return;
    }
    setLoading(true);
    try {
      const data = await wishlistService.getWishlist(user.uid);
      setWishlist(data);
    } catch (err) {
      console.error("Failed to load wishlist:", err);
      setWishlist(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const addToWishlist = async (product) => {
    if (!user) throw new Error("Please sign in to add items to your wishlist.");
    const updated = await wishlistService.addToWishlist(user.uid, product);
    setWishlist(updated);
    return updated;
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;
    const updated = await wishlistService.removeFromWishlist(user.uid, productId);
    setWishlist(updated);
    return updated;
  };

  const clearWishlist = async () => {
    if (!user) return;
    await wishlistService.clearWishlist(user.uid);
    setWishlist(null);
  };

  const isInWishlist = (productId) => {
    return wishlistService.isInWishlist(wishlist, productId);
  };

  const wishlistCount = wishlist?.items?.length || 0;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistItems: wishlist?.items || [],
        wishlistCount,
        loading,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
