import { where, orderBy } from "firebase/firestore";
import dbService from "./DBService";
import orderService from "./OrderService";
import productService from "./ProductService";
import authService from "./AuthService";

const REVIEWS_COLLECTION = "reviews";

/**
 * Product review operations & aggregate rating maintenance.
 */
class ReviewService {
  constructor() {
    this.db = dbService;
  }

  /**
   * @param {Object} reviewData
   * @param {string} reviewData.productId
   * @param {number} reviewData.rating
   * @param {string} reviewData.reviewText
   * @param {File} [reviewImage]
   */
  async createReview(reviewData, reviewImage = null) {
    try {
      const profile = await authService.getCurrentUser();
      if (!profile?.uid) {
        throw new Error("You must be logged in to submit a review.");
      }

      const { productId, rating, reviewText } = reviewData;
      if (!productId || !rating || !reviewText?.trim()) {
        throw new Error("Product, rating, and review text are required.");
      }

      const permission = await this.canUserReview(profile.uid, productId);
      if (!permission.canReview) {
        throw new Error(permission.reason || "You are not allowed to review this product.");
      }

      const reviewPayload = {
        productId,
        userId: profile.uid,
        userEmail: profile.email || "",
        userName: profile.displayName || profile.email?.split("@")[0] || "Customer",
        rating: Number(rating),
        reviewText: reviewText.trim(),
        verified: true,
        image: null,
      };

      const reviewId = await this.db.create(REVIEWS_COLLECTION, reviewPayload);

      if (reviewImage) {
        const ext = reviewImage.name?.split(".").pop() || "jpg";
        const path = `reviews/${reviewId}/${Date.now()}.${ext}`;
        const uploaded = await this.db.uploadFile(reviewImage, path);
        await this.db.update(REVIEWS_COLLECTION, reviewId, { image: uploaded });
        reviewPayload.image = uploaded;
      }

      await this.syncProductRatingAggregates(productId);

      return { id: reviewId, ...reviewPayload };
    } catch (error) {
      console.error("ReviewService.createReview failed:", error);
      throw new Error(error.message || "Failed to create review.");
    }
  }

  /**
   * @param {string} reviewId
   * @param {Object} data
   */
  async updateReview(reviewId, data) {
    try {
      const profile = await authService.getCurrentUser();
      if (!profile?.uid) {
        throw new Error("You must be logged in to update a review.");
      }

      const existing = await this.db.get(REVIEWS_COLLECTION, reviewId);
      if (!existing) {
        throw new Error("Review not found.");
      }
      if (existing.userId !== profile.uid) {
        throw new Error("You can only edit your own review.");
      }

      await this.db.update(REVIEWS_COLLECTION, reviewId, data);
      await this.syncProductRatingAggregates(existing.productId);

      return this.db.get(REVIEWS_COLLECTION, reviewId);
    } catch (error) {
      console.error("ReviewService.updateReview failed:", error);
      throw new Error(error.message || "Failed to update review.");
    }
  }

  /**
   * @param {string} reviewId
   */
  async deleteReview(reviewId) {
    try {
      const profile = await authService.getCurrentUser();
      if (!profile?.uid) {
        throw new Error("You must be logged in to delete a review.");
      }

      const existing = await this.db.get(REVIEWS_COLLECTION, reviewId);
      if (!existing) {
        throw new Error("Review not found.");
      }
      if (existing.userId !== profile.uid) {
        throw new Error("You can only delete your own review.");
      }

      if (existing.image?.storagePath) {
        await this.db.deleteFile(existing.image.storagePath);
      }

      await this.db.delete(REVIEWS_COLLECTION, reviewId);
      await this.syncProductRatingAggregates(existing.productId);
    } catch (error) {
      console.error("ReviewService.deleteReview failed:", error);
      throw new Error(error.message || "Failed to delete review.");
    }
  }

  /**
   * @param {string} productId
   */
  async getProductReviews(productId) {
    try {
      if (!productId) return [];

      const reviews = await this.db.query(REVIEWS_COLLECTION, [
        where("productId", "==", productId),
        orderBy("createdAt", "desc"),
      ]);

      return reviews.map((review) => ({
        ...review,
        createdAt: review.createdAt?.toDate
          ? review.createdAt.toDate().toISOString()
          : review.createdAt,
      }));
    } catch (error) {
      console.error("ReviewService.getProductReviews failed:", error);
      throw new Error(error.message || "Failed to fetch reviews.");
    }
  }

  /**
   * @param {string} productId
   */
  async calculateAverageRating(productId) {
    try {
      const reviews = await this.getProductReviews(productId);
      if (!reviews.length) {
        return { averageRating: 0, ratingCount: 0, ratingSum: 0 };
      }

      const ratingSum = reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0);
      const ratingCount = reviews.length;
      const averageRating = Math.round((ratingSum / ratingCount) * 10) / 10;

      return { averageRating, ratingCount, ratingSum };
    } catch (error) {
      console.error("ReviewService.calculateAverageRating failed:", error);
      throw new Error(error.message || "Failed to calculate rating.");
    }
  }

  /**
   * @param {string} userId
   * @param {string} productId
   */
  async canUserReview(userId, productId) {
    try {
      if (!userId) {
        return {
          canReview: false,
          reason: "Login to write a review.",
          code: "NOT_LOGGED_IN",
        };
      }

      const existingReviews = await this.getProductReviews(productId);
      const hasAlreadyReviewed = existingReviews.some(
        (review) => review.userId === userId
      );

      if (hasAlreadyReviewed) {
        return {
          canReview: false,
          reason: "You have already reviewed this product.",
          code: "ALREADY_REVIEWED",
        };
      }

      const orders = await orderService.getOrdersByUser(userId);
      const hasDelivered = orderService.hasDeliveredProduct(
        userId,
        productId,
        orders
      );

      if (!hasDelivered) {
        return {
          canReview: false,
          reason: "You can review this product after delivery.",
          code: "NO_DELIVERED_ORDER",
        };
      }

      return {
        canReview: true,
        reason: "You are verified to review this product.",
        code: "AUTHORIZED",
      };
    } catch (error) {
      console.error("ReviewService.canUserReview failed:", error);
      throw new Error(error.message || "Failed to validate review permission.");
    }
  }

  /**
   * Recalculate and persist product rating fields.
   * @param {string} productId
   */
  async syncProductRatingAggregates(productId) {
    try {
      const { averageRating, ratingCount, ratingSum } =
        await this.calculateAverageRating(productId);

      await productService.updateProduct(productId, {
        averageRating,
        ratingCount,
        ratingSum,
      });
    } catch (error) {
      console.error("ReviewService.syncProductRatingAggregates failed:", error);
      throw new Error(error.message || "Failed to sync product ratings.");
    }
  }
}

const reviewService = new ReviewService();

export default reviewService;
