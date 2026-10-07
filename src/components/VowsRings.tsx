"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding";
import { BookOpen, CircleDot, HeartHandshake } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VowsRings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardGroupRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      icon: BookOpen,
      title: "The Holy Word",
      subtitle: "Founded upon eternal Scripture and prayer",
      image: weddingData.media.finalBg,
    },
    {
      icon: CircleDot,
      title: "The Golden Rings",
      subtitle: "Unbroken circle of endless fidelity",
      image: weddingData.media.ringsBg,
    },
    {
      icon: HeartHandshake,
      title: "The Sacred Vows",
      subtitle: "Solemn pledge of unconditional grace",
      image: weddingData.media.heroBg,
    },
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
        ".vow-focus-card",
        { opacity: 0.35, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardGroupRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-vows"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 bg-[#FCFAF6] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Prelude header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold mb-2">
            <span>✝</span>
            <span>Chapter VIII • The Sacred Vows</span>
            <span>✝</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#211B17] font-normal tracking-wide">
            Promise • Commitment • Covenant
          </h2>
        </div>

        {/* Three Focus Transition Moments */}
        <div
          ref={cardGroupRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8"
        >
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="vow-focus-card relative rounded-xl overflow-hidden border-2 border-[#D4A33B]/30 bg-white shadow-xl group transition-all duration-700 hover:border-[#D4A33B] hover:shadow-2xl"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 border border-[#D4A33B]/50 flex items-center justify-center text-[#78223B] shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 text-center space-y-2">
                  <h3 className="font-serif-luxury text-2xl text-[#211B17] font-bold">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5C4F46] font-sans-clean leading-relaxed font-medium">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Vow Quote */}
        <div className="mt-12 max-w-2xl mx-auto p-8 rounded-xl border border-[#D4A33B]/40 bg-white shadow-lg">
          <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-[#211B17] italic leading-relaxed font-medium">
            &ldquo;{weddingData.editorial.vowsQuote}&rdquo;
          </p>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#78223B] font-sans-clean block mt-4 font-bold">
            Holy Matrimonial Exchange
          </span>
        </div>
      </div>
    </section>
  );
}
