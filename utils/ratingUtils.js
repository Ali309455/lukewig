/**
 * Utility functions for rating calculations.
 * Pure functions designed to operate on any review array.
 */

/**
 * Calculates the average rating from an array of reviews.
 * @param {Array} reviews - Array of review objects containing a `rating` property.
 * @returns {number} Average rating rounded to 1 decimal place (or 0 if no reviews).
 */
export function calculateAverageRating(reviews = []) {
  if (!reviews || reviews.length === 0) return 0;

  const totalSum = reviews.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0);
  const average = totalSum / reviews.length;
  return Math.round(average * 10) / 10;
}

/**
 * Calculates total review count.
 * @param {Array} reviews
 * @returns {number} Total count of reviews.
 */
export function calculateTotalReviews(reviews = []) {
  return reviews ? reviews.length : 0;
}

/**
 * Calculates percentage distribution for 1 to 5 star ratings.
 * @param {Array} reviews
 * @returns {Object} Object containing counts and percentage for each star level (1 to 5).
 */
export function calculateStarDistribution(reviews = []) {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const percentages = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const total = calculateTotalReviews(reviews);

  if (total === 0) {
    return { counts, percentages, total: 0 };
  }

  reviews.forEach((review) => {
    const star = Math.min(5, Math.max(1, Math.round(review.rating)));
    counts[star] = (counts[star] || 0) + 1;
  });

  for (let star = 1; star <= 5; star++) {
    percentages[star] = Math.round((counts[star] / total) * 100);
  }

  return {
    counts,
    percentages,
    total,
  };
}
