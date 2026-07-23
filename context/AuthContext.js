"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for persisted user session
    const savedUser = localStorage.getItem("luxe_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user", err);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API / Firebase delay
    await new Promise((res) => setTimeout(res, 800));

    // Demo admin check or standard user login
    const isAdmin = email.toLowerCase().includes("admin");
    const userData = {
      uid: isAdmin ? "admin-123" : `user-${Date.now()}`,
      email,
      displayName: email.split("@")[0],
      role: isAdmin ? "admin" : "customer",
    };

    setUser(userData);
    localStorage.setItem("luxe_user", JSON.stringify(userData));
    setLoading(false);
    return userData;
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    const userData = {
      uid: `user-${Date.now()}`,
      email,
      displayName: name,
      role: "customer",
    };

    setUser(userData);
    localStorage.setItem("luxe_user", JSON.stringify(userData));
    setLoading(false);
    return userData;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("luxe_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
