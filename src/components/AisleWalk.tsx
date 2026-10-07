"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AisleWalk() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 1.25,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "center center",
            scrub: 0.8,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-aisle"
      ref={containerRef}
      className="relative h-[115vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-[#FAF7F2]"
    >
      {/* Background Aisle Perspective Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 overflow-hidden transform will-change-transform"
      >
        <Image
          src={weddingData.media.aisleBg}
          alt="Walking down the church wedding aisle"
          fill
          priority
          sizes="100vw"
          className="object-cover filter brightness-[0.85] contrast-[1.02]"
        />
        {/* Soft Vignette and Altar Spotlight */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-black/20 to-[#FAF7F2]/60" />
      </div>

      {/* Floating Typography */}
      <div
        ref={textRef}
        className="relative z-10 max-w-2xl mx-auto px-6 text-center text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/40 text-[#F2DC9B] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-bold mb-3">
            <span>✝</span>
            <span>Chapter VII • The Journey to the Altar</span>
            <span>✝</span>
          </div>
        </div>

        <blockquote className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-semibold tracking-wide leading-tight">
          &ldquo;{weddingData.editorial.aisleQuote}&rdquo;
        </blockquote>

        <p className="mt-6 text-xs sm:text-sm uppercase tracking-[0.3em] text-[#F2DC9B] font-sans-clean font-bold">
          Surrounded by prayers • Anchored in Christ
        </p>
      </div>
    </section>
  );
}
