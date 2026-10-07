"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { weddingData } from "@/config/wedding";

export default function SoundtrackToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Gentle synthesizer for ambient piano/hymnal chords if no local MP3 file
  const playSacredChords = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Chord progression: D Major, A Major, B Minor, G Major (Canon in D spirit)
      const chordNotes = [
        [293.66, 369.99, 440.0], // D, F#, A
        [220.0, 277.18, 329.63], // A, C#, E
        [246.94, 293.66, 369.99], // B, D, F#
        [196.0, 246.94, 293.66], // G, B, D
      ];

      let chordIndex = 0;

      const triggerNextChord = () => {
        if (!isPlaying && hasInteracted) return;
        const currentChord = chordNotes[chordIndex % chordNotes.length];
        chordIndex++;

        currentChord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Soft bell / piano envelope
          const now = ctx.currentTime + idx * 0.15;
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.025, now + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 6.0);
        });
      };

      triggerNextChord();
      oscIntervalRef.current = setInterval(triggerNextChord, 4500);
    } catch {
      // Audio fallback
    }
  };

  const toggleSound = () => {
    setHasInteracted(true);
    if (isPlaying) {
      setIsPlaying(false);
      if (oscIntervalRef.current) clearInterval(oscIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.suspend();
    } else {
      setIsPlaying(true);
      playSacredChords();
    }
  };

  useEffect(() => {
    return () => {
      if (oscIntervalRef.current) clearInterval(oscIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <button
        onClick={toggleSound}
        aria-label={isPlaying ? "Mute ambient music" : "Play ambient music"}
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
          {isPlaying ? "Sacred Sound On" : "Ambient Music"}
        </span>

        {/* Dynamic audio waves */}
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
