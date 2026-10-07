"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScriptureLove() {
  const scripture = weddingData.scriptures.primary;
  const containerRef = useRef<HTMLDivElement>(null);
  const textLinesRef = useRef<HTMLParagraphElement[]>([]);

  const verseLines = [
    "Love is patient, love is kind.",
    "It does not envy, it does not boast, it is not proud.",
    "It does not dishonor others, it is not self-seeking,",
    "It is not easily angered, it keeps no record of wrongs.",
    "Love does not delight in evil, but rejoices with the truth.",
    "It always protects, always trusts, always hopes, always perseveres.",
    "Love never fails.",
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      textLinesRef.current.forEach((line) => {
        if (!line) return;
        gsap.fromTo(
          line,
          {
            opacity: 0.25,
            y: 16,
            filter: "blur(3px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
              end: "top 45%",
              scrub: 0.8,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-scripture"
      ref={containerRef}
      className="relative min-h-[100vh] py-28 md:py-40 px-6 bg-[#FCFAF6] flex items-center justify-center overflow-hidden"
    >
      {/* Background Subtle Sunlight & Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <Image
          src={weddingData.media.churchBg}
          alt="Sacred Sanctuary Light"
          fill
          className="object-cover scale-110 filter blur-[3px]"
        />
      </div>

      {/* Monumental Watermark Typography: LOVE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif-luxury text-[28vw] font-bold text-[#D4A33B]/[0.07] tracking-[0.2em] leading-none whitespace-nowrap">
          LOVE
        </span>
      </div>

      {/* Radiant celestial sunbeam glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FFF5D9]/60 filter blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Artistic Prelude */}
        <div className="flex flex-col items-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold mb-2">
            <span>✝</span>
            <span>Chapter II • The Sacred Word</span>
            <span>✝</span>
          </div>
          <span className="font-script text-4xl sm:text-6xl text-[#78223B] block font-normal">
            Love Never Fails
          </span>
        </div>

        {/* Verses Illuminated Block */}
        <div className="space-y-4 md:space-y-6 my-8 px-4">
          {verseLines.map((line, idx) => (
            <p
              key={idx}
              ref={(el) => {
                if (el) textLinesRef.current[idx] = el;
              }}
              className={`font-serif-luxury text-xl sm:text-3xl md:text-4xl text-[#211B17] font-normal tracking-wide transition-all ${
                idx === verseLines.length - 1
                  ? "text-2xl sm:text-4xl md:text-5xl text-[#78223B] font-bold pt-4 tracking-wider"
                  : ""
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Scripture Reference & Translation Tag */}
        <div className="mt-12 inline-flex flex-col items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#D4A33B]/60" />
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#8E681C] font-sans-clean font-bold">
              {scripture.reference}
            </span>
            <div className="w-8 h-[1px] bg-[#D4A33B]/60" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E7F74] font-sans-clean mt-1 font-semibold">
            {scripture.translation}
          </span>
        </div>
      </div>
    </section>
  );
}
