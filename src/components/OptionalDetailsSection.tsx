"use client";

import React from "react";
import { weddingData } from "@/config/wedding";
import { Gift, Video, Sparkles, Building, Shirt, ExternalLink } from "lucide-react";
import LatinCross from "@/components/LatinCross";

export default function OptionalDetailsSection() {
  const opt = weddingData.optional;

  if (!opt) return null;

  const hasRegistry = opt.giftRegistry && opt.giftRegistry.length > 0;
  const hasLivestream = Boolean(opt.livestreamUrl);
  const hasAccommodation = Boolean(opt.accommodation);
  const hasDressCode = Boolean(opt.dressCode);

  if (!hasRegistry && !hasLivestream && !hasAccommodation && !hasDressCode) {
    return null;
  }

  return (
    <section
      id="scene-details"
      className="relative py-20 md:py-28 px-6 bg-[#FAF7F2] border-t border-[#D4A33B]/20 flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DC] border border-[#D4A33B]/40 text-[#8E681C] text-[11px] uppercase tracking-[0.3em] font-sans-clean font-semibold mb-2">
          <LatinCross className="w-2.5 h-2.5 text-[#D4A33B]" />
          <span>Guest Information &amp; Provisions</span>
          <LatinCross className="w-2.5 h-2.5 text-[#D4A33B]" />
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#211B17] font-semibold tracking-wide mb-10">
          Details for Our Beloved Guests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Dress Code */}
          {hasDressCode && (
            <div className="p-6 rounded-xl bg-white border border-[#D4A33B]/30 shadow-md">
              <div className="flex items-center gap-3 mb-2 text-[#78223B]">
                <Shirt className="w-5 h-5" />
                <h3 className="font-serif-luxury text-xl text-[#211B17] font-bold">
                  Attire Guidance
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C4F46] font-sans-clean leading-relaxed font-medium">
                {opt.dressCode}
              </p>
            </div>
          )}

          {/* Accommodations */}
          {hasAccommodation && (
            <div className="p-6 rounded-xl bg-white border border-[#D4A33B]/30 shadow-md">
              <div className="flex items-center gap-3 mb-2 text-[#78223B]">
                <Building className="w-5 h-5" />
                <h3 className="font-serif-luxury text-xl text-[#211B17] font-bold">
                  Accommodations
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C4F46] font-sans-clean leading-relaxed font-medium">
                {opt.accommodation}
              </p>
            </div>
          )}

          {/* Virtual Livestream */}
          {hasLivestream && (
            <div className="p-6 rounded-xl bg-white border border-[#D4A33B]/30 shadow-md">
              <div className="flex items-center gap-3 mb-2 text-[#78223B]">
                <Video className="w-5 h-5" />
                <h3 className="font-serif-luxury text-xl text-[#211B17] font-bold">
                  Ceremony Livestream
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C4F46] font-sans-clean leading-relaxed mb-4 font-medium">
                For friends and family joining from around the world across time zones.
              </p>
              <a
                href={opt.livestreamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#78223B] hover:text-[#58182B] font-sans-clean uppercase tracking-wider font-bold"
              >
                <span>Access Virtual Ceremony</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Gift Registry */}
          {hasRegistry && (
            <div className="p-6 rounded-xl bg-white border border-[#D4A33B]/30 shadow-md">
              <div className="flex items-center gap-3 mb-2 text-[#78223B]">
                <Gift className="w-5 h-5" />
                <h3 className="font-serif-luxury text-xl text-[#211B17] font-bold">
                  Gift Registry & Blessings
                </h3>
              </div>
              <p className="text-xs text-[#5C4F46] font-sans-clean mb-3 font-medium">
                Your prayers and presence are our greatest joy. For those wishing to contribute:
              </p>
              <div className="space-y-2">
                {opt.giftRegistry?.map((reg, idx) => (
                  <a
                    key={idx}
                    href={reg.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 hover:border-[#78223B] transition-all group"
                  >
                    <div>
                      <span className="text-xs text-[#211B17] font-sans-clean font-bold block">
                        {reg.title}
                      </span>
                      {reg.description && (
                        <span className="text-[11px] text-[#5C4F46] font-sans-clean">
                          {reg.description}
                        </span>
                      )}
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8E681C] group-hover:text-[#78223B]" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Wedding Hashtag */}
        {opt.weddingHashtag && (
          <div className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D4A33B]/40 bg-white text-[#78223B] text-xs font-sans-clean tracking-wider font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A33B]" />
            <span>Tag your shared memories with {opt.weddingHashtag}</span>
          </div>
        )}
      </div>
    </section>
  );
}
