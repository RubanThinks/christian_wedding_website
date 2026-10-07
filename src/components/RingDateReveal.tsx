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
    const colors = ["#FFE699", "#D4A33B", "#FAF7F2", "#E8BE5D", "#FFF3D1"];
    for (let i = 0; i < 7; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: Math.random() * 3.5 + 1.5,
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

    const renderParticles = () => {
      ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha -= 0.025;
        p.size *= 0.97;

        if (p.alpha <= 0 || p.size <= 0.5) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#D4A33B";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      animFrameRef.current = requestAnimationFrame(renderParticles);
    };

    renderParticles();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Initialize Scratch Canvas with Luxury Gold Glitter Foil
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
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
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let i = 0; i < 400; i++) {
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      const sRadius = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.arc(sx, sy, sRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Gold sparkles/stars
    ctx.fillStyle = "rgba(255, 248, 220, 0.75)";
    for (let i = 0; i < 35; i++) {
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      ctx.fillRect(sx, sy, 2, 2);
    }

    // Outer refined border on foil
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Inner dashed border
    ctx.strokeStyle = "rgba(110, 75, 18, 0.4)";
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(16, 16, width - 32, height - 32);
    ctx.setLineDash([]);

    // Call-to-action text on scratch foil
    ctx.fillStyle = "#382307";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Rings Icon / Cross
    ctx.font = "bold 20px serif";
    ctx.fillText("✝", width / 2, height / 2 - 42);

    ctx.font = "600 13px 'Montserrat', sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillText("SCRATCH WITH LOVE", width / 2, height / 2 - 12);

    ctx.font = "italic 16px 'Cormorant Garamond', Georgia, serif";
    ctx.fillStyle = "#50340B";
    ctx.fillText("to discover our sacred wedding date", width / 2, height / 2 + 15);

    ctx.font = "bold 11px 'Montserrat', sans-serif";
    ctx.fillStyle = "#412A0A";
    ctx.fillText("✨ DRAG FINGER OR MOUSE ✨", width / 2, height / 2 + 45);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isScratched) initCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas, isScratched]);

  // Sync particle canvas size
  useEffect(() => {
    const pCanvas = particlesCanvasRef.current;
    const card = cardContainerRef.current;
    if (!pCanvas || !card) return;
    pCanvas.width = card.offsetWidth;
    pCanvas.height = card.offsetHeight;
  }, []);

  // Check scratch completion
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let clearPixels = 0;
      const totalPixels = data.length / 4;
      const sampleStep = 16; // performance optimization

      for (let i = 3; i < data.length; i += 4 * sampleStep) {
        if (data[i] < 60) {
          clearPixels++;
        }
      }

      const percent = Math.round((clearPixels / (totalPixels / sampleStep)) * 100);
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
    setSliderValue(100);
    // Celebratory confetti burst!
    try {
      confetti({
        particleCount: 100,
        spread: 75,
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
    // Feathered brush stroke
    const brushRadius = 32;
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

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsDrawing(false);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => setIsDrawing(false);

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
DTSTART:20270620T163000
DTEND:20270620T233000
SUMMARY:${couple.bride.name} & ${couple.groom.name}'s Wedding Ceremony
DESCRIPTION:Holy Matrimony of ${couple.bride.name} and ${couple.groom.name}. Followed by dinner celebration at ${weddingData.reception.venue}.
LOCATION:${ceremony.venue}, ${ceremony.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${couple.bride.firstName}_and_${couple.groom.firstName}_Wedding.ics`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setAddedToCalendar(true);
    setTimeout(() => setAddedToCalendar(false), 3000);
  };

  return (
    <section
      id="scene-date"
      className="relative min-h-screen py-24 md:py-36 px-4 sm:px-6 bg-[#FCFAF6] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Light radiant ambient sunbeam background */}
      <div className="absolute inset-0 z-0 sunbeam-light pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FFF4D6]/50 filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Section Prelude */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs text-[#D4A33B]">✝</span>
            <span className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#C59A45] font-sans-clean font-semibold">
              The Moment of Covenant
            </span>
            <span className="text-xs text-[#D4A33B]">✝</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#211B17] font-normal tracking-wide">
            Save Our Sacred Date
          </h2>
          <p className="font-serif-luxury italic text-sm sm:text-base text-[#65584F] mt-2 max-w-lg mx-auto">
            Interact below with the gold foil scratch card to reveal the day we
            stand before God.
          </p>
        </div>

        {/* Scratch Card Outer Enclosure */}
        <div
          ref={cardContainerRef}
          className="relative w-full max-w-lg sm:max-w-xl min-h-[460px] sm:min-h-[500px] bg-white rounded-xl gold-card-shadow p-6 sm:p-8 flex flex-col items-center justify-center border-2 border-[#D4A33B]/40 transition-all overflow-hidden"
        >
          {/* UNDERNEATH LAYER: The BOLD, VIBRANT, STYLISH UNFORGETTABLE REVEALED DATE */}
          <div className="w-full flex flex-col items-center justify-center text-center py-4 select-none">
            {/* Cross & Holy Title */}
            <div className="flex items-center gap-2 text-[#C59A45] mb-2">
              <span className="w-8 h-[1px] bg-[#C59A45]/40" />
              <span className="text-xs">✝</span>
              <span className="text-[11px] uppercase tracking-[0.3em] font-sans-clean font-bold text-[#8E681C]">
                HOLY MATRIMONY
              </span>
              <span className="text-xs">✝</span>
              <span className="w-8 h-[1px] bg-[#C59A45]/40" />
            </div>

            {/* BOLD DAY OF WEEK */}
            <p className="text-sm sm:text-base uppercase tracking-[0.35em] font-sans-clean font-extrabold text-[#78223B]">
              {weddingData.wedding.dayOfWeek}
            </p>

            {/* MASSIVE, BOLD, VIBRANT SCULPTED DATE NUMERAL */}
            <div className="my-1 sm:my-2 relative flex items-center justify-center">
              <span className="font-serif-luxury text-7xl sm:text-9xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#B88424] via-[#F2D68C] to-[#8F6416] drop-shadow-sm leading-none">
                {weddingData.wedding.dayNumber}
              </span>
              {/* Shimmer badge */}
              <span className="absolute -top-1 -right-6 text-xl text-[#D4A33B] animate-spin">
                ✨
              </span>
            </div>

            {/* BOLD MONTH & YEAR */}
            <h3 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-wider text-[#211B17] uppercase leading-none">
              {weddingData.wedding.month}{" "}
              <span className="text-[#8E681C]">{weddingData.wedding.year}</span>
            </h3>

            {/* CEREMONY TIME & LOCATION */}
            <div className="mt-4 flex flex-col items-center gap-1.5 text-[#5C4F46]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E6] border border-[#D4A33B]/30 text-xs font-sans-clean font-semibold text-[#8E681C]">
                <Clock className="w-3.5 h-3.5 text-[#D4A33B]" />
                <span>{weddingData.wedding.time} IN THE AFTERNOON</span>
              </div>
              <p className="text-xs font-sans-clean text-[#65584F] mt-1">
                {weddingData.ceremony.venue} • {weddingData.ceremony.address}
              </p>
            </div>

            {/* Live Countdown in Joyful Light Cards */}
            <div className="pt-6 mt-4 border-t border-[#D4A33B]/20 grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-sm">
              <div className="p-2 sm:p-2.5 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 shadow-sm text-center">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#78223B] block leading-tight">
                  {timeLeft.days}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#8E7F74] font-sans-clean block font-medium">
                  Days
                </span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 shadow-sm text-center">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#78223B] block leading-tight">
                  {timeLeft.hours}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#8E7F74] font-sans-clean block font-medium">
                  Hours
                </span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 shadow-sm text-center">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#78223B] block leading-tight">
                  {timeLeft.minutes}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#8E7F74] font-sans-clean block font-medium">
                  Mins
                </span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/30 shadow-sm text-center">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#78223B] block leading-tight">
                  {timeLeft.seconds}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#8E7F74] font-sans-clean block font-medium">
                  Secs
                </span>
              </div>
            </div>

            {/* Add to Calendar Action */}
            <div className="mt-5">
              <button
                onClick={downloadIcs}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#78223B] hover:bg-[#58182B] text-white text-xs uppercase tracking-[0.2em] font-sans-clean font-semibold transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
              >
                {addedToCalendar ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#F2DC9B]" />
                    <span>Added to Calendar!</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5 text-[#F2DC9B]" />
                    <span>Add to Calendar</span>
                    <Download className="w-3.5 h-3.5 opacity-70" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* OVERLAY: THE INTERACTIVE CANVAS SCRATCH FOIL LAYER */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing rounded-xl z-20 transition-opacity duration-700 ${
              isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />

          {/* Particle system for glitter sparks */}
          <canvas
            ref={particlesCanvasRef}
            className="absolute inset-0 pointer-events-none z-30"
          />
        </div>

        {/* Scratch Status and Quick Actions Below Card */}
        <div className="mt-6 w-full max-w-md flex flex-col items-center gap-3">
          {!isScratched ? (
            <>
              {/* Progress feedback */}
              <div className="flex items-center justify-between w-full text-xs text-[#8E7F74] font-sans-clean px-2">
                <span className="flex items-center gap-1.5 text-[#C59A45] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Scratch with mouse or finger ({scratchPercent}% scratched)</span>
                </span>
                <button
                  onClick={revealComplete}
                  className="text-xs text-[#78223B] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Wand2 className="w-3 h-3" />
                  <span>Instant Reveal</span>
                </button>
              </div>

              {/* SLIDE-TO-REVEAL SLIDER BAR */}
              <div className="w-full bg-[#FAF4E6] p-3 rounded-full border border-[#D4A33B]/40 flex items-center gap-3 shadow-inner">
                <span className="text-[11px] uppercase tracking-wider text-[#8E681C] font-sans-clean font-bold pl-3 flex-shrink-0">
                  Slide to Reveal:
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  aria-label="Slide to reveal wedding date"
                  className="w-full accent-[#C59A45] cursor-pointer h-2 bg-[#EADBB8] rounded-lg"
                />
                <span className="text-xs font-serif-luxury text-[#78223B] font-bold pr-2 flex-shrink-0">
                  {sliderValue}%
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans-clean text-[#78223B] font-bold bg-[#FAF4E6] px-5 py-2 rounded-full border border-[#D4A33B]/40 animate-fade-in shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A33B]" />
              <span>Saturday, 20 June 2027 • Revealed With Love!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
