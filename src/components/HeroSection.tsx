"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { wedding } from "@/config/wedding";

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

  return (
    <section
      id="hero-section"
      className="relative w-full bg-[#FAF7F2] text-[#2A1F18] pt-2 pb-8 sm:pb-14 px-2 sm:px-4 overflow-hidden select-none flex flex-col items-center"
      dir="rtl"
    >
      {/* Subtle ambient background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[900px] rounded-full bg-[#EADDC7]/30 blur-[100px]" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP HERO (100% EXACT FIGMA ARTWORK + LIVE COUNTDOWN)
          Aspect Ratio: 1150 / 1535 (~ 0.749)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden sm:flex flex-col items-center w-full max-w-[500px] md:max-w-[540px] mx-auto z-10">
        <div
          className="relative w-full aspect-[1150/1535] rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(46,35,28,0.12)] border-[1.5px] border-[#D8C29D]/60"
        >
          {/* Authentic Desktop Design Image */}
          <Image
            src="/images/hero-desktop-clean.png"
            alt="دعوة زفاف أحمد ومنة الله"
            fill
            priority
            className="object-cover pointer-events-none select-none"
            sizes="(max-width: 1024px) 540px, 600px"
          />

          {/* Live Dynamic Countdown Numbers Overlaid into the 4 Card Slots */}
          {mounted && (
            <div className="absolute top-[58.0%] inset-x-0 h-[5.5%] pointer-events-none" dir="ltr">
              {/* Slot 1: Days */}
              <div className="absolute left-[15.6%] w-[14.8%] h-full flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold font-cairo text-[#24150C] leading-none">
                  {timeLeft.days}
                </span>
              </div>

              {/* Slot 2: Hours */}
              <div className="absolute left-[34.3%] w-[14.8%] h-full flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold font-cairo text-[#24150C] leading-none">
                  {timeLeft.hours}
                </span>
              </div>

              {/* Slot 3: Minutes */}
              <div className="absolute left-[52.6%] w-[14.8%] h-full flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold font-cairo text-[#24150C] leading-none">
                  {timeLeft.minutes}
                </span>
              </div>

              {/* Slot 4: Seconds */}
              <div className="absolute left-[70.8%] w-[14.8%] h-full flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold font-cairo text-[#24150C] leading-none">
                  {timeLeft.seconds}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE HERO (100% EXACT FIGMA ARTWORK + LIVE COUNTDOWN)
          Aspect Ratio: 585 / 1854 (~ 0.3155)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="block sm:hidden w-full max-w-[390px] mx-auto z-10">
        <div
          className="relative w-full aspect-[585/1854] rounded-[24px] overflow-hidden shadow-[0_16px_40px_rgba(46,35,28,0.12)] border-[1.5px] border-[#D8C29D]/60"
        >
          {/* Authentic Mobile Design Image */}
          <Image
            src="/images/hero-mobile-clean.png"
            alt="دعوة زفاف أحمد ومنة الله"
            fill
            priority
            className="object-cover pointer-events-none select-none"
            sizes="100vw"
          />

          {/* Live Dynamic Countdown Numbers Overlaid into the 4 Card Slots */}
          {mounted && (
            <div className="absolute top-[65.5%] inset-x-0 h-[3.8%] pointer-events-none" dir="ltr">
              {/* Slot 1: Days */}
              <div className="absolute left-[9.9%] w-[16.4%] h-full flex items-center justify-center">
                <span className="text-xl xs:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                  {timeLeft.days}
                </span>
              </div>

              {/* Slot 2: Hours */}
              <div className="absolute left-[31.4%] w-[16.4%] h-full flex items-center justify-center">
                <span className="text-xl xs:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                  {timeLeft.hours}
                </span>
              </div>

              {/* Slot 3: Minutes */}
              <div className="absolute left-[52.6%] w-[16.4%] h-full flex items-center justify-center">
                <span className="text-xl xs:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                  {timeLeft.minutes}
                </span>
              </div>

              {/* Slot 4: Seconds */}
              <div className="absolute left-[73.8%] w-[16.4%] h-full flex items-center justify-center">
                <span className="text-xl xs:text-2xl font-bold font-cairo text-[#24150C] leading-none">
                  {timeLeft.seconds}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
