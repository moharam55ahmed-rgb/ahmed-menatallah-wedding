"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarPlus, Check, CalendarDays, ExternalLink } from "lucide-react";
import { wedding } from "@/config/wedding";

export default function SaveTheDate() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadICS = () => {
    // Generate valid iCalendar (.ics) file with UTF-8
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ahmed and Menatallah Wedding//AR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "SUMMARY:زفاف أحمد & منة الله",
      `DESCRIPTION:يسعدنا حضوركم ومشاركتنا فرحة زفافنا في قاعة قصر كازبلانكا بشبين القناطر.\\nالعنوان: ${wedding.location.addressAr}`,
      `LOCATION:${wedding.location.addressAr}`,
      "DTSTART:20261014T170000Z", // 19:00 Cairo time (UTC+2)
      "DTEND:20261014T220000Z",   // 24:00 Cairo time
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "DESCRIPTION:تذكير: حفل زفاف أحمد ومنة الله غدًا!",
      "ACTION:DISPLAY",
      "END:VALARM",
      "BEGIN:VALARM",
      "TRIGGER:-PT3H",
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

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "زفاف أحمد & منة الله"
  )}&dates=20261014T170000Z/20261014T220000Z&details=${encodeURIComponent(
    `يسعدنا حضوركم ومشاركتنا فرحة زفافنا في ${wedding.venueAr}`
  )}&location=${encodeURIComponent(wedding.location.addressAr)}`;

  return (
    <section id="event-details" className="py-20 px-4 relative overflow-hidden text-center bg-[#FBF8F1]" dir="rtl">
      {/* Delicate background ambiance */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#C5A46D_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header: تفاصيل المناسبة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A46D]/15 border border-[#C5A46D]/30 mb-3">
            <CalendarDays className="w-3.5 h-3.5 text-[#A07F47]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#70735F] font-cormorant font-semibold">
              Event Details &amp; Calendar
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-amiri font-bold text-[#241D18]">
            تفاصيل المناسبة
          </h2>
          <p className="text-xs sm:text-sm font-cairo text-[#70735F] mt-2">
            احفظوا الموعد لتشاركونا أجمل ليالي العمر
          </p>
        </motion.div>

        {/* 3 Clear Event Details Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {/* 1. Date */}
          <div className="p-6 rounded-2xl bg-white/90 border border-[#C5A46D]/30 shadow-xs flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-full bg-[#FAF5EE] border border-[#C5A46D]/30 flex items-center justify-center text-xl mb-3">
              📅
            </div>
            <span className="text-xs font-semibold font-cairo text-[#70735F] mb-1">التاريخ</span>
            <h3 className="text-lg font-amiri font-bold text-[#241D18]">الأربعاء، 14 أكتوبر 2026</h3>
            <span className="text-[11px] font-cormorant text-[#A07F47] mt-0.5 font-bold">14 • 10 • 2026</span>
          </div>

          {/* 2. Time */}
          <div className="p-6 rounded-2xl bg-white/90 border border-[#C5A46D]/30 shadow-xs flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-full bg-[#FAF5EE] border border-[#C5A46D]/30 flex items-center justify-center text-xl mb-3">
              🕖
            </div>
            <span className="text-xs font-semibold font-cairo text-[#70735F] mb-1">الوقت</span>
            <h3 className="text-lg font-amiri font-bold text-[#241D18]">7:00 مساءً</h3>
            <span className="text-[11px] font-cairo text-[#A07F47] mt-0.5">استقبال الضيوف الكرام</span>
          </div>

          {/* 3. Venue */}
          <div className="p-6 rounded-2xl bg-white/90 border border-[#C5A46D]/30 shadow-xs flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-full bg-[#FAF5EE] border border-[#C5A46D]/30 flex items-center justify-center text-xl mb-3">
              📍
            </div>
            <span className="text-xs font-semibold font-cairo text-[#70735F] mb-1">المكان</span>
            <h3 className="text-lg font-amiri font-bold text-[#241D18]">{wedding.venueAr}</h3>
            <span className="text-[11px] font-cairo text-[#70735F] mt-0.5">{wedding.cityAr}</span>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            REFERENCE 03: ADD TO CALENDAR CARD (أضف إلى التقويم)
            ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#C9A96A]/35 shadow-sm text-center flex flex-col items-center"
        >
          {/* Top Icon in Circle */}
          <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#C9A96A]/40 flex items-center justify-center text-xl mb-3 shadow-2xs">
            📅
          </div>

          <h3 className="text-xl sm:text-2xl font-amiri font-bold text-[#241D18]">
            أضف إلى التقويم
          </h3>

          <p className="text-xs sm:text-sm font-cairo text-[#A07F47] font-semibold mt-0.5 mb-1">
            احفظوا الموعد في تقويمكم
          </p>

          <p className="text-xs font-cairo text-[#70735F] mb-6">
            أضف المناسبة إلى تقويمك لتصلك تذكير
          </p>

          {/* Primary CTA Button */}
          <button
            type="button"
            onClick={handleDownloadICS}
            className="w-full py-3.5 px-6 rounded-full bg-[#241D18] hover:bg-[#3A2D24] text-[#FBF8F1] font-cairo font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer touch-target border border-[#C9A96A]/40 flex items-center justify-center gap-2 mb-6"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span>تم تحميل ملف التقويم!</span>
              </>
            ) : (
              <>
                <CalendarPlus className="w-4 h-4 text-[#C9A96A]" />
                <span>أضف إلى التقويم</span>
              </>
            )}
          </button>

          {/* 3 Provider Options from Reference 03 */}
          <div className="w-full grid grid-cols-3 gap-2 pt-2 border-t border-[#C9A96A]/20">
            {/* 1. Google Calendar */}
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F7F1E6] border border-[#C9A96A]/25 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
            >
              <span className="text-base">🌐</span>
              <span className="text-[10px] font-cairo font-semibold text-[#241D18] group-hover:text-[#A07F47]">
                Google Calendar
              </span>
            </a>

            {/* 2. Apple Calendar */}
            <button
              type="button"
              onClick={handleDownloadICS}
              className="p-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F7F1E6] border border-[#C9A96A]/25 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
            >
              <span className="text-base">🍏</span>
              <span className="text-[10px] font-cairo font-semibold text-[#241D18] group-hover:text-[#A07F47]">
                Apple Calendar
              </span>
            </button>

            {/* 3. ICS File */}
            <button
              type="button"
              onClick={handleDownloadICS}
              className="p-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F7F1E6] border border-[#C9A96A]/25 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
            >
              <span className="text-base">📑</span>
              <span className="text-[10px] font-cairo font-semibold text-[#241D18] group-hover:text-[#A07F47]">
                ملف ICS
              </span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
