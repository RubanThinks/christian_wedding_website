"use client";

import React from "react";
import Link from "next/link";
import RSVPWizard from "@/components/rsvp/RSVPWizard";
import { weddingData } from "@/config/wedding";
import { ArrowLeft, Heart, Calendar } from "lucide-react";

export default function StandaloneRSVPPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#211B17] py-12 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-between">
      {/* Background warm aesthetic glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#FFF4D6]/60 filter blur-[100px] pointer-events-none" />

      {/* Top Bar with back link */}
      <header className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between mb-8 pb-4 border-b border-[#D4A33B]/20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans-clean font-bold text-[#78223B] hover:text-[#58182B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Wedding Invitation</span>
        </Link>

        <div className="flex items-center gap-1.5 text-xs font-serif-luxury text-[#8E681C]">
          <span>✝</span>
          <span className="font-bold">
            {weddingData.couple.groom.firstName} &amp; {weddingData.couple.bride.firstName}
          </span>
        </div>
      </header>

      {/* Main Wizard Container */}
      <main className="relative z-10 max-w-2xl mx-auto w-full my-auto">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border-2 border-[#D4A33B]/40 shadow-2xl relative">
          <RSVPWizard />
        </div>
      </main>

      {/* Footer Note */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center mt-12 pt-6 border-t border-[#D4A33B]/20 text-xs text-[#5C4F46] font-sans-clean">
        <p>
          We look forward to celebrating this sacred covenant with you.
        </p>
        <p className="text-[11px] text-[#8E681C] mt-1">
          {weddingData.engagement.venue} • {weddingData.ceremony.venue}
        </p>
      </footer>
    </div>
  );
}
