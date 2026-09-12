"use client";

import React, { useState, useEffect, useRef } from "react";
import { WEDDING_STICKERS, POPULAR_EMOJIS } from "@/config/wedding";
import { Smile, Sparkles, X } from "lucide-react";

interface EmojiPickerProps {
  isOpen?: boolean;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
}

export function EmojiPicker({ isOpen = true, onClose, onSelectEmoji }: EmojiPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="absolute bottom-full mb-2 right-0 z-40 w-72 sm:w-80 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C5A46D]/40 shadow-[0_10px_35px_rgba(0,0,0,0.15)] text-right animate-in fade-in zoom-in-95 duration-150"
      style={{ direction: "rtl" }}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#C5A46D]/20">
        <div className="flex items-center gap-1.5 text-xs font-cairo font-bold text-[#231F1A]">
          <Smile className="w-3.5 h-3.5 text-[#9A7A40]" />
          <span>اختر رمزًا تعبيريًا</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full text-[#70735F] hover:bg-black/5 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-6 gap-1.5 max-h-48 overflow-y-auto p-1 scrollbar-thin">
        {POPULAR_EMOJIS.map((emoji, idx) => (
          <button
            key={`${emoji}-${idx}`}
            type="button"
            onClick={() => {
              onSelectEmoji(emoji);
            }}
            className="w-10 h-10 flex items-center justify-center text-xl rounded-xl hover:bg-[#FAF5EE] active:scale-95 transition-all hover:scale-110"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

interface StickerPickerProps {
  isOpen?: boolean;
  onClose: () => void;
  selectedSticker?: string;
  onSelectSticker: (stickerEmoji: string) => void;
}

export function StickerPicker({
  isOpen = true,
  onClose,
  selectedSticker,
  onSelectSticker,
}: StickerPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>(WEDDING_STICKERS[0]?.nameAr ?? "قلوب");

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCategoryObj = WEDDING_STICKERS.find((c) => c.nameAr === activeCategory) ?? WEDDING_STICKERS[0];

  return (
    <div
      ref={containerRef}
      className="absolute bottom-full mb-2 right-0 sm:right-auto sm:left-0 z-40 w-[295px] sm:w-[340px] p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C5A46D]/40 shadow-[0_10px_35px_rgba(0,0,0,0.18)] text-right animate-in fade-in zoom-in-95 duration-150"
      style={{ direction: "rtl" }}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#C5A46D]/20">
        <div className="flex items-center gap-1.5 text-xs font-cairo font-bold text-[#231F1A]">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>ملصقات زفاف أنيقة</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full text-[#70735F] hover:bg-black/5 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1.5 mb-2 scrollbar-none">
        {WEDDING_STICKERS.map((cat) => (
          <button
            key={cat.nameAr}
            type="button"
            onClick={() => setActiveCategory(cat.nameAr)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-cairo font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.nameAr
                ? "bg-[#231F1A] text-[#F8F2EA] shadow-xs"
                : "bg-[#FAF5EE] text-[#5C574F] hover:bg-[#F3EAD9]"
            }`}
          >
            {cat.nameAr}
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-4 gap-2 max-h-44 overflow-y-auto p-1">
        {currentCategoryObj?.stickers.map((stk) => {
          const isSelected = selectedSticker === stk.emoji;
          return (
            <button
              key={stk.id}
              type="button"
              onClick={() => {
                onSelectSticker(stk.emoji);
                onClose();
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                isSelected
                  ? "bg-[#FAF5EE] border-[#B58A48] shadow-sm ring-2 ring-[#C5A46D]/30 scale-105"
                  : "bg-white/80 border-[#C5A46D]/25 hover:border-[#C5A46D] hover:bg-[#FAF5EE]/60"
              }`}
            >
              <span className="text-2xl mb-0.5">{stk.emoji}</span>
              <span className="text-[10px] font-cairo text-[#5C574F] truncate w-full text-center">
                {stk.labelAr}
              </span>
            </button>
          );
        })}
      </div>

      {selectedSticker && (
        <div className="mt-2.5 pt-2 border-t border-[#C5A46D]/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-cairo text-[#231F1A]">
            <span>الملصق الحالي:</span>
            <span className="text-base">{selectedSticker}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              onSelectSticker("");
              onClose();
            }}
            className="text-[11px] font-cairo text-red-600 hover:underline"
          >
            إلغاء الملصق
          </button>
        </div>
      )}
    </div>
  );
}

export function JasmineSticker({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M18 42 C10 40 8 30 14 24 C20 18 30 24 24 36 Z" fill="#6B8E5F" />
      <path d="M46 42 C54 40 56 30 50 24 C44 18 34 24 40 36 Z" fill="#7C9F6E" />
      <path d="M32 50 C26 56 18 54 18 46 C18 38 28 40 32 50 Z" fill="#5F8053" />
      <path d="M32 50 C38 56 46 54 46 46 C46 38 36 40 32 50 Z" fill="#6B8E5F" />
      <ellipse cx="32" cy="18" rx="7.5" ry="13" fill="#FAF6EE" stroke="#E3D5C0" strokeWidth="1.2" />
      <ellipse cx="43" cy="27" rx="7.5" ry="12" transform="rotate(72 43 27)" fill="#FDFCFA" stroke="#E3D5C0" strokeWidth="1.2" />
      <ellipse cx="39" cy="40" rx="7.5" ry="12" transform="rotate(144 39 40)" fill="#FAF6EE" stroke="#E3D5C0" strokeWidth="1.2" />
      <ellipse cx="25" cy="40" rx="7.5" ry="12" transform="rotate(216 25 40)" fill="#FDFCFA" stroke="#E3D5C0" strokeWidth="1.2" />
      <ellipse cx="21" cy="27" rx="7.5" ry="12" transform="rotate(288 21 27)" fill="#FAF6EE" stroke="#E3D5C0" strokeWidth="1.2" />
      <circle cx="32" cy="31" r="5" fill="#E8B958" />
      <circle cx="32" cy="31" r="2.8" fill="#D49932" />
    </svg>
  );
}

export function RingSticker({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="38" r="16" stroke="#D1A757" strokeWidth="5" fill="none" />
      <circle cx="32" cy="38" r="16" stroke="#F9E2AF" strokeWidth="1.8" strokeDasharray="6 18" fill="none" />
      <path d="M28 23 L32 17 L36 23 Z" fill="#B08738" />
      <path d="M26 17 L38 17 L42 10 L22 10 Z" fill="#E8F4F8" stroke="#8DC8DE" strokeWidth="1.2" />
      <path d="M22 10 L32 3 L42 10 Z" fill="#FFFFFF" stroke="#8DC8DE" strokeWidth="1.2" />
      <path d="M28 10 L32 17 L36 10 Z" fill="#D1EDF7" />
      <path d="M44 7 L45.5 3 L47 7 L51 8.5 L47 10 L45.5 14 L44 10 L40 8.5 Z" fill="#F4D068" />
    </svg>
  );
}

export function BouquetSticker({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M25 36 L32 60 L39 36 Z" fill="#C59B63" stroke="#A67B44" strokeWidth="1.2" />
      <path d="M21 36 C21 36 32 40 43 36 L35 60 Z" fill="#D9B178" />
      <path d="M28 46 C32 48 34 48 36 46" stroke="#8C6534" strokeWidth="1.5" />
      <path d="M16 28 C14 20 22 18 26 24 Z" fill="#5F8053" />
      <path d="M48 28 C50 20 42 18 38 24 Z" fill="#6B8E5F" />
      <path d="M24 16 C28 10 36 10 34 18 Z" fill="#7C9F6E" />
      <circle cx="25" cy="26" r="6.5" fill="#F4A261" stroke="#E76F51" strokeWidth="1" />
      <circle cx="39" cy="26" r="6.5" fill="#E9C46A" stroke="#D49932" strokeWidth="1" />
      <circle cx="32" cy="20" r="7" fill="#FAF0CA" stroke="#E3D5C0" strokeWidth="1" />
      <circle cx="32" cy="28" r="5.5" fill="#F8EDEB" stroke="#E8D5D0" strokeWidth="1" />
      <circle cx="32" cy="20" r="2.2" fill="#E76F51" />
    </svg>
  );
}

export function WishStickerIllustration({
  stickerKey,
  className = "w-10 h-10",
}: {
  stickerKey?: string;
  className?: string;
}) {
  if (!stickerKey) return null;
  const key = stickerKey.toLowerCase();
  if (key === "jasmine" || key === "flower" || key.includes("🌸") || key.includes("🌼") || key.includes("ورد")) {
    return <JasmineSticker className={className} />;
  }
  if (key === "ring" || key.includes("💍") || key.includes("خاتم")) {
    return <RingSticker className={className} />;
  }
  if (key === "bouquet" || key.includes("💐") || key.includes("بوكيه")) {
    return <BouquetSticker className={className} />;
  }
  return <span className="text-2xl select-none leading-none">{stickerKey}</span>;
}

interface WishStickerBadgeProps {
  sticker?: string;
  stickerKey?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WishStickerBadge({
  sticker,
  stickerKey,
  size = "md",
  className = "",
}: WishStickerBadgeProps) {
  const value = sticker || stickerKey;
  if (!value) return null;

  return (
    <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <WishStickerIllustration stickerKey={value} className={size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10"} />
    </div>
  );
}
