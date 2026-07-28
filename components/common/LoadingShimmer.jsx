"use client";

export function ProductCardShimmer() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-xs border border-pink-100/60 overflow-hidden space-y-4">
      <div className="w-full h-64 rounded-xl shimmer-box" />
      <div className="space-y-2">
        <div className="w-1/3 h-3 rounded-sm shimmer-box" />
        <div className="w-3/4 h-5 rounded-sm shimmer-box" />
        <div className="w-1/2 h-4 rounded-sm shimmer-box" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="w-1/3 h-6 rounded-sm shimmer-box" />
        <div className="w-24 h-9 rounded-full shimmer-box" />
      </div>
    </div>
  );
}

export function ProductGridShimmer({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardShimmer key={i} />
      ))}
    </div>
  );
}

export function ProductDetailsShimmer() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div className="w-full h-[450px] rounded-2xl shimmer-box" />
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-xl shimmer-box" />
          <div className="w-20 h-20 rounded-xl shimmer-box" />
          <div className="w-20 h-20 rounded-xl shimmer-box" />
        </div>
      </div>
      <div className="space-y-6">
        <div className="w-1/4 h-4 rounded-sm shimmer-box" />
        <div className="w-3/4 h-8 rounded-sm shimmer-box" />
        <div className="w-1/3 h-6 rounded-sm shimmer-box" />
        <div className="w-full h-20 rounded-xl shimmer-box" />
        <div className="space-y-2">
          <div className="w-1/3 h-4 rounded-sm shimmer-box" />
          <div className="flex gap-3">
            <div className="w-16 h-10 rounded-lg shimmer-box" />
            <div className="w-16 h-10 rounded-lg shimmer-box" />
            <div className="w-16 h-10 rounded-lg shimmer-box" />
          </div>
        </div>
        <div className="w-full h-12 rounded-full shimmer-box" />
      </div>
    </div>
  );
}

export function CartShimmer() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="w-48 h-8 rounded-sm shimmer-box mb-6" />
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-pink-100 space-y-4">
        <div className="w-full h-16 rounded-xl shimmer-box" />
        <div className="w-full h-16 rounded-xl shimmer-box" />
        <div className="w-full h-16 rounded-xl shimmer-box" />
      </div>
    </div>
  );
}
