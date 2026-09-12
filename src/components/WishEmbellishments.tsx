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

  const sizeClasses = {
    sm: "px-2 py-0.5 text-sm",
    md: "px-3 py-1 text-lg",
    lg: "px-4 py-1.5 text-2xl",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FAF5EE] to-[#FDFBFA] border border-[#C5A46D]/35 shadow-xs ${sizeClasses[size] ?? sizeClasses.md} ${className}`}
    >
      <span className="leading-none select-none">{value}</span>
      <span className="text-[10px] font-cairo font-semibold text-[#8A6A32]">
        ملصق فاخر
      </span>
    </div>
  );
}
