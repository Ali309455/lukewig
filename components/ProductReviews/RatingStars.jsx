"use client";

import { useState } from "react";
import { Star } from "lucide-react";

/**
 * Reusable RatingStars Component
 * Can be used as a read-only star display OR interactive star picker.
 * 
 * @param {Object} props
 * @param {number} props.rating - Rating value (1 to 5)
 * @param {number} [props.maxStars=5] - Maximum star count
 * @param {string} [props.size="md"] - Size preset: "sm" | "md" | "lg" | "xl"
 * @param {boolean} [props.interactive=false] - Whether stars are clickable/hoverable
 * @param {Function} [props.onChange] - Callback fired when interactive star is clicked
 */
export default function RatingStars({
  rating = 5,
  maxStars = 5,
  size = "md",
  interactive = false,
  onChange,
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-7 h-7",
  };

  const starSizeClass = sizeClasses[size] || sizeClasses.md;

  const currentDisplay = interactive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div className="flex items-center space-x-1" aria-label={`Rating: ${rating} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = currentDisplay >= starValue;
        const isHalf = !isFilled && currentDisplay >= starValue - 0.5;

        return (
          <button
            key={index}
            type={interactive ? "button" : undefined}
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`transition-all duration-150 focus:outline-hidden ${
              interactive
                ? "cursor-pointer transform hover:scale-125 focus:ring-2 focus:ring-luxe-rose rounded-xs p-0.5"
                : "cursor-default"
            }`}
            aria-label={interactive ? `Rate ${starValue} star${starValue > 1 ? "s" : ""}` : undefined}
          >
            <Star
              className={`${starSizeClass} ${
                isFilled
                  ? "fill-amber-400 text-amber-400"
                  : isHalf
                  ? "fill-amber-300 text-amber-400"
                  : "fill-gray-100 text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
