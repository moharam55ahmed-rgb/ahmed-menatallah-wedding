"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useAudio } from "./AudioContext";
import { Zap } from "lucide-react";

export default function ZaghareetButton() {
  const { playCelebrationSound } = useAudio();

  const handleCelebrate = useCallback(() => {
    playCelebrationSound();

    // Big burst confetti
    const burst = (x: number, y: number, angle: number) => {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x, y },
        angle,
        colors: ["#C5A46D", "#EAD7D1", "#FAF5EE", "#B58A48", "#DFCBA8", "#FFF5E1", "#FFD700"],
        startVelocity: 35,
        gravity: 0.9,
      });
    };

    burst(0.3, 0.5, 60);
    burst(0.7, 0.5, 120);

    setTimeout(() => {
      burst(0.5, 0.6, 90);
    }, 250);

    setTimeout(() => {
      burst(0.2, 0.7, 75);
      burst(0.8, 0.7, 105);
    }, 500);
  }, [playCelebrationSound]);

  return (
    <section className="py-8 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-3"
      >
        <p className="text-sm font-cairo text-[#70735F] text-center">
          اضغط لتهنئ العروسين وتشارك الفرحة! 🎉
        </p>
        <motion.button
          type="button"
          onClick={handleCelebrate}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          className="relative group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#B58A48] via-[#E6D0A2] to-[#B58A48] text-[#151311] font-bold text-lg font-cairo shadow-[0_8px_25px_rgba(197,164,109,0.45)] hover:shadow-[0_12px_35px_rgba(197,164,109,0.65)] transition-shadow cursor-pointer touch-target overflow-hidden"
          style={{ minWidth: 200 }}
        >
          {/* Shimmer bar */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          <Zap className="w-5 h-5 fill-[#151311]" />
          <span>زغرّط معانا! 🥳</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
