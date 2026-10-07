"use client";

import React from "react";
import { RSVPData } from "@/types/rsvp";
import { weddingData } from "@/config/wedding";
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  Train,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

export default function RSVPDetailsModal({
  rsvp,
  onClose,
  onEdit,
}: {
  rsvp: RSVPData;
  onClose: () => void;
  onEdit?: () => void;
}) {
  const journeys = weddingData.transport.journeys;

  const formatDate = (val?: unknown) => {
    if (!val) return "N/A";
    if (typeof val === "object" && val !== null && "seconds" in val) {
      return new Date((val as { seconds: number }).seconds * 1000).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    try {
      return new Date(String(val)).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return String(val);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 text-[#211B17] shadow-2xl border border-[#E5DFD5] my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F0EAE1] pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-[#78223B] font-bold">✝</span>
              <h3 className="font-serif text-2xl font-bold text-[#211B17]">
                {rsvp.primaryGuestName}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider ${
                  rsvp.attending
                    ? "bg-[#E6F4EA] text-[#1B6829] border border-[#C6E1C6]"
                    : "bg-[#FBEAEF] text-[#8A243D] border border-[#F2D4DA]"
                }`}
              >
                {rsvp.attending ? "Attending" : "Declined"}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide ${
                  rsvp.guestSide === "bride"
                    ? "bg-[#FBEAEF] text-[#78223B] border border-[#F2D4DA]"
                    : "bg-[#EBF3FB] text-[#1E429F] border border-[#C3D9EE]"
                }`}
              >
                <span>{rsvp.guestSide === "bride" ? "👰 Bride's Side (Pazhayapurayil)" : "🤵 Groom's Side (Mulavanal)"}</span>
              </span>
              <span className="text-xs text-[#7A6C60] font-sans">
                • RSVP Record: <span className="font-mono text-[11px]">{rsvp.id}</span>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8E7F74] hover:text-[#211B17] hover:bg-[#F5F2EB] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guest Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#FAF7F2] rounded-xl border border-[#EBE4D8] mb-6">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#78223B]" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E7F74] block">
                Phone Number
              </span>
              <a
                href={`tel:${rsvp.phone}`}
                className="text-xs font-semibold text-[#211B17] hover:underline"
              >
                {rsvp.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-[#78223B]" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E7F74] block">
                Email Address
              </span>
              <span className="text-xs text-[#211B17]">
                {rsvp.email || "Not provided"}
              </span>
            </div>
          </div>
        </div>

        {/* Attending Guests Section */}
        {rsvp.attending ? (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C4F46] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#78223B]" />
                <span>Attending Guests ({rsvp.guestCount})</span>
              </h4>
            </div>

            <div className="bg-white rounded-xl border border-[#E5DFD5] divide-y divide-[#F0EAE1] overflow-hidden">
              {rsvp.guests && rsvp.guests.length > 0 ? (
                rsvp.guests.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-3 flex items-center justify-between text-xs text-[#211B17]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#FAF0DC] text-[#78223B] font-bold text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-semibold">{g.name}</span>
                    </div>
                    {g.category && (
                      <span className="text-[10px] text-[#7A6C60] uppercase px-2 py-0.5 rounded bg-[#F5F2EB]">
                        {g.category}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-3 text-xs text-[#7A6C60]">
                  1. {rsvp.primaryGuestName}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-xl bg-[#FDF5F7] border border-[#F2D4DA] text-xs text-[#8A243D]">
            Guest has declined the invitation. No transport or seats requested.
          </div>
        )}

        {/* Transportation Section (Train for Groom / Bus for Bride) */}
        {rsvp.attending && (
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C4F46] flex items-center gap-1.5 mb-3">
              <Train className="w-4 h-4 text-[#78223B]" />
              <span>
                {rsvp.guestSide === "bride"
                  ? "Chartered Bus Transportation (Bride's Side • Pravattom)"
                  : "Train Transportation (Groom's Side • Kanhangad)"}
              </span>
            </h4>

            <div className="space-y-3">
              {journeys.map((j) => {
                const selection = rsvp.transport?.[j.id];
                const isRequired = selection?.required;
                const isBus = selection?.transportMode === "bus" || rsvp.guestSide === "bride";
                const modeIcon = isBus ? "🚌" : "🚆";
                const modeLabel = isBus ? "Chartered Bus" : "Train";
                const station =
                  selection?.boardingStation === "Other" &&
                  selection?.customBoardingStation
                    ? `${selection.customBoardingStation} (Other)`
                    : selection?.boardingStation || (isBus ? "Pravattom (Bus Pickup)" : "Kanhangad (Railway Station)");

                return (
                  <div
                    key={j.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isRequired
                        ? isBus
                          ? "bg-[#FEF6F7] border-[#F5C2C7]"
                          : "bg-[#F7FAFC] border-[#C3D9EE]"
                        : "bg-[#FAFAFA] border-[#E8E8E8]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-serif text-[#211B17]">
                          {modeIcon} {j.label} {modeLabel} ({j.date})
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase ${
                            isRequired
                              ? isBus
                                ? "bg-[#FBEAEF] text-[#78223B]"
                                : "bg-[#E1EFFE] text-[#1E429F]"
                              : "bg-[#F3F4F6] text-[#6B7280]"
                          }`}
                        >
                          {isRequired ? "Required" : "Not Required"}
                        </span>
                      </div>

                      {isRequired && (
                        <span
                          className={`text-xs font-bold ${
                            isBus ? "text-[#78223B]" : "text-[#1E429F]"
                          }`}
                        >
                          {selection?.passengerCount || 0} Passengers
                        </span>
                      )}
                    </div>

                    {isRequired ? (
                      <div className="space-y-2 mt-3 pt-3 border-t border-[#E1EFFE] text-xs">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#1E429F]" />
                          <span className="text-[#5C4F46]">Boarding Station:</span>
                          <span className="font-bold text-[#211B17]">{station}</span>
                        </div>

                        <div>
                          <span className="text-[#5C4F46] block mb-1">
                            Travelling Passengers:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {selection?.passengerNames &&
                            selection.passengerNames.length > 0 ? (
                              selection.passengerNames.map((p, pIdx) => (
                                <span
                                  key={pIdx}
                                  className="px-2 py-0.5 rounded-full bg-white border border-[#C3D9EE] text-[#1E429F] text-[11px] font-medium"
                                >
                                  {p}
                                </span>
                              ))
                            ) : (
                              <span className="text-[#7A6C60] italic">
                                All attending guests ({rsvp.guestCount})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-[#8E7F74]">
                        Guest will arrange their own transportation.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Special Requirements */}
        {rsvp.specialRequirements && (
          <div className="mb-6 p-4 rounded-xl bg-[#FFFBF0] border border-[#F3E5C8]">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8E681C] flex items-center gap-1.5 mb-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Special Requirements & Notes</span>
            </h4>
            <p className="text-xs text-[#5C4F46] leading-relaxed">
              {rsvp.specialRequirements}
            </p>
          </div>
        )}

        {/* Timestamps */}
        <div className="pt-4 border-t border-[#F0EAE1] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8E7F74]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Submitted: {formatDate(rsvp.submittedAt)}</span>
          </div>
          {rsvp.updatedAt && (
            <div className="flex items-center gap-1.5">
              <span>Last Updated: {formatDate(rsvp.updatedAt)}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#F0EAE1] flex items-center justify-end gap-3">
          {onEdit && (
            <button
              onClick={() => {
                onClose();
                onEdit();
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#78223B] text-white hover:bg-[#5C1A2D] transition-colors"
            >
              Edit This RSVP
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#F5F2EB] text-[#5C4F46] hover:bg-[#EAE4D7] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
