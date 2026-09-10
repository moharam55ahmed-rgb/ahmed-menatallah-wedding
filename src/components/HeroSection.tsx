"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { wedding } from "@/config/wedding";
import { ChevronDown, MapPin, CalendarDays, Heart } from "lucide-react";

export default function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById("greeting-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Slow Subtle Ken Burns Zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={wedding.heroImage}
          alt="Ahmed & Menatallah Wedding Atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.62] contrast-[1.05]"
        />
      </motion.div>

      {/* Cinematic Vignette, Gradient & Gold Glow Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#151311] via-black/40 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,164,109,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Hero Content Card */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 flex flex-col items-center text-center text-[#F8F2EA]">
        
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151311]/60 border border-[#C5A46D]/40 backdrop-blur-md mb-6"
        >
          <Heart className="w-3.5 h-3.5 text-[#C5A46D] fill-[#C5A46D]/30" />
          <span className="text-sm md:text-base font-cairo text-[#DFCBA8] tracking-wide">
            بكل الحب والسعادة
          </span>
        </motion.div>

        {/* Supporting Header */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-xs md:text-sm uppercase tracking-[0.35em] text-[#C5A46D] font-cormorant mb-4"
        >
          We are getting married
        </motion.p>

        {/* Couple Main Names in Arabic with Calligraphic Elegance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="my-3 flex flex-col items-center justify-center gap-2"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-amiri font-bold text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] tracking-tight">
            {wedding.groomAr}
          </h1>

          <div className="flex items-center gap-4 my-1">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C5A46D] to-transparent" />
            <span className="text-2xl md:text-3xl font-cormorant italic text-[#C5A46D]">
              &
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C5A46D] to-transparent" />
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-amiri font-bold text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] tracking-tight">
            {wedding.brideAr}
          </h2>
        </motion.div>

        {/* English Names */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl font-cormorant tracking-[0.2em] text-[#DFCBA8] mt-2 mb-6"
        >
          {wedding.groom} & {wedding.bride}
        </motion.p>

        {/* Supporting Invitation Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl font-cairo text-[#F8F2EA]/90 max-w-lg mb-8 leading-relaxed"
        >
          يسرّنا دعوتكم لمشاركتنا فرحة زفافنا
        </motion.p>

        {/* Date & Venue Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm md:text-base font-cairo w-full"
        >
          <div className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 border border-[#C5A46D]/30 backdrop-blur-md">
            <CalendarDays className="w-4 h-4 text-[#C5A46D]" />
            <span className="text-[#F8F2EA] font-medium">14 / 10 / 2026</span>
          </div>

          <div className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 border border-[#C5A46D]/30 backdrop-blur-md">
            <MapPin className="w-4 h-4 text-[#C5A46D]" />
            <span className="text-[#F8F2EA] font-medium">
              {wedding.venueAr} • {wedding.cityAr}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Cue */}
      <motion.button
        type="button"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-label="Scroll to invitation details"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#DFCBA8]/80 hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-[11px] font-cairo tracking-wider">اكتشف تفاصيل الحفل</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#C5A46D]" />
        </motion.div>
      </motion.button>
    </section>
  );
}
