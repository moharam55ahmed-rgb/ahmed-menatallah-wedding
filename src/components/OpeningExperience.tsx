"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";
import { wedding } from "@/config/wedding";
import { useAudio } from "./AudioContext";
import { MailOpen, Sparkles } from "lucide-react";

interface OpeningExperienceProps {
  onOpen?: () => void;
}

export default function OpeningExperience({ onOpen }: OpeningExperienceProps) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const [guestName, setGuestName] = useState<string | null>(null);
  const { startAudioExperience } = useAudio();

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
    
    // Start royal music experience
    startAudioExperience();

    // Trigger soft gold celebration particles
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#C5A46D", "#EAD7D1", "#FAF5EE", "#B58A48", "#DFCBA8"],
    });

    // Smooth transition to main invitation
    setTimeout(() => {
      setPhase("done");
      window.scrollTo({ top: 0, behavior: "instant" });
      if (onOpen) setTimeout(onOpen, 400);
    }, 900);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0F0D0B] text-[#F8F2EA] overflow-hidden select-none w-full"
          style={{
            direction: "rtl",
            height: "100dvh",
            minHeight: "-webkit-fill-available",
            paddingTop: "max(env(safe-area-inset-top), 14px)",
            paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
            paddingLeft: "max(env(safe-area-inset-left), 16px)",
            paddingRight: "max(env(safe-area-inset-right), 16px)",
          }}
        >
          {/* Ambient Celestial Glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full bg-[#C5A46D]/15 blur-[100px]" />
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#EAD7D1]/10 blur-[80px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,#C5A46D_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.05]" />
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              1. TOP HEADER SLOT: (Guaranteed zero-clipping on all viewports)
              ═══════════════════════════════════════════════════════════════════ */}
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 w-full flex flex-col items-center text-center shrink-0 pt-0.5"
          >
            {/* Guest Welcome Pill */}
            {guestName && (
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/10 border border-[#C5A46D]/40 backdrop-blur-md mb-1">
                <Sparkles className="w-2.5 h-2.5 text-[#E6D0A2]" />
                <span className="text-[10px] sm:text-[11px] font-cairo font-medium text-[#DFCBA8] tracking-wide">
                  دعوة خاصة إلى {guestName}
                </span>
              </div>
            )}

            {/* Clear, Unmistakable Title */}
            <h1 className="text-xl sm:text-2xl font-amiri font-bold text-[#F8F2EA] tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              دعوة زفاف أحمد ومنة الله
            </h1>

            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-cormorant mt-0.5">
              Royal Wedding Invitation
            </p>
          </motion.header>

          {/* ═══════════════════════════════════════════════════════════════════
              2. CENTER ENVELOPE / CARD SLOT: (Self-scaling, never overflows)
              ═══════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={
              phase === "opening"
                ? { opacity: 0, scale: 1.08, y: -12 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{
              duration: phase === "opening" ? 0.5 : 0.8,
              delay: phase === "opening" ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={handleOpen}
            className="relative z-10 w-full max-w-[300px] sm:max-w-[330px] my-auto py-1 flex items-center justify-center cursor-pointer"
          >
            {/* Outer Luxury Metallic Border Frame */}
            <div
              className="w-full rounded-[20px] p-[1.5px] shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(197,164,109,0.18)] transition-transform duration-300 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(155deg,#F3E3C3 0%,#B58A48 45%,#544026 100%)",
              }}
            >
              {/* Inner Ivory Stationery Card */}
              <div
                className="relative rounded-[18.5px] overflow-hidden flex flex-col items-center px-4 py-3.5 sm:px-5 sm:py-4 text-center"
                style={{
                  background: "linear-gradient(160deg,#FCF8F2 0%,#F6EFE3 55%,#EFE1CB 100%)",
                }}
              >
                {/* Paper texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E\")",
                    backgroundSize: "180px",
                  }}
                />

                {/* Delicate Gold Corner Filigree */}
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C5A46D]/50 rounded-tr" />
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C5A46D]/50 rounded-tl" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C5A46D]/50 rounded-br" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C5A46D]/50 rounded-bl" />

                {/* Bismillah Ornament */}
                <div className="relative z-10 flex items-center gap-2 mb-1.5 w-full justify-center">
                  <span className="h-[1px] w-6 bg-gradient-to-l from-[#C5A46D]/60 to-transparent" />
                  <span className="text-[10px] font-amiri text-[#9A7A40] whitespace-nowrap">
                    ✦ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ✦
                  </span>
                  <span className="h-[1px] w-6 bg-gradient-to-r from-[#C5A46D]/60 to-transparent" />
                </div>

                <p className="text-[8px] uppercase tracking-[0.25em] text-[#70735F] font-cormorant mb-1">
                  Together in love
                </p>

                {/* Hero Couple Names in Calligraphic Arabic */}
                <div className="my-0.5 flex flex-col items-center">
                  <p className="text-2xl sm:text-3xl font-amiri font-bold text-[#231F1A] leading-none">
                    {wedding.groomAr}
                  </p>
                  
                  <div className="flex items-center gap-2 my-1">
                    <span className="w-6 h-[1px] bg-[#C5A46D]/50" />
                    <span className="text-sm font-cormorant italic text-[#C5A46D] font-bold">
                      &amp;
                    </span>
                    <span className="w-6 h-[1px] bg-[#C5A46D]/50" />
                  </div>

                  <p className="text-2xl sm:text-3xl font-amiri font-bold text-[#231F1A] leading-none">
                    {wedding.brideAr}
                  </p>
                </div>

                {/* Wedding Date & Venue Line */}
                <div className="mt-2 pt-1.5 border-t border-[#C5A46D]/30 w-full flex flex-col items-center">
                  <p className="text-xs sm:text-sm font-cormorant font-semibold tracking-wider text-[#231F1A]">
                    14 • 10 • 2026
                  </p>
                  <p className="text-[10px] font-cairo text-[#70735F] mt-0.5">
                    {wedding.dayAr} • {wedding.venueAr}
                  </p>
                </div>

                {/* Royal Wax Seal with Monogram */}
                <div className="relative mt-2.5 flex items-center justify-center">
                  <motion.div
                    animate={
                      phase === "opening"
                        ? { scale: [1, 1.25, 0], opacity: [1, 1, 0], rotate: [0, 10, -15] }
                        : { scale: [1, 1.03, 1] }
                    }
                    transition={{
                      scale: phase === "opening" ? { duration: 0.4 } : { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#FFE8B3] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.35),0_0_0_2px_rgba(197,164,109,0.3)] bg-[#8A2B1D]"
                  >
                    <Image
                      src={wedding.waxSealImage}
                      alt="Royal Wax Seal A & M"
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════════
              3. BOTTOM CTA SLOT: (High contrast, 100% visible without scroll)
              ═══════════════════════════════════════════════════════════════════ */}
          <motion.footer
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 w-full flex flex-col items-center shrink-0 pb-0.5"
          >
            <button
              type="button"
              onClick={handleOpen}
              disabled={phase !== "idle"}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#B58A48] via-[#F3E3C3] to-[#B58A48] text-[#151311] font-bold text-sm sm:text-base font-cairo shadow-[0_6px_25px_rgba(197,164,109,0.45),0_0_15px_rgba(197,164,109,0.25)] hover:shadow-[0_10px_35px_rgba(197,164,109,0.65)] active:scale-[0.97] transition-all duration-300 cursor-pointer touch-target overflow-hidden disabled:opacity-60"
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <MailOpen className="w-4 h-4 text-[#151311] shrink-0" />
              <span className="relative tracking-wide">
                {phase === "opening" ? "جاري فتح الدعوة..." : "افتح الدعوة"}
              </span>
            </button>

            <p className="text-[10px] font-cairo text-[#DFCBA8]/70 text-center mt-1.5">
              اضغط للاستماع إلى أنغام الزفاف وبدء التجربة 🎵
            </p>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
