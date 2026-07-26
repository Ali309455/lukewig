"use client";

import Image from "next/image";
import { Upload, X } from "lucide-react";

export default function SingleImageUploader({ file, existingUrl, onChange }) {
  const preview = file
    ? URL.createObjectURL(file)
    : existingUrl || null;

  const handlePick = (e) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    onChange(picked);
    e.target.value = "";
  };

  const remove = () => onChange(null);

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative group w-full aspect-video rounded-xl overflow-hidden border border-pink-100 bg-pink-50">
          <Image src={preview} alt="bundle preview" fill className="object-cover" />
          <button
            type="button"
            onClick={remove}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-pink-200 rounded-xl py-6 cursor-pointer hover:border-luxe-rose hover:bg-pink-50 transition-colors">
          <Upload className="w-6 h-6 text-luxe-rose" />
          <span className="text-xs font-semibold text-gray-500">
            Click to upload bundle image
          </span>
          <span className="text-[10px] text-gray-400">PNG, JPG, WEBP</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePick}
          />
        </label>
      )}
    </div>
  );
}
