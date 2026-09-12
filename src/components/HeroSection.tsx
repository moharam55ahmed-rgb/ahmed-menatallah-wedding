"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { Calendar, Clock, MapPin, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(wedding.dateTimeISO).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById("event-details");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero-section"
      className="relative w-full bg-[#FAF7F2] text-[#2A1F18] pt-4 sm:pt-8 pb-12 sm:pb-16 px-3 sm:px-6 overflow-hidden select-none"
      dir="rtl"
    >
      {/* ═══════════════════════════════════════════════════════════════════
          BACKGROUND SUBTLE WATERMARK LATTICE PATTERN
          ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0 L64 32 L32 64 L0 32 Z' fill='none' stroke='%23C5A059' stroke-width='0.5' stroke-opacity='0.45'/%3E%3Cpath d='M0 0 L32 32 L0 64' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.3'/%3E%3Cpath d='M64 0 L32 32 L64 64' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.3'/%3E%3Crect x='20' y='20' width='24' height='24' transform='rotate(45 32 32)' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          BOTANICAL FOLIAGE SIDE ELEMENTS (MATCHING REFERENCE 02 EXACTLY)
          ═══════════════════════════════════════════════════════════════════ */}
      {/* Top Right Botanical Branch */}
      <div className="pointer-events-none absolute top-0 right-0 w-36 sm:w-56 h-44 sm:h-64 opacity-75 z-0">
        <svg viewBox="0 0 160 180" fill="none" className="w-full h-full">
          <path d="M160 0 C120 30 75 80 40 135" stroke="#8C7456" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
          <path d="M140 18 C122 22 115 36 122 50 C134 44 144 32 140 18 Z" fill="#BFA888" fillOpacity="0.65" />
          <path d="M96 45 C78 42 70 54 78 68 C90 64 98 56 96 45 Z" fill="#9F8766" fillOpacity="0.7" />
          <path d="M68 85 C50 86 45 100 52 114 C65 108 72 96 68 85 Z" fill="#BFA888" fillOpacity="0.6" />
          <path d="M42 125 C28 128 25 140 32 152 C42 146 48 136 42 125 Z" fill="#9F8766" fillOpacity="0.55" />
        </svg>
      </div>

      {/* Top Left Botanical Branch (Mirrored) */}
      <div className="pointer-events-none absolute top-0 left-0 w-36 sm:w-56 h-44 sm:h-64 opacity-75 z-0 -scale-x-100">
        <svg viewBox="0 0 160 180" fill="none" className="w-full h-full">
          <path d="M160 0 C120 30 75 80 40 135" stroke="#8C7456" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
          <path d="M140 18 C122 22 115 36 122 50 C134 44 144 32 140 18 Z" fill="#BFA888" fillOpacity="0.65" />
          <path d="M96 45 C78 42 70 54 78 68 C90 64 98 56 96 45 Z" fill="#9F8766" fillOpacity="0.7" />
          <path d="M68 85 C50 86 45 100 52 114 C65 108 72 96 68 85 Z" fill="#BFA888" fillOpacity="0.6" />
          <path d="M42 125 C28 128 25 140 32 152 C42 146 48 136 42 125 Z" fill="#9F8766" fillOpacity="0.55" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN ARCHED PALACE PORTAL CARD (MATCHING REFERENCE 02 EXACTLY)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative max-w-xl sm:max-w-2xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-b from-[#FDFBF7] via-[#FAF6EE] to-[#F5ECE0] border-[1.5px] border-[#C5A059]/45 rounded-t-[140px] sm:rounded-t-[190px] md:rounded-t-[230px] rounded-b-[24px] shadow-[0_16px_40px_rgba(46,35,28,0.08),0_2px_6px_rgba(0,0,0,0.02)] pt-12 sm:pt-14 pb-8 sm:pb-10 px-5 sm:px-10 flex flex-col items-center text-center overflow-hidden"
        >
          {/* Inner Architectural Molding Arch Line */}
          <div className="pointer-events-none absolute inset-x-3 sm:inset-x-5 top-3 sm:top-5 bottom-3 sm:bottom-5 rounded-t-[130px] sm:rounded-t-[175px] md:rounded-t-[215px] rounded-b-[18px] border border-[#C5A059]/25" />

          {/* Left & Right Floral Arch Cascades (Illustrative Watercolor Blossoms on Arch sides) */}
          <div className="pointer-events-none absolute top-12 -left-2 sm:left-1 w-20 sm:w-28 h-64 opacity-80 z-0">
            <svg viewBox="0 0 100 240" fill="none" className="w-full h-full">
              {/* Floral Bouquet Cluster along Arch */}
              <circle cx="35" cy="40" r="14" fill="#FBF6EE" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.4" />
              <circle cx="28" cy="70" r="16" fill="#F7EFE2" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.4" />
              <circle cx="38" cy="105" r="13" fill="#FBF6EE" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.4" />
              <circle cx="25" cy="140" r="15" fill="#F7EFE2" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.4" />
              {/* Leaves */}
              <path d="M45 30 C58 24 64 35 55 45 C48 40 45 35 45 30 Z" fill="#BFA888" fillOpacity="0.6" />
              <path d="M48 60 C62 55 66 68 56 78 C50 72 48 65 48 60 Z" fill="#9F8766" fillOpacity="0.6" />
              <path d="M52 95 C68 90 70 105 60 114 C52 108 50 100 52 95 Z" fill="#BFA888" fillOpacity="0.6" />
              <path d="M42 135 C55 130 58 142 50 150 C44 145 42 140 42 135 Z" fill="#9F8766" fillOpacity="0.55" />
            </svg>
          </div>

          <div className="pointer-events-none absolute top-12 -right-2 sm:right-1 w-20 sm:w-28 h-64 opacity-80 z-0 -scale-x-100">
            <svg viewBox="0 0 100 240" fill="none" className="w-full h-full">
              <circle cx="35" cy="40" r="14" fill="#FBF6EE" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.4" />
              <circle cx="28" cy="70" r="16" fill="#F7EFE2" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.4" />
              <circle cx="38" cy="105" r="13" fill="#FBF6EE" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.4" />
              <circle cx="25" cy="140" r="15" fill="#F7EFE2" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.4" />
              <path d="M45 30 C58 24 64 35 55 45 C48 40 45 35 45 30 Z" fill="#BFA888" fillOpacity="0.6" />
              <path d="M48 60 C62 55 66 68 56 78 C50 72 48 65 48 60 Z" fill="#9F8766" fillOpacity="0.6" />
              <path d="M52 95 C68 90 70 105 60 114 C52 108 50 100 52 95 Z" fill="#BFA888" fillOpacity="0.6" />
              <path d="M42 135 C55 130 58 142 50 150 C44 145 42 140 42 135 Z" fill="#9F8766" fillOpacity="0.55" />
            </svg>
          </div>

          {/* 1. TOP GOLDEN ISLAMIC ROSETTE / MEDALLION EMBLEM */}
          <div className="relative z-10 mb-3 text-[#C5A059]">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(20, 20)">
                <rect x="-3" y="-3" width="6" height="6" fill="#C5A059" transform="rotate(45)" />
                <circle cx="0" cy="0" r="2.5" fill="#FAF6F0" />
                <path d="M0 -9 C-2.5 -5, -2.5 -2, 0 0 C2.5 -2, 2.5 -5, 0 -9 Z" fill="#C5A059" opacity="0.9" />
                <path d="M0 9 C-2.5 5, -2.5 2, 0 0 C2.5 2, 2.5 5, 0 9 Z" fill="#C5A059" opacity="0.9" />
                <path d="M-9 0 C-5 -2.5, -2 -2.5, 0 0 C-2 2.5, -5 2.5, -9 0 Z" fill="#C5A059" opacity="0.9" />
                <path d="M9 0 C5 -2.5, 2 -2.5, 0 0 C2 2.5, 5 2.5, 9 0 Z" fill="#C5A059" opacity="0.9" />
                <path d="M-6 -6 C-4 -2, -2 -4, 0 0 C-4 -2, -2 -4, -6 -6 Z" fill="#C5A059" opacity="0.75" />
                <path d="M6 -6 C4 -2, 2 -4, 0 0 C4 -2, 2 -4, 6 -6 Z" fill="#C5A059" opacity="0.75" />
                <path d="M-6 6 C-4 2, -2 4, 0 0 C-4 2, -2 4, -6 6 Z" fill="#C5A059" opacity="0.75" />
                <path d="M6 6 C4 2, 2 4, 0 0 C4 2, 2 4, 6 6 Z" fill="#C5A059" opacity="0.75" />
                <circle cx="0" cy="-14" r="1.5" fill="#C5A059" />
                <circle cx="0" cy="14" r="1.5" fill="#C5A059" />
                <circle cx="-14" cy="0" r="1.5" fill="#C5A059" />
                <circle cx="14" cy="0" r="1.5" fill="#C5A059" />
              </g>
            </svg>
          </div>

          {/* 2. EYEBROW TEXT (Exact phrasing from Reference 02) */}
          <p className="relative z-10 text-xs sm:text-sm font-cairo font-semibold text-[#5A4638] tracking-wide mb-1">
            يسرنا دعوتكم لحضور حفل زفاف
          </p>

          {/* 3. ROYAL COUPLE NAMES (Arabic Calligraphy matching Reference) */}
          <h1 className="relative z-10 text-4xl sm:text-5xl md:text-[54px] font-ruqaa font-bold text-[#2A1F18] leading-[1.25] my-1 sm:my-2 flex items-center justify-center gap-2 sm:gap-3">
            <span>{wedding.groomAr}</span>
            <span className="text-[#C5A059] font-cormorant font-normal text-3xl sm:text-4xl leading-none pt-1">
              &amp;
            </span>
            <span>{wedding.brideAr}</span>
          </h1>

          {/* 4. DATE LINE */}
          <p className="relative z-10 text-sm sm:text-base font-cairo font-bold text-[#5A4638] mb-2 sm:mb-3">
            14 أكتوبر 2026
          </p>

          {/* 5. BLESSING DU'AA (Matching Reference 02) */}
          <div className="relative z-10 max-w-sm mx-auto mb-5 sm:mb-6">
            <p className="text-xs sm:text-sm font-amiri font-bold text-[#4A3B30] leading-relaxed">
              اللهم بارك لهما وبارك عليهما
              <br className="block sm:hidden" />
              <span className="hidden sm:inline"> </span>
              واجمع بينهما في خير
            </p>
          </div>

          {/* 6. EVENT SUMMARY CARD (Matching Reference 02 Card Style) */}
          <div className="relative z-10 w-full max-w-xs sm:max-w-sm rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 px-4 py-3.5 sm:py-4 mb-4 space-y-2 text-xs sm:text-sm font-cairo text-[#2A1F18] shadow-[0_4px_16px_rgba(46,35,28,0.04)]">
            {/* Date Row */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm">📅</span>
              <span className="font-bold text-[#2A1F18]">الأربعاء 14 أكتوبر 2026</span>
            </div>

            {/* Time Row */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm">⏰</span>
              <span className="font-bold text-[#2A1F18]">7:00 مساءً</span>
            </div>

            {/* Venue Row */}
            <div className="flex items-center justify-center gap-1.5 text-center">
              <span className="text-sm shrink-0">📍</span>
              <div>
                <p className="font-bold text-[#2A1F18]">{wedding.venueAr}</p>
                <p className="text-[11px] font-medium text-[#7A6A5D]">شبين القناطر، القليوبية، مصر</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            COUNTDOWN TIMER SECTION (Directly below Arch in Reference 02)
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="w-full mt-6 sm:mt-8 text-center">
          {/* Section Title with Horizontal Wings */}
          <div className="flex items-center justify-center gap-3 mb-4 select-none">
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
            <p className="text-xs sm:text-sm font-cairo font-bold text-[#5A4638] tracking-wider">
              باقي علي ليلة العمر
            </p>
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
          </div>

          {/* 4 Countdown Ivory Cards */}
          {mounted && (
            <div className="grid grid-cols-4 gap-2 sm:gap-3.5 max-w-xs sm:max-w-sm mx-auto">
              {/* Days */}
              <div className="py-3 px-2 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/30 shadow-[0_4px_12px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold font-cormorant text-[#2A1F18] leading-none">
                  {timeLeft.days}
                </span>
                <span className="text-[11px] sm:text-xs font-cairo text-[#6E5D4F] mt-1.5 font-bold">
                  يوم
                </span>
              </div>

              {/* Hours */}
              <div className="py-3 px-2 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/30 shadow-[0_4px_12px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold font-cormorant text-[#2A1F18] leading-none">
                  {timeLeft.hours}
                </span>
                <span className="text-[11px] sm:text-xs font-cairo text-[#6E5D4F] mt-1.5 font-bold">
                  ساعة
                </span>
              </div>

              {/* Minutes */}
              <div className="py-3 px-2 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/30 shadow-[0_4px_12px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold font-cormorant text-[#2A1F18] leading-none">
                  {timeLeft.minutes}
                </span>
                <span className="text-[11px] sm:text-xs font-cairo text-[#6E5D4F] mt-1.5 font-bold">
                  دقيقة
                </span>
              </div>

              {/* Seconds */}
              <div className="py-3 px-2 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/30 shadow-[0_4px_12px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold font-cormorant text-[#2A1F18] leading-none">
                  {timeLeft.seconds}
                </span>
                <span className="text-[11px] sm:text-xs font-cairo text-[#6E5D4F] mt-1.5 font-bold">
                  ثانية
                </span>
              </div>
            </div>
          )}

          {/* Down Chevron Indicator */}
          <button
            type="button"
            onClick={scrollToNext}
            className="mt-4 inline-flex items-center justify-center text-[#C5A059] hover:text-[#8C6D3B] transition-colors cursor-pointer"
            aria-label="الانتقال إلى تفاصيل المناسبة"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            EVENT DETAILS SECTION (تفاصيل المناسبة - 3 Cards in Reference 02)
            ═══════════════════════════════════════════════════════════════════ */}
        <div id="event-details" className="mt-8 sm:mt-12 flex flex-col items-center text-center">
          {/* Islamic Rosette Ornament Divider */}
          <div className="mb-3 text-[#C5A059]">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(20, 20)">
                <rect x="-3" y="-3" width="6" height="6" fill="#C5A059" transform="rotate(45)" />
                <circle cx="0" cy="0" r="2.5" fill="#FAF6F0" />
                <path d="M0 -9 C-2.5 -5, -2.5 -2, 0 0 C2.5 -2, 2.5 -5, 0 -9 Z" fill="#C5A059" opacity="0.9" />
                <path d="M0 9 C-2.5 5, -2.5 2, 0 0 C2.5 2, 2.5 5, 0 9 Z" fill="#C5A059" opacity="0.9" />
                <path d="M-9 0 C-5 -2.5, -2 -2.5, 0 0 C-2 2.5, -5 2.5, -9 0 Z" fill="#C5A059" opacity="0.9" />
                <path d="M9 0 C5 -2.5, 2 -2.5, 0 0 C2 2.5, 5 2.5, 9 0 Z" fill="#C5A059" opacity="0.9" />
                <circle cx="0" cy="-14" r="1.5" fill="#C5A059" />
                <circle cx="0" cy="14" r="1.5" fill="#C5A059" />
                <circle cx="-14" cy="0" r="1.5" fill="#C5A059" />
                <circle cx="14" cy="0" r="1.5" fill="#C5A059" />
              </g>
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-amiri font-bold text-[#2A1F18] mb-6">
            تفاصيل المناسبة
          </h2>

          {/* 3 Detail Cards (Matching Reference 02) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {/* Card 1: التاريخ */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_4px_16px_rgba(46,35,28,0.04)] flex flex-col items-center text-center hover:border-[#C5A059] transition-all">
              <div className="w-10 h-10 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center text-base mb-3 shadow-2xs">
                <Calendar className="w-4 h-4 text-[#8C6D3B]" />
              </div>
              <span className="text-xs font-bold font-cairo text-[#6E5D4F] mb-1">التاريخ</span>
              <h3 className="text-base font-amiri font-bold text-[#2A1F18]">الأربعاء</h3>
              <p className="text-xs font-cairo text-[#8C6D3B] font-bold mt-0.5">14 أكتوبر 2026</p>
            </div>

            {/* Card 2: الوقت */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_4px_16px_rgba(46,35,28,0.04)] flex flex-col items-center text-center hover:border-[#C5A059] transition-all">
              <div className="w-10 h-10 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center text-base mb-3 shadow-2xs">
                <Clock className="w-4 h-4 text-[#8C6D3B]" />
              </div>
              <span className="text-xs font-bold font-cairo text-[#6E5D4F] mb-1">الوقت</span>
              <h3 className="text-base font-amiri font-bold text-[#2A1F18]">7:00</h3>
              <p className="text-xs font-cairo text-[#8C6D3B] font-bold mt-0.5">مساءً</p>
            </div>

            {/* Card 3: المكان */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_4px_16px_rgba(46,35,28,0.04)] flex flex-col items-center text-center hover:border-[#C5A059] transition-all">
              <div className="w-10 h-10 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center text-base mb-3 shadow-2xs">
                <MapPin className="w-4 h-4 text-[#8C6D3B]" />
              </div>
              <span className="text-xs font-bold font-cairo text-[#6E5D4F] mb-1">المكان</span>
              <h3 className="text-base font-amiri font-bold text-[#2A1F18]">{wedding.venueAr}</h3>
              <p className="text-[11px] font-cairo text-[#6E5D4F] font-medium mt-0.5">شبين القناطر، القليوبية، مصر</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
