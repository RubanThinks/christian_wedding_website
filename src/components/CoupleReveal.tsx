"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";

export default function CoupleReveal() {
  const { bride, groom } = weddingData.couple;

  return (
    <section
      id="scene-couple"
      className="relative min-h-screen py-24 md:py-36 px-6 bg-[#FAF7F2] overflow-hidden flex items-center justify-center"
    >
      {/* Background Architectural Light & Stained Glass Reflections */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Image
          src={weddingData.media.heroBg}
          alt="Church Architecture"
          fill
          className="object-cover filter blur-[2px]"
        />
      </div>

      {/* Radiant golden sunbeams */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#FFF3D6]/70 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#FCE8D4]/50 filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Prelude */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold mb-3">
            <span>✝</span>
            <span>Chapter I • The Covenant of Two Souls</span>
            <span>✝</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#211B17] font-normal tracking-wide max-w-2xl mx-auto leading-tight">
            Called Together in Faith, United in Sacred Love
          </h2>
        </div>

        {/* Cinematic Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Left Column: The Bride */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right order-2 lg:order-1">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-t-full overflow-hidden border-2 border-[#D4A33B]/40 shadow-xl p-2 bg-white">
              <div className="relative w-full h-full rounded-t-full overflow-hidden">
                <Image
                  src={bride.portrait || "/images/couple/bride.webp"}
                  alt={bride.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#78223B] font-sans-clean font-bold">
                The Bride
              </span>
              <h3 className="font-serif-luxury text-3xl md:text-4xl text-[#211B17] font-medium">
                {bride.name}
              </h3>
              <p className="text-xs text-[#5C4F46] font-sans-clean tracking-wider font-medium">
                Daughter of {bride.parents.father} & {bride.parents.mother}
              </p>
              {bride.quote && (
                <p className="font-serif-luxury italic text-sm text-[#78223B] mt-3 max-w-xs leading-relaxed">
                  &ldquo;{bride.quote}&rdquo;
                </p>
              )}
            </div>
          </div>

          {/* Center Column: The Couple Union */}
          <div className="lg:col-span-4 flex flex-col items-center text-center order-1 lg:order-2">
            <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] rounded-xl overflow-hidden border-2 border-[#D4A33B]/50 shadow-2xl p-2.5 bg-white">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={
                    weddingData.media.coupleEditorial ||
                    "/images/couple/couple-editorial.webp"
                  }
                  alt={`${bride.name} and ${groom.name}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                  <span className="font-script text-3xl md:text-4xl text-[#F2DC9B] block drop-shadow-md">
                    Forever in His Grace
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/90 font-sans-clean block mt-1 font-semibold">
                    Springfield • 2027
                  </span>
                </div>
              </div>
            </div>

            <div className="my-6 flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-[#D4A33B]/50" />
              <span className="text-[#D4A33B] text-xs">✝</span>
              <div className="w-8 h-[1px] bg-[#D4A33B]/50" />
            </div>

            <p className="font-serif-luxury text-base md:text-lg text-[#211B17] max-w-sm leading-relaxed italic">
              &ldquo;Therefore what God has joined together, let no one separate.&rdquo;
            </p>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8E681C] font-sans-clean font-bold mt-1.5">
              Mark 10:9
            </span>
          </div>

          {/* Right Column: The Groom */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left order-3">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-t-full overflow-hidden border-2 border-[#D4A33B]/40 shadow-xl p-2 bg-white">
              <div className="relative w-full h-full rounded-t-full overflow-hidden">
                <Image
                  src={groom.portrait || "/images/couple/groom.webp"}
                  alt={groom.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#78223B] font-sans-clean font-bold">
                The Groom
              </span>
              <h3 className="font-serif-luxury text-3xl md:text-4xl text-[#211B17] font-medium">
                {groom.name}
              </h3>
              <p className="text-xs text-[#5C4F46] font-sans-clean tracking-wider font-medium">
                Son of {groom.parents.father} & {groom.parents.mother}
              </p>
              {groom.quote && (
                <p className="font-serif-luxury italic text-sm text-[#78223B] mt-3 max-w-xs leading-relaxed">
                  &ldquo;{groom.quote}&rdquo;
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
