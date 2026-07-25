"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import authService from "../services/AuthService";
import reviewService from "../services/ReviewService";
import {
  calculateAverageRating,
  calculateTotalReviews,
  calculateStarDistribution,
} from "@/utils/ratingUtils";

const DEFAULT_PERMISSION = {
  canReview: false,
  reason: "Login to write a review.",
  code: "NOT_LOGGED_IN",
};

export function useReviews(productId) {
  const { user } = authService.getCurrentUser();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState(DEFAULT_PERMISSION);

  useEffect(() => {
    if (!productId) return;

    let active = true;

    async function loadReviews() {
      setLoading(true);
      try {
        const data = await reviewService.getProductReviews(productId);
        if (active) setReviews(data);
      } catch (error) {
        console.error("Failed to load reviews", error);
        if (active) setReviews([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadReviews();
    return () => {
      active = false;
    };
  }, [productId]);

  useEffect(() => {
    if (!productId) return;

    let active = true;

    async function loadPermission() {
      if (!user?.uid) {
        if (active) setPermissionStatus(DEFAULT_PERMISSION);
        return;
      }

      try {
        const status = await reviewService.canUserReview(user.uid, productId);
        if (active) setPermissionStatus(status);
      } catch (error) {
        console.error("Failed to check review permission", error);
        if (active) {
          setPermissionStatus({
            canReview: false,
            reason: "Unable to verify review eligibility.",
            code: "ERROR",
          });
        }
      }
    }

    loadPermission();
    return () => {
      active = false;
    };
  }, [user, productId, reviews]);

  const averageRating = useMemo(() => calculateAverageRating(reviews), [reviews]);
  const totalReviews = useMemo(() => calculateTotalReviews(reviews), [reviews]);
  const starDistribution = useMemo(() => calculateStarDistribution(reviews), [reviews]);

  const addReview = useCallback(
    async ({ rating, reviewText }) => {
      if (!user) {
        throw new Error("You must be logged in to submit a review.");
      }

      const created = await reviewService.createReview({
        productId,
        rating,
        reviewText,
      });

      setReviews((prev) => [created, ...prev]);
      return created;
    },
    [user, productId]
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
