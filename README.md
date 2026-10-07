# Luxury Christian Wedding Invitation Experience Template

A world-class, reusable Christian wedding invitation website engineered with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, **GSAP ScrollTrigger**, **Framer Motion**, and **Lenis Smooth Scroll**.

Designed like a cinematic wedding film combined with a luxury editorial invitation.

---

## Key Features

1. **Architecture for Instant Customization**
   - Centralized configuration in [`config/wedding.ts`](file:///d:/christian_wedding/config/wedding.ts)
   - Dynamic scriptures in [`config/scriptures.ts`](file:///d:/christian_wedding/config/scriptures.ts)
   - Never hardcodes names, dates, or venues inside UI components
   - Seamless media replacement in `/public/images/` and `/public/videos/`
   - Complete onboarding instructions in [`CLIENT-DATA-GUIDE.md`](file:///d:/christian_wedding/CLIENT-DATA-GUIDE.md)

2. **13 Cinematic Storytelling Scenes**
   - **Scene 01 — Cinematic Intro**: Full-viewport video / golden hour sanctuary with atmospheric light and cross emblem
   - **Scene 02 — The Couple**: Editorial fashion composition with portraits, sacred quotes, and family dedication
   - **Scene 03 — Scripture Moment**: Monumental "LOVE" typography watermark with scroll-driven line-by-line illumination (1 Corinthians 13:4–8)
   - **Scene 04 — The Formal Invitation**: Tactile physical deckled cotton paper, wax seal, silk ribbon, and gold foil borders
   - **Scene 05 — The Signature Ring Date Reveal**: Realistic 18K yellow gold wedding rings that approach, rotate, interlock, sweep with warm metallic light, discover the engraved date, countdown live, and offer `.ics` calendar download
   - **Scene 06 — The Covenant**: Three silk & gold strands weaving together representing the bride, groom, and Christ at the center (Ecclesiastes 4:12)
   - **Scene 07 — The Church Ceremony**: Push-in perspective toward the open church entrance with schedule details and Google Maps integration
   - **Scene 08 — Walking the Aisle**: Moving perspective down the cathedral aisle lined with white florals and candlelight towards the altar cross
   - **Scene 09 — Rings & Vows**: Scroll focus transition sequence between the Holy Bible, wedding rings, and matrimonial vows
   - **Scene 10 — Reception Celebration**: Transition from church daylight to warm evening fairy-lit banquet hall with reception itinerary
   - **Scene 11 — Location Experience**: Slow cinematic zoom-out of estate grounds with dual ceremony/reception venue switcher
   - **Scene 12 — RSVP Experience**: Tactile paper stationery card with interactive modal, guest counter, dietary preferences, celebratory blessings, and confetti
   - **Scene 13 — Final Blessing**: Sacred candlelit twilight sanctuary benediction (1 Corinthians 16:14) with gradual ambient dimming

3. **Luxury Materials — Zero Generic SaaS Cards**
   - Physical deckled paper texture, Italian velvet, cathedral stone, brass, gold foil stamping, and candlelight caustics.
   - Absolutely no glassmorphism or generic neon gradients.

4. **Performance & Accessibility**
   - 60fps buttery scrolling with Lenis + GSAP ScrollTrigger
   - `prefers-reduced-motion` compliance
   - Mobile-first optimization from 360px up to 4K

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the experience.
