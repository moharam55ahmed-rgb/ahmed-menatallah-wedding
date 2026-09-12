"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(wedding.dateTimeISO).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
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
    <section id="hero-section" className="relative w-full bg-[#F7F1E6] text-[#241D18] pt-3 pb-12 sm:pb-16 px-4" dir="rtl">
      
      {/* ═══════════════════════════════════════════════════════════════════
          TOP HEADER & MINIMAL NAVIGATION (Matching Reference 02)
          - Desktop: Logo + Minimal Nav Pills (No hamburger!)
          - Mobile: Clean Couple Name Logo (No hamburger!)
          ═══════════════════════════════════════════════════════════════════ */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-3 mb-6 sm:mb-8 border-b border-[#C9A96A]/20 select-none">
        {/* Logo / Couple Name */}
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-amiri font-bold text-[#241D18] tracking-tight">
            {wedding.groomAr} <span className="text-[#C9A96A] font-cormorant font-normal">&amp;</span> {wedding.brideAr}
          </span>
        </div>

        {/* Desktop Minimal Navigation Links (No Hamburger Menu) */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollTo("hero-section")}
            className="px-4 py-1.5 rounded-full bg-[#241D18] text-[#FBF8F1] text-xs font-cairo font-bold shadow-xs cursor-pointer"
          >
            الرئيسية
          </button>
          <button
            type="button"
            onClick={() => scrollTo("event-details")}
            className="px-3 py-1.5 text-xs font-cairo font-semibold text-[#5C5146] hover:text-[#241D18] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            تفاصيل المناسبة
          </button>
          <button
            type="button"
            onClick={() => scrollTo("venue-section")}
            className="px-3 py-1.5 text-xs font-cairo font-semibold text-[#5C5146] hover:text-[#241D18] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            الموقع
          </button>
          <button
            type="button"
            onClick={() => scrollTo("rsvp-section")}
            className="px-3 py-1.5 text-xs font-cairo font-semibold text-[#5C5146] hover:text-[#241D18] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            الحضور
          </button>
          <button
            type="button"
            onClick={() => scrollTo("wishes-section")}
            className="px-3 py-1.5 text-xs font-cairo font-semibold text-[#5C5146] hover:text-[#241D18] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            التهاني
          </button>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN ARCHED INVITATION CARD (Exact Layout of Reference 02)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#FBF8F1] border-2 border-[#C9A96A]/35 rounded-[36px] shadow-[0_10px_35px_rgba(36,29,24,0.06)] p-6 sm:p-10 flex flex-col items-center text-center overflow-hidden"
        >
          {/* Subtle Corner Botanical Foliage */}
          <div className="pointer-events-none absolute top-3 right-3 w-16 h-16 sm:w-20 sm:h-20 text-[#C9A96A]/20 select-none">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M100 0 C70 10, 40 40, 20 80 M80 20 C60 25, 45 45, 30 70 M60 10 C50 30, 35 45, 10 50" strokeLinecap="round" />
            </svg>
          </div>
          <div className="pointer-events-none absolute top-3 left-3 w-16 h-16 sm:w-20 sm:h-20 text-[#C9A96A]/20 select-none -scale-x-100">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M100 0 C70 10, 40 40, 20 80 M80 20 C60 25, 45 45, 30 70 M60 10 C50 30, 35 45, 10 50" strokeLinecap="round" />
            </svg>
          </div>

          {/* Invitation Eyebrow */}
          <p className="text-xs sm:text-sm font-cairo text-[#70735F] tracking-wide mb-2 font-medium">
            يسرنا دعوتكم لحضور حفل زفاف
          </p>

          {/* Couple Display Names */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-amiri font-bold text-[#241D18] leading-tight my-1 tracking-tight">
            {wedding.groomAr} <span className="text-[#C9A96A] font-cormorant font-normal">&amp;</span> {wedding.brideAr}
          </h1>

          {/* Date */}
          <p className="text-xs sm:text-sm font-cairo text-[#C9A96A] font-semibold mt-1 mb-2">
            14 أكتوبر 2026
          </p>

          {/* Required Blessing */}
          <p className="text-sm sm:text-base font-amiri font-bold text-[#3A2D24] leading-relaxed max-w-md mx-auto mb-4">
            اللهم بارك لهما وبارك عليهما واجمع بينهما في خير
          </p>

          {/* Quick Details Box */}
          <div className="w-full max-w-md rounded-2xl bg-white/80 border border-[#C9A96A]/25 p-4 sm:p-5 mb-6 space-y-2.5 text-xs sm:text-sm font-cairo text-[#241D18]">
            <div className="flex items-center justify-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#C9A96A]" />
              <span className="font-semibold">الأربعاء، 14 أكتوبر 2026</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#C9A96A]" />
              <span className="font-semibold">7:00 مساءً</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-center">
              <MapPin className="w-4 h-4 text-[#C9A96A] shrink-0" />
              <span>
                {wedding.venueAr} — شبين القناطر، القليوبية، مصر
              </span>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 my-2 text-[#C9A96A]/70 w-full">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C9A96A]/50 to-transparent" />
            <span className="text-xs">✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C9A96A]/50 to-transparent" />
          </div>

          {/* Countdown Section (Reference 02) */}
          <div className="w-full mt-4 mb-2">
            <p className="text-xs sm:text-sm font-cairo font-semibold text-[#8C8276] mb-3 select-none">
              — باقي علي ليلة العمر —
            </p>

            {mounted && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
                {/* Days */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#C9A96A]/30 shadow-2xs flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#241D18] leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] sm:text-xs font-cairo text-[#8C8276] mt-1 font-medium">
                    يوم
                  </span>
                </div>

                {/* Hours */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#C9A96A]/30 shadow-2xs flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#241D18] leading-none">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[10px] sm:text-xs font-cairo text-[#8C8276] mt-1 font-medium">
                    ساعة
                  </span>
                </div>

                {/* Minutes */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#C9A96A]/30 shadow-2xs flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#241D18] leading-none">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[10px] sm:text-xs font-cairo text-[#8C8276] mt-1 font-medium">
                    دقيقة
                  </span>
                </div>

                {/* Seconds */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#C9A96A]/30 shadow-2xs flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#241D18] leading-none">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[10px] sm:text-xs font-cairo text-[#8C8276] mt-1 font-medium">
                    ثانية
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
