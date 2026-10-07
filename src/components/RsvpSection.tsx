"use client";

import React, { useState } from "react";
import Link from "next/link";
import { weddingData } from "@/config/wedding";
import { Mail, Phone, Calendar, HeartHandshake, X, ArrowUpRight } from "lucide-react";
import RSVPWizard from "./rsvp/RSVPWizard";

export default function RsvpSection() {
  const { rsvp } = weddingData;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="scene-rsvp"
      className="relative min-h-screen py-24 md:py-36 px-4 sm:px-6 bg-[#FCFAF6] flex items-center justify-center overflow-hidden"
    >
      {/* Background warm light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#FFF4D6]/60 filter blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full mx-auto text-center">
        {/* Section Prelude */}
        <div className="mb-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold mb-2">
            <span>✝</span>
            <span>RSVP &amp; Travel Coordination</span>
            <span>✝</span>
          </div>
        </div>

        {/* Physical Stationery RSVP Card */}
        <div className="paper-deckled rounded-xl p-8 sm:p-14 md:p-16 text-[#211B17] shadow-xl relative border-2 border-[#D4A33B]/40 bg-white">
          <div className="border border-[#D4A33B]/40 p-6 sm:p-10 relative rounded-lg">
            <span className="text-sm text-[#D4A33B] block mb-2 font-bold">✝</span>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#211B17] font-bold tracking-tight leading-tight">
              We Would Love to Celebrate with You
            </h2>

            <p className="font-serif-luxury text-base sm:text-lg text-[#5C4F46] italic mt-4 max-w-md mx-auto font-medium">
              Kindly confirm your acceptance of invite and train transportation
              requirements for the celebrations on 9th &amp; 16th January 2027.
            </p>

            {/* Event Highlights & Transport Notice */}
            <div className="my-8 py-5 px-4 border-y border-[#D4A33B]/30 bg-[#FAF7F2] rounded-lg text-left grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#78223B] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#78223B] font-sans-clean font-bold block">
                    1. Engagement • 9 Jan 2027
                  </span>
                  <p className="text-xs text-[#5C4F46] font-sans-clean">
                    St. Michael&apos;s Knanaya Church &amp; Parish Hall, Neendoor (6:00 PM)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#78223B] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#78223B] font-sans-clean font-bold block">
                    2. Wedding • 16 Jan 2027
                  </span>
                  <p className="text-xs text-[#5C4F46] font-sans-clean">
                    St. Mary&apos;s Chullikkara (10:30 AM) &amp; Lunch @ Rajapuram
                  </p>
                </div>
              </div>
            </div>

            {/* Main RSVP Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-[#78223B] hover:bg-[#58182B] text-white text-xs uppercase tracking-[0.25em] font-sans-clean font-bold transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-[#F2DC9B]" />
                <span>Confirm Acceptance &amp; Transport</span>
              </button>

              <Link
                href="/rsvp"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#D4A33B] text-[#78223B] hover:bg-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-sans-clean font-bold transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                <span>Open Full Page Form</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Direct Contact Coordinates */}
            <div className="mt-10 pt-6 border-t border-[#D4A33B]/25 flex flex-wrap items-center justify-center gap-6 text-xs text-[#5C4F46] font-sans-clean font-medium">
              {rsvp.contact && (
                <a
                  href={`tel:${rsvp.contact}`}
                  className="flex items-center gap-2 hover:text-[#78223B] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8E681C]" />
                  <span>{rsvp.contact}</span>
                </a>
              )}
              {rsvp.email && (
                <a
                  href={`mailto:${rsvp.email}`}
                  className="flex items-center gap-2 hover:text-[#78223B] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8E681C]" />
                  <span>{rsvp.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive RSVP & Transport Modal with Progressive Disclosure Wizard */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl p-5 sm:p-8 text-[#211B17] shadow-2xl border-2 border-[#D4A33B] my-8 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#8E7F74] hover:text-[#211B17] p-2 rounded-full hover:bg-[#FAF7F2] transition-colors cursor-pointer z-20"
              aria-label="Close RSVP form"
            >
              <X className="w-5 h-5" />
            </button>

            <RSVPWizard onCompleted={() => {}} />
          </div>
        </div>
      )}
    </section>
  );
}
