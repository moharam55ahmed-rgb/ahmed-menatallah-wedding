"use client";

import React from "react";
import { AudioProvider } from "@/components/AudioContext";
import OpeningExperience from "@/components/OpeningExperience";
import HeroSection from "@/components/HeroSection";
import PersonalizedGreeting from "@/components/PersonalizedGreeting";
import InvitationMessage from "@/components/InvitationMessage";
import Countdown from "@/components/Countdown";
import SaveTheDate from "@/components/SaveTheDate";
import VenueSection from "@/components/VenueSection";
import RSVPSection from "@/components/RSVPSection";
import ContactSection from "@/components/ContactSection";
import ShareSection from "@/components/ShareSection";
import RomanticMoments from "@/components/RomanticMoments";
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

        {/* 1. Opening Experience (Envelope, couple names, date, افتح الدعوة ✨) */}
        <OpeningExperience />

        {/* Main invitation storytelling flow */}
        <div>
          {/* 2. Main Hero (Couple names, wedding blessing, concise date/time/venue) */}
          <HeroSection />

          {/* 3. Personalized Guest Greeting & Formal Invitation Letter */}
          <PersonalizedGreeting />
          <InvitationMessage />

          {/* 4. Live Wedding Countdown (باقي على ليلة العمر) */}
          <Countdown />

          {/* 5. Event Details & Add to Calendar (تفاصيل المناسبة / احفظوا الموعد) */}
          <SaveTheDate />

          {/* 6. Location & Ride Options (الوصول إلى القاعة / افتح الخريطة) */}
          <VenueSection />

          {/* 7. RSVP Attendance (يشرفنا حضوركم / نعم، بإذن الله ❤️ / أعتذر عن الحضور) */}
          <RSVPSection />

          {/* 8. Family Contact & Assistance (محتاج مساعدة؟ / اتصل الآن) */}
          <ContactSection />

          {/* 9. Share Invitation (شارك فرحتنا / مشاركة الدعوة) */}
          <ShareSection />

          {/* 10. Evening Timeline & Romantic Moments */}
          <RomanticMoments />

          {/* 11. Wishes Wall & Guestbook (كلمات من القلب / أرسل تهنئتك ❤️) */}
          <WishesWall />

          {/* 12. Cultural Zaghareet Sound Effect Celebration */}
          <ZaghareetButton />

          {/* 13. Minimal Elegant Footer */}
          <FinalScene />
        </div>

        {/* Floating Audio & Navigation Controls */}
        <FloatingControls />

      </main>
    </AudioProvider>
  );
}
