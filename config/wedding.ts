import { WeddingConfig } from "../src/types/wedding";
import { defaultScriptures } from "./scriptures";

/**
 * WEDDING CONFIGURATION — MISHEL MATHEW & SARA JOSE
 * 
 * Knanaya Catholic Matrimony Celebrations
 * Engagement: 9 January 2027 @ Neendoor
 * Wedding: 16 January 2027 @ Chullikkara & Rajapuram
 */
export const weddingData: WeddingConfig = {
  couple: {
    bride: {
      name: "Sara Jose",
      firstName: "Sara",
      houseName: "Pazhayapurayil",
      portrait: "/images/couple/bride.webp",
      parents: {
        father: "Jose Pazhayapurayil Kurian",
        mother: "Laiby Jose"
      },
      quote: "My beloved is mine, and I am his."
    },
    groom: {
      name: "Mishel Mathew",
      firstName: "Mishel",
      houseName: "Mulavanal",
      portrait: "/images/couple/groom.webp",
      parents: {
        father: "Mathew Mulavanal Joseph",
        mother: "Mercily Ayithil Philip"
      },
      quote: "I found the one whom my soul loves."
    }
  },

  engagement: {
    title: "Sacred Betrothal & Engagement Ceremony",
    venue: "St. Michael's Knanaya Catholic Church, Neendoor",
    receptionVenue: "St. Michael's Church Parish Hall, Neendoor",
    address: "Neendoor, Kottayam, Kerala",
    date: "Saturday, 9 January 2027",
    time: "6:00 PM",
    mapUrl: "https://maps.google.com/?q=St+Michaels+Knanaya+Catholic+Church+Neendoor",
    photoUrl: "/images/church/church-facade.webp",
    notes: "Ceremony begins at 6:00 PM, followed by evening reception and fellowship at St. Michael's Parish Hall, Neendoor."
  },

  wedding: {
    date: "Saturday, 16 January 2027",
    dayOfWeek: "SATURDAY",
    dayNumber: "16",
    month: "JANUARY",
    year: "2027",
    time: "10:30 AM",
    isoDateTime: "2027-01-16T10:30:00"
  },

  ceremony: {
    title: "Holy Matrimony Ceremony",
    venue: "St. Mary's Knanaya Catholic Church, Chullikkara",
    address: "Chullikkara, Kasaragod, Kerala",
    date: "Saturday, 16 January 2027",
    time: "10:30 AM",
    mapUrl: "https://maps.google.com/?q=St+Marys+Knanaya+Church+Chullikkara",
    photoUrl: "/images/church/church-facade.webp",
    notes: "Holy Matrimony service starts promptly at 10:30 AM."
  },

  reception: {
    title: "Wedding Reception & Lunch Banquet",
    venue: "Holy Family Parish Hall, Rajapuram",
    address: "Rajapuram, Kasaragod, Kerala",
    date: "Saturday, 16 January 2027",
    time: "12:30 PM onwards",
    mapUrl: "https://maps.google.com/?q=Holy+Family+Parish+Hall+Rajapuram",
    photoUrl: "/images/reception/reception-hall.webp",
    notes: "Followed by traditional lunch banquet, felicitations, and joyful fellowship."
  },

  rsvp: {
    deadline: "25 December 2026",
    allowGuestCount: true,
    requireTrainFacility: true
  },

  transport: {
    enabled: true,
    maxGuests: 10,
    allowGuestCategory: false,
    groomTransport: {
      sideName: "Groom's Side (Mulavanal)",
      mode: "train",
      modeLabel: "Train Transport",
      defaultBoarding: "Kanhangad (Railway Station)",
      boardingStations: ["Kanhangad (Railway Station)", "Other"],
    },
    brideTransport: {
      sideName: "Bride's Side (Pazhayapurayil)",
      mode: "bus",
      modeLabel: "Bus Transport",
      defaultBoarding: "Pravattom (Bus Pickup)",
      boardingStations: ["Pravattom (Bus Pickup)", "Other"],
    },
    journeys: [
      {
        id: "journey-9",
        label: "9th January (Engagement)",
        shortLabel: "9th",
        date: "2027-01-09",
        eventName: "Engagement @ St. Michael's Neendoor",
        mode: "train",
        enabled: true,
      },
      {
        id: "journey-16",
        label: "16th January (Holy Matrimony & Lunch)",
        shortLabel: "16th",
        date: "2027-01-16",
        eventName: "Holy Matrimony @ Chullikkara & Lunch @ Rajapuram",
        mode: "train",
        enabled: true,
      },
    ],
    boardingStations: [
      "Kanhangad",
      "Pravattom",
    ],
  },

  scriptures: {
    primary: defaultScriptures.love,
    secondary: defaultScriptures.covenant,
    blessing: defaultScriptures.harmony
  },

  editorial: {
    invitationPreamble:
      "Together with their families,\nSara Jose (Pazhayapurayil)\n&\nMishel Mathew (Mulavanal)\ninvite you to celebrate the beginning of their life together under the blessing of God.",
    covenantMetaphor: "A cord of three strands is not quickly broken.",
    aisleQuote: "Until we stand before God, and promise forever.",
    vowsQuote:
      "With these rings, we promise our love, our faith, and our lives to one another.",
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
    finalBg: "/images/couple/bg-couple.jpg",
    bridePortrait: "/images/couple/bride.webp",
    groomPortrait: "/images/couple/groom.webp",
    coupleEditorial: "/images/couple/ch-fg-couple.png"
  },

  optional: {
    parkingInfo: "Parking facilities available at St. Michael's Neendoor and Holy Family Parish Hall Rajapuram.",
    weddingHashtag: "#MishelWedsSara"
  }
};
