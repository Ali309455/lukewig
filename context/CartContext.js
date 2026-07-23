"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notification, setNotification] = useState(null);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("luxe_cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (err) {
        console.error("Error reading cart", err);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("luxe_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product, sizeVariant, quantity = 1) => {
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
            size: sizeVariant.size,
            price: sizeVariant.price,
            image: sizeVariant.image || product.image,
            qty: quantity,
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
  };

  const applyPromoCode = (code) => {
    if (code.toUpperCase() === "LUXE20") {
      setPromoCode("LUXE20");
      setDiscountPercent(20);
      showToast("Promo LUXE20 applied! (20% OFF)");
      return { success: true, message: "20% discount applied!" };
    } else {
      return { success: false, message: "Invalid promotional code" };
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
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
        subtotal,
        discountPercent,
        discountAmount,
        shippingFee,
        grandTotal,
        totalItemCount,
        applyPromoCode,
        promoCode,
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
