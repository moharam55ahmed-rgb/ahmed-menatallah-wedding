"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { wedding } from "@/config/wedding";
import { useAudio } from "./AudioContext";
import { MailOpen, Sparkles } from "lucide-react";

interface OpeningExperienceProps {
  onOpen: () => void;
}

export default function OpeningExperience({ onOpen }: OpeningExperienceProps) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const [guestName, setGuestName] = useState<string | null>(null);
  const { startAudioExperience } = useAudio();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get("guest");
      if (guest?.trim()) setGuestName(guest.trim());
    }
  }, []);

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    startAudioExperience();
    setTimeout(() => {
      setPhase("done");
      setTimeout(onOpen, 600);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#110F0D] overflow-hidden px-5"
          style={{ direction: "rtl" }}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C5A46D]/14 blur-[130px]" />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#EAD7D1]/8 blur-[90px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,#C5A46D_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.07]" />
          </div>

          {/* Guest badge + title */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative z-10 flex flex-col items-center text-center mb-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-[#C5A46D]/35 backdrop-blur-md mb-4">
              <Sparkles className="w-3 h-3 text-[#C5A46D]" />
              <span className="text-[11px] font-cairo tracking-wide text-[#DFCBA8]">
                {guestName ? `دعوة خاصة إلى ${guestName}` : "دعوة خاصة لكم"}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-amiri font-bold text-[#F8F2EA] tracking-wide leading-tight">
              دعوة زفاف
            </h1>
            <p className="mt-1 text-xs uppercase tracking-[0.35em] text-[#C5A46D] font-cormorant">
              Wedding Invitation
            </p>
          </motion.div>

          {/* The Invitation Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={
              phase === "opening"
                ? { opacity: 0, scale: 1.05, y: -20 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{ duration: phase === "opening" ? 0.5 : 1, delay: phase === "opening" ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[320px] sm:max-w-[360px]"
          >
            {/* Gold border */}
            <div
              className="rounded-[22px] p-[1.5px] shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
              style={{
                background: "linear-gradient(160deg,#E6D0A2 0%,#9A7A40 50%,#3D3020 100%)",
              }}
            >
              {/* Ivory card body */}
              <div
                className="relative rounded-[21px] overflow-hidden flex flex-col items-center"
                style={{
                  background: "linear-gradient(160deg,#FBF5EB 0%,#F4EAD8 55%,#EDE0C8 100%)",
                }}
              >
                {/* Paper texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E\")",
                    backgroundSize: "200px",
                  }}
                />

                {/* Corner ornaments */}
                <div className="absolute top-3 right-4 w-7 h-7 border-t-2 border-r-2 border-[#C5A46D]/55 rounded-tr-lg" />
                <div className="absolute top-3 left-4 w-7 h-7 border-t-2 border-l-2 border-[#C5A46D]/55 rounded-tl-lg" />
                <div className="absolute bottom-3 right-4 w-7 h-7 border-b-2 border-r-2 border-[#C5A46D]/55 rounded-br-lg" />
                <div className="absolute bottom-3 left-4 w-7 h-7 border-b-2 border-l-2 border-[#C5A46D]/55 rounded-bl-lg" />

                <div className="relative z-10 w-full px-7 pt-7 pb-6 flex flex-col items-center text-center">
                  {/* Bismillah ornament */}
                  <div className="flex items-center gap-3 mb-5 w-full">
                    <span className="flex-1 h-[1px] bg-gradient-to-l from-[#C5A46D]/55 to-transparent" />
                    <span className="text-[11px] font-amiri text-[#A07F47] whitespace-nowrap">
                      ✦ بِسْمِ اللَّهِ ✦
                    </span>
                    <span className="flex-1 h-[1px] bg-gradient-to-r from-[#C5A46D]/55 to-transparent" />
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#70735F] font-cormorant mb-3">
                    Together in love
                  </p>

                  {/* Names */}
                  <p className="text-4xl sm:text-5xl font-amiri font-bold text-[#231F1A] leading-tight">
                    {wedding.groomAr}
                  </p>
                  <div className="flex items-center gap-3 my-2.5">
                    <span className="w-10 h-[1px] bg-[#C5A46D]/50" />
                    <span className="text-lg font-cormorant italic text-[#C5A46D]">&amp;</span>
                    <span className="w-10 h-[1px] bg-[#C5A46D]/50" />
                  </div>
                  <p className="text-4xl sm:text-5xl font-amiri font-bold text-[#231F1A] leading-tight">
                    {wedding.brideAr}
                  </p>
                  <p className="text-[10px] font-cormorant tracking-[0.2em] text-[#70735F] mt-2 mb-5">
                    {wedding.groom} &amp; {wedding.bride}
                  </p>

                  {/* Divider */}
                  <div className="flex items-center gap-2 w-full mb-4">
                    <span className="flex-1 h-[1px] bg-[#C5A46D]/35" />
                    <span className="text-[#C5A46D] text-sm">✦</span>
                    <span className="flex-1 h-[1px] bg-[#C5A46D]/35" />
                  </div>

                  {/* Date */}
                  <div className="flex items-baseline justify-center gap-2 mb-1.5">
                    <span className="text-2xl font-cormorant font-light text-[#231F1A]">14</span>
                    <span className="text-[#C5A46D]/60 font-cormorant text-lg">/</span>
                    <span className="text-2xl font-cormorant font-light text-[#231F1A]">10</span>
                    <span className="text-[#C5A46D]/60 font-cormorant text-lg">/</span>
                    <span className="text-2xl font-cormorant font-light text-[#231F1A]">2026</span>
                  </div>
                  <p className="text-xs font-cairo text-[#A07F47] font-semibold mb-4">
                    {wedding.dayAr} • الساعة 7:00 مساءً
                  </p>

                  {/* Venue */}
                  <p className="text-sm font-amiri font-bold text-[#231F1A] mb-0.5">
                    {wedding.venueAr}
                  </p>
                  <p className="text-[10px] font-cairo text-[#70735F] mb-5">
                    {wedding.cityAr}
                  </p>

                  {/* Divider before seal */}
                  <div className="flex items-center gap-2 w-full mb-5">
                    <span className="flex-1 h-[1px] bg-[#C5A46D]/30" />
                    <span className="text-[#C5A46D]/50 text-xs">✦</span>
                    <span className="flex-1 h-[1px] bg-[#C5A46D]/30" />
                  </div>

                  {/* Wax Seal */}
                  <motion.div
                    animate={
                      phase === "opening"
                        ? { scale: [1, 1.2, 0], opacity: [1, 1, 0], rotate: [0, 10, -15] }
                        : { scale: 1, opacity: 1, rotate: 0 }
                    }
                    transition={{ duration: 0.4 }}
                    className="w-16 h-16 rounded-full border-2 border-[#FFE8B3] overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.35),0_0_0_3px_rgba(197,164,109,0.2)] mb-1"
                  >
                    <Image
                      src={wedding.waxSealImage}
                      alt="A & M"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="relative z-10 mt-7 flex flex-col items-center gap-2"
          >
            <button
              type="button"
              onClick={handleOpen}
              disabled={phase !== "idle"}
              className="group relative inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-[#B58A48] via-[#E6D0A2] to-[#B58A48] text-[#151311] font-bold text-base font-cairo shadow-[0_10px_30px_rgba(197,164,109,0.4)] hover:shadow-[0_14px_40px_rgba(197,164,109,0.6)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer touch-target overflow-hidden disabled:opacity-60"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <MailOpen className="w-5 h-5 shrink-0" />
              <span className="relative">
                {phase === "opening" ? "جاري فتح الدعوة..." : "افتح الدعوة"}
              </span>
            </button>
            <p className="text-[10px] font-cairo text-[#F8F2EA]/35 text-center">
              اضغط للاستماع إلى أنغام الزفاف وبدء التجربة
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
