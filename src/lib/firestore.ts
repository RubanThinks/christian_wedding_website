import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { RSVPData, RSVPStats } from "@/types/rsvp";
import { weddingData } from "@/config/wedding";

const LOCAL_STORAGE_KEY = "christian_wedding_rsvps_store";

// Initial mock data for testing admin dashboard before remote firestore configuration
const INITIAL_DEMO_RSVPS: RSVPData[] = [
  {
    id: "demo-rsvp-1",
    primaryGuestName: "Philip Joseph",
    phone: "+91 98471 23456",
    email: "philip.joseph@gmail.com",
    attending: true,
    guestCount: 4,
    guests: [
      { name: "Philip Joseph" },
      { name: "Mary Philip" },
      { name: "Jerome Philip" },
      { name: "Ann Philip" },
    ],
    transport: {
      "journey-9": {
        required: true,
        allGuests: true,
        passengerNames: ["Philip Joseph", "Mary Philip", "Jerome Philip", "Ann Philip"],
        passengerCount: 4,
        boardingStation: "Kottayam",
      },
      "journey-16": {
        required: true,
        allGuests: false,
        passengerNames: ["Philip Joseph", "Mary Philip"],
        passengerCount: 2,
        boardingStation: "Kozhikode",
      },
    },
    specialRequirements: "Elderly passenger requires lower berth / platform assistance.",
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "demo-rsvp-2",
    primaryGuestName: "Dr. Abraham Mathew",
    phone: "+91 94470 55667",
    email: "abraham.m@yahoo.com",
    attending: true,
    guestCount: 2,
    guests: [{ name: "Dr. Abraham Mathew" }, { name: "Susan Abraham" }],
    transport: {
      "journey-9": {
        required: false,
        allGuests: false,
        passengerNames: [],
        passengerCount: 0,
        boardingStation: "",
      },
      "journey-16": {
        required: true,
        allGuests: true,
        passengerNames: ["Dr. Abraham Mathew", "Susan Abraham"],
        passengerCount: 2,
        boardingStation: "Ernakulam",
      },
    },
    specialRequirements: "Vegetarian meals preferred.",
    submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "demo-rsvp-3",
    primaryGuestName: "George Varghese",
    phone: "+91 97450 88990",
    email: "george.v@hotmail.com",
    attending: false,
    guestCount: 0,
    guests: [],
    transport: {
      "journey-9": {
        required: false,
        allGuests: false,
        passengerNames: [],
        passengerCount: 0,
        boardingStation: "",
      },
      "journey-16": {
        required: false,
        allGuests: false,
        passengerNames: [],
        passengerCount: 0,
        boardingStation: "",
      },
    },
    specialRequirements: "Overseas during wedding dates. Sending our prayers and blessings!",
    submittedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

const getLocalStore = (): RSVPData[] => {
  if (typeof window === "undefined") return INITIAL_DEMO_RSVPS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RSVPS));
      return INITIAL_DEMO_RSVPS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_RSVPS;
  }
};

const setLocalStore = (data: RSVPData[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Local storage save error:", err);
  }
};

/**
 * Check if an RSVP already exists with this phone number
 */
export async function findRSVPByPhone(phone: string): Promise<RSVPData | null> {
  const cleanPhone = phone.trim().replace(/\s+/g, "");

  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "rsvps"), where("phone", "==", cleanPhone));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        return { id: docSnap.id, ...docSnap.data() } as RSVPData;
      }
      return null;
    } catch (err) {
      console.warn("Firestore findRSVPByPhone fallback:", err);
    }
  }

  // Local fallback
  const list = getLocalStore();
  const match = list.find(
    (item) => item.phone.trim().replace(/\s+/g, "") === cleanPhone
  );
  return match || null;
}

/**
 * Save new RSVP or update existing
 */
export async function saveRSVP(
  data: Omit<RSVPData, "id">,
  existingId?: string
): Promise<string> {
  const cleanPhone = data.phone.trim().replace(/\s+/g, "");
  const payload = {
    ...data,
    phone: cleanPhone,
  };

  if (isFirebaseConfigured() && db) {
    try {
      if (existingId) {
        const docRef = doc(db, "rsvps", existingId);
        await setDoc(
          docRef,
          {
            ...payload,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
        return existingId;
      } else {
        const docRef = await addDoc(collection(db, "rsvps"), {
          ...payload,
          submittedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return docRef.id;
      }
    } catch (err) {
      console.warn("Firestore saveRSVP fallback:", err);
    }
  }

  // Local fallback
  const list = getLocalStore();
  const now = new Date().toISOString();

  if (existingId) {
    const updated = list.map((item) =>
      item.id === existingId
        ? {
            ...item,
            ...payload,
            id: existingId,
            updatedAt: now,
          }
        : item
    );
    setLocalStore(updated);
    return existingId;
  } else {
    const newId = `rsvp-${Date.now()}`;
    const newRecord: RSVPData = {
      ...payload,
      id: newId,
      submittedAt: now,
      updatedAt: now,
    };
    setLocalStore([newRecord, ...list]);
    return newId;
  }
}

/**
 * Get all RSVP documents for Admin Dashboard
 */
export async function getAllRSVPs(): Promise<RSVPData[]> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "rsvps"), orderBy("submittedAt", "desc"));
      const snapshot = await getDocs(q);
      const results: RSVPData[] = [];
      snapshot.forEach((d) => {
        results.push({ id: d.id, ...d.data() } as RSVPData);
      });
      return results;
    } catch (err) {
      console.warn("Firestore getAllRSVPs fallback:", err);
    }
  }

  return getLocalStore();
}

/**
 * Update RSVP from Admin
 */
export async function updateRSVP(
  id: string,
  updates: Partial<RSVPData>
): Promise<void> {
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "rsvps", id);
      await setDoc(
        docRef,
        {
          ...updates,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      return;
    } catch (err) {
      console.warn("Firestore updateRSVP fallback:", err);
    }
  }

  const list = getLocalStore();
  const now = new Date().toISOString();
  const updated = list.map((item) =>
    item.id === id ? { ...item, ...updates, updatedAt: now } : item
  );
  setLocalStore(updated);
}

/**
 * Delete RSVP from Admin
 */
export async function deleteRSVP(id: string): Promise<void> {
  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, "rsvps", id));
      return;
    } catch (err) {
      console.warn("Firestore deleteRSVP fallback:", err);
    }
  }

  const list = getLocalStore();
  setLocalStore(list.filter((item) => item.id !== id));
}

/**
 * Compute statistical metrics and transport breakdown for admin dashboard
 */
export function computeRSVPStats(rsvps: RSVPData[]): RSVPStats {
  let attendingCount = 0;
  let notAttendingCount = 0;
  let totalGuests = 0;

  const journeyStats: RSVPStats["journeyStats"] = {};
  const configuredJourneys = weddingData.transport.journeys;

  configuredJourneys.forEach((j) => {
    journeyStats[j.id] = {
      totalPassengers: 0,
      byStation: {},
      passengers: [],
    };
  });

  rsvps.forEach((item) => {
    if (item.attending) {
      attendingCount++;
      totalGuests += item.guestCount || 0;

      // Transport breakdown
      if (item.transport) {
        Object.entries(item.transport).forEach(([jId, t]) => {
          if (t && t.required && journeyStats[jId]) {
            const count = t.passengerCount || 0;
            journeyStats[jId].totalPassengers += count;

            const station =
              t.boardingStation === "Other" && t.customBoardingStation
                ? t.customBoardingStation
                : t.boardingStation || "Unspecified";

            journeyStats[jId].byStation[station] =
              (journeyStats[jId].byStation[station] || 0) + count;

            // Collect passenger entries
            if (t.passengerNames && t.passengerNames.length > 0) {
              t.passengerNames.forEach((pName) => {
                journeyStats[jId].passengers.push({
                  passengerName: pName,
                  primaryGuest: item.primaryGuestName,
                  phone: item.phone,
                  boardingStation: station,
                  specialRequirements: item.specialRequirements,
                });
              });
            } else {
              journeyStats[jId].passengers.push({
                passengerName: item.primaryGuestName,
                primaryGuest: item.primaryGuestName,
                phone: item.phone,
                boardingStation: station,
                specialRequirements: item.specialRequirements,
              });
            }
          }
        });
      }
    } else {
      notAttendingCount++;
    }
  });

  return {
    totalResponses: rsvps.length,
    attendingCount,
    notAttendingCount,
    totalGuests,
    journeyStats,
  };
}
