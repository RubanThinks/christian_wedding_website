"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";
import { ChevronDown, Sparkles, RotateCcw } from "lucide-react";

export default function HeroVideoIntro() {
  const curtainVideoRef = useRef<HTMLVideoElement>(null);
  const [curtainRevealed, setCurtainRevealed] = useState(false);
  const [revealWidth, setRevealWidth] = useState(0); // 0% (closed) to 100% (fully parted)
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Progressive curtain opening tracking
  // christian-intro.mp4 is 6.02s long:
  // - 0.0s to 0.7s: Curtains are fully closed
  // - 0.7s to 4.2s: Curtains pull open smoothly from center to edges
  // - 4.2s+: Curtains are fully open at the edges
  useEffect(() => {
    let animId: number;

    const trackCurtainOpening = () => {
      const vid = curtainVideoRef.current;
      if (vid && !curtainRevealed) {
        const t = vid.currentTime;
        if (t < 0.7) {
          setRevealWidth(0);
        } else if (t >= 0.7 && t <= 4.2) {
          // Progress from 0 to 1
          const raw = (t - 0.7) / 3.5;
          // Smooth sine easing so opening feels physical and lively
          const eased = Math.sin((raw * Math.PI) / 2);
          setRevealWidth(eased * 100);
        } else if (t > 4.2) {
          setRevealWidth(100);
          setCurtainRevealed(true);
        }
      }
      animId = requestAnimationFrame(trackCurtainOpening);
    };

    animId = requestAnimationFrame(trackCurtainOpening);
    return () => cancelAnimationFrame(animId);
  }, [curtainRevealed]);

  // Auto-play the curtain reveal video on mount
  useEffect(() => {
    if (curtainVideoRef.current) {
      curtainVideoRef.current.play().catch(() => {
        // Autoplay policy fallback: let user open manually
      });
    }
  }, []);

  const openCurtain = useCallback(() => {
    setRevealWidth(100);
    setCurtainRevealed(true);
  }, []);

  const replayCurtain = useCallback(() => {
    setCurtainRevealed(false);
    setRevealWidth(0);
    if (curtainVideoRef.current) {
      curtainVideoRef.current.currentTime = 0;
      curtainVideoRef.current.play().catch(() => {});
    }
  }, []);

  const scrollToCouple = () => {
    const nextSection = document.getElementById("scene-invitation") || document.getElementById("scene-couple");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Mask string creating a progressive feathered opening in the center
  const maskStyle = revealWidth > 0
    ? {
        WebkitMaskImage: `linear-gradient(to right, black 0%, black calc(50% - ${revealWidth / 2}% - 40px), transparent calc(50% - ${revealWidth / 2}%), transparent calc(50% + ${revealWidth / 2}%), black calc(50% + ${revealWidth / 2}% + 40px), black 100%)`,
        maskImage: `linear-gradient(to right, black 0%, black calc(50% - ${revealWidth / 2}% - 40px), transparent calc(50% - ${revealWidth / 2}%), transparent calc(50% + ${revealWidth / 2}%), black calc(50% + ${revealWidth / 2}% + 40px), black 100%)`,
      }
    : undefined;

  return (
    <section
      id="scene-hero"
      className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* =========================================================================
          LAYER 1: PERMANENT CINEMATIC CHURCH SANCTUARY BACKGROUND IMAGE (z-0)
          Always visible, mandatory, and continuously revealed through the curtains!
         ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={weddingData.media.heroBg}
          alt="Cinematic Church Sanctuary"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105 transition-transform duration-[10000ms] ease-out"
        />

        {/* Clean Natural Cinematic Lighting - Warm Ambient Vignette */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Ambient floating gold dust motes */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#F5E4B5_1.5px,transparent_1.5px)] [background-size:36px_36px]" />
      </div>

      {/* =========================================================================
          LAYER 2: HERO FOREGROUND CONTENT (z-10)
          Revealed progressively through the center opening as the curtains part!
         ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        {/* Subtle Christian Cross Motif */}
        <div className="mb-6 flex flex-col items-center animate-fade-in">
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#C5A059] to-[#C5A059]" />
          <div className="my-1 text-[#E7C982] text-sm tracking-widest">✝</div>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#D8CFCA] font-sans-clean mt-2">
            The Holy Matrimony
          </p>
        </div>

        {/* Couple Names - Luxury Serif */}
        <div className="space-y-2 md:space-y-4 my-2">
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#FAF7F2] font-normal leading-[1.08]">
            <span className="block">{weddingData.couple.bride.name}</span>
            <span className="block font-script text-3xl sm:text-5xl md:text-6xl text-[#E7C982] my-1 md:my-2 font-normal lowercase">
              and
            </span>
            <span className="block">{weddingData.couple.groom.name}</span>
          </h1>
        </div>

        {/* Scripture Quote Subtitle */}
        <p className="mt-6 max-w-lg mx-auto text-xs sm:text-sm text-[#D8CFCA]/90 font-serif-luxury italic tracking-wide">
          &ldquo;{weddingData.editorial.covenantMetaphor}&rdquo;
          <span className="block text-[11px] text-[#C5A059] font-sans-clean not-italic uppercase tracking-[0.2em] mt-1.5">
            {weddingData.scriptures.secondary.reference}
          </span>
        </p>

        {/* Wedding Date Display */}
        <div className="mt-8 pt-6 border-t border-[#C5A059]/25 flex items-center justify-center gap-6">
          <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#FAF7F2] font-sans-clean">
            {weddingData.wedding.dayOfWeek}
          </span>
          <span className="text-[#C5A059]">•</span>
          <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#E7C982] font-sans-clean font-medium">
            {weddingData.wedding.dayNumber} {weddingData.wedding.month} {weddingData.wedding.year}
          </span>
          <span className="text-[#C5A059]">•</span>
          <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#FAF7F2] font-sans-clean">
            {weddingData.wedding.time}
          </span>
        </div>

        {/* Scroll Invitation CTA */}
        <div className="mt-12 md:mt-16 flex flex-col items-center">
          <button
            onClick={scrollToCouple}
            className="group flex flex-col items-center gap-2.5 text-[#D8CFCA] hover:text-[#E7C982] transition-colors cursor-pointer"
            aria-label="Scroll down to begin wedding experience"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-sans-clean font-medium group-hover:translate-y-0.5 transition-transform">
              Begin The Journey
            </span>
            <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 flex items-center justify-center group-hover:border-[#C5A059] group-hover:scale-110 transition-all">
              <ChevronDown className="w-4 h-4 text-[#C5A059] animate-bounce" />
            </div>
          </button>
        </div>
      </div>

      {/* =========================================================================
          LAYER 3: FOREMOST GROUND — REAL-TIME DYNAMIC CURTAIN REVEAL OVERLAY (z-40)
          One layer TOP to the hero section!
          As the curtains in the video open, the center opening expands in real time,
          revealing the church sanctuary and couple names underneath progressively!
         ========================================================================= */}
      <div
        style={maskStyle}
        className={`absolute inset-0 z-40 transition-opacity duration-1000 ease-out overflow-hidden ${
          curtainRevealed
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        {/* Intro Video of Curtains Opening */}
        <video
          ref={curtainVideoRef}
          src="/videos/christian-intro.mp4"
          muted
          playsInline
          autoPlay
          style={{ mixBlendMode: "screen" }}
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover filter contrast-[1.12]"
        />

        {/* Floating Quick Action: Open Curtains */}
        {!curtainRevealed && (
          <div className="absolute top-6 right-6 z-50 flex items-center gap-2">
            <button
              onClick={openCurtain}
              className="px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-[#C5A059]/50 text-[#E7C982] text-xs font-sans-clean font-medium transition-all cursor-pointer shadow-lg flex items-center gap-1.5 hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Open Curtains</span>
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          INTERACTIVE CONTROLS: REPLAY CURTAIN REVEAL (z-20)
          Allows the client/guests to smoothly re-close and re-open the curtains anytime!
         ========================================================================= */}
      {curtainRevealed && (
        <div className="absolute bottom-6 left-6 z-20">
          <button
            onClick={replayCurtain}
            className="group px-3.5 py-1.5 rounded-full bg-[#140E0C]/70 hover:bg-[#140E0C]/95 backdrop-blur-md border border-[#C5A059]/35 text-[#FAF7F2] hover:text-[#E7C982] text-xs font-sans-clean transition-all cursor-pointer flex items-center gap-2 shadow-md hover:border-[#C5A059]"
            title="Replay Curtain Reveal"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C5A059] group-hover:-rotate-90 transition-transform" />
            <span className="text-[11px] uppercase tracking-wider font-medium">Replay Curtains</span>
          </button>
        </div>
      )}
    </section>
  );
}
