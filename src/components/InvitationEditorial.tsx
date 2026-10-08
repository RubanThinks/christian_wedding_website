"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";
import { Church, Sparkles, Heart } from "lucide-react";
import LatinCross from "@/components/LatinCross";

export default function InvitationEditorial() {
  const { couple, ceremony, reception, engagement } = weddingData;
  const { groom, bride } = couple;

  return (
    <section
      id="scene-invitation"
      className="relative min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#FAF7F2] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Couple Watercolor Portrait with High Clarity & Vibrance */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-65 sm:opacity-75">
        <Image
          src="/images/couple/bg-couple.jpg"
          alt="Sara & Mishel Watercolor Artwork Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top sm:object-[center_top] filter contrast-[1.06] brightness-[1.02]"
        />
        {/* Soft atmospheric radial and vertical vignette to preserve warmth while guaranteeing text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/40 to-[#FAF7F2]/95" />
      </div>

      {/* Tender Central Warm Golden Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FFF4D6]/60 filter blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full mx-auto space-y-8 sm:space-y-10">
        
        {/* =========================================================================
            FEATURE 1: ROMANTIC COUPLE WATERCOLOR SHOWCASE (JUST BELOW HERO SECTION)
            Tailored especially for mobile view so the background couple painting 
            is 100% visible, crystal clear, and completely unobstructed by dense text!
           ========================================================================= */}
        <div className="text-center flex flex-col items-center">
          {/* Section Prelude Ribbon */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold shadow-xs mb-4 sm:mb-6">
            <LatinCross className="w-2.5 h-2.5 text-[#D4A33B]" />
            <span>Chapter I • The Sacred Union</span>
            <LatinCross className="w-2.5 h-2.5 text-[#D4A33B]" />
          </div>

          {/* Dedicated Romantic Watercolor Artwork Portal */}
          <div className="relative group w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] mx-auto">
            {/* Soft Ambient Gold Aura Glow */}
            <div className="absolute -inset-3 bg-gradient-to-b from-[#E8C16A]/30 via-[#C59A45]/20 to-transparent rounded-full filter blur-xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Sacred Arch Portrait Container */}
            <div className="relative rounded-t-[140px] sm:rounded-t-[170px] rounded-b-3xl overflow-hidden shadow-[0_20px_50px_rgba(120,34,59,0.22)] ring-1 ring-[#D4A33B]/60 ring-offset-4 ring-offset-white/90 bg-white/40 backdrop-blur-xs transition-transform duration-700 group-hover:scale-[1.015]">
              {/* Crown Holy Cross Icon */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center select-none pointer-events-none">
                <LatinCross className="w-4 h-4 text-[#D4A33B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
              </div>

              {/* High-Resolution Watercolor Portrait */}
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/couple/bg-couple.jpg"
                  alt="Sara Jose & Mishel Mathew - Watercolor Portrait"
                  fill
                  priority
                  sizes="(max-width: 640px) 280px, 380px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.04]"
                />
                {/* Delicate inner hairline golden arch ring */}
                <div className="absolute inset-0 rounded-t-[140px] sm:rounded-t-[170px] rounded-b-3xl ring-1 ring-inset ring-[#D4A33B]/40 pointer-events-none" />
                {/* Soft gradient bottom melt */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                {/* Floating romantic badge at the base of the portrait */}
                <div className="absolute bottom-3 inset-x-3 text-center z-20">
                  <div className="inline-block px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#D4A33B]/50 shadow-md">
                    <p className="font-script text-base sm:text-lg text-[#78223B] leading-none">
                      Sara &amp; Mishel
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#8E681C] font-sans-clean font-bold mt-0.5">
                      Two Hearts • One Covenant
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle scripture quote right below the watercolor reveal */}
            <p className="mt-3 text-xs sm:text-sm text-[#5C4F46] font-serif-luxury italic tracking-wide">
              &ldquo;He has made everything beautiful in its time.&rdquo;
              <span className="block text-[10px] text-[#8E681C] font-sans-clean not-italic uppercase tracking-[0.2em] font-bold mt-0.5">
                Ecclesiastes 3:11
              </span>
            </p>
          </div>
        </div>

        {/* =========================================================================
            FEATURE 2: FORMAL TRANSLUCENT FROSTED VELLUM INVITATION CARD
            Allows the background watercolor to glow through while frosted glass 
            ensures 100% text contrast and readability without disappearing.
           ========================================================================= */}
        <div className="relative rounded-2xl p-5 sm:p-10 md:p-14 text-[#211B17] shadow-[0_25px_60px_-15px_rgba(120,34,59,0.18)] border-2 border-[#D4A33B]/45 bg-white/85 sm:bg-white/88 backdrop-blur-md">

          {/* Gold Foil Double Border */}
          <div className="border border-[#D4A33B]/40 p-4 sm:p-7 md:p-9 relative rounded-xl bg-white/30 backdrop-blur-xs">
            {/* Corner Decorative Golden Crosses (SVG: Never turns into iOS purple emoji) */}
            <LatinCross className="absolute top-2.5 left-2.5 w-3 h-3 text-[#D4A33B]" />
            <LatinCross className="absolute top-2.5 right-2.5 w-3 h-3 text-[#D4A33B]" />
            <LatinCross className="absolute bottom-2.5 left-2.5 w-3 h-3 text-[#D4A33B]" />
            <LatinCross className="absolute bottom-2.5 right-2.5 w-3 h-3 text-[#D4A33B]" />

            {/* Top Monogram Wax Seal Motif (Fixed for iPhone/Mobile & Desktop) */}
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#78223B] to-[#551425] border-2 border-[#D4A33B] shadow-md flex flex-col items-center justify-center mb-2.5 ring-2 ring-[#D4A33B]/30 ring-offset-2 ring-offset-white select-none">
                {/* Delicate Holy Cross SVG - Always golden vector, zero emoji replacement */}
                <LatinCross className="w-3.5 h-3.5 text-[#E7C982] mb-0.5" />
                {/* Monogram Initials M & S on one horizontal line */}
                <div className="flex items-center justify-center gap-1 leading-none whitespace-nowrap">
                  <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#F2DC9B] leading-none">
                    {(groom.firstName || groom.name).charAt(0)}
                  </span>
                  <span className="font-script text-xs sm:text-sm text-[#D4A33B] italic leading-none">
                    &amp;
                  </span>
                  <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#F2DC9B] leading-none">
                    {(bride.firstName || bride.name).charAt(0)}
                  </span>
                </div>
              </div>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#8E681C] font-sans-clean font-bold">
                Under the Blessing of Almighty God
              </p>
            </div>

            {/* Formal Christian Invitation Text & Parents Presentation */}
            <div className="text-center space-y-5">
              <p className="font-serif-luxury text-sm sm:text-base text-[#4A3E37] tracking-wide font-medium">
                Together with their parents,
              </p>

              {/* Parents Section with High Contrast */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3.5 border-y border-[#D4A33B]/30 bg-[#FAF7F2]/80 backdrop-blur-xs rounded-xl text-center shadow-xs">
                {/* Groom Parents */}
                <div className="space-y-1 p-2 sm:p-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean font-bold text-[#78223B] block">
                    Groom&apos;s Parents
                  </span>
                  <p className="font-serif-luxury text-sm sm:text-base font-bold text-[#1F1A17]">
                    {groom.parents.father}
                  </p>
                  <p className="font-serif-luxury text-sm sm:text-base font-bold text-[#1F1A17]">
                    &amp; {groom.parents.mother}
                  </p>
                  {groom.houseName && (
                    <span className="inline-block text-[11px] uppercase tracking-wider font-sans-clean text-[#8E681C] font-bold mt-1">
                      (House: {groom.houseName})
                    </span>
                  )}
                </div>

                {/* Bride Parents */}
                <div className="space-y-1 p-2 sm:p-3 md:border-l md:border-[#D4A33B]/30">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean font-bold text-[#78223B] block">
                    Bride&apos;s Parents
                  </span>
                  <p className="font-serif-luxury text-sm sm:text-base font-bold text-[#1F1A17]">
                    {bride.parents.father}
                  </p>
                  <p className="font-serif-luxury text-sm sm:text-base font-bold text-[#1F1A17]">
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
              <p className="font-serif-luxury text-xs sm:text-sm text-[#4A3E37] italic font-medium pt-1">
                cordially request the honour of your presence and earnest prayers at the Holy Matrimony of
              </p>

              {/* =========================================================================
                  FEATURE 3: THE BETROTHED WALKING PORTRAIT (CATHEDRAL ARCH - WEDDING STYLE)
                  Replacing the stiff corporate picture frame with a sacred, romantic
                  Cathedral Arch Portal with delicate gold hairlines and floating halo!
                 ========================================================================= */}
              <div className="my-6 sm:my-8 flex justify-center">
                <div className="relative group max-w-[260px] sm:max-w-[310px] w-full">
                  {/* Floating Golden Halo Accent */}
                  <div className="relative rounded-t-[130px] sm:rounded-t-[160px] rounded-b-2xl overflow-hidden shadow-[0_20px_45px_rgba(120,34,59,0.22)] ring-1 ring-[#D4A33B]/60 ring-offset-3 ring-offset-white/80">
                    
                    {/* Crown Cross Accent */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 select-none pointer-events-none">
                      <span className="text-[#E7C982] text-xs">✦</span>
                      <LatinCross className="w-3.5 h-3.5 text-[#E7C982]" />
                      <span className="text-[#E7C982] text-xs">✦</span>
                    </div>

                    {/* Image Canvas - Center Aligned with No Zoom */}
                    <div className="relative aspect-[4/5] w-full bg-[#EADBB8]/40 overflow-hidden rounded-t-[130px] sm:rounded-t-[160px] rounded-b-2xl">
                      <Image
                        src="/images/couple/ch-fg-couple.png"
                        alt={`${groom.name} & ${bride.name}`}
                        fill
                        sizes="(max-width: 640px) 260px, 310px"
                        className="object-cover object-center"
                        priority
                      />
                      {/* Inner Hairline Gilded Border */}
                      <div className="absolute inset-0 rounded-t-[130px] sm:rounded-t-[160px] rounded-b-2xl ring-1 ring-inset ring-[#D4A33B]/40 pointer-events-none" />
                      {/* Soft romantic bottom gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />

                      {/* Calligraphy Overlay Capsule */}
                      <div className="absolute bottom-3 inset-x-3 text-center z-20">
                        <div className="inline-block px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-[#D4A33B]/50 shadow-sm">
                          <p className="font-script text-base sm:text-lg text-[#78223B] leading-none">
                            Sara &amp; Mishel
                          </p>
                          <p className="text-[8.5px] uppercase tracking-[0.2em] text-[#8E681C] font-sans-clean font-bold mt-0.5">
                            Walking in Sacred Grace
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Elegant Badge Pill Below */}
                  <div className="mt-3 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/50 text-[#8E681C] text-[10px] font-sans-clean font-bold uppercase tracking-[0.2em] shadow-2xs">
                      <Sparkles className="w-3 h-3 text-[#D4A33B]" />
                      <span>The Betrothed</span>
                      <Sparkles className="w-3 h-3 text-[#D4A33B]" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Groom and Bride Names in Regal Display */}
              <div className="py-2 space-y-1">
                <div>
                  <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#1F1A17] tracking-tight font-bold leading-tight">
                    {groom.name}
                  </h2>
                  {groom.houseName && (
                    <p className="text-xs uppercase tracking-[0.25em] text-[#8E681C] font-sans-clean font-bold mt-0.5">
                      {groom.houseName}
                    </p>
                  )}
                </div>

                <div className="py-1">
                  <span className="font-script text-3xl sm:text-4xl text-[#78223B] block font-normal">
                    &amp;
                  </span>
                </div>

                <div>
                  <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#1F1A17] tracking-tight font-bold leading-tight">
                    {bride.name}
                  </h2>
                  {bride.houseName && (
                    <p className="text-xs uppercase tracking-[0.25em] text-[#8E681C] font-sans-clean font-bold mt-0.5">
                      {bride.houseName}
                    </p>
                  )}
                </div>
              </div>

              <p className="font-serif-luxury text-xs sm:text-sm text-[#4A3E37] max-w-lg mx-auto leading-relaxed font-medium">
                as they are united in the sacred covenant of Holy Matrimony in the presence of God, their families, and beloved congregation.
              </p>
            </div>

            {/* Event Dates & Venues Cards */}
            <div className="mt-8 pt-6 border-t border-[#D4A33B]/30 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              {/* 1. Engagement Ceremony */}
              <div className="space-y-1.5 p-4 rounded-xl bg-white/70 backdrop-blur-xs border border-[#D4A33B]/35 text-left shadow-xs">
                <div className="flex items-center gap-1.5 text-[#78223B] mb-1">
                  <Church className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean font-bold">
                    <span className="font-poppins font-bold">1.</span> Sacred Betrothal
                  </span>
                </div>
                <h4 className="font-serif-luxury text-base font-bold text-[#1F1A17]">
                  {engagement.venue}
                </h4>
                <p className="text-xs text-[#5C4F46] font-sans-clean">
                  Reception: {engagement.receptionVenue}
                </p>
                <p className="text-xs font-poppins text-[#8E681C] font-bold pt-1">
                  {engagement.date} • {engagement.time}
                </p>
              </div>

              {/* 2. Wedding Ceremony */}
              <div className="space-y-1.5 p-4 rounded-xl bg-white/70 backdrop-blur-xs border border-[#D4A33B]/35 text-left shadow-xs">
                <div className="flex items-center gap-1.5 text-[#78223B] mb-1">
                  <Church className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean font-bold">
                    <span className="font-poppins font-bold">2.</span> Holy Matrimony &amp; Lunch
                  </span>
                </div>
                <h4 className="font-serif-luxury text-base font-bold text-[#1F1A17]">
                  {ceremony.venue}
                </h4>
                <p className="text-xs text-[#5C4F46] font-sans-clean">
                  Lunch &amp; Reception: {reception.venue}
                </p>
                <p className="text-xs font-poppins text-[#8E681C] font-bold pt-1">
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
