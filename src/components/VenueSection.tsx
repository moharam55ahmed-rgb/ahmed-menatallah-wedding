"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { wedding } from "@/config/wedding";
import { MapPin, Navigation, Car, Copy, Check, Sparkles } from "lucide-react";

export default function VenueSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(wedding.location.addressAr);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleOpenUber = () => {
    // Attempt opening Uber deep link, with fallback
    const uberUrl = wedding.location.uberUrl || `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(wedding.location.addressAr)}`;
    window.open(uberUrl, "_blank", "noopener,noreferrer");
  };

  const handleOpenInDrive = () => {
    // inDrive: copy address and open search/app
    handleCopyAddress();
    if (wedding.location.inDriveUrl) {
      window.location.href = wedding.location.inDriveUrl;
    } else {
      window.open(wedding.location.mapsUrl, "_blank", "noopener,noreferrer");
    }
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(wedding.location.addressAr)}`;

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-[#FAF6F0]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A46D]/15 border border-[#C5A46D]/30 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#A07F47]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#70735F] font-cormorant">
              Venue & Location
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-amiri font-bold text-[#231F1A]">
            الوصول إلى القاعة
          </h2>
          <p className="text-sm sm:text-base font-cairo text-[#70735F] mt-2 max-w-md mx-auto">
            نتشرف باستقبالكم في قاعة قصر كازبلانكا الراقية
          </p>
        </motion.div>

        {/* Venue Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="rounded-3xl overflow-hidden glass-card shadow-2xl border border-[#C5A46D]/40 grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Venue Image */}
          <div className="relative lg:col-span-7 h-[300px] sm:h-[400px] lg:h-auto overflow-hidden">
            <Image
              src={wedding.venueImage}
              alt="Kasr Casablanca Hall"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 right-4 text-white lg:hidden">
              <span className="text-xs font-cairo text-[#DFCBA8] block">شبين القناطر - القليوبية</span>
              <h4 className="text-xl font-amiri font-bold">{wedding.venueAr}</h4>
            </div>
          </div>

          {/* Venue Info and Actions */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white/90">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#A07F47] font-cormorant mb-2">
                <Sparkles className="w-3 h-3 text-[#C5A46D]" />
                Royal Hall & Ballroom
              </div>

              <h3 className="text-3xl sm:text-4xl font-amiri font-bold text-[#231F1A] mb-2">
                {wedding.venueAr}
              </h3>

              <div className="flex items-center gap-2 text-sm sm:text-base font-cairo text-[#70735F] mb-4">
                <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>{wedding.cityAr}</span>
              </div>

              <div className="space-y-2 py-4 border-y border-[#C5A46D]/20 text-sm font-cairo text-[#231F1A]/85">
                <div className="flex justify-between items-center">
                  <span className="text-[#70735F]">اليوم:</span>
                  <span className="font-semibold text-[#231F1A]">{wedding.dayAr} 14 / 10 / 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#70735F]">الموعد:</span>
                  <span className="font-semibold text-[#231F1A]">الساعة 7:00 مساءً</span>
                </div>
                <div className="flex justify-between items-start pt-1">
                  <span className="text-[#70735F] shrink-0">العنوان:</span>
                  <span className="text-xs text-left max-w-[200px] text-[#231F1A]">{wedding.location.addressAr}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="mt-8 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* 1. View on Maps */}
                <a
                  href={wedding.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#231F1A] hover:bg-[#151311] text-[#F8F2EA] text-xs sm:text-sm font-semibold font-cairo shadow-md hover:shadow-lg transition-all touch-target cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#C5A46D]" />
                  <span>افتح الخريطة 📍</span>
                </a>

                {/* 2. Directions */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C5A46D] hover:bg-[#B58A48] text-[#151311] text-xs sm:text-sm font-bold font-cairo shadow-md hover:shadow-lg transition-all touch-target cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>الاتجاهات</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 3. Open in Uber */}
                <button
                  type="button"
                  onClick={handleOpenUber}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-[#F8F2EA] border border-[#231F1A]/20 text-[#231F1A] text-xs sm:text-sm font-semibold font-cairo shadow-sm hover:shadow transition-all touch-target cursor-pointer"
                >
                  <Car className="w-4 h-4 text-[#231F1A]" />
                  <span>افتح في أوبر</span>
                </button>

                {/* 4. Open in inDrive / Copy */}
                <button
                  type="button"
                  onClick={handleOpenInDrive}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-[#F8F2EA] border border-[#231F1A]/20 text-[#231F1A] text-xs sm:text-sm font-semibold font-cairo shadow-sm hover:shadow transition-all touch-target cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span>تم نسخ العنوان!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#A07F47]" />
                      <span>افتح في inDrive</span>
                    </>
                  )}
                </button>
              </div>

              {copied && (
                <p className="text-[11px] text-center text-green-700 font-cairo animate-fade-in">
                  ✓ تم نسخ عنوان القاعة للانتقال عبر تطبيق inDrive بسهولة
                </p>
              )}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
