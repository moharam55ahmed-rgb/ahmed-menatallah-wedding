"use client";

import React from "react";
import { AudioProvider } from "@/components/AudioContext";
import OpeningExperience from "@/components/OpeningExperience";
import HeroSection from "@/components/HeroSection";
import PersonalizedGreeting from "@/components/PersonalizedGreeting";
import InvitationMessage from "@/components/InvitationMessage";
import SaveTheDate from "@/components/SaveTheDate";
import VenueSection from "@/components/VenueSection";
import Countdown from "@/components/Countdown";
import RomanticMoments from "@/components/RomanticMoments";
import WishesWall from "@/components/WishesWall";
import RSVPSection from "@/components/RSVPSection";
import ZaghareetButton from "@/components/ZaghareetButton";
import FinalScene from "@/components/FinalScene";
import FloatingControls from "@/components/FloatingControls";
import CelebrationSparkles from "@/components/CelebrationSparkles";

export default function WeddingPage() {
  return (
    <AudioProvider>
      <main className="relative min-h-screen bg-[#F8F2EA] text-[#231F1A] overflow-x-hidden selection:bg-[#C5A46D]/30">

        {/* Ambient celebratory sparkles across viewport */}
        <CelebrationSparkles />

        {/* 1. Cinematic Opening Envelope & Royal Seal Experience */}
        <OpeningExperience />

        {/* Main invitation storytelling flow */}
        <div>
          {/* 2. Hero: The Royal Announcement & Couple Names */}
          <HeroSection />

          {/* 3. Personalized Guest Greeting */}
          <PersonalizedGreeting />

          {/* 4. Formal Arabic Royal Invitation Letter */}
          <InvitationMessage />

          {/* 5. Wedding Date & Calendar Integration */}
          <SaveTheDate />

          {/* 6. Venue & Transportation Guide */}
          <VenueSection />

          {/* 7. Live Wedding Countdown */}
          <Countdown />

          {/* 8. Romantic Moments & Evening Program Timeline */}
          <RomanticMoments />

          {/* 9. Global Wishes & Blessings Wall */}
          <WishesWall />

          {/* 10. RSVP Attendance Confirmation */}
          <RSVPSection />

          {/* 11. Cultural Zaghareet Sound Effect Celebration */}
          <ZaghareetButton />

          {/* 12. Emotional Closing Royal Blessing */}
          <FinalScene />
        </div>

        {/* Floating Audio & Navigation Controls */}
        <FloatingControls />

      </main>
    </AudioProvider>
  );
}
