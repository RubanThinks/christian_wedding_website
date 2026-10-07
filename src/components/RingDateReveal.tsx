"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { weddingData } from "@/config/wedding";
import { Calendar, Clock, Download, Sparkles, Wand2, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface GlitterParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export default function RingDateReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [addedToCalendar, setAddedToCalendar] = useState(false);

  const particlesRef = useRef<GlitterParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingData.wedding.isoDateTime).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Glitter particle system
  const spawnGlitter = (x: number, y: number) => {
    const colors = ["#F2DC9B", "#D4A33B", "#FFFFFF", "#C59A45", "#FFE8B0"];
    for (let i = 0; i < 5; i++) {
      particlesRef.current.push({
        x: x + (Math.random() * 20 - 10),
        y: y + (Math.random() * 20 - 10),
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 - 0.5,
        size: Math.random() * 3 + 1,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  };

  useEffect(() => {
    const pCanvas = particlesCanvasRef.current;
    if (!pCanvas) return;
    const ctx = pCanvas.getContext("2d");
    if (!ctx) return;

    let active = true;

    const renderParticles = () => {
      if (!active) return;
      ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(renderParticles);
    };

    renderParticles();

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Initialize Canvas Scratch Surface
  const initFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = cardContainerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const pCanvas = particlesCanvasRef.current;
    if (pCanvas) {
      pCanvas.width = rect.width;
      pCanvas.height = rect.height;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    const width = rect.width;
    const height = rect.height;

    // Reset composite mode
    ctx.globalCompositeOperation = "source-over";

    // Luxury Golden Glitter Gradient Base
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#DDB45F");
    grad.addColorStop(0.25, "#F7E6AA");
    grad.addColorStop(0.5, "#C89531");
    grad.addColorStop(0.75, "#F4DF99");
    grad.addColorStop(1, "#A87217");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Micro glitter speckles simulation
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    for (let i = 0; i < 280; i++) {
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      const sRadius = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.arc(sx, sy, sRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer refined border on foil
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Inner dashed border
    ctx.strokeStyle = "rgba(110, 75, 18, 0.4)";
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(14, 14, width - 28, height - 28);
    ctx.setLineDash([]);

    // Lettering on Foil
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Sacred Cross
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 22px serif";
    ctx.fillText("✝", width / 2, height / 2 - 42);

    // Headline
    ctx.fillStyle = "#5C3A0A";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("SCRATCH TO REVEAL DATE", width / 2, height / 2 - 12);

    ctx.fillStyle = "rgba(92, 58, 10, 0.85)";
    ctx.font = "italic 11px serif";
    ctx.fillText("Swipe gently with finger or mouse", width / 2, height / 2 + 12);

    // Little Gold Icon
    ctx.font = "14px sans-serif";
    ctx.fillText("✨ ✨ ✨", width / 2, height / 2 + 38);
  }, []);

  useEffect(() => {
    initFoil();
    const handleResize = () => {
      if (!isScratched) initFoil();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initFoil, isScratched]);

  // Check scratch percentage
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const sampleWidth = Math.floor(canvas.width / 4);
    const sampleHeight = Math.floor(canvas.height / 4);

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      const totalPixels = data.length / 4;
      const step = 32;

      for (let i = 3; i < data.length; i += 4 * step) {
        if (data[i] < 60) {
          transparentPixels += step;
        }
      }

      const ratio = transparentPixels / totalPixels;
      const percent = Math.min(100, Math.round(ratio * 100));
      setScratchPercent(percent);

      if (percent >= 38) {
        revealComplete();
      }
    } catch {
      // Fallback
    }
  }, [isScratched]);

  const revealComplete = () => {
    setIsScratched(true);
    setScratchPercent(100);
    setSliderValue(100);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#D4A33B", "#F5E2A8", "#FFFFFF", "#78223B", "#E5B958"],
      });
    } catch {
      // Confetti fallback
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    const brushRadius = 26;
    const radial = ctx.createRadialGradient(x, y, 0, x, y, brushRadius);
    radial.addColorStop(0, "rgba(0, 0, 0, 1)");
    radial.addColorStop(0.7, "rgba(0, 0, 0, 0.85)");
    radial.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = radial;
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    spawnGlitter(x, y);
    checkScratchPercentage();
  };

  // Dedicated Native Non-Passive Touch Listeners to prevent screen scrolling while scratching
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;

    const handleTouchStartNative = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDrawing(true);
      if (e.touches[0]) {
        scratch(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMoveNative = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.touches[0]) {
        scratch(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEndNative = (e: TouchEvent) => {
      e.preventDefault();
      setIsDrawing(false);
    };

    canvas.addEventListener("touchstart", handleTouchStartNative, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMoveNative, { passive: false });
    canvas.addEventListener("touchend", handleTouchEndNative, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStartNative);
      canvas.removeEventListener("touchmove", handleTouchMoveNative);
      canvas.removeEventListener("touchend", handleTouchEndNative);
    };
  }, [isScratched]);

  // Desktop Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsDrawing(false);

  // Slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderValue(val);
    if (val >= 85) {
      revealComplete();
    }
  };

  const downloadIcs = () => {
    const { wedding, ceremony, couple } = weddingData;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Christian Wedding//Wedding Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:wedding-${couple.bride.firstName}-${couple.groom.firstName}-2027
DTSTAMP:20261001T000000Z
DTSTART:20270116T103000
DTEND:20270116T170000
SUMMARY:${couple.groom.name} & ${couple.bride.name}'s Wedding Ceremony
DESCRIPTION:Holy Matrimony of ${couple.groom.name} and ${couple.bride.name}. Followed by banquet reception at ${weddingData.reception.venue}.
LOCATION:${ceremony.venue}, ${ceremony.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Mishel_and_Elizabeth_Wedding_2027.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setAddedToCalendar(true);
  };

  return (
    <section
      id="scene-date"
      className="relative min-h-[85vh] py-16 md:py-24 px-4 sm:px-6 bg-[#FCFAF6] flex items-center justify-center overflow-hidden"
    >
      {/* Background soft sunburst & linen glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FFF4D6]/50 filter blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center flex flex-col items-center">
        {/* Section Prelude */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="text-xs text-[#D4A33B]">✝</span>
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#C59A45] font-sans-clean font-semibold">
              The Sacred Date
            </span>
            <span className="text-xs text-[#D4A33B]">✝</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#211B17] font-normal tracking-wide">
            Save Our Date
          </h2>
          <p className="font-serif-luxury italic text-xs sm:text-sm text-[#65584F] mt-1 max-w-md mx-auto">
            Swipe or scratch the gold foil card below to reveal our wedding date.
          </p>
        </div>

        {/* Compact, Sleek Scratch Card Outer Enclosure */}
        <div
          ref={cardContainerRef}
          className="relative w-full max-w-sm sm:max-w-md min-h-[340px] sm:min-h-[370px] bg-white rounded-xl shadow-xl p-5 sm:p-6 flex flex-col items-center justify-center border-2 border-[#D4A33B]/40 transition-all overflow-hidden touch-none select-none"
        >
          {/* UNDERNEATH LAYER: The Revealed Date */}
          <div className="w-full flex flex-col items-center justify-center text-center py-2 select-none">
            {/* Cross & Holy Title */}
            <div className="flex items-center gap-2 text-[#C59A45] mb-1">
              <span className="w-6 h-[1px] bg-[#C59A45]/40" />
              <span className="text-xs">✝</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans-clean font-bold text-[#8E681C]">
                HOLY MATRIMONY
              </span>
              <span className="text-xs">✝</span>
              <span className="w-6 h-[1px] bg-[#C59A45]/40" />
            </div>

            {/* Day of Week */}
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-sans-clean font-extrabold text-[#78223B]">
              {weddingData.wedding.dayOfWeek}
            </p>

            {/* Sculpted Date Numeral */}
            <div className="my-1 relative flex items-center justify-center">
              <span className="font-serif-luxury text-5xl sm:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#B88424] via-[#F2D68C] to-[#8F6416] drop-shadow-sm leading-none">
                {weddingData.wedding.dayNumber}
              </span>
              <span className="absolute -top-1 -right-5 text-base text-[#D4A33B]">
                ✨
              </span>
            </div>

            {/* Month & Year */}
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-wider text-[#211B17] uppercase leading-none">
              {weddingData.wedding.month}{" "}
              <span className="text-[#8E681C]">{weddingData.wedding.year}</span>
            </h3>

            {/* Time & Location */}
            <div className="mt-3 flex flex-col items-center gap-1 text-[#5C4F46]">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF4E6] border border-[#D4A33B]/30 text-[11px] font-sans-clean font-semibold text-[#8E681C]">
                <Clock className="w-3 h-3 text-[#D4A33B]" />
                <span>{weddingData.wedding.time}</span>
              </div>
              <p className="text-[11px] font-sans-clean text-[#65584F] mt-0.5">
                {weddingData.ceremony.venue}
              </p>
            </div>

            {/* Live Countdown */}
            <div className="pt-3 mt-3 border-t border-[#D4A33B]/20 grid grid-cols-4 gap-2 w-full max-w-xs">
              <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 text-center">
                <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#78223B] block leading-tight">
                  {timeLeft.days}
                </span>
                <span className="text-[8px] uppercase tracking-wider text-[#8E7F74] font-sans-clean block font-medium">
                  Days
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 text-center">
                <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#78223B] block leading-tight">
                  {timeLeft.hours}
                </span>
                <span className="text-[8px] uppercase tracking-wider text-[#8E7F74] font-sans-clean block font-medium">
                  Hours
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 text-center">
                <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#78223B] block leading-tight">
                  {timeLeft.minutes}
                </span>
                <span className="text-[8px] uppercase tracking-wider text-[#8E7F74] font-sans-clean block font-medium">
                  Mins
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 text-center">
                <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#78223B] block leading-tight">
                  {timeLeft.seconds}
                </span>
                <span className="text-[8px] uppercase tracking-wider text-[#8E7F74] font-sans-clean block font-medium">
                  Secs
                </span>
              </div>
            </div>

            {/* Calendar CTA */}
            <div className="mt-3.5">
              <button
                onClick={downloadIcs}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#78223B] hover:bg-[#58182B] text-white text-[11px] uppercase tracking-[0.15em] font-sans-clean font-semibold transition-all shadow-sm cursor-pointer hover:scale-105"
              >
                {addedToCalendar ? (
                  <>
                    <Check className="w-3 h-3 text-[#F2DC9B]" />
                    <span>Added to Calendar!</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3 h-3 text-[#F2DC9B]" />
                    <span>Add to Calendar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* OVERLAY: Interactive Touch Scratch Canvas Foil */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing rounded-xl z-20 transition-opacity duration-700 touch-none select-none ${
              isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />

          {/* Glitter Sparks Canvas */}
          <canvas
            ref={particlesCanvasRef}
            className="absolute inset-0 pointer-events-none z-30"
          />
        </div>

        {/* Scratch Status & Quick Reveal Controls */}
        <div className="mt-4 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-2 px-2">
          {!isScratched ? (
            <>
              <div className="flex items-center justify-between w-full text-xs text-[#8E7F74] font-sans-clean">
                <span className="flex items-center gap-1 text-[#C59A45] font-medium text-[11px]">
                  <Sparkles className="w-3 h-3" />
                  <span>Scratch to reveal ({scratchPercent}%)</span>
                </span>
                <button
                  onClick={revealComplete}
                  className="text-xs text-[#78223B] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Wand2 className="w-3 h-3" />
                  <span>Instant Reveal</span>
                </button>
              </div>

              {/* Compact Slide-to-Reveal Slider */}
              <div className="w-full bg-[#FAF4E6] p-2 rounded-full border border-[#D4A33B]/40 flex items-center gap-2.5 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-[#8E681C] font-sans-clean font-bold pl-2 flex-shrink-0">
                  Slide:
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  aria-label="Slide to reveal wedding date"
                  className="w-full accent-[#C59A45] cursor-pointer h-1.5 bg-[#EADBB8] rounded-lg"
                />
                <span className="text-[11px] font-serif-luxury text-[#78223B] font-bold pr-2 flex-shrink-0">
                  {sliderValue}%
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-sans-clean text-[#78223B] font-bold bg-[#FAF4E6] px-4 py-1.5 rounded-full border border-[#D4A33B]/40 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#D4A33B]" />
              <span>{weddingData.wedding.date} • Revealed!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
