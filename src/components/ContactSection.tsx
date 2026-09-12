"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, Phone } from "lucide-react";

interface ContactItem {
  name: string;
  relation: string;
  phone: string;
  tel: string;
}

const CONTACTS: ContactItem[] = [
  {
    name: "المهندس محمد محرم",
    relation: "أخو العريس",
    phone: "01004802525",
    tel: "tel:+201004802525",
  },
  {
    name: "المهندس إبراهيم محرم",
    relation: "أخو العريس",
    phone: "01016524656",
    tel: "tel:+201016524656",
  },
  {
    name: "أ.د أشرف أيمن",
    relation: "أخو العروسة",
    phone: "01285297542",
    tel: "tel:+201285297542",
  },
];

export default function ContactSection() {
  return (
    <section id="contact-section" className="py-6 sm:py-8 px-4 relative overflow-hidden bg-[#F7F1E6]" dir="rtl">
      <div className="max-w-md mx-auto">
        
        {/* ═══════════════════════════════════════════════════════════════════
            REFERENCE 06: CONTACT / HELP CARD (للاستفسار والمساعدة)
            ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-7 rounded-3xl bg-white border border-[#C9A96A]/35 shadow-sm text-center flex flex-col items-center"
        >
          {/* Top Icon in Circle */}
          <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#C9A96A]/40 flex items-center justify-center text-xl mb-3 shadow-2xs">
            <Phone className="w-5 h-5 text-[#8A6A32]" />
          </div>

          <h3 className="text-xl sm:text-2xl font-amiri font-bold text-[#241D18]">
            للاستفسار والمساعدة
          </h3>

          <p className="text-xs sm:text-sm font-cairo text-[#5C5146] mt-0.5 mb-5">
            في حال احتجت للمساعدة أو الاستفسار عن الوصول
          </p>

          {/* 3 Contact Rows matching Reference 06 */}
          <div className="w-full space-y-3">
            {CONTACTS.map((contact) => (
              <div
                key={contact.phone}
                className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF5EE] border border-[#C9A96A]/25 flex items-center justify-between gap-3 text-right hover:border-[#C9A96A]/50 transition-all"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm sm:text-base font-amiri font-bold text-[#241D18] truncate">
                    {contact.name}
                  </h4>
                  <p className="text-[11px] font-cairo text-[#5C5146]">
                    {contact.relation}
                  </p>
                </div>

                {/* Call CTA with Phone Link */}
                <a
                  href={contact.tel}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#241D18] text-[#241D18] hover:text-[#FBF8F1] border border-[#C9A96A]/35 text-xs font-cairo font-semibold shadow-2xs transition-all cursor-pointer touch-target group shrink-0"
                  dir="ltr"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#8A6A32] group-hover:text-[#FBF8F1]" />
                  <span className="font-cormorant font-bold text-xs tracking-wider">
                    {contact.phone}
                  </span>
                </a>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
