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
        className="pointer-events-none absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0 L64 32 L32 64 L0 32 Z' fill='none' stroke='%23C5A059' stroke-width='0.5' stroke-opacity='0.45'/%3E%3Cpath d='M0 0 L32 32 L0 64' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.3'/%3E%3Cpath d='M64 0 L32 32 L64 64' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.3'/%3E%3Crect x='20' y='20' width='24' height='24' transform='rotate(45 32 32)' fill='none' stroke='%23C5A059' stroke-width='0.4' stroke-opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP VIEW (MATCHING ATTACHMENT 4 EXACTLY)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden sm:flex flex-col items-center w-full max-w-[490px] md:max-w-[510px] mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-[28px] border-[1.5px] border-[#D8C29D]/70 shadow-[0_18px_45px_rgba(46,35,28,0.08)] bg-[#FAF7F2] p-5 sm:p-6 flex flex-col items-center text-center overflow-hidden"
        >
          {/* 1. Desktop Palace Arch Container */}
          <div className="relative w-full rounded-t-[180px] md:rounded-t-[200px] rounded-b-[20px] border border-[#D8C29D]/50 shadow-[0_6px_20px_rgba(46,35,28,0.04)] pt-12 pb-7 px-4 sm:px-6 flex flex-col items-center text-center overflow-hidden">
            {/* Desktop Palace Arch Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/hero-bg-desktop.jpg"
                alt="قصر كازابلانكا"
                fill
                priority
                className="object-cover object-top"
                sizes="520px"
              />
              {/* Soft translucent central radiance */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at 50% 45%, rgba(255,253,249,0.76) 0%, rgba(253,250,244,0.38) 60%, transparent 100%)",
                }}
              />
            </div>

            {/* Inner Architectural Molding Arch Line */}
            <div className="pointer-events-none absolute inset-x-2.5 top-2.5 bottom-2.5 rounded-t-[172px] md:rounded-t-[192px] rounded-b-[16px] border border-[#C5A059]/30 z-1" />

            {/* Top Golden Islamic Rosette Emblem */}
            <div className="relative z-10 mb-2 text-[#C5A059] flex items-center justify-center gap-2">
              <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/60" />
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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

            {/* Eyebrow */}
            <p className="relative z-10 text-xs sm:text-sm font-cairo font-semibold text-[#4A3525] tracking-wide mb-1">
              يسرنا دعوتكم لحضور حفل زفاف
            </p>

            {/* Names */}
            <h1 className="relative z-10 text-4xl sm:text-5xl font-ruqaa font-bold text-[#24150C] leading-[1.25] my-1 flex items-center justify-center gap-2 sm:gap-3">
              <span>{wedding.groomAr}</span>
              <span className="text-[#C5A059] font-cormorant font-normal text-3xl sm:text-4xl leading-none pt-1">
                &amp;
              </span>
              <span>{wedding.brideAr}</span>
            </h1>

            {/* Du'aa */}
            <p className="relative z-10 text-xs sm:text-sm font-amiri font-bold text-[#3A281C] leading-relaxed max-w-sm mx-auto mb-4">
              اللهم بارك لهما وبارك عليهما واجمع بينهما في خير
            </p>

            {/* Event Summary Card */}
            <div className="relative z-10 w-full max-w-[320px] rounded-2xl bg-[#FFFDF9]/95 border border-[#C5A059]/40 px-4 py-3 space-y-2 text-xs sm:text-sm font-cairo text-[#2A1F18] shadow-[0_4px_16px_rgba(46,35,28,0.05)] backdrop-blur-xs">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-[#8C6D3B] shrink-0" />
                <span className="font-bold text-[#24150C]">الأربعاء 14 أكتوبر 2026</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-[#8C6D3B] shrink-0" />
                <span className="font-bold text-[#24150C]">7:00 مساءً</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-center">
                <MapPin className="w-4 h-4 text-[#8C6D3B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#24150C]">{wedding.venueAr}</p>
                  <p className="text-[11px] font-medium text-[#7A6A5D]">شبين القناطر، القليوبية، مصر</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Desktop Countdown Section */}
          <div className="w-full mt-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3.5 select-none">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
              <p className="text-xs sm:text-sm font-cairo font-bold text-[#4A3525] tracking-wider">
                باقي علي ليلة العمر
              </p>
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
            </div>

            {/* 4 Cards (From left to right: Days, Hours, Minutes, Seconds) */}
            {mounted && (
              <div className="grid grid-cols-4 gap-2.5 max-w-[340px] mx-auto" dir="ltr">
                <div className="py-2.5 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="text-[11px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    يوم
                  </span>
                </div>

                <div className="py-2.5 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[11px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    ساعة
                  </span>
                </div>

                <div className="py-2.5 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[11px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    دقيقة
                  </span>
                </div>

                <div className="py-2.5 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[11px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    ثانية
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 3. Desktop Divider & Event Details Section */}
          <div id="event-details" className="w-full mt-7 flex flex-col items-center text-center">
            {/* Islamic Rosette Divider */}
            <div className="mb-2 text-[#C5A059]">
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(20, 20)">
                  <rect x="-3" y="-3" width="6" height="6" fill="#C5A059" transform="rotate(45)" />
                  <circle cx="0" cy="0" r="2.5" fill="#FAF6F0" />
                  <path d="M0 -9 C-2.5 -5, -2.5 -2, 0 0 C2.5 -2, 2.5 -5, 0 -9 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M0 9 C-2.5 5, -2.5 2, 0 0 C2.5 2, 2.5 5, 0 9 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M-9 0 C-5 -2.5, -2 -2.5, 0 0 C-2 2.5, -5 2.5, -9 0 Z" fill="#C5A059" opacity="0.9" />
                  <path d="M9 0 C5 -2.5, 2 -2.5, 0 0 C2 2.5, 5 2.5, 9 0 Z" fill="#C5A059" opacity="0.9" />
                </g>
              </svg>
            </div>

            <h2 className="text-lg sm:text-xl font-amiri font-bold text-[#24150C] mb-3.5">
              تفاصيل المناسبة
            </h2>

            {/* 3 Cards */}
            <div className="w-full grid grid-cols-3 gap-2.5">
              {/* Card 1: التاريخ */}
              <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_2px_8px_rgba(46,35,28,0.03)] flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8C6D3B]" />
                </div>
                <span className="text-[10px] font-bold font-cairo text-[#6E5D4F] mb-0.5">التاريخ</span>
                <h3 className="text-xs sm:text-sm font-amiri font-bold text-[#24150C]">الأربعاء</h3>
                <p className="text-[10px] font-cairo text-[#8C6D3B] font-bold mt-0.5">14 أكتوبر 2026</p>
              </div>

              {/* Card 2: الوقت */}
              <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_2px_8px_rgba(46,35,28,0.03)] flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8C6D3B]" />
                </div>
                <span className="text-[10px] font-bold font-cairo text-[#6E5D4F] mb-0.5">الوقت</span>
                <h3 className="text-xs sm:text-sm font-amiri font-bold text-[#24150C]">7:00</h3>
                <p className="text-[10px] font-cairo text-[#8C6D3B] font-bold mt-0.5">مساءً</p>
              </div>

              {/* Card 3: المكان */}
              <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_2px_8px_rgba(46,35,28,0.03)] flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8C6D3B]" />
                </div>
                <span className="text-[10px] font-bold font-cairo text-[#6E5D4F] mb-0.5">المكان</span>
                <h3 className="text-[11px] sm:text-xs font-amiri font-bold text-[#24150C] line-clamp-1">{wedding.venueAr}</h3>
                <p className="text-[9px] font-cairo text-[#6E5D4F] font-medium mt-0.5 line-clamp-1">شبين القناطر، القليوبية</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE VIEW (MATCHING ATTACHMENT 2 EXACTLY)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="block sm:hidden w-full max-w-[375px] mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-[26px] border-[1.5px] border-[#D8C29D]/70 shadow-[0_16px_40px_rgba(46,35,28,0.08)] bg-[#FAF7F2] pt-8 pb-6 px-4 flex flex-col items-center text-center overflow-hidden"
        >
          {/* Authentic Mobile Portrait Palace Arch Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg-mobile.jpg"
              alt="قصر كازابلانكا"
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
            {/* Delicate translucent center radiance */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 40%, rgba(255,253,249,0.78) 0%, rgba(253,250,244,0.40) 65%, transparent 100%)",
              }}
            />
          </div>

          {/* Top Golden Rosette Ornament */}
          <div className="relative z-10 mb-2 text-[#C5A059] flex items-center justify-center gap-2">
            <span className="w-5 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/60" />
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
            <span className="w-5 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/60" />
          </div>

          {/* Eyebrow */}
          <p className="relative z-10 text-xs font-cairo font-semibold text-[#4A3525] tracking-wide mb-1">
            يسرنا دعوتكم لحضور حفل زفاف
          </p>

          {/* Couple Names */}
          <h1 className="relative z-10 text-4xl xs:text-[44px] font-ruqaa font-bold text-[#24150C] leading-[1.25] my-1 flex items-center justify-center gap-2">
            <span>{wedding.groomAr}</span>
            <span className="text-[#C5A059] font-cormorant font-normal text-3xl leading-none pt-1">
              &amp;
            </span>
            <span>{wedding.brideAr}</span>
          </h1>

          {/* Date below names */}
          <p className="relative z-10 text-sm font-cairo font-bold text-[#4A382C] mb-2">
            14 أكتوبر 2026
          </p>

          {/* Du'aa */}
          <div className="relative z-10 max-w-xs mx-auto mb-4">
            <p className="text-xs font-amiri font-bold text-[#3A281C] leading-relaxed">
              اللهم بارك لهما وبارك عليهما
              <br />
              واجمع بينهما في خير
            </p>
          </div>

          {/* Event Summary Card */}
          <div className="relative z-10 w-full max-w-[280px] rounded-2xl bg-[#FFFDF9]/95 border border-[#C5A059]/40 px-3.5 py-3 space-y-2 text-xs font-cairo text-[#2A1F18] shadow-[0_4px_16px_rgba(46,35,28,0.05)] backdrop-blur-xs">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-[#8C6D3B] shrink-0" />
              <span className="font-bold text-[#24150C]">الأربعاء 14 أكتوبر 2026</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#8C6D3B] shrink-0" />
              <span className="font-bold text-[#24150C]">7:00 مساءً</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-center">
              <MapPin className="w-4 h-4 text-[#8C6D3B] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#24150C]">{wedding.venueAr}</p>
                <p className="text-[10px] font-medium text-[#7A6A5D]">شبين القناطر، القليوبية، مصر</p>
              </div>
            </div>
          </div>

          {/* Countdown Section */}
          <div className="relative z-10 w-full mt-5 text-center">
            <div className="flex items-center justify-center gap-2.5 mb-3 select-none">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
              <p className="text-xs font-cairo font-bold text-[#4A3525] tracking-wider">
                باقي علي ليلة العمر
              </p>
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
            </div>

            {/* 4 Cards (From left to right: Days, Hours, Minutes, Seconds) */}
            {mounted && (
              <div className="grid grid-cols-4 gap-2 max-w-[290px] mx-auto" dir="ltr">
                <div className="py-2.5 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    يوم
                  </span>
                </div>

                <div className="py-2.5 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[10px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    ساعة
                  </span>
                </div>

                <div className="py-2.5 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[10px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    دقيقة
                  </span>
                </div>

                <div className="py-2.5 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[10px] font-cairo text-[#6E5D4F] mt-1 font-bold">
                    ثانية
                  </span>
                </div>
              </div>
            )}

            {/* Down Chevron Indicator */}
            <button
              type="button"
              onClick={scrollToNext}
              className="mt-3 inline-flex items-center justify-center text-[#C5A059] hover:text-[#8C6D3B] transition-colors cursor-pointer"
              aria-label="الانتقال إلى تفاصيل المناسبة"
            >
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
