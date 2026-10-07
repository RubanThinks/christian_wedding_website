"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";
import { Sparkles, Clock, MapPin, Wine, Music2, Utensils, Heart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ReceptionCelebration() {
  const { reception, wedding } = weddingData;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const itinerary = [
    { time: "6:30 PM", label: "Welcome Cocktails & Gathering", icon: Wine },
    { time: "7:15 PM", label: "Grand Entrance & Fellowship", icon: Heart },
    { time: "8:00 PM", label: "Gourmet Dinner Banquet & Toasts", icon: Utensils },
    { time: "9:30 PM", label: "First Dance & Joyful Music", icon: Music2 },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-reception"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 bg-[#FAF7F2] flex items-center justify-center overflow-hidden"
    >
      {/* Background Fairy-Lit Reception Banquet Hall */}
      <div className="absolute inset-0 z-0">
        <Image
          src={reception.photoUrl || weddingData.media.receptionBg}
          alt="Wedding Reception Banquet Hall"
          fill
          priority
          sizes="100vw"
          className="object-cover filter brightness-[0.88] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/45 to-black/35" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Prelude header */}
        <div className="mb-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A33B]" />
            <span>Chapter V • The Joyful Celebration</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#211B17] font-semibold tracking-wide">
            The Wedding Reception
          </h2>
        </div>

        {/* Celebration Editorial Card */}
        <div
          ref={cardRef}
          className="w-full max-w-2xl bg-white/95 border-2 border-[#D4A33B]/40 rounded-xl p-8 sm:p-12 md:p-14 text-center shadow-2xl backdrop-blur-md"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#78223B] font-sans-clean font-bold block mb-2">
            Dinner, Fellowship & Dancing
          </span>

          <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#211B17] font-bold tracking-tight mb-3">
            {reception.venue}
          </h3>

          <p className="text-sm sm:text-base text-[#5C4F46] font-sans-clean max-w-md mx-auto mb-6 font-medium">
            {reception.address}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF4E6] border border-[#D4A33B]/40 text-xs text-[#8E681C] font-sans-clean font-bold mb-8">
            <Clock className="w-3.5 h-3.5 text-[#D4A33B]" />
            <span>{reception.time}</span>
          </div>

          {/* Celebration Itinerary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-[#D4A33B]/30 my-6 text-left">
            {itinerary.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded bg-[#FAF7F2]">
                  <div className="p-2 rounded bg-white border border-[#D4A33B]/40 text-[#78223B] flex-shrink-0 mt-0.5 shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8E7F74] font-sans-clean block font-bold">
                      {step.time}
                    </span>
                    <span className="text-xs sm:text-sm font-serif-luxury text-[#211B17] font-bold leading-tight">
                      {step.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {reception.notes && (
            <p className="font-serif-luxury italic text-xs sm:text-sm text-[#78223B] my-6 font-medium">
              &ldquo;{reception.notes}&rdquo;
            </p>
          )}

          {reception.mapUrl && (
            <div className="pt-2">
              <a
                href={reception.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#D4A33B] bg-[#78223B] hover:bg-[#58182B] text-white text-[11px] uppercase tracking-[0.2em] font-sans-clean font-semibold transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F2DC9B]" />
                <span>View Reception on Google Maps</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
