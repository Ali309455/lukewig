"use client";

import { CheckCircle2, User } from "lucide-react";
import RatingStars from "./RatingStars";

export default function ReviewCard({ review }) {
  const { userName, rating, reviewText, createdAt, verified = true } = review;

  // Format date safely
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Verified Order";

  // Initials for avatar
  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-pink-100 shadow-xs hover:shadow-md transition-all space-y-3">
      {/* Top Header: User Profile & Rating */}
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          {/* Avatar Circle */}
          <div className="w-10 h-10 rounded-full bg-pink-100 text-luxe-rose flex items-center justify-center font-bold text-sm border border-pink-200">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-gray-900">{userName}</h4>
              {verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  Verified Buyer
                </span>
              )}
            </div>
            <span className="text-[11px] text-gray-400">{formattedDate}</span>
          </div>
        </div>

        {/* Rating Stars */}
        <RatingStars rating={rating} size="sm" />
      </div>

      {/* Review Comment */}
      <p className="text-gray-700 text-sm leading-relaxed pl-1 sm:pl-13">
        {reviewText}
      </p>
    </div>
  );
}
