"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";
import { MapPin, Navigation, Car, ExternalLink, Calendar, Clock, Church, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LocationExperience() {
  const [activeTab, setActiveTab] = useState<"engagement" | "ceremony" | "reception">("ceremony");
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
        { scale: 1.2 },
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

  const eventDetails = {
    engagement: {
      tag: "Sacred Betrothal & Engagement",
      title: "St. Michael's Knanaya Catholic Church",
      subVenue: "Reception & Felicitations @ St. Michael's Church Parish Hall",
      date: weddingData.engagement.date,
      time: weddingData.engagement.time,
      address: weddingData.engagement.address,
      mapUrl: weddingData.engagement.mapUrl,
      notes: "Ceremony begins at 6:00 PM, followed by evening dinner reception and fellowship.",
      badgeColor: "bg-[#FAF0DC] text-[#8E681C] border-[#D4A33B]/40",
      highlightDate: "Saturday, 9 Jan 2027",
    },
    ceremony: {
      tag: "Sacred Matrimony Service",
      title: weddingData.ceremony.venue,
      subVenue: "Solemn Knanaya Catholic Nuptial Blessing",
      date: weddingData.ceremony.date,
      time: weddingData.ceremony.time,
      address: weddingData.ceremony.address,
      mapUrl: weddingData.ceremony.mapUrl,
      notes: "Holy Matrimony service begins promptly at 10:30 AM in the sanctuary.",
      badgeColor: "bg-[#FBEAEF] text-[#78223B] border-[#78223B]/30",
      highlightDate: "Saturday, 16 Jan 2027",
    },
    reception: {
      tag: "Wedding Reception & Lunch Banquet",
      title: weddingData.reception.venue,
      subVenue: "Traditional Knanaya Lunch & Family Felicitations",
      date: weddingData.reception.date,
      time: weddingData.reception.time,
      address: weddingData.reception.address,
      mapUrl: weddingData.reception.mapUrl,
      notes: "Followed immediately after Holy Matrimony for traditional lunch banquet, music, and joyful fellowship.",
      badgeColor: "bg-[#FAF4E6] text-[#8E681C] border-[#D4A33B]/40",
      highlightDate: "Saturday, 16 Jan 2027",
    },
  };

  const current = eventDetails[activeTab];

  return (
    <section
      id="scene-location"
      ref={containerRef}
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 bg-[#FCFAF6] flex items-center justify-center overflow-hidden"
    >
      {/* Background Venue Landscape */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
      >
        <Image
          src={weddingData.media.locationBg}
          alt="Church Sanctuary & Grounds"
          fill
          priority
          sizes="100vw"
          className="object-cover filter brightness-[0.9] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF6] via-[#FCFAF6]/65 to-[#FCFAF6]/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Prelude header */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold mb-2">
            <span>✝</span>
            <span>Chapter II • Sacred Celebrations &amp; Destinations</span>
            <span>✝</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#211B17] font-semibold tracking-wide">
            Dates, Times &amp; Gathering Places
          </h2>
          <p className="font-serif-luxury italic text-sm sm:text-base text-[#5C4F46] mt-2 max-w-lg mx-auto font-medium">
            Complete details and coordinates for our Betrothal and Holy Matrimony celebrations.
          </p>
        </div>

        {/* 3 Interactive Event Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl sm:rounded-full bg-white/95 border-2 border-[#D4A33B]/40 mb-8 backdrop-blur-md shadow-lg max-w-xl w-full">
          <button
            onClick={() => setActiveTab("engagement")}
            className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs uppercase tracking-[0.15em] font-sans-clean font-bold transition-all cursor-pointer ${
              activeTab === "engagement"
                ? "bg-[#78223B] text-white shadow-md scale-102"
                : "text-[#5C4F46] hover:text-[#78223B]"
            }`}
          >
            1. Engagement (9 Jan)
          </button>
          <button
            onClick={() => setActiveTab("ceremony")}
            className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs uppercase tracking-[0.15em] font-sans-clean font-bold transition-all cursor-pointer ${
              activeTab === "ceremony"
                ? "bg-[#78223B] text-white shadow-md scale-102"
                : "text-[#5C4F46] hover:text-[#78223B]"
            }`}
          >
            2. Matrimony (16 Jan)
          </button>
          <button
            onClick={() => setActiveTab("reception")}
            className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs uppercase tracking-[0.15em] font-sans-clean font-bold transition-all cursor-pointer ${
              activeTab === "reception"
                ? "bg-[#78223B] text-white shadow-md scale-102"
                : "text-[#5C4F46] hover:text-[#78223B]"
            }`}
          >
            3. Reception (16 Jan)
          </button>
        </div>

        {/* Event Detail Spotlight Card */}
        <div className="w-full max-w-2xl bg-white/95 border-2 border-[#D4A33B]/40 rounded-2xl p-6 sm:p-10 text-center shadow-2xl backdrop-blur-md relative transition-all">
          {/* Top Tag & Pin */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-[11px] font-sans-clean font-bold uppercase tracking-wider border ${current.badgeColor}`}>
              {current.tag}
            </span>
          </div>

          {/* Date & Time Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 text-xs font-sans-clean font-bold text-[#78223B]">
              <Calendar className="w-4 h-4 text-[#78223B]" />
              <span className="font-poppins">{current.date}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF4E6] border border-[#D4A33B]/30 text-xs font-sans-clean font-bold text-[#8E681C]">
              <Clock className="w-4 h-4 text-[#D4A33B]" />
              <span className="font-poppins">{current.time}</span>
            </div>
          </div>

          {/* Primary Venue Name */}
          <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#211B17] font-bold tracking-tight mb-2">
            {current.title}
          </h3>

          {/* Sub Venue / Hall */}
          <p className="font-serif-luxury italic text-sm sm:text-base text-[#78223B] font-semibold mb-3">
            {current.subVenue}
          </p>

          {/* Address */}
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[#5C4F46] font-sans-clean max-w-md mx-auto mb-4 font-medium">
            <MapPin className="w-4 h-4 text-[#8E681C] flex-shrink-0" />
            <span>{current.address}</span>
          </div>

          {/* Notes */}
          <p className="text-xs text-[#7A6C60] font-sans-clean max-w-md mx-auto mb-6 bg-[#FAF7F2] p-3 rounded-lg border border-[#D4A33B]/25">
            {current.notes}
          </p>

          {/* Direct Navigation Button to Google Maps */}
          {current.mapUrl && (
            <div className="flex items-center justify-center pt-2">
              <a
                href={current.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#D4A33B] bg-[#78223B] hover:bg-[#58182B] text-white text-xs uppercase tracking-[0.2em] font-sans-clean font-bold transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
              >
                <Navigation className="w-4 h-4 text-[#F2DC9B]" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
