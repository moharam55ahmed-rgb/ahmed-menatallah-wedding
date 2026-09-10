"use client";

import React, { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export default function CelebrationSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate gentle ambient floating sparkles
    const count = 18;
    const items: Sparkle[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3.5 + 1.5,
        opacity: Math.random() * 0.45 + 0.15,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 5,
      });
    }
    setSparkles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-[#C5A46D] blur-[0.5px]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `float-sparkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float-sparkle {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0.1;
          }
          50% {
            opacity: 0.6;
            transform: translateY(-25px) scale(1.2);
          }
          100% {
            transform: translateY(-50px) scale(0.8);
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}
