"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Calendar, Smile, Sparkles } from "lucide-react";

export default function RomanticMoments() {
  const blocks = [
    {
      number: "01",
      tag: "The Promise",
      title: "الوعد",
      description: "حب جمع بين قلبين على المودة والرحمة، وعهد صادق بأن نسير معًا في درب الحياة يدًا بيد.",
      icon: Heart,
    },
    {
      number: "02",
      tag: "The Date",
      title: "الموعد",
      description: "نلتقي يوم 14 أكتوبر 2026 لنبدأ فصلًا جديدًا وتتوج قلوبنا بأسمى آيات الفرح والسعادة.",
      icon: Calendar,
    },
    {
      number: "03",
      tag: "The Joy",
      title: "الفرحة",
      description: "بحضوركم تكتمل سعادتنا وتصبح الليلة أجمل وأدفأ، فأنتم السند والبسمة في ليلة العمر.",
      icon: Smile,
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-[#151311] text-[#F8F2EA]">
      {/* Subtle Golden Ambient Lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A46D]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#EAD7D1]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#C5A46D]/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#DFCBA8] font-cormorant">
              Our Story
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-amiri font-bold text-white">
            بداية أجمل حكاية
          </h2>
          <p className="text-sm sm:text-base font-cairo text-[#F8F2EA]/70 mt-3 max-w-md mx-auto">
            محطات حب تجمعنا بكم في ليلة العمر الاستثنائية
          </p>
        </motion.div>

        {/* 3 Storytelling Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blocks.map((block, index) => {
            const IconComponent = block.icon;
            return (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative p-8 rounded-3xl bg-[#1D1916]/80 backdrop-blur-md border border-[#C5A46D]/25 hover:border-[#C5A46D]/60 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              >
                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-cormorant font-light text-[#C5A46D]/40 group-hover:text-[#C5A46D] transition-colors">
                      {block.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#C5A46D]/10 flex items-center justify-center border border-[#C5A46D]/30 group-hover:bg-[#C5A46D]/20 transition-colors">
                      <IconComponent className="w-5 h-5 text-[#C5A46D]" />
                    </div>
                  </div>

                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#A07F47] font-cormorant block mb-1">
                    {block.tag}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-amiri font-bold text-white mb-3">
                    {block.title}
                  </h3>

                  <p className="text-sm sm:text-base font-cairo text-[#F8F2EA]/80 leading-relaxed">
                    {block.description}
                  </p>
                </div>

                {/* Subtle bottom bar */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#DFCBA8]/50 font-cairo">
                  <span>أحمد & منة الله</span>
                  <span className="text-lg">✦</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
