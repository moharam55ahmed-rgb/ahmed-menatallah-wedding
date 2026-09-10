"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarPlus, Check, Clock } from "lucide-react";
import { wedding } from "@/config/wedding";

export default function SaveTheDate() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadICS = () => {
    // Generate valid iCalendar (.ics) file
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ahmed and Menatallah Wedding//AR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:حفل زفاف أحمد ومنة الله 💍`,
      `DESCRIPTION:يسعدنا حضوركم ومشاركتنا فرحة زفافنا في قاعة قصر كازبلانكا بشبين القناطر.\\nالعنوان: ${wedding.location.addressAr}`,
      `LOCATION:${wedding.location.addressAr}`,
      "DTSTART:20261014T170000Z", // 19:00 Cairo time (UTC+2)
      "DTEND:20261014T220000Z",   // 24:00 Cairo time
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-P1D", // 1 day before reminder
      "DESCRIPTION:تذكير: حفل زفاف أحمد ومنة الله غدًا!",
      "ACTION:DISPLAY",
      "END:VALARM",
      "BEGIN:VALARM",
      "TRIGGER:-PT3H", // 3 hours before reminder
      "DESCRIPTION:تذكير: حفل زفاف أحمد ومنة الله يبدأ بعد 3 ساعات!",
      "ACTION:DISPLAY",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "wedding-ahmed-and-menatallah.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Subtle Decorative Arch Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-16 h-[1.5px] bg-[#C5A46D] mb-4" />
          <h3 className="text-sm md:text-base font-cormorant uppercase tracking-[0.4em] text-[#70735F]">
            SAVE THE DATE
          </h3>
          <span className="text-2xl md:text-3xl font-amiri text-[#C5A46D] mt-2">
            احفظوا الموعد
          </span>
        </motion.div>

        {/* Large Editorial Typographic Date Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full flex items-center justify-center gap-4 sm:gap-8 md:gap-12 my-6"
        >
          {/* Day */}
          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-7xl md:text-8xl font-cormorant font-light text-[#231F1A] tracking-tighter">
              14
            </span>
            <span className="text-xs sm:text-sm font-cairo text-[#70735F] mt-1">
              أكتوبر
            </span>
          </div>

          <span className="text-4xl sm:text-5xl font-cormorant text-[#C5A46D]/50 font-light select-none">
            /
          </span>

          {/* Month */}
          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-7xl md:text-8xl font-cormorant font-light text-[#231F1A] tracking-tighter">
              10
            </span>
            <span className="text-xs sm:text-sm font-cairo text-[#70735F] mt-1">
              الشهر
            </span>
          </div>

          <span className="text-4xl sm:text-5xl font-cormorant text-[#C5A46D]/50 font-light select-none">
            /
          </span>

          {/* Year */}
          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-7xl md:text-8xl font-cormorant font-light text-[#231F1A] tracking-tighter">
              2026
            </span>
            <span className="text-xs sm:text-sm font-cairo text-[#70735F] mt-1">
              السنة
            </span>
          </div>
        </motion.div>

        {/* Timing and Day in Arabic */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-4 text-base sm:text-lg md:text-xl font-cairo text-[#231F1A]/90 mt-4 mb-8"
        >
          <span className="font-semibold text-[#A07F47]">{wedding.dayAr}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C5A46D]" />
            <span>الساعة 7:00 مساءً</span>
          </div>
        </motion.div>

        {/* Add to Calendar CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            type="button"
            onClick={handleDownloadICS}
            className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#231F1A] text-[#F8F2EA] hover:bg-[#151311] border border-[#C5A46D]/40 shadow-lg hover:shadow-xl hover:border-[#C5A46D] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer touch-target"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="font-cairo text-sm font-semibold">تمت إضافة الموعد بنجاح!</span>
              </>
            ) : (
              <>
                <CalendarPlus className="w-4 h-4 text-[#C5A46D] transition-transform group-hover:scale-110" />
                <span className="font-cairo text-sm font-semibold">أضفها إلى التقويم</span>
              </>
            )}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
