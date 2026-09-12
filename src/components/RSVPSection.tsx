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
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#F8F2EA] to-[#F3EDE3]">
      <div className="max-w-xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A46D]/15 border border-[#C5A46D]/30 mb-3">
            <Heart className="w-3.5 h-3.5 text-[#A07F47] fill-[#A07F47]/20" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#70735F] font-cormorant">
              RSVP
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-amiri font-bold text-[#231F1A]">
            هل ستشاركونا الفرحة؟
          </h2>
          <p className="text-sm sm:text-base font-cairo text-[#70735F] mt-2">
            يسعدنا تأكيد حضوركم لهذا اليوم المميز
          </p>
        </motion.div>

        {/* RSVP Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative p-8 sm:p-10 rounded-3xl glass-card shadow-xl border border-[#C5A46D]/40"
        >
          {submitted ? (
            /* Success State */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#C5A46D]/20 text-[#A07F47] flex items-center justify-center mx-auto border border-[#C5A46D]/40">
                <CheckCircle2 className="w-8 h-8 text-[#A07F47]" />
              </div>

              <h3 className="text-3xl font-amiri font-bold text-[#231F1A]">
                {attendance === "attending" ? "يسعدنا ويشرفنا حضوركم!" : "شكرًا لتواصلكم اللطيف"}
              </h3>

              <p className="text-sm sm:text-base font-cairo text-[#231F1A]/80 leading-relaxed max-w-sm mx-auto">
                {attendance === "attending"
                  ? `أهلًا بك يا ${name}، نتطلع لمشاركتكم أجمل اللحظات يوم 14 أكتوبر 2026 بقاعة قصر كازبلانكا.`
                  : `شكرًا لك يا ${name}، يؤسفنا عدم تمكنك من الحضور، ومشاركتكم بمشاعركم الطيبة تصلنا دائمًا.`}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  type="button"
                  onClick={handleResetRSVP}
                  className="text-xs font-cairo text-[#70735F] hover:text-[#231F1A] underline transition-colors cursor-pointer py-2"
                >
                  تعديل بيانات الحضور
                </button>
              </div>
            </motion.div>
          ) : (
            /* RSVP Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field */}
              <div>
                <label htmlFor="rsvp-name" className="block text-sm font-semibold font-cairo text-[#231F1A] mb-2">
                  الاسم الكريم <span className="text-red-500">*</span>
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك بالكامل..."
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#C5A46D]/30 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 text-sm font-cairo outline-none transition-all touch-target"
                />
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-sm font-semibold font-cairo text-[#231F1A] mb-2">
                  تأكيد الحضور <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance("attending")}
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs sm:text-sm font-cairo font-semibold transition-all touch-target cursor-pointer ${
                      attendance === "attending"
                        ? "bg-[#231F1A] text-[#F8F2EA] border-[#231F1A] shadow-md"
                        : "bg-white/60 text-[#231F1A] border-[#C5A46D]/30 hover:border-[#C5A46D]"
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-[#C5A46D]" />
                    <span>نعم، سأكون حاضرًا</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance("not_attending")}
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs sm:text-sm font-cairo font-semibold transition-all touch-target cursor-pointer ${
                      attendance === "not_attending"
                        ? "bg-[#231F1A] text-[#F8F2EA] border-[#231F1A] shadow-md"
                        : "bg-white/60 text-[#231F1A] border-[#C5A46D]/30 hover:border-[#C5A46D]"
                    }`}
                  >
                    <span>للأسف لن أتمكن من الحضور</span>
                  </button>
                </div>
              </div>

              {/* Number of Companions (Visible only if attending) */}
              {attendance === "attending" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <label htmlFor="rsvp-guests" className="block text-sm font-semibold font-cairo text-[#231F1A]">
                    عدد المرافقين
                  </label>
                  <select
                    id="rsvp-guests"
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#C5A46D]/30 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 text-sm font-cairo outline-none transition-all touch-target cursor-pointer"
                  >
                    <option value="0">بدون مرافقين (فرد واحد)</option>
                    <option value="1">مرافق واحد (+1)</option>
                    <option value="2">مرافقان (+2)</option>
                    <option value="3">3 مرافقين أو أكثر</option>
                  </select>
                </motion.div>
              )}

              {/* Optional Message */}
              <div>
                <label htmlFor="rsvp-message" className="block text-sm font-semibold font-cairo text-[#231F1A] mb-2">
                  رسالة اختيارية للعروسين
                </label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب تهنئة أو كلمة طيبة للعروسين..."
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#C5A46D]/30 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 text-sm font-cairo outline-none transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B58A48] via-[#DFCBA8] to-[#B58A48] text-[#151311] font-bold text-base font-cairo shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer touch-target flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>جاري التأكيد...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#151311]" />
                    <span>تأكيد الحضور</span>
                  </>
                )}
              </button>

            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
