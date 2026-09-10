"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { wedding } from "@/config/wedding";
import { Heart } from "lucide-react";

export default function FinalScene() {
  return (
    <section className="relative min-h-[90svh] w-full flex items-center justify-center overflow-hidden bg-[#151311] text-[#F8F2EA]">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={wedding.heroImage}
          alt="Ahmed & Menatallah Closing Atmosphere"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.38] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151311] via-black/60 to-[#151311]/90" />
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,164,109,0.2)_0%,transparent_65%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto px-6 py-16 text-center flex flex-col items-center">
        
        {/* Monogram Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-20 h-20 rounded-full border border-[#C5A46D]/40 bg-black/40 backdrop-blur-md flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(197,164,109,0.2)]"
        >
          <span className="text-3xl font-cormorant italic text-[#DFCBA8] tracking-widest">
            A & M
          </span>
        </motion.div>

        {/* Couple Names in Arabic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-3 mb-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-amiri font-bold text-white tracking-tight">
            {wedding.groomAr} <span className="text-[#C5A46D] font-cormorant font-normal">&</span> {wedding.brideAr}
          </h2>
          <p className="text-sm uppercase tracking-[0.35em] text-[#C5A46D] font-cormorant">
            Ahmed & Menatallah
          </p>
        </motion.div>

        {/* Date Display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-[#C5A46D]/30 backdrop-blur-md mb-8 text-sm font-cairo text-[#DFCBA8]"
        >
          <span>الأربعاء</span>
          <span className="w-1 h-1 rounded-full bg-[#C5A46D]" />
          <span>14 / 10 / 2026</span>
        </motion.div>

        {/* Emotional Closing Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="space-y-4 max-w-md mx-auto"
        >
          <p className="text-2xl sm:text-3xl font-amiri font-bold text-[#FAF5EE] leading-relaxed">
            ننتظركم لتشاركونا
            <br />
            بداية أجمل حكاياتنا
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-base font-cairo text-[#C5A46D]">
            <Heart className="w-4 h-4 fill-[#C5A46D]" />
            <span className="font-semibold">مستنيين نفرح معاكم</span>
            <Heart className="w-4 h-4 fill-[#C5A46D]" />
          </div>
        </motion.div>

        {/* Bottom copyright / footer note */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full text-center text-xs font-cairo text-white/40">
          <p>© 2026 حفل زفاف أحمد ومنة الله • جميع الحقوق محفوظة بكل حب</p>
        </div>

      </div>
    </section>
  );
}
