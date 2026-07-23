"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, UserCheck, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      if (email.toLowerCase().includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/shop");
      }
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
      setLoading(false);
    }
  };

  const handleDemoAdmin = async () => {
    setEmail("admin@luxehair.com");
    setPassword("admin123");
    setLoading(true);
    await login("admin@luxehair.com", "admin123");
    router.push("/admin");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-pink-50/40 via-white to-amber-50/40">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-pink-100/80 space-y-6 relative overflow-hidden">
        
        <div className="text-center space-y-2">
          <span className="font-serif text-3xl font-bold text-luxe-gold block">Versatile By Versha</span>
          <h1 className="font-serif text-3xl font-extrabold text-gray-900">Welcome Back</h1>
          <p className="text-xs text-gray-500">Sign in to access your saved wishlist and cart</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Email Address</label>
            <div className="relative">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@luxehair.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Password</label>
            <div className="relative">
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin text-lg">⏳</span>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Admin Quick Button */}
        <div className="pt-2 border-t border-gray-100 text-center space-y-3">
          <button
            onClick={handleDemoAdmin}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-luxe-rose/10 via-amber-50 to-luxe-rose/10 text-luxe-rose border border-luxe-rose/30 text-xs font-bold hover:bg-luxe-rose hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-luxe-gold" />
            <span>Click for Quick Demo Admin Login</span>
          </button>
          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-luxe-rose font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
