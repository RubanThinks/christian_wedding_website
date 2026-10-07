import React from "react";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import NavigationBar from "@/components/NavigationBar";
import SoundtrackToggle from "@/components/SoundtrackToggle";
import HeroVideoIntro from "@/components/HeroVideoIntro";
import InvitationEditorial from "@/components/InvitationEditorial";
import RingDateReveal from "@/components/RingDateReveal";
import LocationExperience from "@/components/LocationExperience";
import OptionalDetailsSection from "@/components/OptionalDetailsSection";
import RsvpSection from "@/components/RsvpSection";
import FinalBlessing from "@/components/FinalBlessing";

export default function WeddingInvitationPage() {
  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen bg-[#140E0C] text-[#FAF7F2] overflow-hidden selection:bg-[#C5A059]/30 selection:text-[#FAF7F2]">
        {/* Persistent luxury floating navigation */}
        <NavigationBar />

        {/* Ambient soundtrack controller */}
        <SoundtrackToggle />

        {/* Scene 01: Sanctuary Hero & Cinematic Opening */}
        <HeroVideoIntro />

        {/* Scene 02: Chapter I — The Formal Paper Invitation (With Parents, House Names & Couple Details) */}
        <InvitationEditorial />

        {/* Scene 03: Save Our Sacred Date — Interactive Scratch Card Reveal (With Poppins Numbers) */}
        <RingDateReveal />

        {/* Scene 04: Chapter II — Sacred Celebrations & Destinations (Engagement, Matrimony & Reception) */}
        <LocationExperience />

        {/* Scene 05: Guest Guidance & Provisions (Dress Code, Accommodation, Notes) */}
        <OptionalDetailsSection />

        {/* Scene 06: RSVP & Train Transportation Management System */}
        <RsvpSection />

        {/* Scene 07: Final Blessing & Host Portal */}
        <FinalBlessing />
      </main>
    </SmoothScrollProvider>
  );
}
