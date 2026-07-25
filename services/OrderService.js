import { where, orderBy } from "firebase/firestore";
import dbService from "./DBService";

const ORDERS_COLLECTION = "orders";

/** @typedef {'Placed'|'Processing'|'Dispatched'|'Delivered'|'Cancelled'|'Refunded'} OrderStatus */

export const ORDER_STATUSES = [
  "Placed",
  "Processing",
  "Dispatched",
  "Delivered",
  "Cancelled",
  "Refunded",
];

/**
 * Order lifecycle operations.
 */
class OrderService {
  constructor() {
    this.db = dbService;
  }

  /**
   * @param {Object} orderData
   */
  async createOrder(orderData) {
    try {
      const status = orderData.status || "Placed";
      if (!ORDER_STATUSES.includes(status)) {
        throw new Error(`Invalid order status: ${status}`);
      }

      const id = await this.db.create(ORDERS_COLLECTION, {
        ...orderData,
        status,
      });

      return this.getOrder(id);
    } catch (error) {
      console.error("OrderService.createOrder failed:", error);
      throw new Error(error.message || "Failed to create order.");
    }
  }

  /**
   * @param {string} orderId
   */
  async getOrder(orderId) {
    try {
      const order = await this.db.get(ORDERS_COLLECTION, orderId);
      if (!order) {
        throw new Error("Order not found.");
      }
      return order;
    } catch (error) {
      console.error("OrderService.getOrder failed:", error);
      throw new Error(error.message || "Failed to fetch order.");
    }
  }

  /**
   * @param {string} userId
   */
  async getOrdersByUser(userId) {
    try {
      if (!userId) {
        throw new Error("User id is required.");
      }
      return await this.db.query(ORDERS_COLLECTION, [
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
      ]);
    } catch (error) {
      console.error("OrderService.getOrdersByUser failed:", error);
      throw new Error(error.message || "Failed to fetch user orders.");
    }
  }

  async getAllOrders() {
    try {
      return await this.db.query(ORDERS_COLLECTION, [orderBy("createdAt", "desc")]);
    } catch (error) {
      console.error("OrderService.getAllOrders failed:", error);
      throw new Error(error.message || "Failed to fetch orders.");
    }
  }

  /**
   * @param {string} orderId
   * @param {OrderStatus} status
   */
  async updateOrderStatus(orderId, status) {
    try {
      if (!ORDER_STATUSES.includes(status)) {
        throw new Error(`Invalid order status: ${status}`);
      }
      await this.db.update(ORDERS_COLLECTION, orderId, { status });
      return this.getOrder(orderId);
    } catch (error) {
      console.error("OrderService.updateOrderStatus failed:", error);
      throw new Error(error.message || "Failed to update order status.");
    }
  }

  /**
   * @param {string} orderId
   */
  async cancelOrder(orderId) {
    try {
      return this.updateOrderStatus(orderId, "Cancelled");
    } catch (error) {
      console.error("OrderService.cancelOrder failed:", error);
      throw new Error(error.message || "Failed to cancel order.");
    }
  }

  /**
   * Whether the user has a delivered order containing the product.
   * @param {string} userId
   * @param {string} productId
   * @param {Array} [ordersOverride]
   */
  hasDeliveredProduct(userId, productId, ordersOverride = null) {
    const orders = ordersOverride || [];
    return orders.some((order) => {
      if (order.userId !== userId || order.status !== "Delivered") return false;
      if (order.productId === productId) return true;
      if (Array.isArray(order.items)) {
        return order.items.some((item) => item.productId === productId);
      }
      return false;
    });
  }
}

const orderService = new OrderService();

export default orderService;
