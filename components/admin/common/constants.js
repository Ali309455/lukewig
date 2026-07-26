export const CATEGORIES = [
  "Straight Wigs",
  "Wave Wigs",
  "Curly Wigs",
  "Colored Wigs",
  "HD Laces & Closures",
];

export const SIZE_KEYS = ['12"', '16"', '20"', '24"'];

export const inputCls =
  "w-full px-3.5 py-2.5 border border-pink-200 rounded-xl bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-luxe-rose transition-shadow placeholder:text-gray-300";

export function calcDiscountedPrice(originalPrice, discountPercent) {
  const orig = parseFloat(originalPrice);
  if (!orig || orig <= 0) return "";
  if (!discountPercent) return orig.toFixed(2);
  return (orig - (orig * discountPercent) / 100).toFixed(2);
}
