"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { wedding } from "@/config/wedding";
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

    // Gentle royal champagne celebration confetti
    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.52 },
      colors: ["#C9A96A", "#E8D6AE", "#F7F1E6", "#33241A", "#FFF8EE"],
      ticks: 180,
      gravity: 0.8,
    });

    // Smooth transition to main invitation
    setTimeout(() => {
      setPhase("done");
      window.scrollTo({ top: 0, behavior: "instant" });
      if (onOpen) setTimeout(onOpen, 300);
    }, 800);
  };

  const handleZaghrouda = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCelebrationSound();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x: 0.18, y: 0.88 },
      colors: ["#C9A96A", "#E8D6AE", "#F7F1E6", "#33241A", "#FFDF78"],
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
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#FAF6F0] overflow-hidden select-none w-full"
          style={{
            direction: "rtl",
            height: "100dvh",
            maxHeight: "100dvh",
            paddingTop: "max(env(safe-area-inset-top), 12px)",
            paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
            paddingLeft: "max(env(safe-area-inset-left), 16px)",
            paddingRight: "max(env(safe-area-inset-right), 16px)",
          }}
        >
          {/* ═══════════════════════════════════════════════════════════════════
              1. SUBTLE ISLAMIC GEOMETRIC LATTICE WATERMARK PATTERN
              ═══════════════════════════════════════════════════════════════════ */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0 L64 32 L32 64 L0 32 Z' fill='none' stroke='%23C5A059' stroke-width='0.5' stroke-opacity='0.45'/%3E%3Cpath d='M0 0 L32 32 L0 64' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.3'/%3E%3Cpath d='M64 0 L32 32 L64 64' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.3'/%3E%3Crect x='20' y='20' width='24' height='24' transform='rotate(45 32 32)' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.35'/%3E%3C/svg%3E")`,
              backgroundSize: "64px 64px",
            }}
          />

          {/* Soft Center Ambient Radial Glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="w-[340px] sm:w-[500px] h-[340px] sm:h-[450px] rounded-full blur-[80px] opacity-70"
              style={{
                background: "radial-gradient(circle, rgba(245,236,220,0.85) 0%, rgba(250,246,240,0.3) 60%, transparent 80%)",
              }}
            />
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              2. BOTANICAL CORNER FOLIAGE (MATCHING REFERENCE 01 EXACTLY)
              ═══════════════════════════════════════════════════════════════════ */}
          {/* Top-Right Corner Botanical Branch */}
          <div className="pointer-events-none absolute top-0 right-0 w-36 sm:w-48 h-36 sm:h-48 select-none z-10 opacity-75">
            <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C4AD8A" />
                  <stop offset="100%" stopColor="#8C7456" />
                </linearGradient>
                <linearGradient id="flowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EFE5D3" />
                  <stop offset="100%" stopColor="#D4C0A3" />
                </linearGradient>
              </defs>
              {/* Main curving stem */}
              <path d="M160 0 C120 20 80 55 50 100 C40 115 35 130 30 150" stroke="#8C7456" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
              <path d="M110 35 C85 50 70 75 60 110" stroke="#8C7456" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.5" />
              {/* Leaves */}
              <path d="M135 12 C120 15 110 28 115 40 C128 35 138 25 135 12 Z" fill="url(#leafGrad)" fillOpacity="0.6" />
              <path d="M95 38 C80 35 72 45 78 58 C90 55 98 48 95 38 Z" fill="url(#leafGrad)" fillOpacity="0.65" />
              <path d="M68 70 C52 70 48 82 54 94 C66 90 72 80 68 70 Z" fill="url(#leafGrad)" fillOpacity="0.6" />
              <path d="M48 108 C35 110 32 122 38 132 C48 128 54 118 48 108 Z" fill="url(#leafGrad)" fillOpacity="0.55" />
              <path d="M120 40 C108 45 105 58 112 68 C122 62 126 50 120 40 Z" fill="url(#leafGrad)" fillOpacity="0.5" />
              <path d="M85 75 C72 80 70 92 78 100 C88 94 92 84 85 75 Z" fill="url(#leafGrad)" fillOpacity="0.55" />
              {/* Delicate Flower Blossom */}
              <g transform="translate(100, 20) scale(0.65)">
                <ellipse cx="20" cy="10" rx="9" ry="6" fill="url(#flowerGrad)" fillOpacity="0.8" />
                <ellipse cx="28" cy="20" rx="9" ry="6" fill="url(#flowerGrad)" fillOpacity="0.8" transform="rotate(60 28 20)" />
                <ellipse cx="24" cy="30" rx="9" ry="6" fill="url(#flowerGrad)" fillOpacity="0.8" transform="rotate(120 24 30)" />
                <ellipse cx="12" cy="28" rx="9" ry="6" fill="url(#flowerGrad)" fillOpacity="0.8" transform="rotate(180 12 28)" />
                <ellipse cx="8" cy="18" rx="9" ry="6" fill="url(#flowerGrad)" fillOpacity="0.8" transform="rotate(240 8 18)" />
                <circle cx="18" cy="21" r="3.5" fill="#8C7456" fillOpacity="0.75" />
              </g>
            </svg>
          </div>

          {/* Top-Left Corner Botanical Branch (Mirrored) */}
          <div className="pointer-events-none absolute top-0 left-0 w-36 sm:w-48 h-36 sm:h-48 select-none z-10 opacity-75 -scale-x-100">
            <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M160 0 C120 20 80 55 50 100 C40 115 35 130 30 150" stroke="#8C7456" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
              <path d="M110 35 C85 50 70 75 60 110" stroke="#8C7456" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.5" />
              <path d="M135 12 C120 15 110 28 115 40 C128 35 138 25 135 12 Z" fill="#BFA888" fillOpacity="0.6" />
              <path d="M95 38 C80 35 72 45 78 58 C90 55 98 48 95 38 Z" fill="#9F8766" fillOpacity="0.65" />
              <path d="M68 70 C52 70 48 82 54 94 C66 90 72 80 68 70 Z" fill="#BFA888" fillOpacity="0.6" />
              <path d="M48 108 C35 110 32 122 38 132 C48 128 54 118 48 108 Z" fill="#9F8766" fillOpacity="0.55" />
              <path d="M120 40 C108 45 105 58 112 68 C122 62 126 50 120 40 Z" fill="#BFA888" fillOpacity="0.5" />
              <path d="M85 75 C72 80 70 92 78 100 C88 94 92 84 85 75 Z" fill="#9F8766" fillOpacity="0.55" />
              <g transform="translate(100, 20) scale(0.65)">
                <ellipse cx="20" cy="10" rx="9" ry="6" fill="#E8DEC9" fillOpacity="0.8" />
                <ellipse cx="28" cy="20" rx="9" ry="6" fill="#E8DEC9" fillOpacity="0.8" transform="rotate(60 28 20)" />
                <ellipse cx="24" cy="30" rx="9" ry="6" fill="#E8DEC9" fillOpacity="0.8" transform="rotate(120 24 30)" />
                <ellipse cx="12" cy="28" rx="9" ry="6" fill="#E8DEC9" fillOpacity="0.8" transform="rotate(180 12 28)" />
                <ellipse cx="8" cy="18" rx="9" ry="6" fill="#E8DEC9" fillOpacity="0.8" transform="rotate(240 8 18)" />
                <circle cx="18" cy="21" r="3.5" fill="#8C7456" fillOpacity="0.75" />
              </g>
            </svg>
          </div>

          {/* Bottom-Left Botanical Foliage Behind Zaghrouda */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-36 sm:w-44 h-36 sm:h-44 select-none z-10 opacity-70">
            <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M0 140 C25 110 50 85 85 60 C105 45 125 35 140 30" stroke="#8C7456" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
              <path d="M20 120 C10 108 14 96 26 94 C34 105 32 116 20 120 Z" fill="#BFA888" fillOpacity="0.65" />
              <path d="M45 95 C35 85 40 72 52 74 C58 85 54 94 45 95 Z" fill="#9F8766" fillOpacity="0.6" />
              <path d="M75 75 C68 62 76 52 88 56 C90 68 85 76 75 75 Z" fill="#BFA888" fillOpacity="0.6" />
              {/* Soft Flower Blossom */}
              <g transform="translate(18, 70) scale(0.6)">
                <ellipse cx="20" cy="10" rx="9" ry="6" fill="#EAE0CE" fillOpacity="0.85" />
                <ellipse cx="28" cy="20" rx="9" ry="6" fill="#EAE0CE" fillOpacity="0.85" transform="rotate(60 28 20)" />
                <ellipse cx="24" cy="30" rx="9" ry="6" fill="#EAE0CE" fillOpacity="0.85" transform="rotate(120 24 30)" />
                <ellipse cx="12" cy="28" rx="9" ry="6" fill="#EAE0CE" fillOpacity="0.85" transform="rotate(180 12 28)" />
                <ellipse cx="8" cy="18" rx="9" ry="6" fill="#EAE0CE" fillOpacity="0.85" transform="rotate(240 8 18)" />
                <circle cx="18" cy="21" r="3" fill="#8C7456" fillOpacity="0.75" />
              </g>
            </svg>
          </div>

          {/* Bottom-Right Botanical Foliage Behind Audio */}
          <div className="pointer-events-none absolute bottom-0 right-0 w-36 sm:w-44 h-36 sm:h-44 select-none z-10 opacity-70 -scale-x-100">
            <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M0 140 C25 110 50 85 85 60 C105 45 125 35 140 30" stroke="#8C7456" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
              <path d="M20 120 C10 108 14 96 26 94 C34 105 32 116 20 120 Z" fill="#BFA888" fillOpacity="0.65" />
              <path d="M45 95 C35 85 40 72 52 74 C58 85 54 94 45 95 Z" fill="#9F8766" fillOpacity="0.6" />
              <path d="M75 75 C68 62 76 52 88 56 C90 68 85 76 75 75 Z" fill="#BFA888" fillOpacity="0.6" />
              <g transform="translate(18, 70) scale(0.6)">
                <ellipse cx="20" cy="10" rx="9" ry="6" fill="#EAE0CE" fillOpacity="0.85" />
                <ellipse cx="28" cy="20" rx="9" ry="6" fill="#EAE0CE" fillOpacity="0.85" transform="rotate(60 28 20)" />
                <ellipse cx="24" cy="30" rx="9" ry="6" fill="#EAE0CE" fillOpacity="0.85" transform="rotate(120 24 30)" />
                <ellipse cx="12" cy="28" rx="9" ry="6" fill="#EAE0CE" fillOpacity="0.85" transform="rotate(180 12 28)" />
                <ellipse cx="8" cy="18" rx="9" ry="6" fill="#EAE0CE" fillOpacity="0.85" transform="rotate(240 8 18)" />
                <circle cx="18" cy="21" r="3" fill="#8C7456" fillOpacity="0.75" />
              </g>
            </svg>
          </div>

          {/* Top spacer & optional Guest personalization */}
          <div className="relative z-20 w-full flex justify-center items-center shrink-0 min-h-[28px] pt-1">
            {guestName && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF4EA]/90 border border-[#C5A059]/40 shadow-xs backdrop-blur-sm"
              >
                <span className="text-[10px] text-[#C5A059]">✦</span>
                <span className="text-[11px] font-cairo font-medium text-[#4A3B30]">
                  دعوة خاصة إلى {guestName}
                </span>
              </motion.div>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              3. CENTER MAIN CARD: HEADER + ENVELOPE + BUTTON
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center max-w-md mx-auto px-4 py-1">
            {/* 3.1 TOP ORNAMENT & TITLES (Exactly matching reference 01) */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-center flex flex-col items-center select-none mb-3 sm:mb-4"
            >
              {/* Top Golden Islamic Rosette / Sunburst Ornament */}
              <div className="mb-2 text-[#C5A059]">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Central Rosette Petals */}
                  <g transform="translate(20, 20)">
                    <rect x="-3" y="-3" width="6" height="6" fill="#C5A059" transform="rotate(45)" />
                    <circle cx="0" cy="0" r="2.5" fill="#FAF6F0" />
                    <path d="M0 -9 C-2.5 -5, -2.5 -2, 0 0 C2.5 -2, 2.5 -5, 0 -9 Z" fill="#C5A059" opacity="0.9" />
                    <path d="M0 9 C-2.5 5, -2.5 2, 0 0 C2.5 2, 2.5 5, 0 9 Z" fill="#C5A059" opacity="0.9" />
                    <path d="M-9 0 C-5 -2.5, -2 -2.5, 0 0 C-2 2.5, -5 2.5, -9 0 Z" fill="#C5A059" opacity="0.9" />
                    <path d="M9 0 C5 -2.5, 2 -2.5, 0 0 C2 2.5, 5 2.5, 9 0 Z" fill="#C5A059" opacity="0.9" />
                    {/* Diagonal mini petals */}
                    <path d="M-6 -6 C-4 -2, -2 -4, 0 0 C-4 -2, -2 -4, -6 -6 Z" fill="#C5A059" opacity="0.75" />
                    <path d="M6 -6 C4 -2, 2 -4, 0 0 C4 -2, 2 -4, 6 -6 Z" fill="#C5A059" opacity="0.75" />
                    <path d="M-6 6 C-4 2, -2 4, 0 0 C-4 2, -2 4, -6 6 Z" fill="#C5A059" opacity="0.75" />
                    <path d="M6 6 C4 2, 2 4, 0 0 C4 2, 2 4, 6 6 Z" fill="#C5A059" opacity="0.75" />
                    {/* Top & Bottom Finial Dots */}
                    <circle cx="0" cy="-14" r="1.5" fill="#C5A059" />
                    <circle cx="0" cy="14" r="1.5" fill="#C5A059" />
                    <circle cx="-14" cy="0" r="1.5" fill="#C5A059" />
                    <circle cx="14" cy="0" r="1.5" fill="#C5A059" />
                  </g>
                </svg>
              </div>

              {/* "دعوة . زفاف" */}
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-amiri font-bold text-[#5A4638] tracking-widest">
                <span>دعوة</span>
                <span className="text-[#C5A059] text-[10px] leading-none">٠</span>
                <span>زفاف</span>
              </div>

              {/* Names: "أحمد & منة الله" */}
              <h1 className="text-3xl sm:text-4xl md:text-[42px] font-ruqaa font-bold text-[#2A1F18] leading-[1.3] my-0.5 sm:my-1 flex items-center justify-center gap-2">
                <span>{wedding.groomAr}</span>
                <span className="text-[#C5A059] font-cormorant font-normal text-2xl sm:text-3xl leading-none pt-1">
                  &amp;
                </span>
                <span>{wedding.brideAr}</span>
              </h1>

              {/* Delicate Gold Floral Arabesque Loop Divider */}
              <div className="flex items-center justify-center my-0.5 text-[#C5A059]">
                <svg width="84" height="14" viewBox="0 0 100 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 8 C20 8 30 15 42 8 C47 4 49 4 50 8 C51 4 53 4 58 8 C70 15 80 8 100 8" stroke="#C5A059" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.75" />
                  <circle cx="50" cy="8" r="2.2" fill="#C5A059" />
                  <circle cx="43" cy="8" r="1.2" fill="#C5A059" />
                  <circle cx="57" cy="8" r="1.2" fill="#C5A059" />
                </svg>
              </div>

              {/* Date: "14 أكتوبر 2026" */}
              <p className="text-xs sm:text-sm font-cairo text-[#5A4638] font-semibold mt-0.5">
                14 أكتوبر 2026
              </p>
            </motion.div>

            {/* 3.2 THE ENVELOPE (EXACT REPLICA OF REFERENCE 01) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: phase === "opening" ? -10 : [0, -4, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                y: phase === "opening"
                  ? { duration: 0.4 }
                  : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              }}
              onClick={handleOpen}
              className="relative w-full max-w-[290px] xs:max-w-[315px] sm:max-w-[340px] cursor-pointer group select-none"
              style={{ perspective: "1000px" }}
            >
              {/* Realistic Envelope Box with authentic Paper Texture & Soft Shadows */}
              <div
                className="relative w-full aspect-[1.56/1] rounded-xl transition-transform duration-300 group-hover:scale-[1.015]"
                style={{
                  filter:
                    "drop-shadow(0 18px 30px rgba(46,35,28,0.13)) drop-shadow(0 6px 14px rgba(197,160,89,0.14)) drop-shadow(0 1px 3px rgba(0,0,0,0.04))",
                }}
              >
                <svg
                  viewBox="0 0 360 230"
                  className="w-full h-full block rounded-xl overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Realistic Ivory Cream Paper Gradients */}
                    <linearGradient id="envelopeBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FAF7F0" />
                      <stop offset="50%" stopColor="#F4EDE0" />
                      <stop offset="100%" stopColor="#EAE0CE" />
                    </linearGradient>

                    <linearGradient id="envelopeFlapLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F8F3E9" />
                      <stop offset="100%" stopColor="#E8DDCA" />
                    </linearGradient>

                    <linearGradient id="envelopeFlapRight" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F8F3E9" />
                      <stop offset="100%" stopColor="#E5DAC5" />
                    </linearGradient>

                    <linearGradient id="envelopeFlapBottom" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#E8DDCA" />
                      <stop offset="60%" stopColor="#F4ECE0" />
                      <stop offset="100%" stopColor="#FAF6EE" />
                    </linearGradient>

                    <linearGradient id="envelopeFlapTop" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FDFBF7" />
                      <stop offset="60%" stopColor="#F5EDE0" />
                      <stop offset="100%" stopColor="#E8DCC8" />
                    </linearGradient>

                    {/* Flap crease shadow filter */}
                    <filter id="topFlapDropShadow" x="-10%" y="-10%" width="120%" height="150%">
                      <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#3A2B20" floodOpacity="0.14" />
                    </filter>

                    {/* Wax Seal 3D Rich Shadow */}
                    <filter id="waxSealShadow" x="-35%" y="-35%" width="170%" height="170%">
                      <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#2A1B12" floodOpacity="0.38" />
                    </filter>

                    {/* Wax Seal Metallic Amber-Bronze Gradient */}
                    <radialGradient id="waxSealGrad" cx="40%" cy="38%" r="65%">
                      <stop offset="0%" stopColor="#B38241" />
                      <stop offset="45%" stopColor="#8C5C26" />
                      <stop offset="85%" stopColor="#694116" />
                      <stop offset="100%" stopColor="#4A2D0D" />
                    </radialGradient>

                    {/* Inner Wax Recessed Center Gradient */}
                    <radialGradient id="waxInnerGrad" cx="45%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#754A1C" />
                      <stop offset="70%" stopColor="#5E3812" />
                      <stop offset="100%" stopColor="#452709" />
                    </radialGradient>
                  </defs>

                  {/* 1. Envelope Back Base (Ivory paper with fine gold border) */}
                  <rect
                    x="0"
                    y="0"
                    width="360"
                    height="230"
                    rx="12"
                    fill="url(#envelopeBaseGrad)"
                    stroke="#C5A059"
                    strokeWidth="1.2"
                    strokeOpacity="0.4"
                  />

                  {/* Revealed Gold-Bordered Invitation Card (Slides Up on Open) */}
                  <g
                    style={{
                      transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: phase === "opening" ? "translateY(-50px)" : "translateY(0px)",
                    }}
                  >
                    <rect x="20" y="16" width="320" height="198" rx="8" fill="#FFFDF9" stroke="#C5A059" strokeWidth="1.2" strokeOpacity="0.75" />
                    <rect x="25" y="21" width="310" height="188" rx="6" fill="none" stroke="#C5A059" strokeDasharray="3 3" strokeWidth="0.6" strokeOpacity="0.4" />
                    <text x="180" y="80" textAnchor="middle" fill="#2A1F18" fontSize="18" fontFamily="var(--font-aref-ruqaa), serif" fontWeight="bold">أحمد &amp; منة الله</text>
                    <text x="180" y="104" textAnchor="middle" fill="#A07F47" fontSize="11" fontFamily="Cairo, sans-serif">14 أكتوبر 2026</text>
                  </g>

                  {/* 2. Left Side Flap */}
                  <path
                    d="M 0 0 L 155 120 L 0 230 Z"
                    fill="url(#envelopeFlapLeft)"
                    stroke="#C5A059"
                    strokeWidth="0.8"
                    strokeOpacity="0.3"
                  />

                  {/* 3. Right Side Flap */}
                  <path
                    d="M 360 0 L 205 120 L 360 230 Z"
                    fill="url(#envelopeFlapRight)"
                    stroke="#C5A059"
                    strokeWidth="0.8"
                    strokeOpacity="0.3"
                  />

                  {/* 4. Bottom Triangular Flap */}
                  <path
                    d="M 0 230 L 180 115 L 360 230 Z"
                    fill="url(#envelopeFlapBottom)"
                    stroke="#C5A059"
                    strokeWidth="0.8"
                    strokeOpacity="0.35"
                  />

                  {/* Fine Crease Shadow Line */}
                  <path d="M 0 230 L 180 115 L 360 230" fill="none" stroke="#2A1F18" strokeWidth="0.5" strokeOpacity="0.08" />

                  {/* 5. Top Triangular Flap (Folds open on click) */}
                  <g
                    style={{
                      transformOrigin: "180px 0px",
                      transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: phase === "opening" ? "rotateX(-145deg)" : "none",
                    }}
                  >
                    <path
                      d="M 0 0 L 180 126 L 360 0 Z"
                      fill="url(#envelopeFlapTop)"
                      filter="url(#topFlapDropShadow)"
                      stroke="#C5A059"
                      strokeWidth="1"
                      strokeOpacity="0.45"
                    />

                    {/* Fine Crease Accent on Flap */}
                    <path
                      d="M 10 3 L 180 122 L 350 3"
                      fill="none"
                      stroke="#C5A059"
                      strokeWidth="0.6"
                      strokeOpacity="0.3"
                    />
                  </g>

                  {/* 6. REALISTIC METALLIC AMBER-BRONZE WAX SEAL (Centered on Flap Tip) */}
                  <g
                    filter="url(#waxSealShadow)"
                    style={{
                      transformOrigin: "180px 126px",
                      transition: "all 0.4s ease-out",
                      transform: phase === "opening" ? "scale(0) opacity(0)" : "scale(1)",
                    }}
                  >
                    {/* Outer Wax Stamp Edge with 3D Bevel */}
                    <circle cx="180" cy="126" r="27" fill="url(#waxSealGrad)" stroke="#B38241" strokeWidth="1" strokeOpacity="0.5" />

                    {/* Slightly Irregular Wax Ring */}
                    <path
                      d="M 180 100 C 195 100 206 111 206 126 C 206 141 194 152 180 152 C 165 152 154 141 154 126 C 154 111 165 100 180 100 Z"
                      fill="none"
                      stroke="#5C360F"
                      strokeWidth="1.2"
                      strokeOpacity="0.3"
                    />

                    {/* Inner Recessed Wax Center */}
                    <circle cx="180" cy="126" r="21" fill="url(#waxInnerGrad)" stroke="#B38241" strokeWidth="0.8" strokeOpacity="0.35" />

                    {/* Delicate Beaded Gold Rim inside Seal */}
                    <circle
                      cx="180"
                      cy="126"
                      r="19"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.8"
                      strokeDasharray="2 1.5"
                      strokeOpacity="0.6"
                    />

                    {/* EMBOSSED HEART WITH SPROUTING LEAVES MOTIF (Exact replica from reference 01) */}
                    <g transform="translate(180, 126) scale(0.9)">
                      {/* Embossed Heart */}
                      <path
                        d="M 0 5 C 0 5 -7.5 0 -7.5 -5 C -7.5 -8.2 -4.8 -10.5 -1.8 -10.5 C 0 -10.5 0 -9.5 0 -8.5 C 0 -9.5 1.8 -10.5 4.8 -10.5 C 7.8 -10.5 10.5 -8.2 10.5 -5 C 10.5 0 0 5 0 5 Z"
                        fill="#D6A860"
                        filter="drop-shadow(0 1px 1px rgba(0,0,0,0.4))"
                        stroke="#8A5820"
                        strokeWidth="0.4"
                      />
                      {/* Sprouting Little Stem & Leaves below Heart */}
                      <path d="M 0 4 L 0 9" stroke="#D6A860" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M 0 7 C -2.5 6 -4.5 4.5 -5 2 C -3 2.5 -1 4 0 7 Z" fill="#D6A860" />
                      <path d="M 0 7 C 2.5 6 4.5 4.5 5 2 C 3 2.5 1 4 0 7 Z" fill="#D6A860" />
                    </g>

                    {/* Specular Highlight on Wax Seal */}
                    <ellipse cx="174" cy="115" rx="6" ry="3" fill="#FFFFFF" opacity="0.16" />
                  </g>
                </svg>
              </div>
            </motion.div>

            {/* 3.3 MAIN CTA BUTTON: "افتح الدعوة ✨" (Directly below envelope) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-5 sm:mt-6 flex flex-col items-center select-none"
            >
              <button
                type="button"
                onClick={handleOpen}
                disabled={phase !== "idle"}
                className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#302118] hover:bg-[#3D2C20] text-[#FFFDF8] font-bold text-sm sm:text-base font-cairo shadow-[0_10px_25px_rgba(42,31,24,0.22)] hover:shadow-[0_14px_30px_rgba(42,31,24,0.3)] active:scale-[0.97] border-[1.5px] border-[#C5A059] transition-all duration-300 cursor-pointer touch-target overflow-hidden disabled:opacity-60"
                style={{
                  boxShadow: "0 8px 24px rgba(48,33,24,0.25), 0 0 0 1px rgba(197,160,89,0.3)",
                }}
              >
                {/* Champagne Gold Shimmer sweep */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                {/* 4-point Sparkle Icon (as in reference 01) */}
                <span className="relative text-[#E8D6AE] text-base sm:text-lg leading-none">
                  ✦
                </span>

                {/* Button Text */}
                <span className="relative tracking-wide font-semibold text-[#FFFDF8]">
                  {phase === "opening" ? "جاري فتح الدعوة..." : "افتح الدعوة"}
                </span>
              </button>

              {/* Subtext below button (from reference 01) */}
              <p className="mt-3 text-xs sm:text-sm font-cairo text-[#7A6A5D] font-medium tracking-wide">
                بداية حكايتنا الجديدة .. بحضوركم أجمل
              </p>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              4. BOTTOM BAR CONTROLS
              - Left: "زغرودة! 🎉"
              - Right: Circular Audio Toggle
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="relative z-30 w-full flex items-center justify-between px-2 sm:px-6 py-2 shrink-0" dir="ltr">
            {/* Bottom-left: Zaghrouda Button */}
            <div className="flex items-center">
              <motion.button
                type="button"
                onClick={handleZaghrouda}
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.04 }}
                dir="rtl"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#302118] hover:bg-[#3D2C20] text-[#FFFDF8] border border-[#C5A059]/60 text-xs sm:text-sm font-cairo font-semibold shadow-sm hover:shadow transition-all cursor-pointer touch-target"
                title="أطلق زغرودة فرح!"
              >
                <span className="text-xs">🎉</span>
                <span>زغرودة!</span>
              </motion.button>
            </div>

            {/* Bottom-right: Circular Sound Toggle Button */}
            <div className="flex items-center">
              <motion.button
                type="button"
                onClick={handleToggleSound}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                className="w-11 h-11 rounded-full bg-[#FAF5EB] hover:bg-[#F3EBE0] text-[#302118] border border-[#C5A059] shadow-sm hover:shadow transition-all flex items-center justify-center cursor-pointer touch-target"
                title={isMuted || (!isPlaying && hasStarted) ? "تشغيل الصوت" : "كتم الصوت"}
              >
                {isMuted || (!isPlaying && hasStarted) ? (
                  <VolumeX className="w-5 h-5 text-[#887869]" />
                ) : (
                  <Volume2 className="w-5 h-5 text-[#302118]" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
