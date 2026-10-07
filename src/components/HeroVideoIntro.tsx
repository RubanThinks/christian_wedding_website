"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";
import { ChevronDown, Play, Pause } from "lucide-react";

export default function HeroVideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoExists, setVideoExists] = useState(false);

  useEffect(() => {
    // Check if user dropped intro.mp4 into /videos/intro.mp4
    fetch(weddingData.media.introVideo.src, { method: "HEAD" })
      .then((res) => {
        if (res.ok) setVideoExists(true);
      })
      .catch(() => setVideoExists(false));
  }, []);

  const handleVideoEnded = () => {
    setVideoEnded(true);
    // Smoothly scroll to the couple reveal scene
    const nextSection = document.getElementById("scene-couple");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const scrollToCouple = () => {
    const nextSection = document.getElementById("scene-invitation") || document.getElementById("scene-couple");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="scene-hero"
      className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Media: Video or Cinematic Poster */}
      <div className="absolute inset-0 z-0">
        {videoExists ? (
          <video
            ref={videoRef}
            src={weddingData.media.introVideo.src}
            poster={weddingData.media.introVideo.poster}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            onLoadedData={() => setVideoLoaded(true)}
            className="w-full h-full object-cover scale-105"
          />
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={weddingData.media.heroBg}
              alt="Cinematic Church Sanctuary"
              fill
              priority
              sizes="100vw"
              className="object-cover scale-105 transform transition-transform duration-[10000ms] ease-out hover:scale-100"
            />
          </div>
        )}

        {/* Clean Cinematic Natural Lighting - Absolutely No White Shadows */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Ambient floating gold dust motes */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#F5E4B5_1.5px,transparent_1.5px)] [background-size:36px_36px]" />
      </div>

      {/* Hero Typography & Editorial Composition */}
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

      {/* Video Play/Pause subtle control (if video is active) */}
      {videoExists && (
        <button
          onClick={togglePlay}
          className="absolute bottom-6 left-6 z-20 p-2.5 rounded-full bg-[#140E0C]/60 text-[#FAF7F2] hover:bg-[#140E0C]/90 border border-[#C5A059]/30 transition-all cursor-pointer"
          aria-label={isPlaying ? "Pause Intro Video" : "Play Intro Video"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      )}
    </section>
  );
}
