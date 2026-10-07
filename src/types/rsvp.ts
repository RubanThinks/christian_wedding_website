export interface GuestItem {
  name: string;
  category?: "adult" | "child";
}

export interface JourneyConfig {
  id: string;
  label: string;
  shortLabel: string;
  date: string;
  eventName: string;
  mode: "train" | "bus" | "flight";
  enabled: boolean;
}

export interface TransportConfig {
  enabled: boolean;
  maxGuests: number;
  allowGuestCategory: boolean;
  journeys: JourneyConfig[];
  boardingStations: string[];
}

export interface JourneyTransportSelection {
  required: boolean;
  allGuests: boolean;
  passengerNames: string[];
  passengerCount: number;
  boardingStation: string;
  customBoardingStation?: string;
}

export interface RSVPData {
  id?: string;
  primaryGuestName: string;
  phone: string;
  email?: string;
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

export interface RSVPStats {
  totalResponses: number;
  attendingCount: number;
  notAttendingCount: number;
  totalGuests: number;
  journeyStats: {
    [journeyId: string]: {
      totalPassengers: number;
      byStation: { [station: string]: number };
      passengers: {
        passengerName: string;
        primaryGuest: string;
        phone: string;
        boardingStation: string;
        specialRequirements?: string;
      }[];
    };
  };
}
