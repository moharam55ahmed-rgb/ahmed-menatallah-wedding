"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { wedding } from "@/config/wedding";
import { useAudio } from "./AudioContext";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

interface OpeningExperienceProps {
  onOpen?: () => void;
}

export default function OpeningExperience({ onOpen }: OpeningExperienceProps) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
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
    if (phase !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");

    // Start audio experience
    startAudioExperience();

    // Gentle royal champagne celebration confetti
    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.52 },
      colors: ["#C9A96A", "#E8D6AE", "#F7F1E6", "#241D18", "#FFF8EE"],
      ticks: 180,
      gravity: 0.8,
    });

    // Smooth transition to main invitation
    setTimeout(() => {
      setPhase("done");
      window.scrollTo({ top: 0, behavior: "instant" });
      if (onOpen) setTimeout(onOpen, 350);
    }, 850);
  };

  const handleZaghrouda = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCelebrationSound();
    confetti({
      particleCount: 50,
      spread: 65,
      origin: { x: 0.15, y: 0.88 },
      colors: ["#C9A96A", "#E8D6AE", "#F7F1E6", "#3A2D24", "#FFDF78"],
      ticks: 150,
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
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#FBF8F1] overflow-hidden select-none w-full"
          style={{
            direction: "rtl",
            height: "100dvh",
            maxHeight: "100dvh",
            paddingTop: "max(env(safe-area-inset-top), 16px)",
            paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
            paddingLeft: "max(env(safe-area-inset-left), 16px)",
            paddingRight: "max(env(safe-area-inset-right), 16px)",
          }}
        >
          {/* ═══════════════════════════════════════════════════════════════════
              SUBTLE LUXURY WATERMARK BACKGROUND PATTERN (Beige / Champagne)
              ═══════════════════════════════════════════════════════════════════ */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='28' viewBox='0 0 48 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 14 L24 0 L48 14 L24 28 Z' fill='none' stroke='%23C9A96A' stroke-width='0.65' stroke-opacity='0.16'/%3E%3Cpath d='M-24 14 L0 0 L24 14 L0 28 Z' fill='none' stroke='%23C9A96A' stroke-width='0.65' stroke-opacity='0.16'/%3E%3Cpath d='M24 14 L48 0 L72 14 L48 28 Z' fill='none' stroke='%23C9A96A' stroke-width='0.65' stroke-opacity='0.16'/%3E%3C/svg%3E")`,
              backgroundSize: "48px 28px",
            }}
          />

          {/* ═══════════════════════════════════════════════════════════════════
              SOFT AMBIENT GLOW BEHIND ENVELOPE (Ivory / Champagne / Warm Cream)
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="w-[320px] sm:w-[480px] md:w-[560px] h-[320px] sm:h-[420px] rounded-full blur-[70px] sm:blur-[90px] opacity-60"
              style={{
                background: "radial-gradient(circle, rgba(232,214,174,0.45) 0%, rgba(247,241,230,0.2) 55%, transparent 75%)",
              }}
            />
          </div>

          {/* Top spacer / Guest pill */}
          <div className="relative z-10 w-full flex justify-center items-center shrink-0 min-h-[36px]">
            {guestName && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F7F1E6]/90 border border-[#C9A96A]/35 shadow-xs backdrop-blur-sm"
              >
                <Sparkles className="w-3 h-3 text-[#C9A96A]" />
                <span className="text-[11px] font-cairo font-medium text-[#3A2D24]">
                  دعوة خاصة إلى {guestName}
                </span>
              </motion.div>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              CORNER BOTANICAL FLOURISHES (Matching Reference 01)
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="pointer-events-none absolute top-2 right-2 sm:top-4 sm:right-4 w-20 h-20 sm:w-28 sm:h-28 text-[#C9A96A]/25 select-none">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M100 0 C70 10, 40 40, 20 80 M80 20 C60 25, 45 45, 30 70 M60 10 C50 30, 35 45, 10 50 M90 40 C75 45, 60 60, 50 85" strokeLinecap="round" />
              <circle cx="80" cy="20" r="2" fill="currentColor" />
              <circle cx="60" cy="10" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="pointer-events-none absolute top-2 left-2 sm:top-4 sm:left-4 w-20 h-20 sm:w-28 sm:h-28 text-[#C9A96A]/25 select-none -scale-x-100">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M100 0 C70 10, 40 40, 20 80 M80 20 C60 25, 45 45, 30 70 M60 10 C50 30, 35 45, 10 50 M90 40 C75 45, 60 60, 50 85" strokeLinecap="round" />
              <circle cx="80" cy="20" r="2" fill="currentColor" />
              <circle cx="60" cy="10" r="1.5" fill="currentColor" />
            </svg>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              CENTER ENVELOPE + CTA COMPOSITION
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-4 -mt-1 sm:-mt-2">
            {/* Above Envelope Titles as specified in Reference 01 */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center mb-3 sm:mb-4 flex flex-col items-center select-none"
            >
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96A]/60" />
                <span className="text-xs sm:text-sm font-amiri font-bold text-[#A07F47] tracking-widest">
                  دعوة . زفاف
                </span>
                <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96A]/60" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-amiri font-bold text-[#241D18] leading-none my-1 tracking-tight">
                {wedding.groomAr} <span className="text-[#C9A96A] font-cormorant font-normal">&amp;</span> {wedding.brideAr}
              </h1>

              <div className="flex items-center justify-center gap-3 my-1 text-[#C9A96A]">
                <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent via-[#C9A96A]/60 to-transparent" />
                <span className="text-[10px]">✦</span>
                <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent via-[#C9A96A]/60 to-transparent" />
              </div>

              <p className="text-xs sm:text-sm font-cairo text-[#5C5146] font-medium">
                14 أكتوبر 2026
              </p>
            </motion.div>

            {/* Envelope Container with gentle float */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: phase === "opening" ? -10 : [0, -5, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.15 },
                scale: { duration: 0.8, delay: 0.15 },
                y: phase === "opening"
                  ? { duration: 0.4 }
                  : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              }}
              onClick={handleOpen}
              className="relative w-full max-w-[310px] xs:max-w-[335px] sm:max-w-[375px] md:max-w-[410px] cursor-pointer group select-none"
              style={{ perspective: "1000px" }}
            >
              {/* Realistic Envelope SVG Frame */}
              <div
                className="relative w-full aspect-[1.58/1] rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                style={{
                  filter:
                    "drop-shadow(0 22px 35px rgba(36,29,24,0.11)) drop-shadow(0 8px 16px rgba(201,169,106,0.12)) drop-shadow(0 2px 4px rgba(0,0,0,0.03))",
                }}
              >
                <svg
                  viewBox="0 0 380 240"
                  className="w-full h-full block rounded-2xl overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Base Ivory Paper Gradient */}
                    <linearGradient id="ivoryPaperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FCFAF6" />
                      <stop offset="60%" stopColor="#F7F1E6" />
                      <stop offset="100%" stopColor="#EFE6D5" />
                    </linearGradient>

                    {/* Side Flaps Gradients */}
                    <linearGradient id="sideFlapLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FAF5ED" />
                      <stop offset="100%" stopColor="#EAE0CE" />
                    </linearGradient>

                    <linearGradient id="sideFlapRight" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FAF5ED" />
                      <stop offset="100%" stopColor="#E6DCC9" />
                    </linearGradient>

                    {/* Bottom Flap Gradient */}
                    <linearGradient id="bottomFlapGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#EFE5D3" />
                      <stop offset="60%" stopColor="#F6EFE2" />
                      <stop offset="100%" stopColor="#FAF6EE" />
                    </linearGradient>

                    {/* Top Triangular Flap Gradient */}
                    <linearGradient id="topFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FDFBF7" />
                      <stop offset="65%" stopColor="#F7F0E4" />
                      <stop offset="100%" stopColor="#EFE4CF" />
                    </linearGradient>

                    {/* Flap subtle underside shadow */}
                    <filter id="flapShadow" x="-10%" y="-10%" width="120%" height="140%">
                      <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#241D18" floodOpacity="0.10" />
                    </filter>

                    {/* Wax Seal 3D Drop Shadow */}
                    <filter id="sealShadow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#241D18" floodOpacity="0.32" />
                    </filter>
                  </defs>

                  {/* 1. Envelope Back Base */}
                  <rect
                    x="0"
                    y="0"
                    width="380"
                    height="240"
                    rx="16"
                    fill="url(#ivoryPaperGrad)"
                    stroke="#C9A96A"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />

                  {/* Revealed Gold-Bordered Invitation Card (Slides up on Open) */}
                  <g
                    style={{
                      transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: phase === "opening" ? "translateY(-55px)" : "translateY(0px)",
                    }}
                  >
                    <rect x="25" y="20" width="330" height="190" rx="10" fill="#FFFDF9" stroke="#C9A96A" strokeWidth="1.2" strokeOpacity="0.7" />
                    <rect x="30" y="25" width="320" height="180" rx="8" fill="none" stroke="#C9A96A" strokeDasharray="3 3" strokeWidth="0.6" strokeOpacity="0.4" />
                    <text x="190" y="82" textAnchor="middle" fill="#241D18" fontSize="18" fontFamily="Amiri, serif" fontWeight="bold">أحمد &amp; منة الله</text>
                    <text x="190" y="106" textAnchor="middle" fill="#A07F47" fontSize="11" fontFamily="Cairo, sans-serif">14 أكتوبر 2026</text>
                  </g>

                  {/* 2. Delicate Interior Gold Corner Accents */}
                  <path d="M 12 24 L 24 12" stroke="#C9A96A" strokeWidth="0.8" strokeOpacity="0.4" />
                  <path d="M 368 24 L 356 12" stroke="#C9A96A" strokeWidth="0.8" strokeOpacity="0.4" />

                  {/* 3. Left Side Fold */}
                  <path
                    d="M 0 0 L 165 125 L 0 240 Z"
                    fill="url(#sideFlapLeft)"
                    opacity="0.82"
                    stroke="#C9A96A"
                    strokeWidth="0.75"
                    strokeOpacity="0.22"
                  />

                  {/* 4. Right Side Fold */}
                  <path
                    d="M 380 0 L 215 125 L 380 240 Z"
                    fill="url(#sideFlapRight)"
                    opacity="0.82"
                    stroke="#C9A96A"
                    strokeWidth="0.75"
                    strokeOpacity="0.22"
                  />

                  {/* 5. Bottom Flap */}
                  <path
                    d="M 0 240 L 190 120 L 380 240 Z"
                    fill="url(#bottomFlapGrad)"
                    opacity="0.92"
                    stroke="#C9A96A"
                    strokeWidth="0.85"
                    strokeOpacity="0.3"
                  />

                  {/* 6. Top Triangular Flap (Animated on Open) */}
                  <g
                    style={{
                      transformOrigin: "190px 0px",
                      transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: phase === "opening" ? "rotateX(-140deg)" : "none",
                    }}
                  >
                    <path
                      d="M 0 0 L 190 134 L 380 0 Z"
                      fill="url(#topFlapGrad)"
                      filter="url(#flapShadow)"
                      stroke="#C9A96A"
                      strokeWidth="1"
                      strokeOpacity="0.38"
                    />

                    {/* Fine Decorative Fold Lines on Flap */}
                    <path
                      d="M 12 4 L 190 128 L 368 4"
                      fill="none"
                      stroke="#C9A96A"
                      strokeWidth="0.6"
                      strokeOpacity="0.25"
                    />
                  </g>

                  {/* 7. Luxury Royal Wax Seal (Centered at Flap Tip) */}
                  <g
                    filter="url(#sealShadow)"
                    style={{
                      transformOrigin: "190px 134px",
                      transition: "all 0.4s ease-out",
                      transform: phase === "opening" ? "scale(0) opacity(0)" : "scale(1)",
                    }}
                  >
                    {/* Outer Wax Irregular Rim in Dark Brown */}
                    <circle cx="190" cy="134" r="28" fill="#32261E" stroke="#C9A96A" strokeWidth="1.2" strokeOpacity="0.45" />

                    {/* Wax Notched Texture Ring */}
                    <circle cx="190" cy="134" r="24" fill="#241D18" />

                    {/* Fine Champagne Gold Beaded Border */}
                    <circle
                      cx="190"
                      cy="134"
                      r="20.5"
                      fill="none"
                      stroke="#C9A96A"
                      strokeWidth="1"
                      strokeDasharray="2.5 2"
                      strokeOpacity="0.75"
                    />

                    {/* Inner Recessed Seal Center */}
                    <circle cx="190" cy="134" r="17.5" fill="#1C1612" />

                    {/* Embossed Royal Heart Emblem in Subtle Champagne Gold */}
                    <path
                      d="M 190 141 C 190 141 181.5 136 181.5 131 C 181.5 127.8 184 125.5 186.8 125.5 C 188.5 125.5 189.5 126.3 190 127.2 C 190.5 126.3 191.5 125.5 193.2 125.5 C 196 125.5 198.5 127.8 198.5 131 C 198.5 136 190 141 190 141 Z"
                      fill="#E8D6AE"
                      stroke="#C9A96A"
                      strokeWidth="0.6"
                    />

                    {/* Micro Highlight on Seal */}
                    <ellipse cx="186" cy="123" rx="5" ry="2.5" fill="#FFFFFF" opacity="0.12" />
                  </g>
                </svg>

                {/* Subtle Calligraphic watermark inside envelope */}
                <div className="pointer-events-none absolute bottom-3 inset-x-0 text-center">
                  <span className="text-[10px] font-cormorant tracking-[0.25em] text-[#C9A96A]/60 uppercase">
                    {wedding.groom} &amp; {wedding.bride}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════════
                MAIN CTA BUTTON: "افتح الدعوة ✨" (Directly below envelope)
                ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 sm:mt-7 flex flex-col items-center"
            >
              <button
                type="button"
                onClick={handleOpen}
                disabled={phase !== "idle"}
                className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#241D18] hover:bg-[#3A2D24] text-[#FBF8F1] font-bold text-sm sm:text-base font-cairo shadow-[0_10px_28px_rgba(36,29,24,0.22)] hover:shadow-[0_12px_32px_rgba(36,29,24,0.3)] active:scale-[0.97] border border-[#C9A96A]/45 hover:border-[#C9A96A] transition-all duration-300 cursor-pointer touch-target overflow-hidden disabled:opacity-60"
              >
                {/* Subtle champagne shimmer sweep */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A96A]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                <span className="relative tracking-wide font-semibold text-[#FBF8F1]">
                  {phase === "opening" ? "جاري فتح الدعوة..." : "افتح الدعوة ✨"}
                </span>
              </button>

              {/* Subtitle from Reference 01 */}
              <p className="mt-3.5 text-xs sm:text-sm font-cairo text-[#5C5146] tracking-wide select-none">
                بداية حكايتنا الجديدة .. بحضوركم أجمل
              </p>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              BOTTOM CONTROLS BAR:
              - Left: "زغرودة! 🎉"
              - Right: Sound control circular toggle
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="relative z-20 w-full flex items-center justify-between px-2 sm:px-6 py-2 shrink-0" dir="ltr">
            {/* Bottom-left: Zaghrouda Button */}
            <div className="flex items-center">
              <motion.button
                type="button"
                onClick={handleZaghrouda}
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.04 }}
                dir="rtl"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#3A2D24] hover:bg-[#241D18] text-[#FBF8F1] border border-[#C9A96A]/35 text-xs sm:text-sm font-cairo font-semibold shadow-sm hover:shadow transition-all cursor-pointer touch-target"
                title="أطلق زغرودة فرح!"
              >
                <span>زغرودة! 🎉</span>
              </motion.button>
            </div>

            {/* Bottom-right: Sound Control Button */}
            <div className="flex items-center">
              <motion.button
                type="button"
                onClick={handleToggleSound}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FBF8F1] hover:bg-[#F7F1E6] text-[#241D18] border border-[#C9A96A]/40 shadow-sm hover:shadow transition-all flex items-center justify-center cursor-pointer touch-target"
                title={isMuted || (!isPlaying && hasStarted) ? "تشغيل الصوت" : "كتم الصوت"}
              >
                {isMuted || (!isPlaying && hasStarted) ? (
                  <VolumeX className="w-4 h-4 text-[#70735F]" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#241D18]" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
