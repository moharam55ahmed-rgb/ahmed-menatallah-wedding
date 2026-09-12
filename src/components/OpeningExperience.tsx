"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";
import { useAudio } from "./AudioContext";

interface OpeningExperienceProps {
  onOpen?: () => void;
}

export default function OpeningExperience({ onOpen }: OpeningExperienceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState<string | null>(null);
  const { isPlaying, isMuted, hasStarted, togglePlay, toggleMute, startAudioExperience, playCelebrationSound } = useAudio();

  // Read personalized guest name from URL (?guest=...)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get("guest");
      if (guest?.trim()) setGuestName(guest.trim());
    }
  }, []);

  // Lock body scroll while opening screen is active
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // 1. Start audio experience immediately
    startAudioExperience();

    // 2. Royal champagne celebration confetti explosion
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#C9A96A", "#E8D6AE", "#F7F1E6", "#302018", "#FFDF78"],
      ticks: 180,
      gravity: 0.8,
    });

    // 3. Smooth, immediate transition to main page without delay or popup boxes
    window.scrollTo({ top: 0, behavior: "instant" });
    if (onOpen) onOpen();
  };

  const handleZaghrouda = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCelebrationSound();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x: 0.2, y: 0.88 },
      colors: ["#C9A96A", "#E8D6AE", "#F7F1E6", "#302018", "#FFDF78"],
      ticks: 140,
    });
  };

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasStarted) {
      togglePlay();
    } else {
      toggleMute();
    }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F7F2E8] overflow-hidden select-none"
          style={{
            direction: "rtl",
            height: "100dvh",
            maxHeight: "100dvh",
          }}
        >
          {/* Ambient Desktop Backdrop Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[600px] h-[900px] rounded-full bg-[#EADDC7]/40 blur-[100px]" />
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              THE MASTER INVITATION CARD (Exact Image from User Reference)
              Aspect Ratio: 597 / 1024 (~ 0.583)
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="relative h-full max-h-[100dvh] aspect-[597/1024] max-w-[100vw] flex items-center justify-center shadow-[0_20px_60px_rgba(48,32,24,0.18)]">
            {/* The High-Resolution Exact Reference Image (Untouched pure design) */}
            <Image
              src="/images/opening-card.jpg"
              alt="دعوة زفاف أحمد ومنة الله"
              fill
              priority
              className="object-contain pointer-events-none select-none"
              sizes="(max-width: 768px) 100vw, 550px"
            />

            {/* Optional Personalized Guest Badge at Top if URL has ?guest= */}
            {guestName && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-[4.5%] inset-x-0 mx-auto w-fit z-30 px-3 py-0.5 rounded-full bg-[#FAF5EC]/90 border border-[#C5A059]/40 shadow-xs backdrop-blur-xs flex items-center gap-1.5"
              >
                <span className="text-[9px] text-[#C5A059]">✦</span>
                <span className="text-[10px] sm:text-[11px] font-cairo font-medium text-[#423225]">
                  دعوة خاصة إلى {guestName}
                </span>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                1. TRANSPARENT INTERACTIVE ENVELOPE HOTSPOT
                Directly clicking on the envelope opens the invitation instantly!
                ═════════════════════════════════════════════════════════════════ */}
            <button
              type="button"
              onClick={handleOpen}
              className="absolute top-[38%] left-[16%] w-[68%] h-[25%] cursor-pointer z-20 bg-transparent border-0 outline-none active:scale-[0.99] transition-transform duration-150"
              title="اضغط لفتح الدعوة"
              aria-label="افتح المظروف"
            />

            {/* ═════════════════════════════════════════════════════════════════
                2. TRANSPARENT INTERACTIVE "افتح الدعوة" BUTTON HOTSPOT
                Positioned exactly over the button in the image.
                No duplicate graphics, no borders, pure original image!
                ═════════════════════════════════════════════════════════════════ */}
            <button
              type="button"
              onClick={handleOpen}
              className="absolute top-[64.5%] left-[23%] w-[54%] h-[8%] rounded-full cursor-pointer z-20 bg-transparent border-0 outline-none active:scale-[0.97] hover:brightness-105 transition-all duration-150"
              title="افتح الدعوة"
              aria-label="افتح الدعوة"
            >
              {/* Subtle gentle shimmer sweep on hover */}
              <span className="pointer-events-none absolute inset-0 rounded-full bg-white/0 hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors duration-200" />
            </button>

            {/* ═════════════════════════════════════════════════════════════════
                3. TRANSPARENT INTERACTIVE "زغرودة!" BUTTON HOTSPOT (Bottom Left)
                Positioned exactly over the "زغرودة!" button in the image.
                ═════════════════════════════════════════════════════════════════ */}
            <button
              type="button"
              onClick={handleZaghrouda}
              className="absolute top-[85.5%] left-[6%] w-[26%] h-[7%] rounded-full cursor-pointer z-20 bg-transparent border-0 outline-none active:scale-[0.93] hover:brightness-105 transition-transform duration-150"
              title="أطلق زغرودة فرح!"
              aria-label="زغرودة"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full hover:bg-white/[0.08] active:bg-white/[0.15] transition-colors duration-200" />
            </button>

            {/* ═════════════════════════════════════════════════════════════════
                4. TRANSPARENT INTERACTIVE AUDIO TOGGLE BUTTON HOTSPOT (Bottom Right)
                Positioned exactly over the sound button in the image.
                ═════════════════════════════════════════════════════════════════ */}
            <button
              type="button"
              onClick={handleToggleSound}
              className="absolute top-[85.5%] right-[6%] w-[14%] aspect-square rounded-full cursor-pointer z-20 bg-transparent border-0 outline-none active:scale-[0.9] hover:brightness-105 transition-transform duration-150 flex items-center justify-center"
              title={isMuted || (!isPlaying && hasStarted) ? "تشغيل الصوت" : "كتم الصوت"}
              aria-label="التحكم بالصوت"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors duration-200" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
