"use client";

import React from "react";
import { weddingData } from "@/config/wedding";
import { Calendar, Church, MapPin, Heart } from "lucide-react";

export default function InvitationEditorial() {
  const { couple, wedding, ceremony, reception, engagement } = weddingData;
  const { groom, bride } = couple;

  return (
    <section
      id="scene-invitation"
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 bg-[#FAF7F2] flex items-center justify-center overflow-hidden"
    >
      {/* Background soft sunburst & linen glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FFF4D6]/70 filter blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full mx-auto">
        {/* Section Prelude */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold">
            <span>✝</span>
            <span>Chapter I • The Formal Invitation</span>
            <span>✝</span>
          </div>
        </div>

        {/* Physical Paper Stationery Invitation */}
        <div className="relative paper-deckled rounded-xl p-6 sm:p-12 md:p-16 text-[#211B17] shadow-2xl border-2 border-[#D4A33B]/40 bg-white">
          {/* Subtle diagonal silk ribbon corner effect */}
          <div className="absolute -top-1 -right-1 w-24 h-24 overflow-hidden pointer-events-none">
            <div className="absolute transform rotate-45 bg-[#78223B] text-[#F2DC9B] text-[9px] uppercase tracking-widest font-sans-clean font-bold py-1 right-[-40px] top-[24px] w-[140px] text-center shadow-md border-y border-[#D4A33B]/50">
              Covenant
            </div>
          </div>

          {/* Gold Foil Double Border */}
          <div className="border border-[#D4A33B]/40 p-5 sm:p-8 md:p-10 relative rounded-lg">
            {/* Corner Decorative Crosses */}
            <span className="absolute top-2 left-2 text-[#D4A33B] text-xs">✝</span>
            <span className="absolute top-2 right-2 text-[#D4A33B] text-xs">✝</span>
            <span className="absolute bottom-2 left-2 text-[#D4A33B] text-xs">✝</span>
            <span className="absolute bottom-2 right-2 text-[#D4A33B] text-xs">✝</span>

            {/* Top Monogram Wax Seal Motif */}
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <div className="w-14 h-14 rounded-full bg-[#78223B] border-2 border-[#D4A33B] shadow-md flex items-center justify-center mb-3">
                <span className="font-serif-luxury text-base font-bold text-[#F2DC9B] tracking-wider">
                  M ✝ E
                </span>
              </div>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#8E681C] font-sans-clean font-bold">
                Under the Blessing of Almighty God
              </p>
            </div>

            {/* Formal Christian Invitation Text & Parents Presentation */}
            <div className="text-center space-y-5">
              <p className="font-serif-luxury text-sm sm:text-base text-[#5C4F46] tracking-wide font-medium">
                Together with their parents,
              </p>

              {/* Parents Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-y border-[#D4A33B]/25 bg-[#FAF7F2]/70 rounded-lg text-center">
                {/* Groom Parents */}
                <div className="space-y-1 p-2 sm:p-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean font-bold text-[#78223B] block">
                    Groom&apos;s Parents
                  </span>
                  <p className="font-serif-luxury text-sm sm:text-base font-semibold text-[#211B17]">
                    {groom.parents.father}
                  </p>
                  <p className="font-serif-luxury text-sm sm:text-base font-semibold text-[#211B17]">
                    &amp; {groom.parents.mother}
                  </p>
                  {groom.houseName && (
                    <span className="inline-block text-[11px] uppercase tracking-wider font-sans-clean text-[#8E681C] font-bold mt-1">
                      (House: {groom.houseName})
                    </span>
                  )}
                </div>

                {/* Bride Parents */}
                <div className="space-y-1 p-2 sm:p-3 md:border-l md:border-[#D4A33B]/25">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean font-bold text-[#78223B] block">
                    Bride&apos;s Parents
                  </span>
                  <p className="font-serif-luxury text-sm sm:text-base font-semibold text-[#211B17]">
                    {bride.parents.father}
                  </p>
                  <p className="font-serif-luxury text-sm sm:text-base font-semibold text-[#211B17]">
                    &amp; {bride.parents.mother}
                  </p>
                  {bride.houseName && (
                    <span className="inline-block text-[11px] uppercase tracking-wider font-sans-clean text-[#8E681C] font-bold mt-1">
                      (House: {bride.houseName})
                    </span>
                  )}
                </div>
              </div>

              {/* Solicitation */}
              <p className="font-serif-luxury text-xs sm:text-sm text-[#5C4F46] italic font-medium pt-1">
                cordially request the honour of your presence and earnest prayers at the Holy Matrimony of
              </p>

              {/* Groom and Bride Names in Regal Display */}
              <div className="py-2 space-y-1">
                <div>
                  <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#211B17] tracking-tight font-bold leading-tight">
                    {groom.name}
                  </h2>
                  {groom.houseName && (
                    <p className="text-xs uppercase tracking-[0.25em] text-[#8E681C] font-sans-clean font-bold mt-0.5">
                      Mulavanal
                    </p>
                  )}
                </div>

                <div className="py-1">
                  <span className="font-script text-3xl sm:text-4xl text-[#78223B] block font-normal">
                    &amp;
                  </span>
                </div>

                <div>
                  <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#211B17] tracking-tight font-bold leading-tight">
                    {bride.name}
                  </h2>
                  {bride.houseName && (
                    <p className="text-xs uppercase tracking-[0.25em] text-[#8E681C] font-sans-clean font-bold mt-0.5">
                      Thekkeparambil
                    </p>
                  )}
                </div>
              </div>

              <p className="font-serif-luxury text-xs sm:text-sm text-[#5C4F46] max-w-lg mx-auto leading-relaxed font-medium">
                as they are united in the sacred covenant of Holy Matrimony in the presence of God, their families, and beloved congregation.
              </p>
            </div>

            {/* Event Dates & Venues Cards */}
            <div className="mt-8 pt-6 border-t border-[#D4A33B]/30 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              {/* 1. Engagement Ceremony */}
              <div className="space-y-1.5 p-4 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 text-left">
                <div className="flex items-center gap-1.5 text-[#78223B] mb-1">
                  <Church className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean font-bold">
                    1. Sacred Betrothal
                  </span>
                </div>
                <h4 className="font-serif-luxury text-base font-bold text-[#211B17]">
                  {engagement.venue}
                </h4>
                <p className="text-xs text-[#5C4F46] font-sans-clean">
                  Reception: {engagement.receptionVenue}
                </p>
                <p className="text-xs font-serif-luxury italic text-[#8E681C] font-semibold pt-1">
                  {engagement.date} • {engagement.time}
                </p>
              </div>

              {/* 2. Wedding Ceremony */}
              <div className="space-y-1.5 p-4 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 text-left">
                <div className="flex items-center gap-1.5 text-[#78223B] mb-1">
                  <Church className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean font-bold">
                    2. Holy Matrimony &amp; Lunch
                  </span>
                </div>
                <h4 className="font-serif-luxury text-base font-bold text-[#211B17]">
                  {ceremony.venue}
                </h4>
                <p className="text-xs text-[#5C4F46] font-sans-clean">
                  Lunch &amp; Reception: {reception.venue}
                </p>
                <p className="text-xs font-serif-luxury italic text-[#8E681C] font-semibold pt-1">
                  {ceremony.date} • {ceremony.time}
                </p>
              </div>
            </div>

            {/* Date Footer on Letterpress */}
            <div className="mt-8 pt-4 border-t border-[#D4A33B]/25 text-center">
              <span className="text-xs uppercase tracking-[0.3em] font-sans-clean font-bold text-[#78223B]">
                Knanaya Catholic Tradition • January 2027
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
