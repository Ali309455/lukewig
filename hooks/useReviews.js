"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { canUserReviewProduct } from "@/permissions/reviewPermissions";
import {
  calculateAverageRating,
  calculateTotalReviews,
  calculateStarDistribution,
} from "@/utils/ratingUtils";
import { MOCK_ORDERS } from "@/lib/mockOrders";

// Mock baseline reviews per product
const INITIAL_REVIEWS_BY_PRODUCT = {
  "wig-1": [
    {
      id: "rev-1",
      productId: "wig-1",
      userId: "user-99",
      userName: "Jessica M.",
      rating: 5,
      reviewText: "The lace literally melted into my skin! Everyone thought it was my real hair growing from my scalp.",
      createdAt: "2026-07-15T10:30:00Z",
      verified: true,
    },
    {
      id: "rev-2",
      productId: "wig-1",
      userId: "user-98",
      userName: "Sophia K.",
      rating: 5,
      reviewText: "Super soft human hair, zero shedding even after washing 3 times. Definitely buying another length!",
      createdAt: "2026-07-12T14:20:00Z",
      verified: true,
    },
    {
      id: "rev-3",
      productId: "wig-1",
      userId: "user-97",
      userName: "Amanda L.",
      rating: 4,
      reviewText: "Worth buying! High quality hair and fast delivery.",
      createdAt: "2026-07-02T08:15:00Z",
      verified: true,
    },
  ],
  "wig-2": [
    {
      id: "rev-4",
      productId: "wig-2",
      userId: "user-96",
      userName: "Chloe T.",
      rating: 5,
      reviewText: "Effortless body wave curls! Took me literally 30 seconds to put on.",
      createdAt: "2026-07-18T16:00:00Z",
      verified: true,
    },
  ],
};

export function useReviews(productId) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load reviews from localStorage + baseline initial reviews
  useEffect(() => {
    if (!productId) return;

    const storageKey = `luxe_reviews_${productId}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse stored reviews", err);
        setReviews(INITIAL_REVIEWS_BY_PRODUCT[productId] || INITIAL_REVIEWS_BY_PRODUCT["wig-1"]);
      }
    } else {
      setReviews(INITIAL_REVIEWS_BY_PRODUCT[productId] || INITIAL_REVIEWS_BY_PRODUCT["wig-1"]);
    }

    setLoading(false);
  }, [productId]);

  // Save to localStorage when reviews change
  const saveReviews = (updatedReviews) => {
    setReviews(updatedReviews);
    if (productId) {
      localStorage.setItem(`luxe_reviews_${productId}`, JSON.stringify(updatedReviews));
    }
  };

  // Calculated Ratings
  const averageRating = useMemo(() => calculateAverageRating(reviews), [reviews]);
  const totalReviews = useMemo(() => calculateTotalReviews(reviews), [reviews]);
  const starDistribution = useMemo(() => calculateStarDistribution(reviews), [reviews]);

  // Permission Check
  const permissionStatus = useMemo(() => {
    return canUserReviewProduct({
      user,
      productId,
      existingReviews: reviews,
      orders: MOCK_ORDERS,
    });
  }, [user, productId, reviews]);

  // Submit a new review
  const addReview = useCallback(
    ({ rating, reviewText }) => {
      if (!user) {
        throw new Error("You must be logged in to submit a review.");
      }

      const newReview = {
        id: `rev-${Date.now()}`,
        productId,
        userId: user.uid,
        userName: user.displayName || user.email?.split("@")[0] || "Customer",
        userEmail: user.email,
        rating: Number(rating),
        reviewText,
        createdAt: new Date().toISOString(),
        verified: true,
      };

      const updated = [newReview, ...reviews];
      saveReviews(updated);

      return newReview;
    },
    [user, productId, reviews]
  );

  return {
    reviews,
    loading,
    averageRating,
    totalReviews,
    starDistribution,
    permissionStatus,
    addReview,
  };
}
