"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import saleService from "@/services/SaleService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedSale, setAppliedSale] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notification, setNotification] = useState(null);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("luxe_cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCartItems(parsed);
      } catch (err) {
        console.error("Error reading cart", err);
      }
    }
    const savedPromo = localStorage.getItem("luxe_promo");
    if (savedPromo) {
      try {
        const parsed = JSON.parse(savedPromo);
        setPromoCode(parsed.code || "");
        setAppliedSale(parsed.sale || null);
      } catch (err) {
        console.error("Error reading promo", err);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("luxe_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Sync promo to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "luxe_promo",
        JSON.stringify({ code: promoCode, sale: appliedSale })
      );
    }
  }, [promoCode, appliedSale, isLoaded]);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product, sizeVariant, quantity = 1, itemType = "product") => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === sizeVariant.size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: `${product.id}-${sizeVariant.size}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            category: product.category || "",
            size: sizeVariant.size,
            price: sizeVariant.price,
            image: sizeVariant.image || product.image,
            qty: quantity,
            itemType,
          },
        ];
      }
    });

    showToast(`Added ${quantity}x "${product.name} (${sizeVariant.size})"` );
  };

  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return removeItem(index);
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].qty = newQty;
      return updated;
    });
  };

  const removeItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast("Item removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode("");
    setAppliedSale(null);
  };

  const clearPromo = () => {
    setPromoCode("");
    setAppliedSale(null);
  };

  const applyPromoCode = async (code) => {
    if (!code || !code.trim()) {
      return { success: false, message: "Please enter a promo code." };
    }

    const result = await saleService.validatePromoCode(code);

    if (result.valid && result.sale) {
      setPromoCode(result.sale.promoCode);
      setAppliedSale(result.sale);
      showToast(result.message);
      return { success: true, message: result.message };
    } else {
      setPromoCode("");
      setAppliedSale(null);
      return { success: false, message: result.message };
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const discountAmount = useMemo(() => {
    if (!appliedSale || !appliedSale.discountPercent) return 0;

    const percent = appliedSale.discountPercent;

    let rawDiscount = 0;

    if (appliedSale.saleType === "category" && appliedSale.category) {
      const eligibleTotal = cartItems
        .filter((item) => item.category === appliedSale.category)
        .reduce((acc, item) => acc + item.price * item.qty, 0);
      rawDiscount = (eligibleTotal * percent) / 100;
    } else {
      rawDiscount = (subtotal * percent) / 100;
    }

    return Math.round(rawDiscount * 100) / 100;
  }, [cartItems, subtotal, appliedSale]);

  const shippingFee = subtotal > 199 || subtotal === 0 ? 0 : 15;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        clearPromo,
        subtotal,
        discountAmount,
        discountPercent: appliedSale?.discountPercent || 0,
        shippingFee,
        grandTotal,
        totalItemCount,
        applyPromoCode,
        promoCode,
        appliedSale,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
