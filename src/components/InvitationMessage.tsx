"use client";

import React from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";

export default function InvitationMessage() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-[#FAF6F0]">
      {/* Background Soft Lighting Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,164,109,0.12)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative p-10 sm:p-14 md:p-16 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-[#C5A46D]/35 shadow-[0_20px_50px_rgba(197,164,109,0.12)] text-center"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#C5A46D]/50 rounded-tr-xl" />
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#C5A46D]/50 rounded-tl-xl" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#C5A46D]/50 rounded-br-xl" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#C5A46D]/50 rounded-bl-xl" />

          {/* Basmala */}
          <div className="mb-8">
            <span className="text-xl sm:text-2xl font-amiri font-bold text-[#A07F47]">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#C5A46D] to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />
              <span className="h-[1px] w-16 bg-gradient-to-l from-transparent via-[#C5A46D] to-transparent" />
            </div>
          </div>

          {/* Invitation Text Body */}
          <div className="space-y-6">
            <p className="text-lg sm:text-xl font-cairo text-[#231F1A]/90 leading-loose">
              بكل الحب والفرح.. نتشرف بدعوتكم لمشاركتنا أجمل لحظات العمر
            </p>

            <span className="text-xs uppercase tracking-[0.3em] text-[#70735F] font-cormorant block">
              In The Wedding Ceremony Of
            </span>

            {/* Couple Names */}
            <div className="py-4 my-2 flex flex-col items-center justify-center">
              <h3 className="text-4xl sm:text-5xl font-amiri font-bold text-[#231F1A]">
                {wedding.groomAr}
              </h3>
              <div className="my-2 flex items-center justify-center gap-2">
                <span className="h-[1px] w-10 bg-[#C5A46D]/50" />
                <span className="text-2xl font-amiri text-[#C5A46D] italic">و</span>
                <span className="h-[1px] w-10 bg-[#C5A46D]/50" />
              </div>
              <h3 className="text-4xl sm:text-5xl font-amiri font-bold text-[#231F1A]">
                {wedding.brideAr}
              </h3>
            </div>

            {/* Closing Blessing */}
            <p className="text-base sm:text-lg font-cairo text-[#231F1A]/85 leading-relaxed max-w-lg mx-auto pt-2">
              وجودكم بيننا يزيد فرحتنا اكتمالًا، ونتطلع بشوق إلى مشاركتكم هذا اليوم المميز الذي تنطلق منه أجمل بداياتنا.
            </p>
          </div>

          {/* Bottom Calligraphic Monogram */}
          <div className="mt-10 pt-6 border-t border-[#C5A46D]/20 flex flex-col items-center">
            <span className="text-2xl font-cormorant italic text-[#A07F47] tracking-widest">
              A & M
            </span>
            <span className="text-[11px] font-cairo text-[#70735F] mt-1">
              {wedding.dayAr} • 14 أكتوبر 2026
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
