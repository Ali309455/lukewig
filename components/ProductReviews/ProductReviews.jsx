"use client";

import { useState } from "react";
import { MessageSquare, Star, Filter, ArrowUpDown, Sparkles, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useReviews } from "@/hooks/useReviews";
import RatingStars from "./RatingStars";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

export default function ProductReviews({ productId, productName = "Product" }) {
  const { user } = useAuth();
  const {
    reviews,
    loading,
    averageRating,
    totalReviews,
    starDistribution,
    permissionStatus,
    addReview,
  } = useReviews(productId);

  const [selectedStarFilter, setSelectedStarFilter] = useState(0); // 0 = all
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "highest" | "lowest"
  const [showForm, setShowForm] = useState(false);

  // Filter & Sort Reviews
  const filteredReviews = reviews.filter((r) => {
    if (selectedStarFilter === 0) return true;
    return Math.round(r.rating) === selectedStarFilter;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    // default newest
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  if (loading) {
    return (
      <div className="py-8 space-y-4 animate-pulse">
        <div className="h-8 bg-pink-100/60 rounded-xl w-48" />
        <div className="h-32 bg-pink-50/60 rounded-3xl w-full" />
      </div>
    );
  }

  return (
    <section className="space-y-8 py-6">
      {/* Section Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-pink-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-luxe-rose uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-luxe-gold" />
            <span>Verified Hair Enthusiasts</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900">
            Customer Reviews & Ratings
          </h2>
        </div>

        {user ? (
          permissionStatus.canReview ? (
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-2.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{showForm ? "Close Review Form" : "Write a Review"}</span>
            </button>
          ) : (
            <span className="px-5 py-2.5 rounded-full bg-gray-100 text-gray-400 text-xs font-semibold flex items-center gap-2 cursor-not-allowed">
              <Lock className="w-4 h-4" />
              Review Locked
            </span>
          )
        ) : (
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Sign In to Review</span>
          </Link>
        )}
      </div>

      {/* Aggregate Rating & Star Breakdown Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Big Rating Box */}
        <div className="md:col-span-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-pink-100 pb-6 md:pb-0 md:pr-6 text-center space-y-2">
          <div className="font-serif text-6xl font-extrabold text-gray-900 tracking-tight">
            {averageRating}
            <span className="text-xl font-normal text-gray-400 font-sans"> / 5</span>
          </div>
          <RatingStars rating={averageRating} size="xl" />
          <p className="text-xs sm:text-sm font-semibold text-gray-600">
            Based on {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
          </p>
        </div>

        {/* Right Star Breakdown Progress Bars */}
        <div className="md:col-span-7 space-y-2.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = starDistribution.counts[star] || 0;
            const pct = starDistribution.percentages[star] || 0;

            return (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedStarFilter(selectedStarFilter === star ? 0 : star)}
                className={`w-full flex items-center gap-3 text-xs group focus:outline-hidden rounded-lg p-1 transition-colors ${
                  selectedStarFilter === star ? "bg-pink-50" : "hover:bg-pink-50/50"
                }`}
              >
                <div className="flex items-center gap-1 w-14 font-semibold text-gray-700 justify-end">
                  <span>{star}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>

                {/* Progress Bar Container */}
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-luxe-rose rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="w-16 text-right font-medium text-gray-500">
                  <span>{pct}% ({count})</span>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Write Review Form Collapsible / Active Container */}
      {(showForm || permissionStatus.canReview) && (
        <div className="animate-fade-in">
          <ReviewForm
            permissionStatus={permissionStatus}
            onSubmitReview={addReview}
            productName={productName}
          />
        </div>
      )}

      {/* Filter & Sort Controls Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-pink-100">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 flex-wrap">
          <Filter className="w-4 h-4 text-luxe-rose" />
          <span>Filter:</span>
          <button
            type="button"
            onClick={() => setSelectedStarFilter(0)}
            className={`px-3 py-1 rounded-full border transition-all ${
              selectedStarFilter === 0
                ? "bg-luxe-rose text-white border-luxe-rose"
                : "bg-white text-gray-600 border-gray-200 hover:border-luxe-rose"
            }`}
          >
            All Ratings ({totalReviews})
          </button>
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setSelectedStarFilter(star)}
              className={`px-3 py-1 rounded-full border transition-all ${
                selectedStarFilter === star
                  ? "bg-luxe-rose text-white border-luxe-rose"
                  : "bg-white text-gray-600 border-gray-200 hover:border-luxe-rose"
              }`}
            >
              {star} Stars ({starDistribution.counts[star] || 0})
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
          <ArrowUpDown className="w-4 h-4 text-luxe-rose" />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-luxe-rose shadow-2xs cursor-pointer"
          >
            <option value="newest">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      {sortedReviews.length > 0 ? (
        <div className="space-y-4">
          {sortedReviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-pink-100 text-center space-y-2">
          <p className="font-serif text-xl font-bold text-gray-800">No reviews found matching filter</p>
          <p className="text-xs text-gray-500">Try selecting all ratings to see all reviews.</p>
        </div>
      )}
    </section>
  );
}
