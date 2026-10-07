export interface Person {
  name: string;
  firstName?: string;
  portrait?: string;
}

export interface Parents {
  father: string;
  mother: string;
}

export interface CouplePerson extends Person {
  parents: Parents;
  quote?: string;
}

export interface CoupleConfig {
  bride: CouplePerson;
  groom: CouplePerson;
}

export interface EventDetails {
  title: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  mapUrl?: string;
  photoUrl?: string;
  notes?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ScriptureConfig {
  reference: string;
  translation: string;
  theme: string;
  text: string;
  shortText?: string;
  contextNote?: string;
}

export interface RsvpConfig {
  deadline: string;
  contact: string;
  email?: string;
  url?: string;
  allowGuestCount?: boolean;
}

export interface OptionalDetails {
  dressCode?: string;
  parkingInfo?: string;
  accommodation?: string;
  livestreamUrl?: string;
  giftRegistry?: {
    title: string;
    url: string;
    description?: string;
  }[];
  weddingHashtag?: string;
  audioTrack?: {
    title: string;
    artist: string;
    src: string;
  };
}

export interface WeddingConfig {
  couple: CoupleConfig;
  wedding: {
    date: string;
    dayOfWeek: string;
    dayNumber: string;
    month: string;
    year: string;
    time: string;
    isoDateTime: string; // for calendar invite & countdown
  };
  ceremony: EventDetails;
  reception: EventDetails;
  rsvp: RsvpConfig;
  scriptures: {
    primary: ScriptureConfig; // 1 Corinthians 13:4-8
    secondary: ScriptureConfig; // Ecclesiastes 4:9-12 (The Covenant / 3 strands)
    blessing: ScriptureConfig; // Colossians 3:14 / 1 Corinthians 16:14
  };
  editorial: {
    invitationPreamble: string;
    covenantMetaphor: string;
    aisleQuote: string;
    vowsQuote: string;
    closingBlessing: string;
  };
  media: {
    introVideo: {
      src: string;
      poster: string;
    };
    heroBg: string;
    churchBg: string;
    aisleBg: string;
    ringsBg: string;
    receptionBg: string;
    locationBg: string;
    finalBg: string;
    bridePortrait?: string;
    groomPortrait?: string;
    coupleEditorial?: string;
    gallery?: string[];
  };
  optional?: OptionalDetails;
}
