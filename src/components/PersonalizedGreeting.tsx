"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, HeartHandshake } from "lucide-react";

export default function PersonalizedGreeting() {
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get("guest");
      if (guest && guest.trim().length > 0) {
        setGuestName(guest.trim());
      }
    }
  }, []);

  return (
    <section id="greeting-section" className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative p-8 md:p-10 rounded-3xl glass-card text-center overflow-hidden"
        >
          {/* Subtle Golden Corner Flourishes */}
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#C5A46D]/40 rounded-tr-lg" />
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#C5A46D]/40 rounded-tl-lg" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#C5A46D]/40 rounded-br-lg" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#C5A46D]/40 rounded-bl-lg" />

          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F8F2EA] border border-[#C5A46D]/40 shadow-sm mb-4">
            <Sparkles className="w-5 h-5 text-[#C5A46D]" />
          </div>

          {/* Greeting Content */}
          {guestName ? (
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#70735F] font-cormorant block">
                Special Invitation
              </span>
              <h2 className="text-2xl sm:text-3xl font-amiri font-bold text-[#231F1A]">
                عزيزنا <span className="gold-gradient-text font-extrabold">{guestName}</span>،
              </h2>
              <p className="text-base sm:text-lg font-cairo text-[#231F1A]/80 leading-relaxed max-w-md mx-auto">
                يسعدنا حضوركم ومشاركتكم لنا أجمل لحظات العمر، فوجودكم يُبهج قلوبنا ويزيد فرحتنا اكتمالًا.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#70735F] font-cormorant block">
                Warm Welcome
              </span>
              <h2 className="text-2xl sm:text-3xl font-amiri font-bold text-[#231F1A]">
                أهلًا وسهلًا بكم في ليلة فرحنا
              </h2>
              <p className="text-base sm:text-lg font-cairo text-[#231F1A]/80 leading-relaxed max-w-md mx-auto">
                يسعدنا دعوتكم لمشاركتنا هذا اليوم المميز، وتخليد هذه الذكرى الغالية معًا بكل المحبة والسرور.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-cairo text-[#70735F]">
            <HeartHandshake className="w-4 h-4 text-[#C5A46D]" />
            <span>نحن في انتظار تشريفكم لنا</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
