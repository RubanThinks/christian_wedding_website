"use client";

import React, { useState, useEffect } from "react";
import { weddingData } from "@/config/wedding";

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "The Couple", id: "scene-couple" },
    { label: "Invitation", id: "scene-invitation" },
    { label: "Save The Date", id: "scene-date" },
    { label: "Covenant", id: "scene-covenant" },
    { label: "Ceremony", id: "scene-ceremony" },
    { label: "Reception", id: "scene-reception" },
    { label: "RSVP", id: "scene-rsvp" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#FCFAF6]/95 border-b border-[#D4A33B]/30 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Monogram / Couple Title */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span
              className={`font-serif-luxury text-xl md:text-2xl tracking-wider transition-colors font-medium ${
                scrolled
                  ? "text-[#211B17] group-hover:text-[#8E681C]"
                  : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] group-hover:text-[#F2DC9B]"
              }`}
            >
              {weddingData.couple.bride.name.split(" ")[0]} & {weddingData.couple.groom.name.split(" ")[0]}
            </span>
            <span className="text-[#D4A33B] text-xs">✝</span>
          </div>
          <p
            className={`text-[10px] tracking-[0.25em] uppercase font-sans-clean hidden sm:block ${
              scrolled
                ? "text-[#65584F]"
                : "text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
            }`}
          >
            {weddingData.wedding.date}
          </p>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-[12px] uppercase tracking-[0.2em] font-sans-clean font-medium transition-colors cursor-pointer ${
                scrolled
                  ? "text-[#5C4F46] hover:text-[#8E681C]"
                  : "text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] hover:text-[#F2DC9B]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Quick RSVP CTA button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection("scene-rsvp")}
            className="px-5 py-2 rounded-full border border-[#D4A33B] text-white bg-[#78223B] hover:bg-[#58182B] text-[11px] uppercase tracking-[0.2em] font-sans-clean font-semibold transition-all duration-300 shadow-sm cursor-pointer hover:scale-105"
          >
            RSVP
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#211B17] p-1.5 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 bg-[#C59A45] transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-[#C59A45] transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-[#C59A45] transition-transform duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCFAF6] border-b border-[#D4A33B]/30 px-6 py-6 transition-all duration-300 shadow-md">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-sm uppercase tracking-[0.2em] text-[#5C4F46] hover:text-[#8E681C] py-1 cursor-pointer font-sans-clean font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
