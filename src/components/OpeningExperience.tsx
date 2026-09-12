"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";
import { useAudio } from "./AudioContext";
import { Volume2, VolumeX } from "lucide-react";

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

    // Royal champagne celebration confetti explosion
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.52 },
      colors: ["#C9A96A", "#E8D6AE", "#F7F1E6", "#302018", "#FFDF78"],
      ticks: 200,
      gravity: 0.75,
    });

    // Smooth transition to main invitation
    setTimeout(() => {
      setPhase("done");
      window.scrollTo({ top: 0, behavior: "instant" });
      if (onOpen) setTimeout(onOpen, 350);
    }, 900);
  };

  const handleZaghrouda = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCelebrationSound();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.22, y: 0.9 },
      colors: ["#C9A96A", "#E8D6AE", "#F7F1E6", "#302018", "#FFDF78"],
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
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
            {/* The High-Resolution Exact Reference Image */}
            <Image
              src="/images/opening-card.jpg"
              alt="دعوة زفاف أحمد ومنة الله"
              fill
              priority
              className="object-contain pointer-events-none select-none"
              sizes="(max-width: 768px) 100vw, 550px"
            />

            {/* Optional Personalized Guest Badge at Top */}
            {guestName && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-[4.5%] inset-x-0 mx-auto w-fit z-30 px-3 py-0.5 rounded-full bg-[#FAF5EC]/90 border border-[#C5A059]/40 shadow-xs backdrop-blur-xs flex items-center gap-1.5"
              >
                <span className="text-[9px] text-[#C5A059]">✦</span>
                <span className="text-[10px] sm:text-[11px] font-cairo font-medium text-[#423225]">
                  دعوة خاصة إلى {guestName}
                </span>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                INTERACTIVE ENVELOPE OPENING OVERLAY
                Position:
                top: 38.6%, left: 17.2%, width: 65.5%, height: 23.9%
                ═════════════════════════════════════════════════════════════════ */}
            <div
              onClick={handleOpen}
              className="absolute top-[38.6%] left-[17.2%] w-[65.5%] h-[23.9%] cursor-pointer z-20 group"
              style={{ perspective: "1000px" }}
              title="اضغط لفتح الدعوة"
            >
              {/* Invisible touch & hover target over envelope with subtle sheen on hover */}
              <div className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:bg-white/[0.04] group-active:scale-[0.99]" />

              {/* Realistic Envelope Opening Flap Animation on Click */}
              {phase === "opening" && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Sliding Golden Invitation Card */}
                  <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: "-45%", opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-[4%] top-[10%] bottom-[10%] bg-[#FFFDF9] rounded-lg border border-[#C5A059] shadow-xl flex flex-col items-center justify-center p-3 text-center z-10"
                  >
                    <div className="w-full h-full border border-dashed border-[#C5A059]/50 rounded p-2 flex flex-col items-center justify-center">
                      <span className="text-xs font-ruqaa font-bold text-[#2E2016]">أحمد &amp; منة الله</span>
                      <span className="text-[9px] font-cairo text-[#8C6D3B] mt-0.5">14 أكتوبر 2026</span>
                    </div>
                  </motion.div>

                  {/* Top Flap Folding Upwards in 3D */}
                  <motion.div
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: -150 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-0 inset-x-0 h-[55%] origin-top z-20"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <svg viewBox="0 0 391 135" className="w-full h-full block" fill="none">
                      <path
                        d="M 0 0 L 195.5 135 L 391 0 Z"
                        fill="#F5EDE0"
                        stroke="#C5A059"
                        strokeWidth="1.2"
                        strokeOpacity="0.4"
                      />
                    </svg>
                  </motion.div>

                  {/* Wax Seal Fading & Breaking */}
                  <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#7D5122] shadow-md z-30"
                  />
                </div>
              )}
            </div>

            {/* ═════════════════════════════════════════════════════════════════
                INTERACTIVE "افتح الدعوة" BUTTON
                Position in Reference Image:
                top: 65.2%, left: 24.3%, width: 51.4%, height: 7.2%
                ═════════════════════════════════════════════════════════════════ */}
            <motion.button
              type="button"
              onClick={handleOpen}
              disabled={phase !== "idle"}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              className="absolute top-[65.2%] left-[24.3%] w-[51.4%] h-[7.2%] rounded-full z-20 cursor-pointer overflow-hidden group touch-target"
              style={{
                // Semi-transparent overlay with subtle matching gradient and gold border glow
                background: "linear-gradient(180deg, rgba(54,36,26,0.92) 0%, rgba(38,24,17,0.96) 100%)",
                boxShadow: "0 8px 24px rgba(48,32,24,0.28), 0 0 0 1.5px #C5A059, inset 0 1px 1px rgba(255,255,255,0.2)",
              }}
              title="افتح الدعوة"
            >
              {/* Shimmer sweep effect */}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#E8D6AE]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

              {/* Button Content matching image exactly */}
              <div className="relative w-full h-full flex items-center justify-center gap-2.5 px-3">
                {/* 4-point Sparkle */}
                <span className="text-[#E8D6AE] text-sm sm:text-base leading-none drop-shadow-xs">
                  ✦
                </span>
                {/* Text */}
                <span className="text-[#FFFDF8] font-cairo font-bold text-xs sm:text-sm md:text-base tracking-wide leading-none pt-0.5">
                  {phase === "opening" ? "جاري فتح الدعوة..." : "افتح الدعوة"}
                </span>
              </div>
            </motion.button>

            {/* ═════════════════════════════════════════════════════════════════
                INTERACTIVE "زغرودة!" BUTTON (Bottom Left)
                Position in Reference Image:
                top: 86.4%, left: 7.2%, width: 23.6%, height: 5.8%
                ═════════════════════════════════════════════════════════════════ */}
            <motion.button
              type="button"
              onClick={handleZaghrouda}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              className="absolute top-[86.4%] left-[7.2%] w-[23.6%] h-[5.8%] rounded-full z-20 cursor-pointer overflow-hidden group touch-target flex items-center justify-center gap-1"
              style={{
                background: "linear-gradient(180deg, rgba(54,36,26,0.95) 0%, rgba(38,24,17,0.98) 100%)",
                boxShadow: "0 4px 14px rgba(48,32,24,0.25), 0 0 0 1.2px #C5A059, inset 0 1px 1px rgba(255,255,255,0.15)",
              }}
              title="أطلق زغرودة فرح!"
            >
              <span className="text-[11px] sm:text-xs leading-none">🎉</span>
              <span className="text-[#FFFDF8] font-cairo font-semibold text-[10px] sm:text-xs leading-none pt-0.5">
                زغرودة!
              </span>
            </motion.button>

            {/* ═════════════════════════════════════════════════════════════════
                INTERACTIVE AUDIO TOGGLE BUTTON (Bottom Right)
                Position in Reference Image:
                top: 86.4%, right: 7.2%, width: 10.7% (aspect square)
                ═════════════════════════════════════════════════════════════════ */}
            <motion.button
              type="button"
              onClick={handleToggleSound}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="absolute top-[86.4%] right-[7.2%] w-[10.7%] aspect-square rounded-full z-20 cursor-pointer overflow-hidden group touch-target flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 40% 35%, #FFFDF9 0%, #F5EDE0 70%, #E8DEC9 100%)",
                boxShadow: "0 4px 14px rgba(48,32,24,0.18), 0 0 0 1.2px #C5A059, inset 0 1px 2px rgba(255,255,255,0.6)",
              }}
              title={isMuted || (!isPlaying && hasStarted) ? "تشغيل الصوت" : "كتم الصوت"}
            >
              {isMuted || (!isPlaying && hasStarted) ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7A6A5D]" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#302018]" />
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
