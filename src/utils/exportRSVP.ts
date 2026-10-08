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

function getSideLabel(side?: "groom" | "bride"): string {
  return side === "bride" ? "Bride's Side (Pazhayapurayil)" : "Groom's Side (Mulavanal)";
}

/**
 * Export all RSVP submissions
 */
export function exportAllRSVPs(rsvps: RSVPData[]) {
  const headers = [
    "Primary Guest",
    "Family Side",
    "Phone",
    "Email",
    "Attendance",
    "Total Guests",
    "Attending Names",
    "Groom Train (8th/9th Jan) Required",
    "Groom Train Boarding Point",
    "Groom Train Passengers",
    "Bride Bus (15th/16th Jan) Required",
    "Bride Bus Boarding Point",
    "Bride Bus Passengers",
    "Special Requirements",
    "Submitted At",
  ];

  const rows = rsvps.map((r) => {
    const t9 = r.transport?.["journey-9"];
    const t16 = r.transport?.["journey-16"];
    const isBride = r.guestSide === "bride";

    const groomTrainRequired = !isBride
      ? (t9?.required ? "YES" : "NO")
      : (t9?.required ? "YES" : "N/A (Self-arranged)");
    const groomTrainBoarding = t9?.required ? t9.boardingStation || "Kanhangad (Railway Station)" : "";
    const groomTrainPassengers = t9?.required ? t9.passengerNames?.join(", ") || t9.passengerCount : "";

    const brideBusRequired = isBride
      ? (t16?.required ? "YES" : "NO")
      : (t16?.required ? "YES" : "N/A (Self-arranged)");
    const brideBusBoarding = t16?.required ? t16.boardingStation || "Pravattom (Bus Pickup)" : "";
    const brideBusPassengers = t16?.required ? t16.passengerNames?.join(", ") || t16.passengerCount : "";

    return [
      escapeCSV(r.primaryGuestName),
      escapeCSV(getSideLabel(r.guestSide)),
      escapeCSV(r.phone),
      escapeCSV(r.email || ""),
      escapeCSV(r.attending ? "Attending" : "Declined"),
      escapeCSV(r.guestCount),
      escapeCSV(r.guests?.map((g) => g.name).join(", ") || ""),
      escapeCSV(groomTrainRequired),
      escapeCSV(groomTrainBoarding),
      escapeCSV(groomTrainPassengers),
      escapeCSV(brideBusRequired),
      escapeCSV(brideBusBoarding),
      escapeCSV(brideBusPassengers),
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
    "Family Side",
    "Phone",
    "Email",
    "Attendance",
    "Total Guests",
    "Attending Names",
    "Groom Train (8th/9th Jan)",
    "Groom Train Passengers",
    "Bride Bus (15th/16th Jan)",
    "Bride Bus Passengers",
    "Special Requirements",
    "Submitted At",
  ];

  const rows = rsvps.map((r) => {
    const t9 = r.transport?.["journey-9"];
    const t16 = r.transport?.["journey-16"];
    const isBride = r.guestSide === "bride";

    const groomTrainVal = !isBride
      ? (t9?.required ? t9.boardingStation || "Kanhangad (Train)" : "NO")
      : (t9?.required ? t9.boardingStation || "Kanhangad (Train)" : "N/A");
    const groomTrainPass = t9?.required ? t9.passengerNames?.join(", ") || t9.passengerCount : "";

    const brideBusVal = isBride
      ? (t16?.required ? t16.boardingStation || "Pravattom (Bus)" : "NO")
      : (t16?.required ? t16.boardingStation || "Pravattom (Bus)" : "N/A");
    const brideBusPass = t16?.required ? t16.passengerNames?.join(", ") || t16.passengerCount : "";

    return [
      escapeCSV(r.primaryGuestName),
      escapeCSV(getSideLabel(r.guestSide)),
      escapeCSV(r.phone),
      escapeCSV(r.email || ""),
      escapeCSV(r.attending ? "Attending" : "Declined"),
      escapeCSV(r.guestCount),
      escapeCSV(r.guests?.map((g) => g.name).join(", ") || ""),
      escapeCSV(groomTrainVal),
      escapeCSV(groomTrainPass),
      escapeCSV(brideBusVal),
      escapeCSV(brideBusPass),
      escapeCSV(r.specialRequirements || ""),
      escapeCSV(typeof r.submittedAt === "string" ? r.submittedAt : ""),
    ].join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  downloadCSV(csv, `Wedding_RSVPs_${filterTag}_${new Date().toISOString().slice(0, 10)}.csv`);
}

/**
 * Export dedicated passenger roster by family side and journey
 */
export function exportSideTransportRoster(
  rsvps: RSVPData[],
  side: "groom" | "bride",
  journeyId: string
) {
  const isGroom = side === "groom";
  const sideName = isGroom ? "Groom_Mulavanal" : "Bride_Pazhayapurayil";
  const journeyConfig = weddingData.transport.journeys.find((j) => j.id === journeyId);
  const journeyLabel =
    journeyConfig?.label || (isGroom ? "8th/9th Jan Train (Kanhangad)" : "15th/16th Jan Bus (Pravattom)");

  const headers = [
    "No.",
    "Passenger Name",
    "Family / Primary Guest",
    "Phone",
    "Side",
    "Transport Mode",
    "Boarding Point",
    "Journey Date & Event",
    "Special Requirements",
  ];

  const rows: string[] = [];
  let counter = 1;

  rsvps.forEach((r) => {
    const guestSide = r.guestSide || "groom";
    if (guestSide !== side) return;

    if (r.attending && r.transport?.[journeyId]?.required) {
      const t = r.transport[journeyId];
      const station =
        t.boardingStation || (isGroom ? "Kanhangad (Railway Station)" : "Pravattom (Bus Pickup)");

      if (t.passengerNames && t.passengerNames.length > 0) {
        t.passengerNames.forEach((pName) => {
          rows.push(
            [
              escapeCSV(counter++),
              escapeCSV(pName),
              escapeCSV(r.primaryGuestName),
              escapeCSV(r.phone),
              escapeCSV(getSideLabel(guestSide)),
              escapeCSV(isGroom ? "TRAIN" : "BUS"),
              escapeCSV(station),
              escapeCSV(journeyLabel),
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
            escapeCSV(getSideLabel(guestSide)),
            escapeCSV(isGroom ? "TRAIN" : "BUS"),
            escapeCSV(station),
            escapeCSV(journeyLabel),
            escapeCSV(r.specialRequirements || ""),
          ].join(",")
        );
      }
    }
  });

  const csv = [headers.join(","), ...rows].join("\n");
  downloadCSV(
    csv,
    `${sideName}_${isGroom ? "Train_8th_9th_Jan_Kanhangad" : "Bus_15th_16th_Jan_Pravattom"}_${new Date().toISOString().slice(0, 10)}.csv`
  );
}

export function exportTrainRosterToCSV(rsvps: RSVPData[], journeyId = "journey-9") {
  exportSideTransportRoster(rsvps, "groom", journeyId);
}

export function exportBusRosterToCSV(rsvps: RSVPData[], journeyId = "journey-16") {
  exportSideTransportRoster(rsvps, "bride", journeyId);
}
