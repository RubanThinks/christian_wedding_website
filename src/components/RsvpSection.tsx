"use client";

import React, { useState } from "react";
import { weddingData } from "@/config/wedding";
import { Mail, Phone, CheckCircle2, Send, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function RsvpSection() {
  const { rsvp, couple } = weddingData;
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    attending: "yes",
    guestCount: "1",
    dietary: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4A33B", "#78223B", "#F2DC9B", "#FFFFFF"],
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <section
      id="scene-rsvp"
      className="relative min-h-screen py-24 md:py-36 px-6 bg-[#FCFAF6] flex items-center justify-center overflow-hidden"
    >
      {/* Background warm light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#FFF4D6]/60 filter blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full mx-auto text-center">
        {/* Section Prelude */}
        <div className="mb-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold mb-2">
            <span>✝</span>
            <span>Chapter XI • Fellowship & Presence</span>
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
              Your prayers, love, and presence are the greatest gifts as we make
              our sacred vows before God.
            </p>

            <div className="my-8 py-4 border-y border-[#D4A33B]/30 bg-[#FAF7F2] rounded">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#78223B] font-sans-clean font-bold block">
                Kindly Respond By
              </span>
              <span className="font-serif-luxury text-2xl sm:text-4xl text-[#211B17] font-bold block mt-1">
                {rsvp.deadline}
              </span>
            </div>

            {/* Main RSVP Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-[#78223B] hover:bg-[#58182B] text-white text-xs uppercase tracking-[0.25em] font-sans-clean font-bold transition-all duration-300 shadow-xl cursor-pointer hover:scale-105"
              >
                Respond Online
              </button>

              {rsvp.url && (
                <a
                  href={rsvp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#D4A33B] hover:border-[#78223B] text-[#78223B] text-xs uppercase tracking-[0.2em] font-sans-clean font-bold transition-all"
                >
                  External RSVP Page
                </a>
              )}
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

      {/* Interactive RSVP Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white rounded-xl p-6 sm:p-10 text-[#211B17] shadow-2xl border-2 border-[#D4A33B]">
            <button
              onClick={() => {
                setModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-5 right-5 text-[#8E7F74] hover:text-[#211B17] cursor-pointer"
              aria-label="Close RSVP form"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="text-center mb-6">
                  <span className="text-xs text-[#D4A33B] font-bold">✝</span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#211B17] font-bold">
                    RSVP Confirmation
                  </h3>
                  <p className="text-xs text-[#5C4F46] font-sans-clean mt-1">
                    Celebrating {couple.bride.firstName} & {couple.groom.firstName}
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C4F46] font-sans-clean mb-1 font-bold">
                    Your Full Name(s) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="e.g. Mr. & Mrs. Henderson"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4A33B]/50 bg-white text-[#211B17] text-sm focus:outline-none focus:border-[#78223B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C4F46] font-sans-clean mb-1 font-bold">
                    Will You Attend? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, attending: "yes" })
                      }
                      className={`py-2.5 px-3 text-xs uppercase tracking-wider font-sans-clean font-bold rounded-lg border text-center cursor-pointer transition-all ${
                        formData.attending === "yes"
                          ? "bg-[#78223B] text-white border-[#78223B]"
                          : "border-[#D4A33B]/40 text-[#5C4F46]"
                      }`}
                    >
                      Joyfully Accept
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, attending: "no" })
                      }
                      className={`py-2.5 px-3 text-xs uppercase tracking-wider font-sans-clean font-bold rounded-lg border text-center cursor-pointer transition-all ${
                        formData.attending === "no"
                          ? "bg-[#78223B] text-white border-[#78223B]"
                          : "border-[#D4A33B]/40 text-[#5C4F46]"
                      }`}
                    >
                      Regretfully Decline
                    </button>
                  </div>
                </div>

                {formData.attending === "yes" && (
                  <>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#5C4F46] font-sans-clean mb-1 font-bold">
                        Total Guests Attending
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) =>
                          setFormData({ ...formData, guestCount: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4A33B]/50 bg-white text-[#211B17] text-sm focus:outline-none focus:border-[#78223B]"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#5C4F46] font-sans-clean mb-1 font-bold">
                        Dietary Requirements (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.dietary}
                        onChange={(e) =>
                          setFormData({ ...formData, dietary: e.target.value })
                        }
                        placeholder="e.g. Vegetarian, Gluten-Free, Allergies"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4A33B]/50 bg-white text-[#211B17] text-sm focus:outline-none focus:border-[#78223B]"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C4F46] font-sans-clean mb-1 font-bold">
                    Blessing or Note to Couple (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Share your prayers or warm wishes..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4A33B]/50 bg-white text-[#211B17] text-sm focus:outline-none focus:border-[#78223B]"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-[#78223B] text-white border border-[#D4A33B] text-xs uppercase tracking-[0.2em] font-sans-clean font-bold hover:bg-[#58182B] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit RSVP</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FAF0DC] border border-[#D4A33B] text-[#78223B] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif-luxury text-3xl text-[#211B17] font-bold">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-sm text-[#5C4F46] font-sans-clean max-w-sm mx-auto font-medium">
                  {formData.attending === "yes"
                    ? "Your reservation has been received. We eagerly look forward to worshipping and celebrating with you!"
                    : "We will miss your physical presence, but carry your love and prayers in our hearts."}
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2 rounded-full border border-[#D4A33B] text-xs uppercase tracking-wider text-[#78223B] font-sans-clean font-bold hover:bg-[#FAF7F2]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
