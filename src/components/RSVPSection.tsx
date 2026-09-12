"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle2, Heart, Send, UserCheck } from "lucide-react";

export default function RSVPSection() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"attending" | "not_attending">("attending");
  const [guestsCount, setGuestsCount] = useState("0");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Restore local UX state so same-device users see their previous answer
    const savedRSVP = localStorage.getItem("wedding_rsvp_status");
    if (savedRSVP) {
      try {
        const data = JSON.parse(savedRSVP);
        if (data?.name) {
          setName(data.name);
          setAttendance(data.attendance);
          setGuestsCount(data.guestsCount || "0");
          setMessage(data.message || "");
          setSubmitted(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);

    const rsvpData = {
      name: name.trim(),
      attendance,
      guestsCount,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rsvpData),
      });
    } catch {
      // Silent fail — local UX still works
    }

    // Always save locally for same-device UX
    localStorage.setItem("wedding_rsvp_status", JSON.stringify(rsvpData));
    setIsSubmitting(false);
    setSubmitted(true);

    if (attendance === "attending") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#C5A46D", "#EAD7D1", "#FAF5EE", "#B58A48"],
      });
    }
  };

  const handleResetRSVP = () => {
    localStorage.removeItem("wedding_rsvp_status");
    setSubmitted(false);
  };

  return (
    <section id="rsvp-section" className="py-12 sm:py-16 px-4 relative overflow-hidden bg-[#FBF8F1]" dir="rtl">
      <div className="max-w-md mx-auto">
        
        {/* ═══════════════════════════════════════════════════════════════════
            REFERENCE 05: RSVP CARD (يشرفنا حضوركم)
            ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C9A96A]/35 shadow-sm text-center flex flex-col items-center"
        >
          {/* Top Icon in Circle */}
          <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#C9A96A]/40 flex items-center justify-center text-xl mb-3 shadow-2xs">
            🤎
          </div>

          <h3 className="text-xl sm:text-2xl font-amiri font-bold text-[#241D18]">
            يشرفنا حضوركم
          </h3>

          <p className="text-xs sm:text-sm font-cairo text-[#A07F47] font-semibold mt-0.5 mb-6">
            يسعدنا أن تشاركونا فرحتنا
          </p>

          {submitted ? (
            /* Success State */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-4 space-y-3 w-full"
            >
              <div className="w-14 h-14 rounded-full bg-[#FAF5EE] text-[#A07F47] flex items-center justify-center mx-auto border border-[#C9A96A]/40">
                <CheckCircle2 className="w-7 h-7 text-[#A07F47]" />
              </div>

              <h4 className="text-2xl font-amiri font-bold text-[#241D18]">
                {attendance === "attending" ? "تم تأكيد حضوركم ❤️" : "شكرًا لتواصلكم اللطيف"}
              </h4>

              <p className="text-xs sm:text-sm font-cairo text-[#5C5146] leading-relaxed max-w-xs mx-auto">
                {attendance === "attending"
                  ? `أهلًا بك يا ${name}، نتطلع لمشاركتكم أجمل اللحظات يوم 14 أكتوبر 2026 بقاعة قصر كازابلانكا.`
                  : `شكرًا لك يا ${name}، يؤسفنا عدم تمكنك من الحضور، ومشاركتكم بمشاعركم الطيبة تصلنا دائمًا.`}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetRSVP}
                  className="text-xs font-cairo text-[#70735F] hover:text-[#241D18] underline transition-colors cursor-pointer"
                >
                  تعديل بيانات الحضور
                </button>
              </div>
            </motion.div>
          ) : (
            /* RSVP Form matching Reference 05 */
            <form onSubmit={handleSubmit} className="w-full space-y-4 text-right">
              
              {/* Attendance Choice Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setAttendance("attending")}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border text-xs sm:text-sm font-cairo font-bold transition-all cursor-pointer ${
                    attendance === "attending"
                      ? "bg-[#241D18] text-[#FBF8F1] border-[#241D18] shadow-xs"
                      : "bg-[#FAF5EE] text-[#241D18] border-[#C9A96A]/30 hover:border-[#C9A96A]"
                  }`}
                >
                  <span>نعم، بإذن الله ❤️</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance("not_attending")}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border text-xs sm:text-sm font-cairo font-bold transition-all cursor-pointer ${
                    attendance === "not_attending"
                      ? "bg-[#241D18] text-[#FBF8F1] border-[#241D18] shadow-xs"
                      : "bg-[#FAF5EE] text-[#241D18] border-[#C9A96A]/30 hover:border-[#C9A96A]"
                  }`}
                >
                  <span>أعتذر عن الحضور</span>
                </button>
              </div>

              {/* Number of Guests (عدد الحضور) */}
              <div>
                <label htmlFor="rsvp-guests" className="block text-xs font-semibold font-cairo text-[#241D18] mb-1.5">
                  عدد الحضور
                </label>
                <select
                  id="rsvp-guests"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/30 text-xs sm:text-sm font-cairo text-[#241D18] outline-none transition-all cursor-pointer"
                >
                  <option value="1">1 (فرد واحد)</option>
                  <option value="2">2 (فردين)</option>
                  <option value="3">3 (ثلاثة أفراد)</option>
                  <option value="4">4 أفراد أو أكثر</option>
                </select>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="rsvp-name" className="block text-xs font-semibold font-cairo text-[#241D18] mb-1.5">
                  الاسم الكريم <span className="text-red-500">*</span>
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك الكريم..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/30 text-xs sm:text-sm font-cairo text-[#241D18] outline-none focus:border-[#C9A96A] transition-all"
                />
              </div>

              {/* Optional Message */}
              <div>
                <label htmlFor="rsvp-message" className="block text-xs font-semibold font-cairo text-[#241D18] mb-1.5">
                  كلمة للعروسين (اختياري)
                </label>
                <textarea
                  id="rsvp-message"
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="تهنئة لطيفة أو دعوة من القلب..."
                  className="w-full px-4 py-2 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/30 text-xs sm:text-sm font-cairo text-[#241D18] outline-none focus:border-[#C9A96A] transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full bg-[#241D18] hover:bg-[#3A2D24] text-[#FBF8F1] font-cairo font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer touch-target border border-[#C9A96A]/40 flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <span>جاري التأكيد...</span>
                ) : (
                  <span>تأكيد الحضور</span>
                )}
              </button>

            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
