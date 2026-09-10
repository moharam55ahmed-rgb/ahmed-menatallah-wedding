"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { Hourglass, Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
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
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isCompleted: false,
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  const units = [
    { label: "أيام", value: timeLeft.days, sub: "Days" },
    { label: "ساعات", value: timeLeft.hours, sub: "Hours" },
    { label: "دقائق", value: timeLeft.minutes, sub: "Minutes" },
    { label: "ثوانٍ", value: timeLeft.seconds, sub: "Seconds" },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-[#F8F2EA] via-[#F4ECE0] to-[#F8F2EA]">
      {/* Background Decorative Rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] border border-[#C5A46D]/15 rounded-[100%] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] border border-[#C5A46D]/10 rounded-[100%] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A46D]/10 border border-[#C5A46D]/30 mb-3">
            <Hourglass className="w-3.5 h-3.5 text-[#A07F47]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#70735F] font-cormorant">
              Countdown to Forever
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-amiri font-bold text-[#231F1A]">
            العد التنازلي لليلة العمر
          </h2>
          <p className="text-sm font-cairo text-[#70735F] mt-2">
            كل لحظة تقرّبنا من مشاركتكم أجمل فرحة
          </p>
        </motion.div>

        {/* Live Timer or Celebration State */}
        {timeLeft.isCompleted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-3xl glass-card border border-[#C5A46D]/40 text-center max-w-md shadow-xl"
          >
            <Sparkles className="w-10 h-10 text-[#C5A46D] mx-auto mb-3" />
            <h3 className="text-3xl font-amiri font-bold gold-gradient-text">
              لقد بدأ أجمل يوم ❤️
            </h3>
            <p className="text-base font-cairo text-[#231F1A]/80 mt-2">
              شكرًا لكل من شاركنا فرحتنا اليوم وأسعد قلوبنا بحضوره!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {units.map((unit, index) => (
              <div
                key={unit.label}
                className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-[#C5A46D]/30 shadow-[0_8px_30px_rgba(197,164,109,0.08)] hover:border-[#C5A46D]/60 transition-all duration-300 group"
              >
                {/* Subtle Ornamental Accent */}
                <div className="absolute top-2 w-6 h-[1px] bg-gradient-to-r from-transparent via-[#C5A46D] to-transparent opacity-60" />
                
                {/* Number */}
                <span className="text-5xl sm:text-6xl md:text-7xl font-cormorant font-light text-[#231F1A] tracking-tight group-hover:text-[#A07F47] transition-colors">
                  {String(unit.value).padStart(2, "0")}
                </span>

                {/* Arabic Label */}
                <span className="text-base sm:text-lg font-amiri font-bold text-[#A07F47] mt-1">
                  {unit.label}
                </span>

                {/* English Subtitle */}
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#70735F]/70 font-cormorant mt-0.5">
                  {unit.sub}
                </span>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
