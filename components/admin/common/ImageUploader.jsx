"use client";

import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";

export default function ImageUploader({ files, onChange }) {
  const previews = files.map((f) =>
    f instanceof File ? URL.createObjectURL(f) : f?.downloadURL || f
  );

  const handlePick = (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    onChange([...files, ...picked]);
    e.target.value = "";
  };

  const remove = (idx) => {
    const next = [...files];
    next.splice(idx, 1);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <label className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-pink-200 rounded-xl py-6 cursor-pointer hover:border-luxe-rose hover:bg-pink-50 transition-colors">
        <Upload className="w-6 h-6 text-luxe-rose" />
        <span className="text-xs font-semibold text-gray-500">
          Click to upload product images
        </span>
        <span className="text-[10px] text-gray-400">
          PNG, JPG, WEBP — multiple allowed
        </span>
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handlePick}
        />
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {previews.map((src, i) => (
            <div
              key={i}
              className="relative group aspect-square rounded-xl overflow-hidden border border-pink-100 bg-pink-50"
            >
              {src ? (
                <Image
                  src={src}
                  alt={`preview-${i}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="w-5 h-5 text-gray-300" />
                </div>
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
