"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { wedding } from "@/config/wedding";
import { Heart } from "lucide-react";

export default function FinalScene() {
  return (
    <section className="relative min-h-[85svh] w-full flex items-center justify-center overflow-hidden bg-[#241D18] text-[#FBF8F1]">
      {/* Background Image with Warm Royal Brown Vignette */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={wedding.heroImage}
          alt="Ahmed & Menatallah Closing Atmosphere"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.32] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241D18] via-[#241D18]/70 to-[#241D18]/85" />
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,106,0.18)_0%,transparent_65%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto px-6 py-14 text-center flex flex-col items-center">
        
        {/* Monogram Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-18 h-18 rounded-full border border-[#C9A96A]/45 bg-[#241D18]/60 backdrop-blur-md flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(201,169,106,0.2)]"
        >
          <span className="text-2xl font-cormorant italic text-[#E8D6AE] tracking-widest">
            A &amp; M
          </span>
        </motion.div>

        {/* Couple Names in Arabic */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-2 mb-5"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-amiri font-bold text-[#FBF8F1] tracking-tight">
            {wedding.groomAr} <span className="text-[#C9A96A] font-cormorant font-normal">&amp;</span> {wedding.brideAr}
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A96A] font-cormorant">
            Ahmed &amp; Menatallah
          </p>
        </motion.div>

        {/* Date Display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#C9A96A]/35 backdrop-blur-md mb-6 text-xs font-cairo text-[#E8D6AE]"
        >
          <span>الأربعاء</span>
          <span className="w-1 h-1 rounded-full bg-[#C9A96A]" />
          <span>14 / 10 / 2026</span>
        </motion.div>

        {/* Emotional Closing Text & Blessing */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="space-y-3 max-w-md mx-auto"
        >
          <p className="text-lg sm:text-xl font-amiri font-bold text-[#FBF8F1] leading-relaxed">
            اللهم بارك لهما وبارك عليهما واجمع بينهما في خير
          </p>

          <p className="text-base sm:text-lg font-amiri text-[#E8D6AE]">
            ننتظركم لتشاركونا بداية أجمل حكاياتنا
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-cairo text-[#C9A96A]">
            <Heart className="w-3.5 h-3.5 fill-[#C9A96A]" />
            <span className="font-semibold">مستنيين نفرح معاكم</span>
            <Heart className="w-3.5 h-3.5 fill-[#C9A96A]" />
          </div>
        </motion.div>

        {/* Minimal Footer Signature */}
        <div className="mt-12 pt-6 border-t border-[#C9A96A]/20 w-full text-center space-y-1">
          <p className="text-sm font-amiri font-bold text-[#FBF8F1]">أحمد &amp; منة الله</p>
          <p className="text-[11px] font-cairo text-[#C9A96A]">14 أكتوبر 2026</p>
        </div>

      </div>
    </section>
  );
}
