"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundtrackToggle() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;

    const startAudio = async () => {
      if (userMutedRef.current) return;
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Modern browser autoplay policy held playback until first user interaction.
        // Listen on first touch, scroll, pointer, or keypress anywhere on the page to start playing immediately!
        const onFirstGesture = async () => {
          if (userMutedRef.current) return;
          try {
            if (audioRef.current) {
              await audioRef.current.play();
              setIsPlaying(true);
            }
          } catch {}
          cleanupListeners();
        };

        const cleanupListeners = () => {
          window.removeEventListener("pointerdown", onFirstGesture);
          window.removeEventListener("touchstart", onFirstGesture);
          window.removeEventListener("click", onFirstGesture);
          window.removeEventListener("scroll", onFirstGesture);
          window.removeEventListener("keydown", onFirstGesture);
        };

        window.addEventListener("pointerdown", onFirstGesture, { passive: true });
        window.addEventListener("touchstart", onFirstGesture, { passive: true });
        window.addEventListener("click", onFirstGesture, { passive: true });
        window.addEventListener("scroll", onFirstGesture, { passive: true });
        window.addEventListener("keydown", onFirstGesture, { passive: true });
      }
    };

    startAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // User explicitly mutes
      userMutedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      // User explicitly un-mutes
      userMutedRef.current = false;
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Authentic Christian Wedding BGM: Pachelbel's Canon in D Major (Strings & Symphony) */}
      <audio
        ref={audioRef}
        src="/audio/christian-wedding-bgm.mp3"
        loop
        preload="auto"
      />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggleSound}
          aria-label={isPlaying ? "Mute music" : "Play music"}
          title={isPlaying ? "Christian Wedding BGM Playing • Tap to Mute" : "Music Muted • Tap to Play"}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 text-[#211B17] border border-[#D4A33B]/50 hover:border-[#D4A33B] transition-all duration-300 shadow-xl backdrop-blur-sm cursor-pointer hover:scale-105"
        >
          <span className="relative flex h-2.5 w-2.5">
            {isPlaying && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A33B] opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isPlaying ? "bg-[#D4A33B]" : "bg-[#8E7F74]"
              }`}
            ></span>
          </span>

          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#8E681C]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#8E7F74]" />
          )}

          <span className="text-[11px] uppercase tracking-[0.2em] font-sans-clean font-semibold text-[#211B17]">
            {isPlaying ? "Christian BGM" : "Muted"}
          </span>

          {/* Dynamic audio equalizer waves when active */}
          {isPlaying && (
            <div className="flex items-center gap-0.5 ml-1 h-3">
              <span className="w-0.5 h-full bg-[#8E681C] animate-[bounce_1s_infinite_100ms]"></span>
              <span className="w-0.5 h-2/3 bg-[#8E681C] animate-[bounce_1s_infinite_300ms]"></span>
              <span className="w-0.5 h-full bg-[#8E681C] animate-[bounce_1s_infinite_200ms]"></span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}
