"use client";

import React, { useState, useEffect } from "react";
import { AudioProvider } from "@/components/AudioContext";
import OpeningExperience from "@/components/OpeningExperience";
import HeroSection from "@/components/HeroSection";
import PersonalizedGreeting from "@/components/PersonalizedGreeting";
import SaveTheDate from "@/components/SaveTheDate";
import Countdown from "@/components/Countdown";
import InvitationMessage from "@/components/InvitationMessage";
import RomanticMoments from "@/components/RomanticMoments";
import VenueSection from "@/components/VenueSection";
import RSVPSection from "@/components/RSVPSection";
import ZaghareetButton from "@/components/ZaghareetButton";
import WishesWall, { loadWishes } from "@/components/WishesWall";
import FinalScene from "@/components/FinalScene";
import FloatingControls from "@/components/FloatingControls";
import CelebrationSparkles from "@/components/CelebrationSparkles";
import { GuestWish } from "@/config/wedding";

export default function WeddingPage() {
  const [wishes, setWishes] = useState<GuestWish[]>([]);

  useEffect(() => {
    setWishes(loadWishes());
  }, []);

  return (
    <AudioProvider>
      <main className="relative min-h-screen bg-[#F8F2EA] text-[#231F1A] overflow-x-hidden">

        {/* Ambient celebratory sparkles */}
        <CelebrationSparkles />

        {/* Opening envelope experience */}
        <OpeningExperience />

        {/* Main invitation experience */}
        <div>
          {/* 1. Hero */}
          <HeroSection />

          {/* 2. Personalized guest greeting */}
          <PersonalizedGreeting />

          {/* 3. Save the date + calendar download */}
          <SaveTheDate />

          {/* 4. Live countdown */}
          <Countdown />

          {/* 5. Formal Arabic invitation message */}
          <InvitationMessage />

          {/* 6. Romantic story moments */}
          <RomanticMoments />

          {/* 7. Venue + transport links */}
          <VenueSection />

          {/* 8. RSVP attendance form */}
          <RSVPSection />

          {/* 9. Zaghareet celebration button */}
          <ZaghareetButton />

          {/* 10. Wishes wall */}
          <WishesWall wishes={wishes} setWishes={setWishes} />

          {/* 11. Final emotional closing scene */}
          <FinalScene />
        </div>

        {/* Floating music & scroll-to-top controls */}
        <FloatingControls />

      </main>
    </AudioProvider>
  );
}
