"use client";

import React from "react";
import { AudioProvider } from "@/components/AudioContext";
import OpeningExperience from "@/components/OpeningExperience";
import HeroSection from "@/components/HeroSection";
import SaveTheDate from "@/components/SaveTheDate";
import VenueSection from "@/components/VenueSection";
import RSVPSection from "@/components/RSVPSection";
import ContactSection from "@/components/ContactSection";
import ShareSection from "@/components/ShareSection";
import WishesWall from "@/components/WishesWall";
import ZaghareetButton from "@/components/ZaghareetButton";
import FinalScene from "@/components/FinalScene";
import FloatingControls from "@/components/FloatingControls";
import CelebrationSparkles from "@/components/CelebrationSparkles";

export default function WeddingPage() {
  return (
    <AudioProvider>
      <main className="relative min-h-screen bg-[#F7F1E6] text-[#241D18] overflow-x-hidden selection:bg-[#C9A96A]/30">

        {/* Ambient celebratory sparkles across viewport */}
        <CelebrationSparkles />

        {/* 01. Opening Experience (Reference 01) */}
        <OpeningExperience />

        {/* Main invitation storytelling flow (Reference 17 Section Order) */}
        <div className="space-y-1 sm:space-y-2">
          {/* 02. Main Hero + Countdown (Reference 02) */}
          <HeroSection />

          {/* 03. Add to Calendar (Reference 03) */}
          <SaveTheDate />

          {/* 04. Venue / Location (Reference 04) */}
          <VenueSection />

          {/* 05. RSVP Attendance (Reference 05) */}
          <RSVPSection />

          {/* 06. Contact / Help (Reference 06) */}
          <ContactSection />

          {/* 07. Share Invitation (Reference 07) */}
          <ShareSection />

          {/* 08 + 09. Wishes Form + Wishes Wall (Reference 08 & 09) */}
          <WishesWall />

          {/* Cultural Zaghareet Sound Effect Celebration */}
          <ZaghareetButton />

          {/* Final Closing Scene */}
          <FinalScene />
        </div>

        {/* Floating Audio & Navigation Controls */}
        <FloatingControls />

      </main>
    </AudioProvider>
  );
}
