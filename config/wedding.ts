import { WeddingConfig } from "../src/types/wedding";
import { defaultScriptures } from "./scriptures";

/**
 * WEDDING CONFIGURATION TEMPLATE
 * 
 * Replace mock values with real client information.
 * Any optional field omitted will gracefully hide or adapt components.
 * Refer to CLIENT-DATA-GUIDE.md for detailed documentation.
 */
export const weddingData: WeddingConfig = {
  couple: {
    bride: {
      name: "Elizabeth Grace",
      firstName: "Elizabeth",
      portrait: "/images/couple/bride.webp",
      parents: {
        father: "Michael Thomas",
        mother: "Sarah Thomas"
      },
      quote: "My beloved is mine, and I am his."
    },
    groom: {
      name: "Daniel James",
      firstName: "Daniel",
      portrait: "/images/couple/groom.webp",
      parents: {
        father: "David James",
        mother: "Rebecca James"
      },
      quote: "I found the one whom my soul loves."
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
    mapUrl: "https://maps.google.com/?q=St.+Grace+Community+Church+Springfield",
    photoUrl: "/images/church/church-facade.webp",
    notes: "Ceremony begins promptly at 4:30 PM. Please arrive 15 minutes prior for preludes.",
    coordinates: {
      lat: 39.7817,
      lng: -89.6501
    }
  },

  reception: {
    title: "The Wedding Celebration",
    venue: "The Grand Garden Hall",
    address: "45 Rosewood Lane, Springfield",
    date: "Saturday, 20 June 2027",
    time: "6:30 PM onwards",
    mapUrl: "https://maps.google.com/?q=The+Grand+Garden+Hall+Springfield",
    photoUrl: "/images/reception/reception-hall.webp",
    notes: "Cocktail reception, dinner banquet, and joyful celebration under the stars.",
    coordinates: {
      lat: 39.7885,
      lng: -89.6420
    }
  },

  rsvp: {
    deadline: "1 June 2027",
    contact: "+1 (555) 019-2834",
    email: "celebrate@elizabethanddaniel.com",
    url: "https://rsvp.elizabethanddaniel.com",
    allowGuestCount: true
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
    finalBg: "/images/final/final-glow.webp",
    bridePortrait: "/images/couple/bride.webp",
    groomPortrait: "/images/couple/groom.webp",
    coupleEditorial: "/images/couple/couple-editorial.webp",
    gallery: [
      "/images/couple/couple-editorial.webp",
      "/images/church/church-facade.webp",
      "/images/church/aisle-perspective.webp",
      "/images/reception/reception-hall.webp"
    ]
  },

  optional: {
    dressCode: "Formal Black Tie & Elegant Church Attire (Neutral & Warm Earth Tones)",
    parkingInfo: "Complimentary valet parking available at both the Church and Reception Hall.",
    accommodation: "A block of rooms has been reserved at The Springfield Grand Hotel.",
    livestreamUrl: "https://youtube.com/live/elizabeth-daniel-wedding",
    weddingHashtag: "#DanielFoundHisGrace",
    audioTrack: {
      title: "Canon in D (Cinematic Piano & Strings)",
      artist: "Faith & Harmony Chamber Ensemble",
      src: "/audio/ambient-hymn.mp3"
    },
    giftRegistry: [
      {
        title: "Crate & Barrel",
        url: "https://www.crateandbarrel.com",
        description: "Home essentials for the newlyweds"
      },
      {
        title: "Williams Sonoma",
        url: "https://www.williams-sonoma.com",
        description: "Culinary & kitchen provisions"
      },
      {
        title: "Missionary & Charity Fund",
        url: "https://charitywater.org",
        description: "Support clean water projects in honor of our covenant"
      }
    ]
  }
};
