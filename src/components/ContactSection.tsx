"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, HeartHandshake, Sparkles } from "lucide-react";

interface ContactItem {
  name: string;
  relation: string;
  phone: string;
  tel: string;
  badge: string;
}

const CONTACTS: ContactItem[] = [
  {
    name: "المهندس محمد محرم",
    relation: "أخو العريس",
    phone: "01004802525",
    tel: "tel:+201004802525",
    badge: "🤵 عائلة العريس",
  },
  {
    name: "المهندس إبراهيم محرم",
    relation: "أخو العريس",
    phone: "01016524656",
    tel: "tel:+201016524656",
    badge: "🤵 عائلة العريس",
  },
  {
    name: "أ.د أشرف أيمن",
    relation: "أخو العروسة",
    phone: "01285297542",
    tel: "tel:+201285297542",
    badge: "👰 عائلة العروسة",
  },
];

export default function ContactSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[#FAF6F0]" dir="rtl">
      {/* Delicate background ambiance */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#C5A46D_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A46D]/15 border border-[#C5A46D]/30 mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-[#A07F47]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#70735F] font-cormorant">
              Guest Assistance
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-amiri font-bold text-[#241D18]">
            محتاج مساعدة؟
          </h2>

          <p className="text-xs sm:text-sm font-cairo text-[#70735F] mt-2 max-w-md mx-auto">
            إذا احتجت أي مساعدة للوصول أو الاستفسار عن المناسبة، يمكنكم التواصل معنا.
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 text-[#C5A46D]/60">
            <span className="w-10 h-[1px] bg-[#C5A46D]/40" />
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span className="w-10 h-[1px] bg-[#C5A46D]/40" />
          </div>
        </motion.div>

        {/* Contacts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CONTACTS.map((contact, idx) => (
            <motion.div
              key={contact.phone}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative rounded-2xl bg-[#FBF8F1] border border-[#C5A46D]/30 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A46D]/50 to-transparent" />

              <div>
                {/* Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-cairo font-semibold text-[#A07F47] px-2.5 py-0.5 rounded-full bg-[#C5A46D]/10 border border-[#C5A46D]/20">
                    {contact.badge}
                  </span>
                  <span className="text-xs text-[#70735F] font-cairo">
                    {contact.relation}
                  </span>
                </div>

                {/* Contact Name */}
                <h3 className="text-xl font-amiri font-bold text-[#241D18] mb-1">
                  {contact.name}
                </h3>

                {/* Relationship line */}
                <p className="text-xs text-[#70735F] font-cairo mb-4">
                  {contact.relation}
                </p>

                {/* Decorative Separator */}
                <div className="w-full h-[1px] bg-[#C5A46D]/20 mb-4" />

                {/* Phone Number Display - kept in LTR for clean readability */}
                <div className="text-center py-2 px-3 rounded-xl bg-[#FAF6F0] border border-[#C5A46D]/20 mb-4">
                  <span
                    className="text-base font-cormorant font-bold text-[#241D18] tracking-widest"
                    dir="ltr"
                    style={{ unicodeBidi: "isolate" }}
                  >
                    {contact.phone}
                  </span>
                </div>
              </div>

              {/* Call Action Button */}
              <a
                href={contact.tel}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#241D18] hover:bg-[#3A2D24] text-[#FBF8F1] text-xs sm:text-sm font-semibold font-cairo shadow-sm hover:shadow transition-all duration-200 cursor-pointer touch-target group-hover:border-[#C5A46D]/50 border border-transparent"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C9A96A] transition-transform group-hover:scale-110" />
                <span>اتصل الآن</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
