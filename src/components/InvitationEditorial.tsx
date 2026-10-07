"use client";

import React from "react";
import { weddingData } from "@/config/wedding";

export default function InvitationEditorial() {
  const { couple, wedding, ceremony, reception } = weddingData;

  return (
    <section
      id="scene-invitation"
      className="relative min-h-screen py-24 md:py-36 px-6 bg-[#FAF7F2] flex items-center justify-center overflow-hidden"
    >
      {/* Background soft sunburst & linen glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FFF4D6]/70 filter blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full mx-auto">
        {/* Section Tag */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold">
            <span>✝</span>
            <span>Chapter II • The Formal Invitation</span>
            <span>✝</span>
          </div>
        </div>

        {/* Physical Paper Stationery Invitation */}
        <div className="relative paper-deckled rounded-sm p-8 sm:p-14 md:p-16 text-[#211B17] shadow-xl border border-[#D4A33B]/40 transition-transform duration-700 hover:scale-[1.01] bg-white">
          {/* Subtle diagonal silk ribbon corner effect */}
          <div className="absolute -top-1 -right-1 w-24 h-24 overflow-hidden pointer-events-none">
            <div className="absolute transform rotate-45 bg-[#78223B] text-[#F2DC9B] text-[9px] uppercase tracking-widest font-sans-clean font-bold py-1 right-[-40px] top-[24px] w-[140px] text-center shadow-md border-y border-[#D4A33B]/50">
              Covenant
            </div>
          </div>

          {/* Gold Foil Double Border */}
          <div className="border border-[#D4A33B]/40 p-6 sm:p-10 md:p-12 relative">
            {/* Corner Decorative Crosses */}
            <span className="absolute top-2 left-2 text-[#D4A33B] text-xs">✝</span>
            <span className="absolute top-2 right-2 text-[#D4A33B] text-xs">✝</span>
            <span className="absolute bottom-2 left-2 text-[#D4A33B] text-xs">✝</span>
            <span className="absolute bottom-2 right-2 text-[#D4A33B] text-xs">✝</span>

            {/* Top Monogram & Wax Seal Motif */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-full bg-[#78223B] border-2 border-[#D4A33B] shadow-md flex items-center justify-center mb-4 relative group">
                <span className="font-serif-luxury text-base font-bold text-[#F2DC9B] tracking-wider">
                  E ✝ D
                </span>
              </div>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#8E681C] font-sans-clean font-bold">
                Under the Blessing of Almighty God
              </p>
            </div>

            {/* Preamble */}
            <div className="text-center space-y-6">
              <p className="font-serif-luxury text-base sm:text-lg text-[#5C4F46] tracking-wide leading-relaxed font-medium">
                Together with their families,
              </p>

              <div className="py-2">
                <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#211B17] tracking-tight font-bold leading-[1.1]">
                  {couple.bride.name}
                </h2>
                <div className="my-2">
                  <span className="font-script text-3xl sm:text-4xl md:text-5xl text-[#78223B] block font-normal">
                    and
                  </span>
                </div>
                <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#211B17] tracking-tight font-bold leading-[1.1]">
                  {couple.groom.name}
                </h2>
              </div>

              <p className="font-serif-luxury text-base sm:text-lg text-[#5C4F46] max-w-md mx-auto leading-relaxed font-medium">
                joyfully request the honour of your presence to celebrate the
                beginning of their sacred covenant and life together.
              </p>
            </div>

            {/* Event Time & Location Details */}
            <div className="mt-12 pt-8 border-t border-[#D4A33B]/30 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              {/* Ceremony */}
              <div className="space-y-1.5 p-4 rounded bg-[#FAF7F2] border border-[#D4A33B]/20">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#78223B] font-sans-clean font-bold block">
                  The Ceremony
                </span>
                <h4 className="font-serif-luxury text-xl text-[#211B17] font-semibold">
                  {ceremony.venue}
                </h4>
                <p className="text-xs text-[#5C4F46] font-sans-clean">
                  {ceremony.address}
                </p>
                <p className="text-xs font-serif-luxury italic text-[#8E681C] pt-1 font-semibold">
                  {ceremony.time}
                </p>
              </div>

              {/* Reception */}
              <div className="space-y-1.5 p-4 rounded bg-[#FAF7F2] border border-[#D4A33B]/20">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#78223B] font-sans-clean font-bold block">
                  The Reception
                </span>
                <h4 className="font-serif-luxury text-xl text-[#211B17] font-semibold">
                  {reception.venue}
                </h4>
                <p className="text-xs text-[#5C4F46] font-sans-clean">
                  {reception.address}
                </p>
                <p className="text-xs font-serif-luxury italic text-[#8E681C] pt-1 font-semibold">
                  {reception.time}
                </p>
              </div>
            </div>

            {/* Date Footer on Letterpress */}
            <div className="mt-10 pt-6 border-t border-[#D4A33B]/25 text-center">
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-sans-clean font-bold text-[#78223B]">
                {wedding.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
