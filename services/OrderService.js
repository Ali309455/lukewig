import { where, orderBy } from "firebase/firestore";
import dbService from "./DBService";
import productService from "./ProductService";
import bundleService from "./BundleService";

const ORDERS_COLLECTION = "orders";

/** @typedef {'Placed'|'Processing'|'Dispatched'|'Delivered'|'Cancelled'|'Refunded'} OrderStatus */

export const ORDER_STATUSES = [
  "Pending",
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
      const orderStatus = orderData.orderStatus || orderData.status || "Pending";
      if (!ORDER_STATUSES.includes(orderStatus)) {
        throw new Error(`Invalid order status: ${orderStatus}`);
      }

      // Validate stock / bundle existence before creating order
      if (orderData.items && Array.isArray(orderData.items)) {
        for (const item of orderData.items) {
          const itemType = item.itemType || "product";

          if (itemType === "bundle") {
            const bundle = await bundleService.getBundle(item.productId);
            if (!bundle) {
              throw new Error(`Bundle "${item.name}" not found.`);
            }
          } else {
            const product = await productService.getProduct(item.productId);
            const variant = productService.getVariantBySize(product, item.size);
            if (!variant) {
              throw new Error(
                `Size "${item.size}" not available for "${product.name}".`
              );
            }
            const availableStock = variant.stock ?? 0;
            if (item.qty > availableStock) {
              throw new Error(
                `Insufficient stock for "${product.name}" (${item.size}). Available: ${availableStock}, requested: ${item.qty}.`
              );
            }
          }
        }
      }

      const id = await this.db.create(ORDERS_COLLECTION, {
        ...orderData,
        orderStatus,
      });

      // Decrement stock after successful order creation (products only)
      if (orderData.items && Array.isArray(orderData.items)) {
        for (const item of orderData.items) {
          if (item.itemType === "bundle") continue;
          if (item.size && item.size !== "Bundle Deal") {
            await productService.decrementVariantStock(
              item.productId,
              item.size,
              item.qty || 1
            );
          }
        }
      }

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
  async updateOrderStatus(orderId, orderStatus) {
    try {
      if (!ORDER_STATUSES.includes(orderStatus)) {
        throw new Error(`Invalid order status: ${orderStatus}`);
      }
      await this.db.update(ORDERS_COLLECTION, orderId, { orderStatus });
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
      if (order.userId !== userId || order.orderStatus !== "Delivered") return false;
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
