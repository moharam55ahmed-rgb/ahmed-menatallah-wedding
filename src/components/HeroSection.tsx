"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero-section" className="relative w-full bg-[#F7F1E6] text-[#241D18] pt-2 pb-10 sm:pb-14 px-4 overflow-hidden" dir="rtl">
      
      {/* ═══════════════════════════════════════════════════════════════════
          TOP HEADER & MINIMAL NAVIGATION (Reference 02)
          - Explicit rule: NO HAMBURGER MENU!
          - Desktop: Logo + Minimal Nav links
          - Mobile: Clean Couple Logo only
          ═══════════════════════════════════════════════════════════════════ */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-3 mb-4 sm:mb-6 border-b border-[#C9A96A]/20 select-none">
        {/* Logo / Couple Name */}
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-amiri font-bold text-[#241D18] tracking-tight">
            {wedding.groomAr} <span className="text-[#C9A96A] font-cormorant font-normal">&amp;</span> {wedding.brideAr}
          </span>
        </div>

        {/* Desktop Minimal Navigation Links (NO hamburger menu) */}
        <nav className="hidden md:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollTo("hero-section")}
            className="px-3.5 py-1.5 rounded-full bg-[#241D18] text-[#FBF8F1] text-xs font-cairo font-bold shadow-2xs cursor-pointer"
          >
            الرئيسية
          </button>
          <button
            type="button"
            onClick={() => scrollTo("event-details")}
            className="px-3 py-1.5 text-xs font-cairo font-medium text-[#5C5146] hover:text-[#241D18] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            تفاصيل المناسبة
          </button>
          <button
            type="button"
            onClick={() => scrollTo("venue-section")}
            className="px-3 py-1.5 text-xs font-cairo font-medium text-[#5C5146] hover:text-[#241D18] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            الموقع
          </button>
          <button
            type="button"
            onClick={() => scrollTo("rsvp-section")}
            className="px-3 py-1.5 text-xs font-cairo font-medium text-[#5C5146] hover:text-[#241D18] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            الحضور
          </button>
          <button
            type="button"
            onClick={() => scrollTo("wishes-section")}
            className="px-3 py-1.5 text-xs font-cairo font-medium text-[#5C5146] hover:text-[#241D18] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            التهاني
          </button>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN ARCHED INVITATION CARD (Reference 02 Desktop & Mobile)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative bg-[#FBF8F1] border border-[#C9A96A]/35 rounded-t-[70px] sm:rounded-t-[100px] rounded-b-[28px] shadow-[0_8px_30px_rgba(36,29,24,0.06)] pt-10 pb-8 px-6 sm:px-10 flex flex-col items-center text-center overflow-hidden"
        >
          {/* Subtle Arched Top Frame Line */}
          <div className="pointer-events-none absolute inset-x-8 top-3 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96A]/30 to-transparent" />

          {/* Botanical Corners / Flourishes */}
          <div className="pointer-events-none absolute top-3 right-3 sm:top-5 sm:right-5 w-16 h-16 sm:w-20 sm:h-20 text-[#C9A96A]/25 select-none">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M100 0 C70 10, 40 40, 20 80 M80 20 C60 25, 45 45, 30 70 M60 10 C50 30, 35 45, 10 50" strokeLinecap="round" />
            </svg>
          </div>
          <div className="pointer-events-none absolute top-3 left-3 sm:top-5 sm:left-5 w-16 h-16 sm:w-20 sm:h-20 text-[#C9A96A]/25 select-none -scale-x-100">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M100 0 C70 10, 40 40, 20 80 M80 20 C60 25, 45 45, 30 70 M60 10 C50 30, 35 45, 10 50" strokeLinecap="round" />
            </svg>
          </div>

          {/* Eyebrow */}
          <p className="text-xs sm:text-sm font-cairo text-[#5C5146] tracking-wide mb-2 font-medium">
            يسرنا دعوتكم لحضور حفل زفاف
          </p>

          {/* Large Royal Couple Display Names */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-amiri font-bold text-[#241D18] leading-tight my-1 tracking-tight">
            {wedding.groomAr} <span className="text-[#C9A96A] font-cormorant font-normal">&amp;</span> {wedding.brideAr}
          </h1>

          {/* Wedding Blessing */}
          <p className="text-sm sm:text-base font-amiri font-bold text-[#3A2D24] leading-relaxed max-w-md mx-auto mt-2 mb-4">
            اللهم بارك لهما وبارك عليهما واجمع بينهما في خير
          </p>

          {/* Event Quick Details Centered List with Icons */}
          <div className="w-full max-w-sm rounded-2xl bg-white/85 border border-[#C9A96A]/25 p-3.5 sm:p-4 mb-5 space-y-2 text-xs sm:text-sm font-cairo text-[#241D18] shadow-2xs">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-[#C9A96A]" />
              <span className="font-semibold">{wedding.dayAr} 14 أكتوبر 2026</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#C9A96A]" />
              <span className="font-semibold">7:00 مساءً</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-center">
              <MapPin className="w-4 h-4 text-[#C9A96A] shrink-0" />
              <span>{wedding.venueAr} — شبين القناطر، القليوبية، مصر</span>
            </div>
          </div>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-3 my-1 text-[#C9A96A]/70 w-full select-none">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C9A96A]/50 to-transparent" />
            <span className="text-xs">✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C9A96A]/50 to-transparent" />
          </div>

          {/* Countdown Section (Reference 02) */}
          <div className="w-full mt-3 mb-1">
            <p className="text-xs sm:text-sm font-cairo font-semibold text-[#5C5146] mb-3 select-none">
              — باقي علي ليلة العمر —
            </p>

            {mounted && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs sm:max-w-sm mx-auto">
                {/* Days */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#C9A96A]/30 shadow-2xs flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#241D18] leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] sm:text-xs font-cairo text-[#5C5146] mt-1 font-medium">
                    يوم
                  </span>
                </div>

                {/* Hours */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#C9A96A]/30 shadow-2xs flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#241D18] leading-none">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[10px] sm:text-xs font-cairo text-[#5C5146] mt-1 font-medium">
                    ساعة
                  </span>
                </div>

                {/* Minutes */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#C9A96A]/30 shadow-2xs flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#241D18] leading-none">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[10px] sm:text-xs font-cairo text-[#5C5146] mt-1 font-medium">
                    دقيقة
                  </span>
                </div>

                {/* Seconds */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#C9A96A]/30 shadow-2xs flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#241D18] leading-none">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[10px] sm:text-xs font-cairo text-[#5C5146] mt-1 font-medium">
                    ثانية
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            EVENT DETAILS SECTION (تفاصيل المناسبة - Reference 02)
            ═══════════════════════════════════════════════════════════════════ */}
        <div id="event-details" className="mt-8 sm:mt-10 flex flex-col items-center text-center">
          {/* Section Eyebrow & Title */}
          <div className="flex items-center justify-center gap-3 mb-2 text-[#C9A96A]">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A96A]/60" />
            <Sparkles className="w-3.5 h-3.5" />
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A96A]/60" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-amiri font-bold text-[#241D18] mb-5">
            تفاصيل المناسبة
          </h2>

          {/* 3 Cards Matching Reference 02 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {/* Card 1: التاريخ */}
            <div className="p-5 rounded-2xl bg-[#FBF8F1] border border-[#C9A96A]/30 shadow-2xs flex flex-col items-center text-center hover:border-[#C9A96A]/60 transition-all">
              <div className="w-10 h-10 rounded-full bg-white border border-[#C9A96A]/35 flex items-center justify-center text-base mb-2.5 shadow-2xs">
                <Calendar className="w-4 h-4 text-[#C9A96A]" />
              </div>
              <span className="text-xs font-semibold font-cairo text-[#5C5146] mb-1">التاريخ</span>
              <h3 className="text-base font-amiri font-bold text-[#241D18]">الأربعاء</h3>
              <p className="text-xs font-cairo text-[#8A6A32] font-semibold mt-0.5">14 أكتوبر 2026</p>
            </div>

            {/* Card 2: الوقت */}
            <div className="p-5 rounded-2xl bg-[#FBF8F1] border border-[#C9A96A]/30 shadow-2xs flex flex-col items-center text-center hover:border-[#C9A96A]/60 transition-all">
              <div className="w-10 h-10 rounded-full bg-white border border-[#C9A96A]/35 flex items-center justify-center text-base mb-2.5 shadow-2xs">
                <Clock className="w-4 h-4 text-[#C9A96A]" />
              </div>
              <span className="text-xs font-semibold font-cairo text-[#5C5146] mb-1">الوقت</span>
              <h3 className="text-base font-amiri font-bold text-[#241D18]">7:00</h3>
              <p className="text-xs font-cairo text-[#8A6A32] font-semibold mt-0.5">مساءً</p>
            </div>

            {/* Card 3: المكان */}
            <div className="p-5 rounded-2xl bg-[#FBF8F1] border border-[#C9A96A]/30 shadow-2xs flex flex-col items-center text-center hover:border-[#C9A96A]/60 transition-all">
              <div className="w-10 h-10 rounded-full bg-white border border-[#C9A96A]/35 flex items-center justify-center text-base mb-2.5 shadow-2xs">
                <MapPin className="w-4 h-4 text-[#C9A96A]" />
              </div>
              <span className="text-xs font-semibold font-cairo text-[#5C5146] mb-1">المكان</span>
              <h3 className="text-base font-amiri font-bold text-[#241D18]">{wedding.venueAr}</h3>
              <p className="text-[11px] font-cairo text-[#5C5146] mt-0.5">شبين القناطر، القليوبية، مصر</p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
