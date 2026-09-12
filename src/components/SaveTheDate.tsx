"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarPlus, Check, Calendar as CalendarIcon, FileText } from "lucide-react";
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
      `DESCRIPTION:يسعدنا حضوركم ومشاركتنا فرحة زفافنا في قاعة قصر كازابلانكا بشبين القناطر.\\nالعنوان: ${wedding.location.addressAr}`,
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
    <section id="calendar-section" className="py-6 sm:py-8 px-4 relative overflow-hidden text-center bg-[#F7F1E6]" dir="rtl">
      <div className="max-w-md mx-auto relative z-10">
        
        {/* ═══════════════════════════════════════════════════════════════════
            REFERENCE 03: ADD TO CALENDAR CARD (أضف إلى التقويم)
            ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full p-6 sm:p-7 rounded-3xl bg-white border border-[#C9A96A]/35 shadow-sm text-center flex flex-col items-center"
        >
          {/* Top Icon in Circle */}
          <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#C9A96A]/40 flex items-center justify-center text-xl mb-3 shadow-2xs">
            <CalendarIcon className="w-5 h-5 text-[#8A6A32]" />
          </div>

          <h3 className="text-xl sm:text-2xl font-amiri font-bold text-[#241D18]">
            أضف إلى التقويم
          </h3>

          <p className="text-xs sm:text-sm font-cairo text-[#8A6A32] font-semibold mt-0.5 mb-1">
            احفظوا الموعد في تقويمكم
          </p>

          <p className="text-xs font-cairo text-[#5C5146] mb-5">
            أضف المناسبة إلى تقويمك لتصلك تذكير
          </p>

          {/* Primary CTA Button: أضف إلى التقويم */}
          <button
            type="button"
            onClick={handleDownloadICS}
            className="w-full py-3.5 px-6 rounded-full bg-[#241D18] hover:bg-[#3A2D24] text-[#FBF8F1] font-cairo font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer touch-target border border-[#C9A96A]/40 flex items-center justify-center gap-2 mb-5"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span>تم حفظ الموعد في التقويم!</span>
              </>
            ) : (
              <>
                <CalendarPlus className="w-4 h-4 text-[#C9A96A]" />
                <span>أضف إلى التقويم</span>
              </>
            )}
          </button>

          {/* 3 Provider Options matching Reference 03 */}
          <div className="w-full grid grid-cols-3 gap-2 pt-3 border-t border-[#C9A96A]/20">
            {/* 1. Google Calendar */}
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F7F1E6] border border-[#C9A96A]/25 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
            >
              <span className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-xs flex items-center justify-center font-bold text-blue-600">G</span>
              <span className="text-[10px] font-cairo font-semibold text-[#241D18] group-hover:text-[#8A6A32]">
                Google Calendar
              </span>
            </a>

            {/* 2. Apple Calendar */}
            <button
              type="button"
              onClick={handleDownloadICS}
              className="p-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F7F1E6] border border-[#C9A96A]/25 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
            >
              <span className="w-6 h-6 rounded-full bg-red-50 border border-red-200 text-xs flex items-center justify-center font-bold text-red-600">14</span>
              <span className="text-[10px] font-cairo font-semibold text-[#241D18] group-hover:text-[#8A6A32]">
                Apple Calendar
              </span>
            </button>

            {/* 3. ICS File */}
            <button
              type="button"
              onClick={handleDownloadICS}
              className="p-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F7F1E6] border border-[#C9A96A]/25 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
            >
              <FileText className="w-5 h-5 text-[#8A6A32]" />
              <span className="text-[10px] font-cairo font-semibold text-[#241D18] group-hover:text-[#8A6A32]">
                ملف ICS
              </span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
