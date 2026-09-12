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
          1. MOBILE VERSION - FULL 100dvh HEIGHT
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="block sm:hidden w-full h-full max-w-[390px] mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full rounded-[26px] border-[1.5px] border-[#D8C29D]/70 shadow-[0_16px_40px_rgba(46,35,28,0.1)] py-3.5 px-3.5 flex flex-col justify-between items-center text-center overflow-hidden"
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
                background: "radial-gradient(ellipse at 50% 36%, rgba(255,253,249,0.86) 0%, rgba(253,250,244,0.50) 60%, rgba(248,242,230,0.15) 100%)",
              }}
            />
          </div>

          {/* Top Group: Ornament + Titles + Names + Du'aa */}
          <div className="relative z-10 w-full flex flex-col items-center pt-1">
            {/* Top Golden Islamic Rosette */}
            <div className="mb-1 text-[#C5A059] flex items-center justify-center gap-2">
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
            <p className="text-[11px] xs:text-xs font-cairo font-semibold text-[#4A3525] tracking-wide mb-0.5">
              يسرنا دعوتكم لحضور حفل زفاف
            </p>

            {/* Couple Names */}
            <h1 className="text-3xl xs:text-4xl font-ruqaa font-bold text-[#24150C] leading-[1.2] my-0.5 flex items-center justify-center gap-1.5">
              <span>{wedding.groomAr}</span>
              <span className="text-[#C5A059] font-cormorant font-normal text-2xl xs:text-3xl leading-none pt-0.5">
                &amp;
              </span>
              <span>{wedding.brideAr}</span>
            </h1>

            {/* Date below names */}
            <p className="text-xs xs:text-sm font-cairo font-bold text-[#4A382C] mb-1">
              14 أكتوبر 2026
            </p>

            {/* Du'aa */}
            <p className="text-[10.5px] xs:text-xs font-amiri font-bold text-[#3A281C] leading-snug max-w-xs">
              اللهم بارك لهما وبارك عليهما
              <br />
              واجمع بينهما في خير
            </p>
          </div>

          {/* Middle Group: Event Summary Card */}
          <div className="relative z-10 w-full max-w-[285px] rounded-2xl bg-[#FFFDF9]/95 border border-[#C5A059]/40 px-3.5 py-2.5 xs:py-3 space-y-1.5 text-xs font-cairo text-[#2A1F18] shadow-[0_4px_16px_rgba(46,35,28,0.06)] backdrop-blur-xs my-1">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#8C6D3B] shrink-0" />
              <span className="font-bold text-[#24150C] text-[11px] xs:text-xs">الأربعاء 14 أكتوبر 2026</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#8C6D3B] shrink-0" />
              <span className="font-bold text-[#24150C] text-[11px] xs:text-xs">7:00 مساءً</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-center">
              <MapPin className="w-3.5 h-3.5 text-[#8C6D3B] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#24150C] text-[11px] xs:text-xs">{wedding.venueAr}</p>
                <p className="text-[9.5px] xs:text-[10px] font-medium text-[#7A6A5D]">شبين القناطر، القليوبية، مصر</p>
              </div>
            </div>
          </div>

          {/* Bottom Group: Countdown Section + Down Chevron */}
          <div className="relative z-10 w-full flex flex-col items-center pb-0.5">
            {/* Title */}
            <div className="flex items-center justify-center gap-2 mb-2 select-none">
              <span className="h-[1px] w-7 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
              <p className="text-[11px] xs:text-xs font-cairo font-bold text-[#4A3525] tracking-wider">
                باقي علي ليلة العمر
              </p>
              <span className="h-[1px] w-7 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
            </div>

            {/* 4 Cards (LTR: Days, Hours, Minutes, Seconds) */}
            {mounted && (
              <div className="grid grid-cols-4 gap-1.5 xs:gap-2 w-full max-w-[290px] mx-auto" dir="ltr">
                <div className="py-2 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-lg xs:text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="text-[9.5px] xs:text-[10px] font-cairo text-[#6E5D4F] mt-0.5 font-bold">
                    يوم
                  </span>
                </div>

                <div className="py-2 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-lg xs:text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[9.5px] xs:text-[10px] font-cairo text-[#6E5D4F] mt-0.5 font-bold">
                    ساعة
                  </span>
                </div>

                <div className="py-2 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-lg xs:text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[9.5px] xs:text-[10px] font-cairo text-[#6E5D4F] mt-0.5 font-bold">
                    دقيقة
                  </span>
                </div>

                <div className="py-2 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-lg xs:text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[9.5px] xs:text-[10px] font-cairo text-[#6E5D4F] mt-0.5 font-bold">
                    ثانية
                  </span>
                </div>
              </div>
            )}

            {/* Down Chevron Indicator */}
            <button
              type="button"
              onClick={scrollToNext}
              className="mt-2 inline-flex items-center justify-center text-[#C5A059] hover:text-[#8C6D3B] transition-colors cursor-pointer"
              aria-label="الانتقال إلى تفاصيل المناسبة"
            >
              <ChevronDown className="w-4 h-4 xs:w-5 xs:h-5 animate-bounce" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          2. DESKTOP VERSION - FULL 100dvh HEIGHT
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden sm:flex flex-col items-center w-full h-full max-h-[96dvh] max-w-[500px] md:max-w-[520px] mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full rounded-[28px] border-[1.5px] border-[#D8C29D]/70 shadow-[0_20px_50px_rgba(46,35,28,0.1)] bg-[#FAF7F2] p-4 md:p-5 flex flex-col justify-between items-center text-center overflow-hidden"
        >
          {/* Top Palace Arch Container */}
          <div className="relative w-full rounded-t-[170px] md:rounded-t-[190px] rounded-b-[18px] border border-[#D8C29D]/50 shadow-[0_6px_20px_rgba(46,35,28,0.04)] pt-8 md:pt-10 pb-4 px-4 flex flex-col items-center text-center overflow-hidden">
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
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at 50% 45%, rgba(255,253,249,0.82) 0%, rgba(253,250,244,0.45) 60%, transparent 100%)",
                }}
              />
            </div>

            {/* Inner Architectural Molding */}
            <div className="pointer-events-none absolute inset-x-2 top-2 bottom-2 rounded-t-[164px] md:rounded-t-[184px] rounded-b-[14px] border border-[#C5A059]/30 z-1" />

            {/* Top Golden Rosette */}
            <div className="relative z-10 mb-1.5 text-[#C5A059] flex items-center justify-center gap-2">
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
            <p className="relative z-10 text-xs font-cairo font-semibold text-[#4A3525] tracking-wide mb-0.5">
              يسرنا دعوتكم لحضور حفل زفاف
            </p>

            {/* Names */}
            <h1 className="relative z-10 text-3xl md:text-4xl font-ruqaa font-bold text-[#24150C] leading-[1.25] my-0.5 flex items-center justify-center gap-2">
              <span>{wedding.groomAr}</span>
              <span className="text-[#C5A059] font-cormorant font-normal text-2xl md:text-3xl leading-none pt-1">
                &amp;
              </span>
              <span>{wedding.brideAr}</span>
            </h1>

            {/* Du'aa */}
            <p className="relative z-10 text-xs font-amiri font-bold text-[#3A281C] leading-snug max-w-sm mx-auto mb-2">
              اللهم بارك لهما وبارك عليهما واجمع بينهما في خير
            </p>

            {/* Event Summary Card */}
            <div className="relative z-10 w-full max-w-[300px] rounded-2xl bg-[#FFFDF9]/95 border border-[#C5A059]/40 px-3.5 py-2 space-y-1.5 text-xs font-cairo text-[#2A1F18] shadow-[0_4px_16px_rgba(46,35,28,0.05)] backdrop-blur-xs">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#8C6D3B] shrink-0" />
                <span className="font-bold text-[#24150C] text-[11px]">الأربعاء 14 أكتوبر 2026</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#8C6D3B] shrink-0" />
                <span className="font-bold text-[#24150C] text-[11px]">7:00 مساءً</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-center">
                <MapPin className="w-3.5 h-3.5 text-[#8C6D3B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#24150C] text-[11px]">{wedding.venueAr}</p>
                  <p className="text-[9.5px] font-medium text-[#7A6A5D]">شبين القناطر، القليوبية، مصر</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Countdown */}
          <div className="w-full my-2 text-center">
            <div className="flex items-center justify-center gap-2.5 mb-2 select-none">
              <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
              <p className="text-xs font-cairo font-bold text-[#4A3525] tracking-wider">
                باقي علي ليلة العمر
              </p>
              <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
            </div>

            {/* 4 Cards (LTR: Days, Hours, Minutes, Seconds) */}
            {mounted && (
              <div className="grid grid-cols-4 gap-2 max-w-[320px] mx-auto" dir="ltr">
                <div className="py-2 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-lg md:text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] font-cairo text-[#6E5D4F] mt-0.5 font-bold">
                    يوم
                  </span>
                </div>

                <div className="py-2 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-lg md:text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[10px] font-cairo text-[#6E5D4F] mt-0.5 font-bold">
                    ساعة
                  </span>
                </div>

                <div className="py-2 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-lg md:text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[10px] font-cairo text-[#6E5D4F] mt-0.5 font-bold">
                    دقيقة
                  </span>
                </div>

                <div className="py-2 px-1 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_3px_10px_rgba(46,35,28,0.04)] flex flex-col items-center justify-center">
                  <span className="text-lg md:text-xl font-bold font-cairo text-[#24150C] leading-none">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[10px] font-cairo text-[#6E5D4F] mt-0.5 font-bold">
                    ثانية
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Event Details 3 Cards */}
          <div id="event-details" className="w-full pt-1 flex flex-col items-center text-center">
            <div className="mb-1 text-[#C5A059]">
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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

            <h2 className="text-base md:text-lg font-amiri font-bold text-[#24150C] mb-2">
              تفاصيل المناسبة
            </h2>

            <div className="w-full grid grid-cols-3 gap-2">
              <div className="p-2 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_2px_8px_rgba(46,35,28,0.03)] flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center mb-1">
                  <Calendar className="w-3 h-3 text-[#8C6D3B]" />
                </div>
                <span className="text-[9px] font-bold font-cairo text-[#6E5D4F]">التاريخ</span>
                <h3 className="text-[11px] font-amiri font-bold text-[#24150C]">الأربعاء</h3>
                <p className="text-[9px] font-cairo text-[#8C6D3B] font-bold">14 أكتوبر 2026</p>
              </div>

              <div className="p-2 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_2px_8px_rgba(46,35,28,0.03)] flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center mb-1">
                  <Clock className="w-3 h-3 text-[#8C6D3B]" />
                </div>
                <span className="text-[9px] font-bold font-cairo text-[#6E5D4F]">الوقت</span>
                <h3 className="text-[11px] font-amiri font-bold text-[#24150C]">7:00</h3>
                <p className="text-[9px] font-cairo text-[#8C6D3B] font-bold">مساءً</p>
              </div>

              <div className="p-2 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_2px_8px_rgba(46,35,28,0.03)] flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 flex items-center justify-center mb-1">
                  <MapPin className="w-3 h-3 text-[#8C6D3B]" />
                </div>
                <span className="text-[9px] font-bold font-cairo text-[#6E5D4F]">المكان</span>
                <h3 className="text-[10px] font-amiri font-bold text-[#24150C] line-clamp-1">{wedding.venueAr}</h3>
                <p className="text-[8.5px] font-cairo text-[#6E5D4F] font-medium line-clamp-1">شبين القناطر</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
