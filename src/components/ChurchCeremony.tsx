"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";
import { MapPin, Clock, Calendar, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ChurchCeremony() {
  const { ceremony, wedding } = weddingData;
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageContainerRef.current,
        { scale: 1.15, y: -20 },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-ceremony"
      className="relative min-h-screen py-24 md:py-36 px-6 bg-[#FAF7F2] flex items-center justify-center overflow-hidden"
    >
      {/* Background Church Facade */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <Image
          src={ceremony.photoUrl || weddingData.media.churchBg}
          alt="Church Ceremony Facade"
          fill
          priority
          sizes="100vw"
          className="object-cover filter brightness-[0.88] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/40 to-black/30" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Prelude tag */}
        <div className="mb-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold mb-2">
            <span>✝</span>
            <span>Chapter II • The Sacred Gathering</span>
            <span>✝</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#211B17] font-semibold tracking-wide">
            The Holy Matrimony
          </h2>
        </div>

        {/* Tactile Ceremony Card */}
        <div
          ref={cardRef}
          className="w-full max-w-2xl bg-white/95 border-2 border-[#D4A33B]/40 rounded-xl p-8 sm:p-12 md:p-14 text-center shadow-2xl backdrop-blur-md relative"
        >
          {/* Subtle Christian Cross */}
          <div className="w-10 h-10 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/60 flex items-center justify-center mx-auto mb-5 text-[#8E681C] text-sm font-bold">
            ✝
          </div>

          <span className="text-[11px] uppercase tracking-[0.3em] text-[#78223B] font-sans-clean font-bold block mb-2">
            The Church Sanctuary
          </span>

          <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#211B17] font-bold tracking-tight mb-3">
            {ceremony.venue}
          </h3>

          <p className="text-sm sm:text-base text-[#5C4F46] font-sans-clean max-w-md mx-auto mb-8 font-medium">
            {ceremony.address}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-[#D4A33B]/30 my-6 text-left">
            <div className="flex items-center gap-3 p-3 rounded bg-[#FAF7F2]">
              <Calendar className="w-5 h-5 text-[#8E681C] flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8E7F74] font-sans-clean block font-bold">
                  Date
                </span>
                <span className="text-sm font-serif-luxury text-[#211B17] font-bold">
                  {wedding.date}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded bg-[#FAF7F2]">
              <Clock className="w-5 h-5 text-[#8E681C] flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8E7F74] font-sans-clean block font-bold">
                  Commencement
                </span>
                <span className="text-sm font-serif-luxury text-[#211B17] font-bold">
                  {ceremony.time}
                </span>
              </div>
            </div>
          </div>

          {ceremony.notes && (
            <p className="font-serif-luxury italic text-xs sm:text-sm text-[#78223B] my-6 font-medium">
              &ldquo;{ceremony.notes}&rdquo;
            </p>
          )}

          {/* Action Button: Get Directions */}
          {ceremony.mapUrl && (
            <div className="pt-2">
              <a
                href={ceremony.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#D4A33B] bg-[#78223B] hover:bg-[#58182B] text-white text-[11px] uppercase tracking-[0.2em] font-sans-clean font-semibold transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F2DC9B]" />
                <span>View Church on Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
