"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Check, MessageCircle, Sparkles } from "lucide-react";

export default function ShareSection() {
  const [copied, setCopied] = useState(false);

  const getShareData = () => {
    const url = typeof window !== "undefined" ? window.location.href.split("?")[0] : "https://ahmed-menatallah-wedding.vercel.app";
    const title = "دعوة زفاف أحمد & منة الله 💍";
    const text = "يسعدنا دعوتكم لمشاركة فرحتنا بزفاف أحمد & منة الله ❤️\n14 أكتوبر 2026";
    return { url, title, text };
  };

  const handleShare = async () => {
    const { url, title, text } = getShareData();

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch {
        // User cancelled or share failed, fallback handled below
      }
    }

    // Fallback: Copy to clipboard
    handleCopyLink();
  };

  const handleCopyLink = () => {
    const { url } = getShareData();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleWhatsAppShare = () => {
    const { url, text } = getShareData();
    const fullMessage = `${text}\n${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="share-section" className="py-20 px-4 relative overflow-hidden text-center bg-[#FBF8F1]" dir="rtl">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#C5A46D_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A46D]/15 border border-[#C5A46D]/30 mb-3">
            <Share2 className="w-3.5 h-3.5 text-[#A07F47]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#70735F] font-cormorant font-semibold">
              Share the Joy
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-amiri font-bold text-[#241D18]">
            شارك فرحتنا
          </h2>

          <p className="text-xs sm:text-sm font-cairo text-[#70735F] mt-2">
            شارك الدعوة مع من تحب
          </p>

          <div className="flex items-center justify-center gap-3 mt-3 text-[#C5A46D]/60">
            <span className="w-10 h-[1px] bg-[#C5A46D]/40" />
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span className="w-10 h-[1px] bg-[#C5A46D]/40" />
          </div>
        </motion.div>

        {/* Share Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#C5A46D]/30 shadow-xs space-y-4"
        >
          <p className="text-sm font-cairo text-[#3A2D24] leading-relaxed">
            فرحتنا تكبر بوجودكم ومشاركتكم الدعوة مع الأهل والأصدقاء والأحباب
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary Share CTA */}
            <button
              type="button"
              onClick={handleShare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#241D18] hover:bg-[#3A2D24] text-[#FBF8F1] font-cairo font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer touch-target border border-[#C9A96A]/40"
            >
              <Share2 className="w-4 h-4 text-[#C9A96A]" />
              <span>مشاركة الدعوة</span>
            </button>

            {/* WhatsApp Share Button */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-[#FAF5EE] text-[#241D18] border border-[#C9A96A]/35 text-xs sm:text-sm font-cairo font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer touch-target"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>واتساب</span>
            </button>

            {/* Copy Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-[#FAF5EE] text-[#241D18] border border-[#C9A96A]/35 text-xs sm:text-sm font-cairo font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer touch-target"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-700">تم نسخ الرابط!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#A07F47]" />
                  <span>نسخ الرابط</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
