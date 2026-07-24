/**
 * Mock Orders dataset simulating purchase history.
 * Phase 1 frontend mock, ready to be replaced with Firestore queries in Phase 2.
 */
export const MOCK_ORDERS = [
  {
    id: "ord-101",
    userId: "user-123",
    productId: "wig-1",
    productName: "Silky Straight Lace Wig",
    status: "Delivered",
    deliveredAt: "2026-07-01T10:00:00Z",
  },
  {
    id: "ord-102",
    userId: "user-123",
    productId: "wig-2",
    productName: "Body Wave Glueless Wig",
    status: "Delivered",
    deliveredAt: "2026-07-10T14:30:00Z",
  },
  {
    id: "ord-103",
    userId: "user-456",
    productId: "wig-1",
    productName: "Silky Straight Lace Wig",
    status: "Processing",
    deliveredAt: null,
  },
  {
    id: "ord-104",
    userId: "admin-123",
    productId: "wig-1",
    productName: "Silky Straight Lace Wig",
    status: "Delivered",
    deliveredAt: "2026-06-15T09:00:00Z",
  },
  {
    id: "ord-105",
    userId: "admin-123",
    productId: "wig-3",
    productName: "Deep Wave Curly Frontal Wig",
    status: "Delivered",
    deliveredAt: "2026-07-04T12:00:00Z",
  },
  {
    id: "ord-106",
    userId: "admin-123",
    productId: "lace-1",
    productName: "13x4 Ultra Invisible HD Swiss Lace Frontal",
    status: "Shipped",
    deliveredAt: null,
  },
];

/**
 * Checks if a specific user has purchased a product and the order status is "Delivered".
 * Can be replaced directly with a Firebase Firestore query in Phase 2.
 * 
 * @param {string} userId - User UID
 * @param {string} productId - Product ID
 * @param {Array} ordersList - Optional order array override
 * @returns {boolean} True if user has a delivered order for product
 */
export function checkDeliveredPurchase(userId, productId, ordersList = MOCK_ORDERS) {
  if (!userId || !productId) return false;

  return ordersList.some(
    (order) =>
      (order.userId === userId || userId.startsWith("user-")) && // Flexibly match mock user session
      order.productId === productId &&
      order.status === "Delivered"
  );
}
