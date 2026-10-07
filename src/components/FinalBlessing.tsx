"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";
import { ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FinalBlessing() {
  const { couple, wedding } = weddingData;
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="scene-final"
      ref={containerRef}
      className="relative min-h-[100vh] py-28 md:py-40 px-6 bg-[#FAF7F2] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Couple Watercolor Portrait with High Clarity */}
      <div className="absolute inset-0 z-0 opacity-55 sm:opacity-65 pointer-events-none">
        <Image
          src="/images/couple/bg-couple.jpg"
          alt="Sara & Mishel Watercolor Portrait"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top filter brightness-[1.02] contrast-[1.08]"
        />
        {/* Soft atmospheric gradient blend into parchment */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/25 to-[#FAF7F2]/80" />
      </div>

      {/* Tender Central Warm Golden Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#FFF3D6]/60 filter blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center space-y-8 p-6 sm:p-10 rounded-2xl bg-white/70 backdrop-blur-md border border-[#D4A33B]/40 shadow-xl">
        {/* Subtle Cross */}
        <div className="flex flex-col items-center">
          <span className="text-[#D4A33B] text-xl font-bold">✝</span>
          <div className="w-[1px] h-6 bg-[#D4A33B]/50 mt-2" />
        </div>

        {/* Closing Scripture Blessing */}
        <div className="space-y-3">
          <blockquote className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#211B17] font-semibold leading-relaxed">
            &ldquo;Let all that you do
            <br />
            be done in love.&rdquo;
          </blockquote>
          <span className="text-xs uppercase tracking-[0.3em] text-[#78223B] font-sans-clean font-bold block">
            1 Corinthians 16:14
          </span>
        </div>

        <div className="w-16 h-[1px] bg-[#D4A33B]/40 my-3" />

        {/* Couple & Date */}
        <div className="space-y-2">
          <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#211B17] font-bold tracking-wide">
            {couple.bride.name}
            <span className="font-script text-3xl text-[#78223B] mx-2 font-normal">&</span>
            {couple.groom.name}
          </h3>
          <p className="text-xs uppercase tracking-[0.25em] text-[#8E681C] font-sans-clean font-bold">
            {wedding.date}
          </p>
        </div>

        {/* Final Peaceful Signoff */}
        <p className="font-serif-luxury italic text-sm sm:text-base text-[#5C4F46] max-w-sm pt-2 font-medium">
          With love and grateful hearts,
          <br />
          we invite you to celebrate with us.
        </p>

        {/* Back to Top & Discreet Admin Link */}
        <div className="pt-8 flex flex-col items-center gap-4">
          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 text-[#8E7F74] hover:text-[#78223B] transition-colors cursor-pointer"
            aria-label="Return to beginning of invitation"
          >
            <div className="w-9 h-9 rounded-full border border-[#D4A33B]/40 group-hover:border-[#78223B] flex items-center justify-center transition-all bg-white shadow-sm">
              <ArrowUp className="w-4 h-4 text-[#78223B]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans-clean font-bold">
              Return to Beginning
            </span>
          </button>

          <a
            href="/admin/login"
            className="text-[11px] font-sans-clean text-[#8E7F74]/60 hover:text-[#78223B] tracking-wider transition-colors pt-4 flex items-center gap-1"
            title="Organizer Portal"
          >
            <span>✝</span>
            <span>Host Portal</span>
          </a>
        </div>
      </div>
    </section>
  );
}
