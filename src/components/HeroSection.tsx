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
    const el = document.getElementById("event-details");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero-section"
      className="relative w-full bg-[#FAF7F2] text-[#2A1F18] pt-3 sm:pt-6 pb-12 sm:pb-16 px-3 sm:px-4 overflow-hidden select-none flex flex-col items-center"
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
          MASTER INVITATION CARD CONTAINER (EXACT PROPORTIONS AS IN FIGMA)
          Max width: 440px on mobile, 520px on desktop
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[510px] mx-auto z-10 flex flex-col items-center">
        
        {/* ═════════════════════════════════════════════════════════════════
            1. THE PALACE ARCH CARD (WITH VIVID REAL ARCH & FLOWERS)
            ═════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-t-[140px] sm:rounded-t-[190px] md:rounded-t-[220px] rounded-b-[24px] border-[1.5px] border-[#D8C29D]/60 shadow-[0_14px_38px_rgba(46,35,28,0.08)] pt-10 sm:pt-14 pb-7 sm:pb-9 px-4 sm:px-7 flex flex-col items-center text-center overflow-hidden"
          style={{
            background: "#FBF8F2",
          }}
        >
          {/* Authentic High-Res Palace Arch Background Image */}
          {/* Desktop Version: /images/hero-bg-desktop.jpg */}
          <div className="hidden sm:block absolute inset-0 z-0">
            <Image
              src="/images/hero-bg-desktop.jpg"
              alt="قصر كازابلانكا"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 540px"
            />
            {/* Gentle translucent center radiance so flowers & marble are vivid while text is crisp */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 45%, rgba(255,253,249,0.78) 0%, rgba(253,250,244,0.45) 55%, rgba(248,242,230,0.2) 100%)",
              }}
            />
          </div>

          {/* Mobile Version: /images/hero-bg-mobile.jpg */}
          <div className="block sm:hidden absolute inset-0 z-0">
            <Image
              src="/images/hero-bg-mobile.jpg"
              alt="قصر كازابلانكا"
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
            {/* Gentle translucent center radiance for mobile */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 45%, rgba(255,253,249,0.78) 0%, rgba(253,250,244,0.45) 55%, rgba(248,242,230,0.2) 100%)",
              }}
            />
          </div>

          {/* Inner Architectural Golden Arch Outline */}
          <div className="pointer-events-none absolute inset-x-2.5 sm:inset-x-3.5 top-2.5 sm:top-3.5 bottom-2.5 sm:bottom-3.5 rounded-t-[130px] sm:rounded-t-[180px] md:rounded-t-[210px] rounded-b-[18px] border border-[#C5A059]/30 z-1" />

          {/* Top Golden Islamic Rosette Emblem */}
          <div className="relative z-10 mb-2 sm:mb-2.5 text-[#C5A059]">
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

          {/* Eyebrow Text */}
          <p className="relative z-10 text-xs sm:text-sm font-cairo font-semibold text-[#5A4638] tracking-wide mb-1">
            يسرنا دعوتكم لحضور حفل زفاف
          </p>

          {/* Couple Names (Arabic Calligraphy matching Reference) */}
          <h1 className="relative z-10 text-4xl sm:text-5xl md:text-[52px] font-ruqaa font-bold text-[#2A170E] leading-[1.25] my-1 sm:my-1.5 flex items-center justify-center gap-2 sm:gap-3">
            <span>{wedding.groomAr}</span>
            <span className="text-[#C5A059] font-cormorant font-normal text-3xl sm:text-4xl leading-none pt-1">
              &amp;
            </span>
            <span>{wedding.brideAr}</span>
          </h1>

          {/* Date below names (as in Reference) */}
          <p className="relative z-10 text-sm sm:text-base font-cairo font-bold text-[#4A382C] mb-2 sm:mb-2.5">
            14 أكتوبر 2026
          </p>

          {/* Blessing Du'aa */}
          <div className="relative z-10 max-w-xs sm:max-w-sm mx-auto mb-4 sm:mb-5">
            <p className="text-xs sm:text-[13px] font-amiri font-bold text-[#4A382C] leading-relaxed">
              اللهم بارك لهما وبارك عليهما
              <br />
              واجمع بينهما في خير
            </p>
          </div>

          {/* Event Summary Card (Matching Reference Card Style) */}
          <div className="relative z-10 w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[340px] rounded-2xl bg-[#FFFDF9]/95 border border-[#C5A059]/40 px-4 py-3 sm:py-3.5 space-y-2 text-xs sm:text-sm font-cairo text-[#2A1F18] shadow-[0_4px_16px_rgba(46,35,28,0.05)] backdrop-blur-xs">
            {/* Date Row */}
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-[#8C6D3B] shrink-0" />
              <span className="font-bold text-[#2A170E]">الأربعاء 14 أكتوبر 2026</span>
            </div>

            {/* Time Row */}
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#8C6D3B] shrink-0" />
              <span className="font-bold text-[#2A170E]">7:00 مساءً</span>
            </div>

            {/* Venue Row */}
            <div className="flex items-center justify-center gap-1.5 text-center">
              <MapPin className="w-4 h-4 text-[#8C6D3B] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#2A170E]">{wedding.venueAr}</p>
                <p className="text-[10.5px] sm:text-[11px] font-medium text-[#7A6A5D]">شبين القناطر، القليوبية، مصر</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═════════════════════════════════════════════════════════════════
            2. COUNTDOWN TIMER SECTION (Directly below Arch)
            ═════════════════════════════════════════════════════════════════ */}
        <div className="w-full mt-6 sm:mt-8 text-center">
          {/* Section Title with Horizontal Wings */}
          <div className="flex items-center justify-center gap-3 mb-3.5 select-none">
            <span className="h-[1px] w-8 sm:w-14 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
            <p className="text-xs sm:text-sm font-cairo font-bold text-[#5A4638] tracking-wider">
              باقي علي ليلة العمر
            </p>
            <span className="h-[1px] w-8 sm:w-14 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
          </div>

          {/* 4 Countdown Ivory Cards (Using bold, crisp Cairo sans numbers) */}
          {mounted && (
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5 max-w-[320px] sm:max-w-[360px] mx-auto">
              {/* Days */}
              <div className="py-2.5 sm:py-3 px-1.5 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold font-cairo text-[#2A170E] leading-none">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] sm:text-xs font-cairo text-[#6E5D4F] mt-1 font-bold">
                  يوم
                </span>
              </div>

              {/* Hours */}
              <div className="py-2.5 sm:py-3 px-1.5 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold font-cairo text-[#2A170E] leading-none">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] sm:text-xs font-cairo text-[#6E5D4F] mt-1 font-bold">
                  ساعة
                </span>
              </div>

              {/* Minutes */}
              <div className="py-2.5 sm:py-3 px-1.5 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold font-cairo text-[#2A170E] leading-none">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] sm:text-xs font-cairo text-[#6E5D4F] mt-1 font-bold">
                  دقيقة
                </span>
              </div>

              {/* Seconds */}
              <div className="py-2.5 sm:py-3 px-1.5 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold font-cairo text-[#2A170E] leading-none">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] sm:text-xs font-cairo text-[#6E5D4F] mt-1 font-bold">
                  ثانية
                </span>
              </div>
            </div>
          )}

          {/* Down Chevron Indicator */}
          <button
            type="button"
            onClick={scrollToNext}
            className="mt-3.5 inline-flex items-center justify-center text-[#C5A059] hover:text-[#8C6D3B] transition-colors cursor-pointer"
            aria-label="الانتقال إلى تفاصيل المناسبة"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            3. EVENT DETAILS SECTION (تفاصيل المناسبة - 3 Cards)
            ═════════════════════════════════════════════════════════════════ */}
        <div id="event-details" className="w-full mt-7 sm:mt-10 flex flex-col items-center text-center">
          {/* Islamic Rosette Ornament Divider */}
          <div className="mb-2.5 text-[#C5A059]">
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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

          <h2 className="text-xl sm:text-2xl font-amiri font-bold text-[#2A170E] mb-4 sm:mb-5">
            تفاصيل المناسبة
          </h2>

          {/* 3 Detail Cards in Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
            {/* Card 1: التاريخ */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_12px_rgba(46,35,28,0.04)] flex flex-col items-center text-center hover:border-[#C5A059] transition-all">
              <div className="w-9 h-9 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center mb-2 shadow-2xs">
                <Calendar className="w-4 h-4 text-[#8C6D3B]" />
              </div>
              <span className="text-[11px] font-bold font-cairo text-[#6E5D4F] mb-0.5">التاريخ</span>
              <h3 className="text-sm sm:text-base font-amiri font-bold text-[#2A170E]">الأربعاء</h3>
              <p className="text-xs font-cairo text-[#8C6D3B] font-bold mt-0.5">14 أكتوبر 2026</p>
            </div>

            {/* Card 2: الوقت */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_12px_rgba(46,35,28,0.04)] flex flex-col items-center text-center hover:border-[#C5A059] transition-all">
              <div className="w-9 h-9 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center mb-2 shadow-2xs">
                <Clock className="w-4 h-4 text-[#8C6D3B]" />
              </div>
              <span className="text-[11px] font-bold font-cairo text-[#6E5D4F] mb-0.5">الوقت</span>
              <h3 className="text-sm sm:text-base font-amiri font-bold text-[#2A170E]">7:00</h3>
              <p className="text-xs font-cairo text-[#8C6D3B] font-bold mt-0.5">مساءً</p>
            </div>

            {/* Card 3: المكان */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_12px_rgba(46,35,28,0.04)] flex flex-col items-center text-center hover:border-[#C5A059] transition-all">
              <div className="w-9 h-9 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center mb-2 shadow-2xs">
                <MapPin className="w-4 h-4 text-[#8C6D3B]" />
              </div>
              <span className="text-[11px] font-bold font-cairo text-[#6E5D4F] mb-0.5">المكان</span>
              <h3 className="text-sm sm:text-base font-amiri font-bold text-[#2A170E]">{wedding.venueAr}</h3>
              <p className="text-[10px] sm:text-[11px] font-cairo text-[#6E5D4F] font-medium mt-0.5">شبين القناطر، القليوبية، مصر</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
