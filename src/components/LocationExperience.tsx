"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";
import { MapPin, Navigation, Car, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LocationExperience() {
  const [activeVenue, setActiveVenue] = useState<"ceremony" | "reception">(
    "ceremony"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const venueInfo =
    activeVenue === "ceremony" ? weddingData.ceremony : weddingData.reception;

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.25 },
        {
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-location"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 bg-[#FCFAF6] flex items-center justify-center overflow-hidden"
    >
      {/* Background Venue Landscape */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
      >
        <Image
          src={weddingData.media.locationBg}
          alt="Venue Grounds and Countryside"
          fill
          priority
          sizes="100vw"
          className="object-cover filter brightness-[0.88] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF6] via-[#FCFAF6]/40 to-black/35" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Prelude header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold mb-2">
            <span>✝</span>
            <span>Chapter IV • Journey &amp; Destinations</span>
            <span>✝</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#211B17] font-semibold tracking-wide">
            The Gathering Places
          </h2>
        </div>

        {/* Venue Selector Tabs */}
        <div className="flex items-center gap-3 p-1.5 rounded-full bg-white/95 border-2 border-[#D4A33B]/40 mb-8 backdrop-blur-md shadow-md">
          <button
            onClick={() => setActiveVenue("ceremony")}
            className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-sans-clean font-bold transition-all cursor-pointer ${
              activeVenue === "ceremony"
                ? "bg-[#78223B] text-white shadow-md"
                : "text-[#5C4F46] hover:text-[#78223B]"
            }`}
          >
            1. Ceremony
          </button>
          <button
            onClick={() => setActiveVenue("reception")}
            className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-sans-clean font-bold transition-all cursor-pointer ${
              activeVenue === "reception"
                ? "bg-[#78223B] text-white shadow-md"
                : "text-[#5C4F46] hover:text-[#78223B]"
            }`}
          >
            2. Reception
          </button>
        </div>

        {/* Location Spotlight Card */}
        <div className="w-full max-w-2xl bg-white/95 border-2 border-[#D4A33B]/40 rounded-xl p-8 sm:p-12 text-center shadow-2xl backdrop-blur-md relative transition-all">
          <div className="w-12 h-12 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/60 flex items-center justify-center mx-auto mb-5 text-[#78223B] shadow-sm">
            <MapPin className="w-5 h-5 animate-pulse" />
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-[#78223B] font-sans-clean font-bold block mb-2">
            {activeVenue === "ceremony"
              ? "Sacred Church Service"
              : "Celebration Venue"}
          </span>

          <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#211B17] font-bold tracking-tight mb-3">
            {venueInfo.venue}
          </h3>

          <p className="text-sm sm:text-base text-[#5C4F46] font-sans-clean max-w-md mx-auto mb-6 font-medium">
            {venueInfo.address}
          </p>

          {weddingData.optional?.parkingInfo && (
            <div className="flex items-center justify-center gap-2 text-xs text-[#5C4F46] font-sans-clean mb-8 bg-[#FAF7F2] p-3 rounded-lg border border-[#D4A33B]/30 font-medium">
              <Car className="w-4 h-4 text-[#8E681C]" />
              <span>{weddingData.optional.parkingInfo}</span>
            </div>
          )}

          {/* Direct Navigation Button */}
          {venueInfo.mapUrl && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={venueInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#D4A33B] bg-[#78223B] hover:bg-[#58182B] text-white text-xs uppercase tracking-[0.2em] font-sans-clean font-bold transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
              >
                <Navigation className="w-4 h-4 text-[#F2DC9B]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
