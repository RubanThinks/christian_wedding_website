import React from "react";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import NavigationBar from "@/components/NavigationBar";
import SoundtrackToggle from "@/components/SoundtrackToggle";
import HeroVideoIntro from "@/components/HeroVideoIntro";
import CoupleReveal from "@/components/CoupleReveal";
import ScriptureLove from "@/components/ScriptureLove";
import InvitationEditorial from "@/components/InvitationEditorial";
import RingDateReveal from "@/components/RingDateReveal";
import CovenantStrands from "@/components/CovenantStrands";
import ChurchCeremony from "@/components/ChurchCeremony";
import AisleWalk from "@/components/AisleWalk";
import VowsRings from "@/components/VowsRings";
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

        {/* Scene 02: The Couple Editorial Composition */}
        <CoupleReveal />

        {/* Scene 03: Scripture Moment — Love (1 Corinthians 13:4-8) */}
        <ScriptureLove />

        {/* Scene 04: The Formal Physical Paper Invitation */}
        <InvitationEditorial />

        {/* Scene 05: Signature Ring Date Reveal (GSAP Scroll Interaction) */}
        <RingDateReveal />

        {/* Scene 06: The Covenant — A Cord of Three Strands (Ecclesiastes 4:12) */}
        <CovenantStrands />

        {/* Scene 07: The Church Ceremony Reveal */}
        <ChurchCeremony />

        {/* Scene 08: Walking The Wedding Aisle */}
        <AisleWalk />

        {/* Scene 09: Rings & Matrimonial Vows */}
        <VowsRings />

        {/* Scene 10: The Reception Celebration */}
        <ReceptionCelebration />

        {/* Scene 11: Location Experience */}
        <LocationExperience />

        {/* Optional Client Provisions (Dress Code, Accommodation, Registry, Livestream) */}
        <OptionalDetailsSection />

        {/* Scene 12: RSVP Tactile Experience */}
        <RsvpSection />

        {/* Scene 13: Final Blessing & Sacred Twilight Dim */}
        <FinalBlessing />
      </main>
    </SmoothScrollProvider>
  );
}
