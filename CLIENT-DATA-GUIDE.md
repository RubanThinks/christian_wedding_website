# CLIENT DATA & ONBOARDING GUIDE
## World-Class Christian Wedding Invitation Website Template

Welcome to your bespoke digital wedding experience. This platform is engineered to celebrate your covenant before God with the visual poetry of a luxury wedding film and the timeless intimacy of an editorial invitation.

To personalize this template for your wedding, you only need to update **one configuration file**:
`config/wedding.ts` (or `src/config/wedding.ts`) and drop your photographs and video into the `/public/` directory.

---

## 1. Information Requirements Checklist

### [REQUIRED] 1. Couple Information
| Field | Description | Example |
| :--- | :--- | :--- |
| `bride.name` | Bride's full formal name | `"Elizabeth Grace"` |
| `bride.firstName` | Bride's first name for conversational scenes | `"Elizabeth"` |
| `groom.name` | Groom's full formal name | `"Daniel James"` |
| `groom.firstName` | Groom's first name for conversational scenes | `"Daniel"` |

### [REQUIRED] 2. Parents of the Couple
Used for the formal editorial invitation preamble ("Together with their families...").
| Field | Description | Example |
| :--- | :--- | :--- |
| `bride.parents.father` | Bride's father | `"Michael Thomas"` |
| `bride.parents.mother` | Bride's mother | `"Sarah Thomas"` |
| `groom.parents.father` | Groom's father | `"David James"` |
| `groom.parents.mother` | Groom's mother | `"Rebecca James"` |

### [REQUIRED] 3. Wedding Date & Time
Used for the interactive 3D/GSAP Wedding Ring Date Reveal and calendar integrations.
| Field | Description | Example |
| :--- | :--- | :--- |
| `wedding.date` | Full display date | `"Saturday, 20 June 2027"` |
| `wedding.dayOfWeek` | Day of the week (Uppercase) | `"SATURDAY"` |
| `wedding.dayNumber` | Day number | `"20"` |
| `wedding.month` | Month name (Uppercase) | `"JUNE"` |
| `wedding.year` | Year | `"2027"` |
| `wedding.time` | Time of start | `"4:30 PM"` |
| `wedding.isoDateTime` | ISO 8601 string for `.ics` & countdown | `"2027-06-20T16:30:00"` |

### [REQUIRED] 4. Holy Matrimony Ceremony
| Field | Description | Example |
| :--- | :--- | :--- |
| `ceremony.venue` | Church or chapel name | `"St. Grace Community Church"` |
| `ceremony.address` | Street address & city | `"125 Grace Avenue, Springfield"` |
| `ceremony.date` | Ceremony date | `"Saturday, 20 June 2027"` |
| `ceremony.time` | Ceremony start time | `"4:30 PM"` |
| `ceremony.mapUrl` | Google Maps navigation link | `"https://maps.google.com/?q=..."` |
| `ceremony.notes` | Arrival guidance / dress notes | `"Please arrive 15 minutes prior for prelude"` |

### [REQUIRED] 5. Reception & Celebration
| Field | Description | Example |
| :--- | :--- | :--- |
| `reception.venue` | Reception venue name | `"The Grand Garden Hall"` |
| `reception.address` | Street address & city | `"45 Rosewood Lane, Springfield"` |
| `reception.date` | Reception date | `"Saturday, 20 June 2027"` |
| `reception.time` | Reception timing | `"6:30 PM onwards"` |
| `reception.mapUrl` | Google Maps navigation link | `"https://maps.google.com/?q=..."` |

### [REQUIRED] 6. Faith & Scriptures
| Field | Description | Default / Example |
| :--- | :--- | :--- |
| `scriptures.primary` | Central love passage | `1 Corinthians 13:4–8` |
| `scriptures.secondary` | The Covenant ("Cord of three strands") | `Ecclesiastes 4:9–12` |
| `scriptures.blessing` | Matrimonial blessing / benediction | `Colossians 3:14` or `1 Corinthians 16:14` |

*Note: You may choose your preferred Bible translation (NIV, ESV, NASB, CSB, KJV, etc.) in `config/scriptures.ts`.*

### [REQUIRED] 7. RSVP Details
| Field | Description | Example |
| :--- | :--- | :--- |
| `rsvp.deadline` | Final RSVP response date | `"1 June 2027"` |
| `rsvp.contact` | Phone / WhatsApp number | `"+1 (555) 019-2834"` |
| `rsvp.email` | Contact email address | `"celebrate@elizabethanddaniel.com"` |
| `rsvp.url` | External RSVP URL or Google Form (optional) | `"https://rsvp.elizabethanddaniel.com"` |

---

## 2. Optional Details (Gracefully Adapted)
If left blank or omitted, the corresponding sections gracefully adapt or hide:
| Field | Description | Example |
| :--- | :--- | :--- |
| `optional.dressCode` | Attire guidance | `"Formal Black Tie & Elegant Church Attire"` |
| `optional.parkingInfo` | Parking / shuttle details | `"Valet parking provided at both venues"` |
| `optional.accommodation` | Hotel room block info | `"Springfield Grand Hotel (mention Grace-James)"` |
| `optional.livestreamUrl` | Virtual ceremony link | `"https://youtube.com/live/..."` |
| `optional.giftRegistry` | Links to registries or charities | Array of `{ title, url, description }` |
| `optional.weddingHashtag` | Social media hashtag | `"#DanielFoundHisGrace"` |
| `optional.audioTrack` | Background instrumental music | `{ title, artist, src: "/audio/hymn.mp3" }` |

---

## 3. Media Replacement Guide

Simply place your high-resolution assets into the `/public/` directory following this structure:

```
public/
  ├── videos/
  │   └── intro.mp4                 <-- Cinematic intro film (1080p/4K, H.264/H.265, muted)
  ├── audio/
  │   └── ambient-hymn.mp3          <-- Subtle piano/strings accompaniment (optional)
  └── images/
      ├── hero/
      │   ├── cinematic-poster.webp <-- Poster frame for intro video
      │   └── hero-bg.webp          <-- Golden hour morning sunlight / church backdrop
      ├── church/
      │   ├── church-facade.webp    <-- Church exterior with floral arch & stone portal
      │   └── aisle-perspective.webp<-- View down the wedding aisle towards altar cross
      ├── couple/
      │   ├── bride.webp            <-- Editorial portrait of the bride
      │   ├── groom.webp            <-- Editorial portrait of the groom
      │   └── couple-editorial.webp <-- Couple portrait together in natural light
      ├── rings/
      │   └── rings-velvet.webp     <-- Dark velvet / ivory invitation surface texture
      ├── reception/
      │   └── reception-hall.webp   <-- Warm evening fairy-lit banquet hall
      ├── location/
      │   └── venue-location.webp   <-- Architectural venue exterior
      └── final/
          └── final-glow.webp       <-- Twilight church glow for the benediction
```

---

## 4. Complete Configuration Reference (`config/wedding.ts`)

```typescript
import { WeddingConfig } from "../src/types/wedding";
import { defaultScriptures } from "./scriptures";

export const weddingData: WeddingConfig = {
  couple: {
    bride: {
      name: "Elizabeth Grace",
      firstName: "Elizabeth",
      parents: { father: "Michael Thomas", mother: "Sarah Thomas" },
    },
    groom: {
      name: "Daniel James",
      firstName: "Daniel",
      parents: { father: "David James", mother: "Rebecca James" },
    }
  },
  wedding: {
    date: "Saturday, 20 June 2027",
    dayOfWeek: "SATURDAY",
    dayNumber: "20",
    month: "JUNE",
    year: "2027",
    time: "4:30 PM",
    isoDateTime: "2027-06-20T16:30:00"
  },
  ceremony: {
    title: "Holy Matrimony Ceremony",
    venue: "St. Grace Community Church",
    address: "125 Grace Avenue, Springfield",
    date: "Saturday, 20 June 2027",
    time: "4:30 PM",
    mapUrl: "https://maps.google.com/?q=St.+Grace+Community+Church+Springfield"
  },
  reception: {
    title: "The Wedding Celebration",
    venue: "The Grand Garden Hall",
    address: "45 Rosewood Lane, Springfield",
    date: "Saturday, 20 June 2027",
    time: "6:30 PM onwards",
    mapUrl: "https://maps.google.com/?q=The+Grand+Garden+Hall+Springfield"
  },
  rsvp: {
    deadline: "1 June 2027",
    contact: "+1 (555) 019-2834",
    email: "celebrate@elizabethanddaniel.com"
  },
  scriptures: {
    primary: defaultScriptures.love,
    secondary: defaultScriptures.covenant,
    blessing: defaultScriptures.harmony
  },
  editorial: {
    invitationPreamble:
      "Together with their families,\nElizabeth Grace & Daniel James\ninvite you to celebrate the beginning of their life together under the blessing of God.",
    covenantMetaphor: "A cord of three strands is not quickly broken.",
    aisleQuote: "Until we stand before God, and promise forever.",
    vowsQuote: "With these rings, we promise our love, our faith, and our lives to one another.",
    closingBlessing: "Let all that you do be done in love."
  },
  media: {
    introVideo: {
      src: "/videos/intro.mp4",
      poster: "/images/hero/cinematic-poster.webp"
    },
    heroBg: "/images/hero/hero-bg.webp",
    churchBg: "/images/church/church-facade.webp",
    aisleBg: "/images/church/aisle-perspective.webp",
    ringsBg: "/images/rings/rings-velvet.webp",
    receptionBg: "/images/reception/reception-hall.webp",
    locationBg: "/images/location/venue-location.webp",
    finalBg: "/images/final/final-glow.webp"
  }
};
```
