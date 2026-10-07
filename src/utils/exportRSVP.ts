import { RSVPData } from "@/types/rsvp";
import { weddingData } from "@/config/wedding";

function downloadCSV(csvContent: string, filename: string) {
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeCSV(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

/**
 * Export all RSVP submissions
 */
export function exportAllRSVPs(rsvps: RSVPData[]) {
  const headers = [
    "Primary Guest",
    "Phone",
    "Email",
    "Attendance",
    "Total Guests",
    "Attending Names",
    "9th Train Required",
    "9th Boarding Station",
    "9th Passengers",
    "16th Train Required",
    "16th Boarding Station",
    "16th Passengers",
    "Special Requirements",
    "Submitted At",
  ];

  const rows = rsvps.map((r) => {
    const t9 = r.transport?.["journey-9"];
    const t16 = r.transport?.["journey-16"];

    return [
      escapeCSV(r.primaryGuestName),
      escapeCSV(r.phone),
      escapeCSV(r.email || ""),
      escapeCSV(r.attending ? "Attending" : "Declined"),
      escapeCSV(r.guestCount),
      escapeCSV(r.guests?.map((g) => g.name).join(", ") || ""),
      escapeCSV(t9?.required ? "YES" : "NO"),
      escapeCSV(
        t9?.required
          ? t9.boardingStation === "Other"
            ? t9.customBoardingStation
            : t9.boardingStation
          : ""
      ),
      escapeCSV(t9?.required ? t9.passengerNames?.join(", ") || t9.passengerCount : ""),
      escapeCSV(t16?.required ? "YES" : "NO"),
      escapeCSV(
        t16?.required
          ? t16.boardingStation === "Other"
            ? t16.customBoardingStation
            : t16.boardingStation
          : ""
      ),
      escapeCSV(t16?.required ? t16.passengerNames?.join(", ") || t16.passengerCount : ""),
      escapeCSV(r.specialRequirements || ""),
      escapeCSV(typeof r.submittedAt === "string" ? r.submittedAt : ""),
    ].join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  downloadCSV(csv, `Wedding_RSVPs_All_${new Date().toISOString().slice(0, 10)}.csv`);
}

export const exportAllRSVPsToCSV = exportAllRSVPs;

/**
 * Export filtered RSVP dataset
 */
export function exportFilteredRSVPsToCSV(rsvps: RSVPData[], filterTag = "Filtered") {
  const headers = [
    "Primary Guest",
    "Phone",
    "Email",
    "Attendance",
    "Total Guests",
    "Attending Names",
    "9th Train Required",
    "9th Boarding Station",
    "9th Passengers",
    "16th Train Required",
    "16th Boarding Station",
    "16th Passengers",
    "Special Requirements",
    "Submitted At",
  ];

  const rows = rsvps.map((r) => {
    const t9 = r.transport?.["journey-9"];
    const t16 = r.transport?.["journey-16"];

    return [
      escapeCSV(r.primaryGuestName),
      escapeCSV(r.phone),
      escapeCSV(r.email || ""),
      escapeCSV(r.attending ? "Attending" : "Declined"),
      escapeCSV(r.guestCount),
      escapeCSV(r.guests?.map((g) => g.name).join(", ") || ""),
      escapeCSV(t9?.required ? "YES" : "NO"),
      escapeCSV(
        t9?.required
          ? t9.boardingStation === "Other"
            ? t9.customBoardingStation
            : t9.boardingStation
          : ""
      ),
      escapeCSV(t9?.required ? t9.passengerNames?.join(", ") || t9.passengerCount : ""),
      escapeCSV(t16?.required ? "YES" : "NO"),
      escapeCSV(
        t16?.required
          ? t16.boardingStation === "Other"
            ? t16.customBoardingStation
            : t16.boardingStation
          : ""
      ),
      escapeCSV(t16?.required ? t16.passengerNames?.join(", ") || t16.passengerCount : ""),
      escapeCSV(r.specialRequirements || ""),
      escapeCSV(typeof r.submittedAt === "string" ? r.submittedAt : ""),
    ].join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  downloadCSV(csv, `Wedding_RSVPs_${filterTag}_${new Date().toISOString().slice(0, 10)}.csv`);
}

/**
 * Export specific train journey passenger list
 */
export function exportJourneyTrainList(
  rsvps: RSVPData[],
  journeyId: string,
  journeyLabel?: string
) {
  const label =
    journeyLabel ||
    weddingData.transport.journeys.find((j) => j.id === journeyId)?.label ||
    journeyId;

  const headers = [
    "No.",
    "Passenger Name",
    "Family / Primary Guest",
    "Phone",
    "Boarding Station",
    "Special Requirements",
  ];

  const rows: string[] = [];
  let counter = 1;

  rsvps.forEach((r) => {
    if (r.attending && r.transport?.[journeyId]?.required) {
      const t = r.transport[journeyId];
      const station =
        t.boardingStation === "Other" && t.customBoardingStation
          ? t.customBoardingStation
          : t.boardingStation || "Unspecified";

      if (t.passengerNames && t.passengerNames.length > 0) {
        t.passengerNames.forEach((pName) => {
          rows.push(
            [
              escapeCSV(counter++),
              escapeCSV(pName),
              escapeCSV(r.primaryGuestName),
              escapeCSV(r.phone),
              escapeCSV(station),
              escapeCSV(r.specialRequirements || ""),
            ].join(",")
          );
        });
      } else {
        rows.push(
          [
            escapeCSV(counter++),
            escapeCSV(r.primaryGuestName),
            escapeCSV(r.primaryGuestName),
            escapeCSV(r.phone),
            escapeCSV(station),
            escapeCSV(r.specialRequirements || ""),
          ].join(",")
        );
      }
    }
  });

  const csv = [headers.join(","), ...rows].join("\n");
  const cleanLabel = label.replace(/[^a-zA-Z0-9]/g, "_");
  downloadCSV(csv, `Train_Passengers_${cleanLabel}_${new Date().toISOString().slice(0, 10)}.csv`);
}

export const exportTrainRosterToCSV = exportJourneyTrainList;
