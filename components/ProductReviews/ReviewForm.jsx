"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, AlertCircle, CheckCircle2, Lock, Sparkles } from "lucide-react";
import RatingStars from "./RatingStars";

export default function ReviewForm({ permissionStatus, onSubmitReview, productName = "Product" }) {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { canReview, reason, code } = permissionStatus || { canReview: false, reason: "Login to write a review." };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canReview) return;

    if (!reviewText.trim()) {
      setErrorMsg("Please write a few words about your experience with this product.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      await onSubmitReview({ rating, reviewText });
      setSuccessMsg("Thank you! Your review has been submitted successfully.");
      setReviewText("");
      setRating(5);
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // If user cannot review, display permission alert banner
  if (!canReview) {
    return (
      <div className="bg-pink-50/70 border border-pink-100 rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-luxe-rose/10 text-luxe-rose flex items-center justify-center mx-auto shadow-xs">
          {code === "NOT_LOGGED_IN" ? (
            <Lock className="w-6 h-6" />
          ) : (
            <AlertCircle className="w-6 h-6" />
          )}
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h4 className="font-serif text-xl font-bold text-gray-900">Write a Customer Review</h4>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">{reason}</p>
        </div>

        {code === "NOT_LOGGED_IN" && (
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-luxe-rose text-white text-xs font-semibold hover:bg-luxe-rose-dark shadow-md hover:shadow-lg transition-all"
            >
              <span>Sign In To Review</span>
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-md space-y-6">
      <div className="border-b border-pink-100 pb-4 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h4 className="font-serif text-2xl font-bold text-gray-900">Share Your Experience</h4>
          <p className="text-xs text-gray-500">Your feedback helps hair lovers make the best choice for {productName}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Verified Purchaser
        </span>
      </div>

      {successMsg ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      ) : (
        <>
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Star Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
              Overall Rating
            </label>
            <div className="flex items-center gap-3">
              <RatingStars rating={rating} size="xl" interactive onChange={setRating} />
              <span className="text-xs font-bold text-luxe-rose bg-pink-50 px-2.5 py-1 rounded-md">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <label htmlFor="reviewText" className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
              Your Review
            </label>
            <textarea
              id="reviewText"
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about the texture, lace melt, hair density, and styling versatility..."
              className="w-full p-4 border border-pink-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-luxe-rose text-sm text-gray-800 shadow-2xs"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 focus:outline-hidden focus:ring-2 focus:ring-luxe-rose disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "Submitting..." : "Submit Verified Review"}</span>
            </button>
          </div>
        </>
      )}
    </form>
  );
}
