"use client";

import React, { useRef, useEffect } from "react";
import { weddingData } from "@/config/wedding";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CovenantStrands() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathLeftRef = useRef<SVGPathElement>(null);
  const pathCenterRef = useRef<SVGPathElement>(null);
  const pathRightRef = useRef<SVGPathElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      tl.fromTo(
        [pathLeftRef.current, pathRightRef.current],
        { strokeDashoffset: 1200 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" },
        0
      )
        .fromTo(
          pathCenterRef.current,
          { strokeDashoffset: 1200, opacity: 0.4 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.5, ease: "power1.inOut" },
          0.1
        )
        .fromTo(
          quoteRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          0.6
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-covenant"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 bg-[#FCFAF6] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#FFF5D9]/60 filter blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Section Prelude */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold mb-2">
            <span>✝</span>
            <span>Chapter III • The Sacred Covenant</span>
            <span>✝</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#211B17] font-normal tracking-wide">
            Two Become One, With God at the Center
          </h2>
        </div>

        {/* Artistic Three Strands Braiding Canvas / SVG */}
        <div className="relative w-full max-w-lg h-64 sm:h-80 my-4 flex items-center justify-center">
          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible filter drop-shadow-[0_8px_16px_rgba(212,163,59,0.25)]"
          >
            <defs>
              <linearGradient id="silkIvory" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C59A45" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8E681C" stopOpacity="1" />
                <stop offset="100%" stopColor="#78223B" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="holyGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5E2A8" stopOpacity="1" />
                <stop offset="50%" stopColor="#D4A33B" stopOpacity="1" />
                <stop offset="100%" stopColor="#9E731F" stopOpacity="1" />
              </linearGradient>

              <linearGradient id="silkChampagne" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#78223B" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#C59A45" stopOpacity="1" />
                <stop offset="100%" stopColor="#8E681C" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Strand 1 (Left - Bride) */}
            <path
              ref={pathLeftRef}
              d="M 60 20 C 130 90, 160 140, 200 180 C 240 220, 200 260, 200 290"
              stroke="url(#silkIvory)"
              strokeWidth="4"
              strokeDasharray="1200"
              strokeLinecap="round"
            />

            {/* Strand 2 (Center - God / Holy Spirit, Shimmering Gold Centerpiece) */}
            <path
              ref={pathCenterRef}
              d="M 200 10 C 200 80, 210 130, 200 180 C 190 230, 200 270, 200 295"
              stroke="url(#holyGold)"
              strokeWidth="5"
              strokeDasharray="1200"
              strokeLinecap="round"
            />

            {/* Strand 3 (Right - Groom) */}
            <path
              ref={pathRightRef}
              d="M 340 20 C 270 90, 240 140, 200 180 C 160 220, 200 260, 200 290"
              stroke="url(#silkChampagne)"
              strokeWidth="4"
              strokeDasharray="1200"
              strokeLinecap="round"
            />
          </svg>

          {/* Labels for strands */}
          <div className="absolute top-0 left-4 text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#78223B] font-sans-clean font-bold block">
              Bride
            </span>
            <span className="text-sm font-serif-luxury text-[#211B17] font-semibold">
              {weddingData.couple.bride.firstName}
            </span>
          </div>

          <div className="absolute top-[-8px] text-center">
            <span className="text-[10px] uppercase tracking-widest text-[#8E681C] font-sans-clean font-extrabold block">
              Christ
            </span>
            <span className="text-sm text-[#D4A33B] block font-bold">✝</span>
          </div>

          <div className="absolute top-0 right-4 text-right">
            <span className="text-[10px] uppercase tracking-widest text-[#78223B] font-sans-clean font-bold block">
              Groom
            </span>
            <span className="text-sm font-serif-luxury text-[#211B17] font-semibold">
              {weddingData.couple.groom.firstName}
            </span>
          </div>
        </div>

        {/* Poetic Scripture & Explanation */}
        <div ref={quoteRef} className="max-w-2xl mx-auto space-y-4 px-4 mt-2">
          <blockquote className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#211B17] font-semibold leading-snug">
            &ldquo;A cord of three strands is not quickly broken.&rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-[1px] bg-[#D4A33B]/50" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#8E681C] font-sans-clean font-bold">
              Ecclesiastes 4:12
            </span>
            <div className="w-8 h-[1px] bg-[#D4A33B]/50" />
          </div>

          <p className="text-xs sm:text-sm text-[#5C4F46] font-sans-clean leading-relaxed max-w-lg mx-auto pt-2 font-medium">
            Joined in holy matrimony, our marriage is anchored by faith. With God
            as our foundation, our devotion is bound forever in His enduring grace.
          </p>
        </div>
      </div>
    </section>
  );
}
