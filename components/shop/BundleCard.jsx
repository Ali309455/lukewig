"use client";

import Image from "next/image";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function BundleCard({ bundle }) {
  const { addToCart } = useCart();

  const handleAddBundle = () => {
    addToCart(
      {
        id: bundle.id,
        name: bundle.title,
        image: bundle.image,
      },
      {
        size: "Bundle Deal",
        price: bundle.price,
        image: bundle.image,
      },
      1
    );
  };

  return (
    <div className="bg-gradient-to-br from-white via-pink-50/30 to-amber-50/30 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all border border-pink-200/60 relative flex flex-col justify-between">
      {bundle.popular && (
        <span className="absolute -top-3 left-6 bg-luxe-gold text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md tracking-wider uppercase">
          ★ BEST SELLER BUNDLE
        </span>
      )}

      <div>
        <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 shadow-inner">
          <Image
            src={bundle.image}
            alt={bundle.title}
            fill
            className="object-contain object-center"
          />
          <span className="absolute bottom-3 right-3 bg-luxe-rose text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {bundle.savings}
          </span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">{bundle.title}</h3>

        <ul className="space-y-2 mb-6">
          {bundle.includes.map((item, idx) => (
            <li key={idx} className="flex items-center text-xs text-gray-600 gap-2">
              <CheckCircle2 className="w-4 h-4 text-luxe-rose flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-pink-100">
        <div>
          <span className="text-xs text-gray-400 block font-medium">Bundle Special Price</span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-luxe-rose">${bundle.price}</span>
            <span className="text-sm text-gray-400 line-through">${bundle.originalPrice}</span>
          </div>
        </div>

        <button
          onClick={handleAddBundle}
          className="px-5 py-3 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Claim Deal</span>
        </button>
      </div>
    </div>
  );
}
