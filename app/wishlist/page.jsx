"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowLeft, LogIn } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlistItems, wishlistCount, removeFromWishlist, loading } =
    useWishlist();
  const { user } = useAuth();
  const { addToCart } = useCart();

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-pink-100 text-luxe-rose rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Sign In to View Wishlist
        </h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Your wishlist is saved to your account. Please sign in to see your
          saved items.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-luxe-rose text-white font-semibold text-xs shadow-lg hover:bg-luxe-rose-dark transition-all"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In</span>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto animate-pulse" />
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-pink-100 text-luxe-rose rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Your Wishlist is Empty
        </h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Save your favorite styles by tapping the heart icon on any product.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-luxe-rose text-white font-semibold text-xs shadow-lg hover:bg-luxe-rose-dark transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-pink-100 pb-4">
        <h1 className="font-serif text-3xl font-extrabold text-gray-900">
          My Wishlist ({wishlistCount})
        </h1>
        <Link
          href="/shop"
          className="text-xs font-semibold text-luxe-rose flex items-center gap-1 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.productId}
            className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 hover:shadow-lg transition-all group"
          >
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-pink-50/40 mb-3">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <button
                type="button"
                onClick={() => removeFromWishlist(item.productId)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-white transition-all shadow-sm"
                aria-label={`Remove ${item.name} from wishlist`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <span className="text-[11px] font-bold text-luxe-rose uppercase tracking-widest block mb-1">
              {item.category}
            </span>

            <Link href={`/product/${item.productId}`}>
              <h3 className="font-serif text-base font-bold text-gray-900 leading-snug line-clamp-2 hover:text-luxe-rose transition-colors min-h-[2.5rem]">
                {item.name}
              </h3>
            </Link>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span className="font-serif text-xl font-bold text-gray-900">
                ${item.price}
              </span>
              <button
                type="button"
                onClick={() => {
                  const product = {
                    id: item.productId,
                    name: item.name,
                    category: item.category,
                    image: item.image,
                  };
                  addToCart(product, { size: '20"', price: item.price }, 1, "product");
                }}
                className="px-3 py-1.5 rounded-full bg-luxe-rose text-white hover:bg-luxe-rose-dark text-xs font-semibold shadow-sm transition-all flex items-center gap-1"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
