import React from "react";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import NavigationBar from "@/components/NavigationBar";
import SoundtrackToggle from "@/components/SoundtrackToggle";
import HeroVideoIntro from "@/components/HeroVideoIntro";
import CoupleReveal from "@/components/CoupleReveal";
import InvitationEditorial from "@/components/InvitationEditorial";
import RingDateReveal from "@/components/RingDateReveal";
import CovenantStrands from "@/components/CovenantStrands";
import ChurchCeremony from "@/components/ChurchCeremony";
import ReceptionCelebration from "@/components/ReceptionCelebration";
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

        {/* Scene 01: Cinematic Intro Film / Sanctuary Hero */}
        <HeroVideoIntro />

        {/* Scene 02: Chapter I — The Couple Editorial Composition */}
        <CoupleReveal />

        {/* Scene 03: Chapter II — The Formal Physical Paper Invitation */}
        <InvitationEditorial />

        {/* Scene 04: Save The Date — Signature Ring Date Reveal */}
        <RingDateReveal />

        {/* Scene 05: Chapter III — The Sacred Covenant (Ecclesiastes 4:12) */}
        <CovenantStrands />

        {/* Scene 06: Chapter IV — The Holy Matrimony Church Ceremony */}
        <ChurchCeremony />

        {/* Scene 07: Chapter V — The Wedding Reception Celebration */}
        <ReceptionCelebration />

        {/* Scene 08: Chapter VI — The Gathering Places & Location Experience */}
        <LocationExperience />

        {/* Optional Client Provisions (Dress Code, Accommodation, Notes) */}
        <OptionalDetailsSection />

        {/* Scene 09: RSVP Tactile Experience & Train Transportation */}
        <RsvpSection />

        {/* Scene 10: Final Blessing & Sacred Twilight Dim */}
        <FinalBlessing />
      </main>
    </SmoothScrollProvider>
  );
}
