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

  const handleRideApp = (provider: "careem" | "uber" | "indrive" | "didi") => {
    handleCopyAddress();
    const destination = encodeURIComponent(wedding.location.addressAr);
    if (provider === "uber") {
      window.open(wedding.location.uberUrl || `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${destination}`, "_blank", "noopener,noreferrer");
    } else if (provider === "careem") {
      window.open(`https://www.careem.com/`, "_blank", "noopener,noreferrer");
    } else if (provider === "indrive") {
      if (wedding.location.inDriveUrl) {
        window.location.href = wedding.location.inDriveUrl;
      } else {
        window.open(`https://indrive.com/`, "_blank", "noopener,noreferrer");
      }
    } else if (provider === "didi") {
      window.open(`https://web.didiglobal.com/`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="venue-section" className="py-12 sm:py-16 px-4 relative overflow-hidden bg-[#F7F1E6]" dir="rtl">
      <div className="max-w-md mx-auto">
        
        {/* ═══════════════════════════════════════════════════════════════════
            REFERENCE 04: VENUE & LOCATION CARD (الوصول إلى القاعة)
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
            📍
          </div>

          <h3 className="text-xl sm:text-2xl font-amiri font-bold text-[#241D18]">
            الوصول إلى القاعة
          </h3>

          <p className="text-xs sm:text-sm font-cairo text-[#A07F47] font-semibold mt-0.5 mb-2">
            موقع الحفل
          </p>

          <p className="text-base font-amiri font-bold text-[#241D18]">
            {wedding.venueAr}
          </p>
          <p className="text-xs font-cairo text-[#70735F] mb-4">
            {wedding.cityAr}
          </p>

          {/* Interactive / Map Preview Graphic with Pin */}
          <div className="w-full h-40 sm:h-44 rounded-2xl overflow-hidden relative border border-[#C9A96A]/25 mb-4 shadow-2xs group">
            <Image
              src={wedding.venueImage}
              alt="قصر كازابلانكا"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle map overlay aesthetic */}
            <div className="absolute inset-0 bg-[#241D18]/25 backdrop-blur-[0.5px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#241D18] text-[#C9A96A] border-2 border-[#C9A96A] flex items-center justify-center shadow-lg animate-bounce">
                <MapPin className="w-5 h-5 fill-[#C9A96A]" />
              </div>
            </div>
            <div className="absolute bottom-2 inset-x-2 py-1 px-2.5 rounded-lg bg-white/90 backdrop-blur-xs text-[11px] font-cairo text-[#241D18] truncate">
              {wedding.location.addressAr}
            </div>
          </div>

          {/* Primary CTA: افتح الخريطة 📍 */}
          <a
            href={wedding.location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-full bg-[#241D18] hover:bg-[#3A2D24] text-[#FBF8F1] font-cairo font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer touch-target border border-[#C9A96A]/40 flex items-center justify-center gap-2 mb-6"
          >
            <MapPin className="w-4 h-4 text-[#C9A96A]" />
            <span>افتح الخريطة 📍</span>
          </a>

          {/* Ride Services: اطلب توصيلة */}
          <div className="w-full pt-4 border-t border-[#C9A96A]/20">
            <p className="text-xs font-cairo font-semibold text-[#70735F] mb-3">
              اطلب توصيلة
            </p>

            {/* 2x2 Grid matching Reference 04 */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Careem */}
              <button
                type="button"
                onClick={() => handleRideApp("careem")}
                className="py-2.5 px-3 rounded-xl bg-[#FAF5EE] hover:bg-[#F7F1E6] border border-[#C9A96A]/25 text-xs font-cairo font-semibold text-[#241D18] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-[#00EB79] text-white text-[9px] font-bold flex items-center justify-center">C</span>
                <span>Careem</span>
              </button>

              {/* Uber */}
              <button
                type="button"
                onClick={() => handleRideApp("uber")}
                className="py-2.5 px-3 rounded-xl bg-[#FAF5EE] hover:bg-[#F7F1E6] border border-[#C9A96A]/25 text-xs font-cairo font-semibold text-[#241D18] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center">U</span>
                <span>Uber</span>
              </button>

              {/* inDrive */}
              <button
                type="button"
                onClick={() => handleRideApp("indrive")}
                className="py-2.5 px-3 rounded-xl bg-[#FAF5EE] hover:bg-[#F7F1E6] border border-[#C9A96A]/25 text-xs font-cairo font-semibold text-[#241D18] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-[#B2D235] text-black text-[9px] font-bold flex items-center justify-center">iD</span>
                <span>inDrive</span>
              </button>

              {/* DiDi */}
              <button
                type="button"
                onClick={() => handleRideApp("didi")}
                className="py-2.5 px-3 rounded-xl bg-[#FAF5EE] hover:bg-[#F7F1E6] border border-[#C9A96A]/25 text-xs font-cairo font-semibold text-[#241D18] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-[#FF7D40] text-white text-[9px] font-bold flex items-center justify-center">D</span>
                <span>DiDi</span>
              </button>
            </div>

            {copied && (
              <p className="text-[10px] font-cairo text-green-700 mt-2.5">
                ✓ تم نسخ عنوان القاعة لطلب التوصيلة بسهولة
              </p>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}اعة للانتقال عبر تطبيق inDrive بسهولة
                </p>
              )}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
