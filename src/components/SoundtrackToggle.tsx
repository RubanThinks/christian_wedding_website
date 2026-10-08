"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundtrackToggle() {
  // Client requested: Music playing by default from loading, user can mute if they want
  const [isPlaying, setIsPlaying] = useState(true);
  const userMutedRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(true);

  // Keep ref in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Lush celestial chord progression (Pachelbel's Canon in D & Hymnal warmth)
  const chordNotes = useRef([
    [293.66, 369.99, 440.0, 587.33], // D Major (D4, F#4, A4, D5)
    [220.0, 277.18, 329.63, 440.0],  // A Major (A3, C#4, E4, A4)
    [246.94, 293.66, 369.99, 493.88], // B Minor (B3, D4, F#4, B4)
    [185.0, 220.0, 277.18, 369.99],   // F# Minor (F#3, A3, C#4, F#4)
    [196.0, 246.94, 293.66, 392.0],   // G Major (G3, B3, D4, G4)
    [293.66, 369.99, 440.0, 587.33], // D Major (D4, F#4, A4, D5)
    [196.0, 246.94, 293.66, 392.0],   // G Major (G3, B3, D4, G4)
    [220.0, 277.18, 330.0, 440.0],    // A Major (A3, C#4, E4, A4)
  ]);

  const chordIndexRef = useRef(0);

  // Gentle synthesizer for ambient piano/hymnal chords
  const playSacredChords = useCallback(() => {
    if (userMutedRef.current || !isPlayingRef.current) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const chords = chordNotes.current;

      const triggerNextChord = () => {
        if (userMutedRef.current || !isPlayingRef.current) return;
        if (!audioContextRef.current || audioContextRef.current.state === "closed") return;

        const currentChord = chords[chordIndexRef.current % chords.length];
        chordIndexRef.current++;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.7, ctx.currentTime);

        // Low-pass filter for warm sanctuary acoustic reverberation
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, ctx.currentTime);
        masterGain.connect(filter);
        filter.connect(ctx.destination);

        currentChord.forEach((freq, idx) => {
          // Fundamental sine wave for pure bell tone
          const osc1 = ctx.createOscillator();
          osc1.type = "sine";
          osc1.frequency.setValueAtTime(freq, ctx.currentTime);

          // Soft triangle wave for rich ambient warmth
          const osc2 = ctx.createOscillator();
          osc2.type = "triangle";
          osc2.frequency.setValueAtTime(freq * 0.5, ctx.currentTime); // Sub-octave warmth

          const noteGain = ctx.createGain();
          const noteTime = ctx.currentTime + idx * 0.2; // Gentle arpeggiation

          // Ethereal swell envelope
          noteGain.gain.setValueAtTime(0.0001, noteTime);
          noteGain.gain.exponentialRampToValueAtTime(0.022, noteTime + 1.2);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 5.8);

          osc1.connect(noteGain);
          osc2.connect(noteGain);
          noteGain.connect(masterGain);

          osc1.start(noteTime);
          osc2.start(noteTime);
          osc1.stop(noteTime + 6.0);
          osc2.stop(noteTime + 6.0);
        });
      };

      // Clear any prior interval before setting new one
      if (oscIntervalRef.current) clearInterval(oscIntervalRef.current);

      triggerNextChord();
      oscIntervalRef.current = setInterval(triggerNextChord, 4600);
    } catch {
      // Audio fallback handling
    }
  }, []);

  // Play immediately on mount / loading
  useEffect(() => {
    // Start music on load
    playSacredChords();

    // Modern browsers require a user interaction if autoplay is blocked initially.
    // As soon as the user touches, scrolls, or clicks anywhere, we seamlessly unlock audio.
    const unlockAudioOnFirstGesture = () => {
      if (userMutedRef.current) return;

      if (audioContextRef.current) {
        if (audioContextRef.current.state === "suspended") {
          audioContextRef.current.resume().catch(() => {});
        }
      } else {
        playSacredChords();
      }
    };

    window.addEventListener("pointerdown", unlockAudioOnFirstGesture, { passive: true });
    window.addEventListener("touchstart", unlockAudioOnFirstGesture, { passive: true });
    window.addEventListener("click", unlockAudioOnFirstGesture, { passive: true });
    window.addEventListener("scroll", unlockAudioOnFirstGesture, { passive: true });
    window.addEventListener("keydown", unlockAudioOnFirstGesture, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudioOnFirstGesture);
      window.removeEventListener("touchstart", unlockAudioOnFirstGesture);
      window.removeEventListener("click", unlockAudioOnFirstGesture);
      window.removeEventListener("scroll", unlockAudioOnFirstGesture);
      window.removeEventListener("keydown", unlockAudioOnFirstGesture);
      if (oscIntervalRef.current) clearInterval(oscIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close().catch(() => {});
    };
  }, [playSacredChords]);

  // Toggle button handler: User can mute if they want
  const toggleSound = () => {
    if (isPlaying) {
      // User requested to mute
      userMutedRef.current = true;
      setIsPlaying(false);
      if (oscIntervalRef.current) clearInterval(oscIntervalRef.current);
      if (audioContextRef.current && audioContextRef.current.state === "running") {
        audioContextRef.current.suspend().catch(() => {});
      }
      // Also mute any video on the page
      document.querySelectorAll("video").forEach((v) => {
        v.muted = true;
      });
    } else {
      // User unmuted
      userMutedRef.current = false;
      setIsPlaying(true);
      playSacredChords();
      document.querySelectorAll("video").forEach((v) => {
        v.muted = false;
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <button
        onClick={toggleSound}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        title={isPlaying ? "Music Playing • Click to Mute" : "Music Muted • Click to Play"}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 text-[#211B17] border border-[#D4A33B]/50 hover:border-[#D4A33B] transition-all duration-300 shadow-lg backdrop-blur-sm cursor-pointer hover:scale-105"
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
          {isPlaying ? "Music Playing" : "Muted"}
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
  );
}

