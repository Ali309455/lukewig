import { checkDeliveredPurchase, MOCK_ORDERS } from "@/lib/mockOrders";

/**
 * Review Permission Validator
 * Validates whether a user meets all 6 criteria to submit a product review.
 * 
 * Rules:
 * 1. User is logged in.
 * 2. User is authenticated (AuthContext confirmed).
 * 3. User object has valid ID.
 * 4. User has purchased the product.
 * 5. Order status is "Delivered".
 * 6. User has not already reviewed this product.
 * 
 * @param {Object} params
 * @param {Object|null} params.user - Current user object from AuthContext
 * @param {string} params.productId - ID of product being reviewed
 * @param {Array} params.existingReviews - Array of current reviews for this product
 * @param {Array} [params.orders] - Optional order history list
 * @returns {Object} { canReview: boolean, reason: string, code: string }
 */
export function canUserReviewProduct({ user, productId, existingReviews = [], orders = MOCK_ORDERS }) {
  // Condition 1, 2, 3: User logged in & authenticated
  if (!user || !user.uid) {
    return {
      canReview: false,
      reason: "Login to write a review.",
      code: "NOT_LOGGED_IN",
    };
  }

  // Condition 6: Check if user has already reviewed this product
  const hasAlreadyReviewed = existingReviews.some(
    (review) => review.userId === user.uid || (user.email && review.userEmail === user.email)
  );

  if (hasAlreadyReviewed) {
    return {
      canReview: false,
      reason: "You have already reviewed this product.",
      code: "ALREADY_REVIEWED",
    };
  }

  // Condition 4 & 5: Check if user has purchased the product and order status is "Delivered"
  // For demo/mock environment: allow users who bought it in MOCK_ORDERS OR grant mock demo access for newly created sessions if they marked test purchase
  const hasDeliveredOrder = checkDeliveredPurchase(user.uid, productId, orders);

  if (!hasDeliveredOrder) {
    return {
      canReview: false,
      reason: "You can review this product after delivery.",
      code: "NO_DELIVERED_ORDER",
    };
  }

  // All 6 conditions met!
  return {
    canReview: true,
    reason: "You are verified to review this product.",
    code: "AUTHORIZED",
  };
}
