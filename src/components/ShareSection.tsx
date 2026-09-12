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
    <section id="share-section" className="py-12 sm:py-16 px-4 relative overflow-hidden bg-[#FBF8F1]" dir="rtl">
      <div className="max-w-md mx-auto">
        
        {/* ═══════════════════════════════════════════════════════════════════
            REFERENCE 07: SHARE INVITATION CARD (شارك فرحتنا)
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
            🔗
          </div>

          <h3 className="text-xl sm:text-2xl font-amiri font-bold text-[#241D18]">
            شارك فرحتنا
          </h3>

          <p className="text-xs sm:text-sm font-cairo text-[#70735F] mt-0.5 mb-6">
            شارك الدعوة مع من تحب
          </p>

          {/* Action Buttons Stack matching Reference 07 */}
          <div className="w-full space-y-2.5 mb-6">
            {/* Button 1: Dark Brown Primary Share */}
            <button
              type="button"
              onClick={handleShare}
              className="w-full py-3.5 px-6 rounded-full bg-[#241D18] hover:bg-[#3A2D24] text-[#FBF8F1] font-cairo font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer touch-target border border-[#C9A96A]/40 flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-[#C9A96A]" />
              <span>مشاركة الدعوة</span>
            </button>

            {/* Button 2: WhatsApp Share */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="w-full py-3 px-6 rounded-full bg-[#FAF5EE] hover:bg-[#F7F1E6] text-[#241D18] font-cairo font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all cursor-pointer touch-target border border-[#C9A96A]/30 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>مشاركة عبر واتساب</span>
            </button>

            {/* Button 3: Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full py-3 px-6 rounded-full bg-[#FAF5EE] hover:bg-[#F7F1E6] text-[#241D18] font-cairo font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all cursor-pointer touch-target border border-[#C9A96A]/30 flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-700">تم نسخ الرابط بنجاح!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#A07F47]" />
                  <span>نسخ رابط الدعوة</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Preview Box from Reference 07 */}
          <div className="w-full p-4 rounded-2xl bg-[#FAF5EE]/80 border border-[#C9A96A]/25 text-center space-y-1">
            <p className="text-xs sm:text-sm font-amiri font-bold text-[#241D18] leading-relaxed">
              يسعدنا دعوتكم لمشاركة فرحتنا
              <br />
              بزفاف أحمد &amp; منة الله ❤️
            </p>
            <p className="text-[11px] font-cairo text-[#A07F47] font-semibold">
              14 أكتوبر 2026
            </p>
            <p className="text-[10px] font-cormorant text-[#8C8276] tracking-wider pt-1 border-t border-[#C9A96A]/20">
              ahmedandmenatallah.com
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
