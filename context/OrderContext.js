"use client";

import { createContext, useContext, useState, useEffect } from "react";
import orderService from "@/services/OrderService";
import productService from "@/services/ProductService";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const createdOrder = await orderService.createOrder(orderData);
      setOrders((prev) => [createdOrder, ...prev]);
      return createdOrder;
    } catch (err) {
      setError(err.message || "Failed to create order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOrdersByUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const userOrders = await orderService.getOrdersByUser(userId);
      setOrders(userOrders);
      return userOrders;
    } catch (err) {
      setError(err.message || "Failed to fetch orders");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const allOrders = await orderService.getAllOrders();
      setOrders(allOrders);
      return allOrders;
    } catch (err) {
      setError(err.message || "Failed to fetch all orders");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    setError(null);
    try {
      const updatedOrder = await orderService.updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? updatedOrder : order))
      );
      return updatedOrder;
    } catch (err) {
      setError(err.message || "Failed to update order status");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const cancelledOrder = await orderService.cancelOrder(orderId);
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? cancelledOrder : order))
      );
      return cancelledOrder;
    } catch (err) {
      setError(err.message || "Failed to cancel order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        createOrder,
        getOrdersByUser,
        getAllOrders,
        updateOrderStatus,
        cancelOrder,
        clearError,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
