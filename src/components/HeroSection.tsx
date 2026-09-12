"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
    const el = document.getElementById("calendar-section") || document.getElementById("event-details");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative w-full bg-[#FAF7F2] text-[#2A1F18] overflow-hidden select-none flex flex-col justify-center items-center"
      style={{
        height: "100dvh",
        minHeight: "100dvh",
        maxHeight: "100dvh",
        paddingTop: "max(env(safe-area-inset-top), 8px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 10px)",
        paddingLeft: "max(env(safe-area-inset-left), 10px)",
        paddingRight: "max(env(safe-area-inset-right), 10px)",
      }}
      dir="rtl"
    >
      {/* Background Subtle Watermark Lattice Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0 L64 32 L32 64 L0 32 Z' fill='none' stroke='%23C5A059' stroke-width='0.5' stroke-opacity='0.45'/%3E%3Cpath d='M0 0 L32 32 L0 64' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.3'/%3E%3Cpath d='M64 0 L32 32 L64 64' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.3'/%3E%3Crect x='20' y='20' width='24' height='24' transform='rotate(45 32 32)' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          1. MOBILE VERSION - FULL 100dvh HEIGHT & MATCHING FIGMA REFERENCE
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="block sm:hidden w-full h-full max-w-[400px] mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full rounded-[28px] border-[1.5px] border-[#D8C29D]/70 shadow-[0_16px_40px_rgba(46,35,28,0.1)] pt-8 xs:pt-10 pb-8 xs:pb-10 px-3.5 xs:px-4 flex flex-col justify-between items-center text-center overflow-hidden"
          style={{ background: "#FAF7F2" }}
        >
          {/* Authentic High-Res Empty Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg-mobile.jpg"
              alt="قصر كازابلانكا"
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
            {/* Subtle central glow for text clarity */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 50% 38%, rgba(255,253,249,0.88) 0%, rgba(253,250,244,0.52) 62%, rgba(248,242,230,0.15) 100%)",
              }}
            />
          </div>

          {/* Top Group: Ornament + Titles + Names + Date + Du'aa */}
          <div className="relative z-10 w-full flex flex-col items-center">
            {/* Top Golden Islamic Rosette */}
            <div className="mb-1.5 text-[#C5A059] flex items-center justify-center gap-2">
              <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/70" />
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(20, 20)">
                  <rect x="-3" y="-3" width="6" height="6" fill="#C5A059" transform="rotate(45)" />
                  <circle cx="0" cy="0" r="2.5" fill="#FAF6F0" />
                  <path d="M0 -9 C-2.5 -5, -2.5 -2, 0 0 C2.5 -2, 2.5 -5, 0 -9 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M0 9 C-2.5 5, -2.5 2, 0 0 C2.5 2, 2.5 5, 0 9 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M-9 0 C-5 -2.5, -2 -2.5, 0 0 C-2 2.5, -5 2.5, -9 0 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M9 0 C5 -2.5, 2 -2.5, 0 0 C2 2.5, 5 2.5, 9 0 Z" fill="#C5A059" opacity="0.9" />
                </g>
              </svg>
              <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/70" />
            </div>

            {/* Eyebrow */}
            <p className="text-xs xs:text-sm font-cairo font-semibold text-[#4A3525] tracking-wide mb-0.5">
              يسرنا دعوتكم لحضور حفل زفاف
            </p>

            {/* Couple Names - Larger and Bolder as requested */}
            <h1 className="text-4xl xs:text-[42px] font-ruqaa font-bold text-[#24150C] leading-[1.25] my-0.5 flex items-center justify-center gap-2">
              <span>{wedding.groomAr}</span>
              <span className="text-[#C5A059] font-cormorant font-normal text-3xl xs:text-4xl leading-none pt-1">
                &amp;
              </span>
              <span>{wedding.brideAr}</span>
            </h1>

            {/* Date below names */}
            <p className="text-sm xs:text-base font-cairo font-bold text-[#3D2B1F] mb-1">
              14 أكتوبر 2026
            </p>

            {/* Du'aa */}
            <p className="text-xs xs:text-[13px] font-amiri font-bold text-[#3A281C] leading-relaxed max-w-[280px]">
              اللهم بارك لهما وبارك عليهما
              <br />
              واجمع بينهما في خير
            </p>

            {/* Small golden accent knot under Du'aa */}
            <div className="mt-1.5 text-[#C5A059] flex items-center justify-center gap-1.5">
              <span className="w-5 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/60" />
              <span className="text-[10px]">❖</span>
              <span className="w-5 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/60" />
            </div>
          </div>

          {/* Middle Group: Event Summary Card - Wider with clearer fonts */}
          <div className="relative z-10 w-full max-w-[310px] xs:max-w-[330px] rounded-2xl bg-[#FFFDF9]/95 border border-[#C5A059]/45 px-4 py-3 xs:py-3.5 space-y-2 text-xs xs:text-[13px] font-cairo text-[#2A1F18] shadow-[0_6px_20px_rgba(46,35,28,0.06)] backdrop-blur-xs my-1">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-[#8C5828] shrink-0" />
              <span className="font-bold text-[#24150C]">الأربعاء 14 أكتوبر 2026</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#8C5828] shrink-0" />
              <span className="font-bold text-[#24150C]">7:00 مساءً</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-center">
              <MapPin className="w-4 h-4 text-[#8C5828] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#24150C]">{wedding.venueAr}</p>
                <p className="text-[10px] xs:text-[11px] font-medium text-[#7A6A5D]">شبين القناطر، القليوبية، مصر</p>
              </div>
            </div>
          </div>

          {/* Bottom Group: Countdown Section + Down Chevron - Raised up to give room for bottom artwork */}
          <div className="relative z-10 w-full flex flex-col items-center">
            {/* Title with Diamond Accents */}
            <div className="flex items-center justify-center gap-2 mb-2 select-none">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
              <span className="text-[#C5A059] text-[10px]">⋄</span>
              <p className="text-xs xs:text-sm font-cairo font-bold text-[#4A3525] tracking-wider px-1">
                باقي علي ليلة العمر
              </p>
              <span className="text-[#C5A059] text-[10px]">⋄</span>
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
            </div>

            {/* 4 Cards (LTR: Days, Hours, Minutes, Seconds) */}
            {mounted && (
              <div className="grid grid-cols-4 gap-2 xs:gap-2.5 w-full max-w-[310px] xs:max-w-[330px] mx-auto" dir="ltr">
                <div className="py-2.5 xs:py-3 px-1.5 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/40 shadow-[0_4px_12px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl xs:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] xs:text-[11px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    يوم
                  </span>
                </div>

                <div className="py-2.5 xs:py-3 px-1.5 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/40 shadow-[0_4px_12px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl xs:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[10px] xs:text-[11px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    ساعة
                  </span>
                </div>

                <div className="py-2.5 xs:py-3 px-1.5 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/40 shadow-[0_4px_12px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl xs:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[10px] xs:text-[11px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    دقيقة
                  </span>
                </div>

                <div className="py-2.5 xs:py-3 px-1.5 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/40 shadow-[0_4px_12px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl xs:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[10px] xs:text-[11px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    ثانية
                  </span>
                </div>
              </div>
            )}

            {/* Down Chevron Indicator */}
            <button
              type="button"
              onClick={scrollToNext}
              className="mt-2.5 inline-flex items-center justify-center text-[#C5A059] hover:text-[#8C6D3B] transition-colors cursor-pointer"
              aria-label="الانتقال إلى تفاصيل المناسبة"
            >
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          2. DESKTOP VERSION - FULL 100dvh HEIGHT & EXACT FIGMA DESIGN
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden sm:flex flex-col items-center justify-center w-full h-full max-w-[600px] lg:max-w-[640px] mx-auto z-10 py-1 md:py-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full max-h-[97dvh] rounded-[32px] border-[1.5px] border-[#D8C29D]/70 shadow-[0_20px_50px_rgba(46,35,28,0.1)] bg-[#FAF7F2] p-3.5 md:p-4 lg:p-5 flex flex-col justify-between items-center text-center overflow-hidden"
        >
          {/* Decorative Corner Golden Leaves (Left & Right) */}
          <div className="pointer-events-none absolute -bottom-4 -left-4 w-28 h-28 opacity-40 z-0">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 90 Q30 70 50 80 T80 50" stroke="#C5A059" strokeWidth="1.5" fill="none" />
              <ellipse cx="30" cy="72" rx="10" ry="5" transform="rotate(-30 30 72)" fill="#D8C29D" opacity="0.6" />
              <ellipse cx="48" cy="65" rx="11" ry="5" transform="rotate(35 48 65)" fill="#C5A059" opacity="0.5" />
              <ellipse cx="65" cy="52" rx="12" ry="6" transform="rotate(-20 65 52)" fill="#D8C29D" opacity="0.7" />
              <ellipse cx="78" cy="40" rx="10" ry="5" transform="rotate(40 78 40)" fill="#C5A059" opacity="0.6" />
            </svg>
          </div>
          <div className="pointer-events-none absolute -bottom-4 -right-4 w-28 h-28 opacity-40 z-0 transform scale-x-[-1]">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 90 Q30 70 50 80 T80 50" stroke="#C5A059" strokeWidth="1.5" fill="none" />
              <ellipse cx="30" cy="72" rx="10" ry="5" transform="rotate(-30 30 72)" fill="#D8C29D" opacity="0.6" />
              <ellipse cx="48" cy="65" rx="11" ry="5" transform="rotate(35 48 65)" fill="#C5A059" opacity="0.5" />
              <ellipse cx="65" cy="52" rx="12" ry="6" transform="rotate(-20 65 52)" fill="#D8C29D" opacity="0.7" />
              <ellipse cx="78" cy="40" rx="10" ry="5" transform="rotate(40 78 40)" fill="#C5A059" opacity="0.6" />
            </svg>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              Upper Palace Arch Container with Background Image
              Extends ALL THE WAY DOWN to include the countdown section
              just above 'تفاصيل المناسبة' matching Figma design
              ══════════════════════════════════════════════════════════════ */}
          <div className="relative w-full rounded-t-[200px] lg:rounded-t-[240px] rounded-b-[22px] border border-[#D8C29D]/50 shadow-[0_4px_16px_rgba(46,35,28,0.03)] pt-5 md:pt-6 lg:pt-7 pb-3.5 md:pb-4 px-4 flex flex-col items-center text-center overflow-hidden z-10">
            {/* Desktop Palace Arch Background covering all the way to details section */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/hero-bg-desktop.jpg"
                alt="قصر كازابلانكا"
                fill
                priority
                className="object-cover object-top"
                sizes="640px"
              />
              {/* Radial gradient for clean typography contrast while preserving floral columns */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at 50% 40%, rgba(255,253,249,0.88) 0%, rgba(253,250,244,0.52) 65%, rgba(248,242,230,0.18) 100%)",
                }}
              />
            </div>

            {/* Inner Arch Line Molding wrapping typography and countdown */}
            <div className="pointer-events-none absolute inset-x-2 top-2 bottom-2 rounded-t-[192px] lg:rounded-t-[232px] rounded-b-[18px] border border-[#C5A059]/30 z-1" />

            {/* Top Golden Rosette Ornament */}
            <div className="relative z-10 mb-1 text-[#C5A059] flex items-center justify-center gap-2">
              <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/70" />
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(20, 20)">
                  <rect x="-3" y="-3" width="6" height="6" fill="#C5A059" transform="rotate(45)" />
                  <circle cx="0" cy="0" r="2.5" fill="#FAF6F0" />
                  <path d="M0 -9 C-2.5 -5, -2.5 -2, 0 0 C2.5 -2, 2.5 -5, 0 -9 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M0 9 C-2.5 5, -2.5 2, 0 0 C2.5 2, 2.5 5, 0 9 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M-9 0 C-5 -2.5, -2 -2.5, 0 0 C-2 2.5, -5 2.5, -9 0 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M9 0 C5 -2.5, 2 -2.5, 0 0 C2 2.5, 5 2.5, 9 0 Z" fill="#C5A059" opacity="0.9" />
                </g>
              </svg>
              <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/70" />
            </div>

            {/* Eyebrow */}
            <p className="relative z-10 text-xs md:text-sm font-cairo font-semibold text-[#4A3525] tracking-wide mb-0.5">
              يسرنا دعوتكم لحضور حفل زفاف
            </p>

            {/* Couple Names */}
            <h1 className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-ruqaa font-bold text-[#24150C] leading-[1.25] my-0.5 flex items-center justify-center gap-2">
              <span>{wedding.groomAr}</span>
              <span className="text-[#C5A059] font-cormorant font-normal text-2xl md:text-3xl lg:text-4xl leading-none pt-1">
                &amp;
              </span>
              <span>{wedding.brideAr}</span>
            </h1>

            {/* Du'aa */}
            <p className="relative z-10 text-xs md:text-sm font-amiri font-bold text-[#3A281C] leading-snug max-w-sm mx-auto mb-1.5">
              اللهم بارك لهما وبارك عليهما واجمع بينهما في خير
            </p>

            {/* Event Summary Lines Directly On Arch Floor */}
            <div className="relative z-10 w-full flex flex-col items-center gap-1 text-xs md:text-[13px] font-cairo text-[#2A1F18] my-1">
              {/* Date */}
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-[#24150C]">الأربعاء 14 أكتوبر 2026</span>
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#8C5828]" />
              </div>
              {/* Time */}
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-[#24150C]">7:00 مساءً</span>
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#8C5828]" />
              </div>
              {/* Venue */}
              <div className="flex items-center justify-center gap-2 text-center">
                <div>
                  <p className="font-bold text-[#24150C]">{wedding.venueAr}</p>
                  <p className="text-[10px] md:text-[11px] font-medium text-[#6E5D4F]">شبين القناطر، القليوبية، مصر</p>
                </div>
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#8C5828] shrink-0 mt-0.5" />
              </div>
            </div>

            {/* Middle Countdown Section - NOW INSIDE THE ARCH BACKGROUND */}
            <div className="relative z-10 w-full mt-2.5 md:mt-3 text-center">
              {/* Countdown Title with Diamond Accent */}
              <div className="flex items-center justify-center gap-2 mb-1.5 md:mb-2 select-none">
                <span className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
                <span className="text-[#C5A059] text-xs">⋄</span>
                <p className="text-xs md:text-sm font-cairo font-bold text-[#4A3525] tracking-wider px-1">
                  باقي علي ليلة العمر
                </p>
                <span className="text-[#C5A059] text-xs">⋄</span>
                <span className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
              </div>

              {/* 4 Cards (LTR order matching design: Days, Hours, Minutes, Seconds) */}
              {mounted && (
                <div className="grid grid-cols-4 gap-2 md:gap-3 max-w-[420px] md:max-w-[460px] mx-auto" dir="ltr">
                  <div className="py-2.5 md:py-3 px-2 rounded-2xl bg-[#FFFDF9]/95 border border-[#C5A059]/45 shadow-[0_4px_14px_rgba(46,35,28,0.06)] backdrop-blur-xs flex flex-col items-center justify-center">
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold font-cairo text-[#24150C] leading-none">
                      {timeLeft.days}
                    </span>
                    <span className="text-[11px] md:text-xs font-cairo text-[#6E5D4F] mt-1 font-bold">
                      يوم
                    </span>
                  </div>

                  <div className="py-2.5 md:py-3 px-2 rounded-2xl bg-[#FFFDF9]/95 border border-[#C5A059]/45 shadow-[0_4px_14px_rgba(46,35,28,0.06)] backdrop-blur-xs flex flex-col items-center justify-center">
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold font-cairo text-[#24150C] leading-none">
                      {timeLeft.hours}
                    </span>
                    <span className="text-[11px] md:text-xs font-cairo text-[#6E5D4F] mt-1 font-bold">
                      ساعة
                    </span>
                  </div>

                  <div className="py-2.5 md:py-3 px-2 rounded-2xl bg-[#FFFDF9]/95 border border-[#C5A059]/45 shadow-[0_4px_14px_rgba(46,35,28,0.06)] backdrop-blur-xs flex flex-col items-center justify-center">
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold font-cairo text-[#24150C] leading-none">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-[11px] md:text-xs font-cairo text-[#6E5D4F] mt-1 font-bold">
                      دقيقة
                    </span>
                  </div>

                  <div className="py-2.5 md:py-3 px-2 rounded-2xl bg-[#FFFDF9]/95 border border-[#C5A059]/45 shadow-[0_4px_14px_rgba(46,35,28,0.06)] backdrop-blur-xs flex flex-col items-center justify-center">
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold font-cairo text-[#24150C] leading-none">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-[11px] md:text-xs font-cairo text-[#6E5D4F] mt-1 font-bold">
                      ثانية
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              Bottom Event Details 3 Cards (Reference 02 Desktop Cards)
              ══════════════════════════════════════════════════════════════ */}
          <div id="event-details" className="w-full pt-1 flex flex-col items-center text-center z-10">
            {/* Middle Golden Rosette Accent */}
            <div className="mb-1 text-[#C5A059] flex items-center justify-center gap-2">
              <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/60" />
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(20, 20)">
                  <rect x="-3" y="-3" width="6" height="6" fill="#C5A059" transform="rotate(45)" />
                  <circle cx="0" cy="0" r="2.5" fill="#FAF6F0" />
                  <path d="M0 -9 C-2.5 -5, -2.5 -2, 0 0 C2.5 -2, 2.5 -5, 0 -9 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M0 9 C-2.5 5, -2.5 2, 0 0 C2.5 2, 2.5 5, 0 9 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M-9 0 C-5 -2.5, -2 -2.5, 0 0 C-2 2.5, -5 2.5, -9 0 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M9 0 C5 -2.5, 2 -2.5, 0 0 C2 2.5, 5 2.5, 9 0 Z" fill="#C5A059" opacity="0.9" />
                </g>
              </svg>
              <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/60" />
            </div>

            <h2 className="text-base md:text-lg font-amiri font-bold text-[#24150C] mb-2">
              تفاصيل المناسبة
            </h2>

            {/* 3 Large Cards (RTL: Date, Time, Location) with Cognac Badges matching Figma reference */}
            <div className="w-full grid grid-cols-3 gap-2.5 max-w-[480px] md:max-w-[520px] mx-auto">
              {/* 01. Date Card */}
              <div className="p-2.5 md:p-3 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center text-center">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#8C5828] text-white flex items-center justify-center mb-1.5 shadow-xs">
                  <Calendar className="w-4 h-4 text-[#FFFDF9]" />
                </div>
                <span className="text-[10px] md:text-[11px] font-bold font-cairo text-[#6E5D4F]">التاريخ</span>
                <h3 className="text-xs md:text-sm font-amiri font-bold text-[#24150C] mt-0.5">الأربعاء</h3>
                <p className="text-[10px] md:text-[11px] font-cairo text-[#8C5828] font-bold mt-0.5">14 أكتوبر 2026</p>
              </div>

              {/* 02. Time Card */}
              <div className="p-2.5 md:p-3 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center text-center">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#8C5828] text-white flex items-center justify-center mb-1.5 shadow-xs">
                  <Clock className="w-4 h-4 text-[#FFFDF9]" />
                </div>
                <span className="text-[10px] md:text-[11px] font-bold font-cairo text-[#6E5D4F]">الوقت</span>
                <h3 className="text-xs md:text-sm font-amiri font-bold text-[#24150C] mt-0.5">7:00</h3>
                <p className="text-[10px] md:text-[11px] font-cairo text-[#8C5828] font-bold mt-0.5">مساءً</p>
              </div>

              {/* 03. Venue Card */}
              <div className="p-2.5 md:p-3 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center text-center">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#8C5828] text-white flex items-center justify-center mb-1.5 shadow-xs">
                  <MapPin className="w-4 h-4 text-[#FFFDF9]" />
                </div>
                <span className="text-[10px] md:text-[11px] font-bold font-cairo text-[#6E5D4F]">المكان</span>
                <h3 className="text-[11px] md:text-xs font-amiri font-bold text-[#24150C] mt-0.5 line-clamp-1">{wedding.venueAr}</h3>
                <p className="text-[9px] md:text-[10px] font-cairo text-[#6E5D4F] font-medium mt-0.5 line-clamp-1">شبين القناطر، القليوبية</p>
                <p className="text-[9px] md:text-[10px] font-cairo text-[#8C5828] font-bold">مصر</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
