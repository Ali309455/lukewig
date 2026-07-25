"use client";

import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthState((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const userData = await authService.register(name, email, password);
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const userData = await authService.googleLogin();
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    await authService.forgotPassword(email);
  };

  const verifyEmail = async () => {
    await authService.verifyEmail();
  };

  const updateProfile = async (data) => {
    const userData = await authService.updateProfile(data);
    setUser(userData);
    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        googleLogin,
        forgotPassword,
        verifyEmail,
        updateProfile,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
