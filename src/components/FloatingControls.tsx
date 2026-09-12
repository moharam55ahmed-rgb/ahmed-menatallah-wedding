"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "./AudioContext";
import { Volume2, VolumeX, Play, Pause, ChevronUp } from "lucide-react";

export default function FloatingControls() {
  const { isPlaying, isMuted, hasStarted, togglePlay, toggleMute } = useAudio();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Only show floating controls after scrolling past hero section
  if (!hasStarted || !showScrollTop) return null;

  return (
    <div className="fixed bottom-5 inset-x-0 z-40 px-4 sm:px-6 pointer-events-none flex items-center justify-between" dir="ltr">
      
      {/* Compact Audio Controls (Left on LTR) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-[#241D18]/90 backdrop-blur-md border border-[#C9A96A]/40 shadow-[0_6px_20px_rgba(36,29,24,0.25)] text-[#FBF8F1]"
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "إيقاف الموسيقى مؤقتًا" : "تشغيل الموسيقى"}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-[#E8D6AE] transition-colors cursor-pointer touch-target"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#E8D6AE]" /> : <Play className="w-3.5 h-3.5 text-[#E8D6AE] translate-x-0.5" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "إلغاء كتم الصوت" : "كتم الصوت"}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-[#E8D6AE] transition-colors cursor-pointer touch-target"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#E8D6AE]" />}
        </button>
      </motion.div>

      {/* Scroll to Top Button (Right on LTR) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            type="button"
            onClick={scrollToTop}
            aria-label="العودة للأعلى"
            className="pointer-events-auto w-10 h-10 rounded-full bg-[#241D18]/90 hover:bg-[#3A2D24] backdrop-blur-md border border-[#C9A96A]/40 text-[#E8D6AE] flex items-center justify-center shadow-[0_8px_24px_rgba(36,29,24,0.25)] transition-all hover:scale-105 cursor-pointer touch-target"
          >
            <ChevronUp className="w-5 h-5 text-[#C9A96A]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
