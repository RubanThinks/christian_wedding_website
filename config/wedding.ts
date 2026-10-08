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
        father: "Mr. Jose Pazhayapurayil Kurian",
        mother: "Mrs. Laiby Jose"
      },
      quote: "My beloved is mine, and I am his."
    },
    groom: {
      name: "Mishel Mathew",
      firstName: "Mishel",
      houseName: "Mulavanal",
      portrait: "/images/couple/groom.webp",
      parents: {
        father: "Mr. Mathew Mulavanal Joseph",
        mother: "Mrs. Mercily Ayathil Philip"
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
      modeLabel: "Train Transport (Engagement Only)",
      defaultBoarding: "Kanhangad (Railway Station)",
      boardingStations: ["Kanhangad (Railway Station)", "Other"],
      departureDate: "Friday night, 8 January 2027",
      arrivalDate: "Saturday morning, 9 January 2027",
      eventTarget: "Sacred Betrothal @ St. Michael's Neendoor",
      notes: "Groom's family coordinates train travel from Kanhangad exclusively for the Engagement on the 8th/9th Jan. Travel for the wedding on the 16th is self-arranged.",
    },
    brideTransport: {
      sideName: "Bride's Side (Pazhayapurayil)",
      mode: "bus",
      modeLabel: "Chartered Bus Transport (Wedding Only)",
      defaultBoarding: "Pravattom (Bus Pickup)",
      boardingStations: ["Pravattom (Bus Pickup)", "Other"],
      departureDate: "Friday, 15 January 2027",
      arrivalDate: "Saturday, 16 January 2027",
      eventTarget: "Holy Matrimony @ Chullikkara & Lunch @ Rajapuram",
      notes: "Bride's family coordinates chartered bus travel from Pravattom exclusively for the Holy Matrimony on the 15th/16th Jan. Travel for the engagement on the 9th is self-arranged.",
    },
    journeys: [
      {
        id: "journey-9",
        side: "groom",
        label: "8th January (Train Departure • Groom's Side)",
        shortLabel: "8th/9th Jan (Train)",
        date: "2027-01-08",
        departureDate: "Friday, 8 January 2027 (Night)",
        arrivalDate: "Saturday, 9 January 2027",
        eventName: "Engagement @ St. Michael's Neendoor (Departing 8th Jan Night • Reaching 9th Jan)",
        mode: "train",
        enabled: true,
        boardingStation: "Kanhangad (Railway Station)",
        description: "Coordinated Train travel departing Kanhangad on 8th Jan night, arriving 9th Jan morning for the Betrothal.",
      },
      {
        id: "journey-16",
        side: "bride",
        label: "15th January (Bus Departure • Bride's Side)",
        shortLabel: "15th/16th Jan (Bus)",
        date: "2027-01-15",
        departureDate: "Friday, 15 January 2027",
        arrivalDate: "Saturday, 16 January 2027",
        eventName: "Holy Matrimony & Lunch (Departing 15th Jan • Reaching 16th Jan)",
        mode: "bus",
        enabled: true,
        boardingStation: "Pravattom (Bus Pickup)",
        description: "Coordinated Chartered Bus departing Pravattom on 15th Jan, arriving 16th Jan for Holy Matrimony & Reception.",
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
      src: "/videos/christian-intro.mp4",
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
