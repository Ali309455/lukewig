"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, UserCheck, Eye, EyeOff } from "lucide-react";
import { useAuth} from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, googleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
  setLoading(true);
  setError(null);

  try {
    const user = await googleLogin();

    // Redirect based on role
    if (user?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  } catch (err) {
    console.error(err);
    setError(err.message || "Google sign-in failed. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-linear-to-br from-pink-50/40 via-white to-amber-50/40">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-pink-100/80 space-y-6 relative overflow-hidden">
        
        <div className="text-center space-y-2">
          <span className="font-serif text-3xl font-bold text-luxe-gold block">Versatile By Versha</span>
          <h1 className="font-serif text-3xl font-extrabold text-gray-900">Welcome Back, Queen</h1>
          <p className="text-xs text-gray-500">Sign in to access your saved wishlist, orders, and cart</p>
        </div>
        <button
  type="button"
  onClick={handleGoogleLogin}
  disabled={loading}
  className="group flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-xs transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md focus:outline-hidden focus:ring-2 focus:ring-luxe-rose focus:ring-offset-2 active:scale-[0.98]"
>
  {/* Google Logo */}
  <svg
    className="h-5 w-5 shrink-0"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.7 15 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.6 16.3 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.4 5.6-6.5 7.3l6.2 5.2C38.6 37.2 44 31.2 44 24c0-1.3-.1-2.3-.4-3.5z"
    />
  </svg>

  <span className="whitespace-nowrap">
    Continue with Google
  </span>
</button>

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
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Password</label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center pt-2">
          Don't have an account?{" "}
          <Link href="/signup" className="text-luxe-rose font-semibold hover:underline">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}
