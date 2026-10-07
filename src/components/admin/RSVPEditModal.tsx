"use client";

import React, { useState } from "react";
import { RSVPData, JourneyTransportSelection, GuestSide } from "@/types/rsvp";
import { weddingData } from "@/config/wedding";
import { updateRSVP } from "@/lib/firestore";
import { X, Check, AlertCircle, Train, Bus } from "lucide-react";

export default function RSVPEditModal({
  rsvp,
  onClose,
  onSaved,
}: {
  rsvp: RSVPData;
  onClose: () => void;
  onSaved: () => void;
}) {
  const journeys = weddingData.transport.journeys;
  const maxLimit = weddingData.transport.maxGuests || 10;

  const [guestSide, setGuestSide] = useState<GuestSide>(rsvp.guestSide || "groom");
  const [primaryGuestName, setPrimaryGuestName] = useState(rsvp.primaryGuestName);
  const [phone, setPhone] = useState(rsvp.phone);
  const [email, setEmail] = useState(rsvp.email || "");
  const [attending, setAttending] = useState(rsvp.attending);
  const [guestCount, setGuestCount] = useState(rsvp.guestCount || 1);
  const [guests, setGuests] = useState<{ name: string; category?: "adult" | "child" }[]>(
    rsvp.guests && rsvp.guests.length > 0
      ? rsvp.guests
      : [{ name: rsvp.primaryGuestName }]
  );
  const [specialRequirements, setSpecialRequirements] = useState(
    rsvp.specialRequirements || ""
  );

  const getStationsForSide = (side: GuestSide): string[] => {
    if (side === "bride") {
      return (
        weddingData.transport?.brideTransport?.boardingStations || [
          "Pravattom (Bus Pickup)",
          "Other",
        ]
      );
    }
    return (
      weddingData.transport?.groomTransport?.boardingStations || [
        "Kanhangad (Railway Station)",
        "Other",
      ]
    );
  };

  // Transport selections
  const [transport, setTransport] = useState<{
    [jId: string]: JourneyTransportSelection;
  }>(() => {
    const copy: { [jId: string]: JourneyTransportSelection } = {};
    const defaultSide = rsvp.guestSide || "groom";
    const defaultStations =
      defaultSide === "bride"
        ? weddingData.transport?.brideTransport?.boardingStations || [
            "Pravattom (Bus Pickup)",
            "Other",
          ]
        : weddingData.transport?.groomTransport?.boardingStations || [
            "Kanhangad (Railway Station)",
            "Other",
          ];

    journeys.forEach((j) => {
      const existing = rsvp.transport?.[j.id];
      copy[j.id] = {
        required: existing?.required || false,
        allGuests: existing?.allGuests ?? true,
        passengerNames: existing?.passengerNames || [],
        passengerCount: existing?.passengerCount || 0,
        transportMode:
          existing?.transportMode || (defaultSide === "bride" ? "bus" : "train"),
        boardingStation:
          existing?.boardingStation || defaultStations[0] || "Other",
        customBoardingStation: existing?.customBoardingStation || "",
      };
    });
    return copy;
  });

  const handleSideChange = (newSide: GuestSide) => {
    setGuestSide(newSide);
    const defaultStation =
      newSide === "bride"
        ? weddingData.transport?.brideTransport?.defaultBoarding ||
          "Pravattom (Bus Pickup)"
        : weddingData.transport?.groomTransport?.defaultBoarding ||
          "Kanhangad (Railway Station)";
    const mode = newSide === "bride" ? "bus" : "train";

    setTransport((prev) => {
      const next = { ...prev };
      journeys.forEach((j) => {
        if (next[j.id]) {
          next[j.id] = {
            ...next[j.id],
            transportMode: mode,
            boardingStation: defaultStation,
          };
        }
      });
      return next;
    });
  };

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync guests array when guestCount changes
  const handleGuestCountChange = (newCount: number) => {
    const validCount = Math.max(1, Math.min(newCount, maxLimit));
    setGuestCount(validCount);

    setGuests((prev) => {
      const updated = [...prev];
      if (updated.length < validCount) {
        while (updated.length < validCount) {
          updated.push({ name: `Guest ${updated.length + 1}` });
        }
      } else if (updated.length > validCount) {
        return updated.slice(0, validCount);
      }
      return updated;
    });
  };

  const handleGuestNameChange = (idx: number, name: string) => {
    setGuests((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], name };
      return next;
    });
  };

  const toggleTransportJourney = (jId: string, required: boolean) => {
    setTransport((prev) => ({
      ...prev,
      [jId]: {
        ...prev[jId],
        required,
        passengerCount: required ? guestCount : 0,
        passengerNames: required ? guests.map((g) => g.name) : [],
      },
    }));
  };

  const handleStationChange = (jId: string, station: string) => {
    setTransport((prev) => ({
      ...prev,
      [jId]: {
        ...prev[jId],
        boardingStation: station,
      },
    }));
  };

  const handlePassengerToggle = (jId: string, passengerName: string) => {
    setTransport((prev) => {
      const current = prev[jId];
      const exists = current.passengerNames.includes(passengerName);
      const updatedNames = exists
        ? current.passengerNames.filter((n) => n !== passengerName)
        : [...current.passengerNames, passengerName];

      return {
        ...prev,
        [jId]: {
          ...current,
          passengerNames: updatedNames,
          passengerCount: updatedNames.length,
          allGuests: updatedNames.length === guestCount,
        },
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvp.id) {
      setError("Missing RSVP ID");
      return;
    }
    if (!primaryGuestName.trim()) {
      setError("Primary guest name is required");
      return;
    }
    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await updateRSVP(rsvp.id, {
        primaryGuestName: primaryGuestName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        guestSide,
        attending,
        guestCount: attending ? guestCount : 0,
        guests: attending ? guests : [],
        transport: attending ? transport : {},
        specialRequirements: specialRequirements.trim(),
      });

      onSaved();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update RSVP");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 text-[#211B17] shadow-2xl border border-[#E5DFD5] my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-[#F0EAE1] pb-4 mb-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#211B17]">
              Edit RSVP Details
            </h3>
            <p className="text-xs text-[#7A6C60]">
              Record ID: <span className="font-mono">{rsvp.id}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8E7F74] hover:text-[#211B17] hover:bg-[#F5F2EB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-[#FDF5F7] border border-[#F2D4DA] text-xs text-[#8A243D] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Family Affiliation / Side */}
          <div>
            <label className="block text-xs font-bold text-[#5C4F46] uppercase tracking-wider mb-2">
              Guest Side & Transport Classification *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSideChange("groom")}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border flex flex-col items-center text-center gap-1 ${
                  guestSide === "groom"
                    ? "bg-[#EBF3FB] border-[#1E429F] text-[#1E429F] shadow-xs ring-1 ring-[#1E429F]"
                    : "bg-[#FBF9F5] border-[#E5DFD5] text-[#7A6C60]"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Train className="w-3.5 h-3.5" />
                  <span>🤵 Groom&apos;s Side</span>
                </div>
                <span className="text-[10px] font-normal opacity-85">
                  Mulavanal • Train @ Kanhangad
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSideChange("bride")}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border flex flex-col items-center text-center gap-1 ${
                  guestSide === "bride"
                    ? "bg-[#FBEAEF] border-[#78223B] text-[#78223B] shadow-xs ring-1 ring-[#78223B]"
                    : "bg-[#FBF9F5] border-[#E5DFD5] text-[#7A6C60]"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Bus className="w-3.5 h-3.5" />
                  <span>👰 Bride&apos;s Side</span>
                </div>
                <span className="text-[10px] font-normal opacity-85">
                  Pazhayapurayil • Bus @ Pravattom
                </span>
              </button>
            </div>
          </div>

          {/* Primary details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#5C4F46] uppercase tracking-wider mb-1">
                Primary Guest Name *
              </label>
              <input
                type="text"
                required
                value={primaryGuestName}
                onChange={(e) => setPrimaryGuestName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium focus:outline-none focus:border-[#78223B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5C4F46] uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium focus:outline-none focus:border-[#78223B]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#5C4F46] uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium focus:outline-none focus:border-[#78223B]"
              />
            </div>
          </div>

          {/* Attendance Toggle */}
          <div>
            <label className="block text-xs font-bold text-[#5C4F46] uppercase tracking-wider mb-2">
              Attendance Status
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttending(true)}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                  attending
                    ? "bg-[#E6F4EA] border-[#1B6829] text-[#1B6829]"
                    : "bg-[#FBF9F5] border-[#E5DFD5] text-[#7A6C60]"
                }`}
              >
                ✓ Confirmed Attending
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                  !attending
                    ? "bg-[#FBEAEF] border-[#8A243D] text-[#8A243D]"
                    : "bg-[#FBF9F5] border-[#E5DFD5] text-[#7A6C60]"
                }`}
              >
                ✕ Declined
              </button>
            </div>
          </div>

          {/* If Attending: Guests & Transport */}
          {attending && (
            <>
              {/* Guest Count */}
              <div>
                <label className="block text-xs font-bold text-[#5C4F46] uppercase tracking-wider mb-1">
                  Number of Attending Guests
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={maxLimit}
                    value={guestCount}
                    onChange={(e) => handleGuestCountChange(parseInt(e.target.value) || 1)}
                    className="w-24 px-3 py-2 rounded-lg border border-[#D5C9B8] text-xs font-bold text-center"
                  />
                  <span className="text-xs text-[#7A6C60]">
                    (Maximum allowed: {maxLimit})
                  </span>
                </div>
              </div>

              {/* Guest Names List */}
              <div>
                <label className="block text-xs font-bold text-[#5C4F46] uppercase tracking-wider mb-2">
                  Guest Names
                </label>
                <div className="space-y-2">
                  {guests.map((g, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 text-xs text-[#7A6C60] font-mono">
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={g.name}
                        onChange={(e) => handleGuestNameChange(idx, e.target.value)}
                        placeholder={`Guest ${idx + 1} name`}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-[#D5C9B8] text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Transportation Requirements (Train for Groom / Bus for Bride) */}
              <div className="pt-3 border-t border-[#F0EAE1]">
                <h4 className="text-xs font-bold text-[#5C4F46] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  {guestSide === "bride" ? (
                    <Bus className="w-4 h-4 text-[#78223B]" />
                  ) : (
                    <Train className="w-4 h-4 text-[#78223B]" />
                  )}
                  <span>
                    {guestSide === "bride"
                      ? "Chartered Bus Transportation (Bride's Side • Pravattom)"
                      : "Train Transportation (Groom's Side • Kanhangad)"}
                  </span>
                </h4>

                <div className="space-y-4">
                  {journeys.map((j) => {
                    const sel = transport[j.id];
                    const isBus = guestSide === "bride";
                    const currentStations = getStationsForSide(guestSide);

                    return (
                      <div
                        key={j.id}
                        className={`p-4 rounded-xl border ${
                          isBus
                            ? "border-[#F5C2C7] bg-[#FEF8F9]"
                            : "border-[#E5DFD5] bg-[#FAF8F5]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-[#211B17]">
                            {isBus ? "🚌" : "🚆"} {j.label} {isBus ? "Chartered Bus" : "Train"} ({j.date})
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleTransportJourney(j.id, true)}
                              className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                                sel?.required
                                  ? isBus
                                    ? "bg-[#78223B] text-white"
                                    : "bg-[#1E429F] text-white"
                                  : "bg-white border text-[#5C4F46]"
                              }`}
                            >
                              Yes, Required
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleTransportJourney(j.id, false)}
                              className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                                !sel?.required
                                  ? "bg-[#6B7280] text-white"
                                  : "bg-white border text-[#5C4F46]"
                              }`}
                            >
                              No
                            </button>
                          </div>
                        </div>

                        {sel?.required && (
                          <div className="space-y-3 pt-3 border-t border-[#EBE4D8]">
                            <div>
                              <label className="block text-[11px] font-bold text-[#5C4F46] mb-1">
                                {isBus ? "Bus Pickup Point" : "Boarding Railway Station"}
                              </label>
                              <select
                                value={sel.boardingStation}
                                onChange={(e) =>
                                  handleStationChange(j.id, e.target.value)
                                }
                                className="w-full px-3 py-1.5 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium"
                              >
                                {currentStations.map((stn: string) => (
                                  <option key={stn} value={stn}>
                                    {stn}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {sel.boardingStation === "Other" && (
                              <div>
                                <label className="block text-[11px] font-bold text-[#5C4F46] mb-1">
                                  Custom Station
                                </label>
                                <input
                                  type="text"
                                  value={sel.customBoardingStation || ""}
                                  onChange={(e) =>
                                    setTransport((prev) => ({
                                      ...prev,
                                      [j.id]: {
                                        ...prev[j.id],
                                        customBoardingStation: e.target.value,
                                      },
                                    }))
                                  }
                                  placeholder="Specify station"
                                  className="w-full px-3 py-1.5 rounded-lg border border-[#D5C9B8] bg-white text-xs"
                                />
                              </div>
                            )}

                            <div>
                              <label className="block text-[11px] font-bold text-[#5C4F46] mb-1">
                                Select Passengers ({sel.passengerNames.length} selected)
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {guests.map((g, gIdx) => {
                                  const isSelected = sel.passengerNames.includes(
                                    g.name
                                  );
                                  return (
                                    <label
                                      key={gIdx}
                                      className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer ${
                                        isSelected
                                          ? "bg-[#EBF3FB] border-[#A8CEF3] text-[#1E429F]"
                                          : "bg-white border-[#E5DFD5] text-[#5C4F46]"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() =>
                                          handlePassengerToggle(j.id, g.name)
                                        }
                                        className="rounded text-[#1E429F]"
                                      />
                                      <span>{g.name}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Special Requirements */}
          <div>
            <label className="block text-xs font-bold text-[#5C4F46] uppercase tracking-wider mb-1">
              Special Requirements & Organizer Notes
            </label>
            <textarea
              rows={2}
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium focus:outline-none focus:border-[#78223B]"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#F5F2EB] text-[#5C4F46] hover:bg-[#EAE4D7]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#78223B] text-white hover:bg-[#5C1A2D] flex items-center gap-1.5 shadow-xs"
            >
              {saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
