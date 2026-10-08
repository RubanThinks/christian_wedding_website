export interface GuestItem {
  name: string;
  category?: "adult" | "child";
}

export interface JourneyConfig {
  id: string;
  side?: GuestSide;
  label: string;
  shortLabel: string;
  date: string;
  departureDate?: string;
  arrivalDate?: string;
  eventName: string;
  mode: "train" | "bus" | "flight";
  enabled: boolean;
  boardingStation?: string;
  description?: string;
}

export interface SideTransportInfo {
  sideName: string;
  mode: "train" | "bus";
  modeLabel: string;
  defaultBoarding: string;
  boardingStations?: string[];
  departureDate?: string;
  arrivalDate?: string;
  eventTarget?: string;
  notes?: string;
}

export interface TransportConfig {
  enabled: boolean;
  maxGuests: number;
  allowGuestCategory: boolean;
  groomTransport?: SideTransportInfo;
  brideTransport?: SideTransportInfo;
  journeys: JourneyConfig[];
  boardingStations: string[];
}

export type GuestSide = "groom" | "bride";

export interface JourneyTransportSelection {
  required: boolean;
  allGuests: boolean;
  passengerNames: string[];
  passengerCount: number;
  boardingStation: string;
  customBoardingStation?: string;
  transportMode?: "train" | "bus";
}

export interface RSVPData {
  id?: string;
  primaryGuestName: string;
  phone: string;
  email?: string;
  guestSide?: GuestSide; // "groom" (Mulavanal) or "bride" (Pazhayapurayil)
  attending: boolean;
  guestCount: number;
  guests: GuestItem[];
  transport: {
    [journeyId: string]: JourneyTransportSelection;
  };
  specialRequirements?: string;
  submittedAt: string | number | { seconds: number; nanoseconds: number };
  updatedAt?: string | number | { seconds: number; nanoseconds: number };
}

export interface PassengerRosterItem {
  passengerName: string;
  primaryGuest: string;
  phone: string;
  guestSide: GuestSide;
  transportMode: "train" | "bus";
  boardingStation: string;
  journeyId: string;
  journeyLabel: string;
  specialRequirements?: string;
}

export interface RSVPStats {
  totalResponses: number;
  attendingCount: number;
  notAttendingCount: number;
  totalGuests: number;
  groomSideGuests: number;
  brideSideGuests: number;
  totalTrainPassengers: number; // Groom side (Kanhangad)
  totalBusPassengers: number;   // Bride side (Pravattom)
  journeyStats: {
    [journeyId: string]: {
      totalPassengers: number;
      groomPassengers: number;
      bridePassengers: number;
      byStation: { [station: string]: number };
      passengers: PassengerRosterItem[];
    };
  };
}
