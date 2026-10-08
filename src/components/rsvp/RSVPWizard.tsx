"use client";

import React, { useState, useEffect, useMemo } from "react";
import { weddingData } from "@/config/wedding";
import { RSVPData, JourneyTransportSelection } from "@/types/rsvp";
import { saveRSVP, findRSVPByPhone } from "@/lib/firestore";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Train,
  Heart,
  User,
  Phone,
  Mail,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Minus,
  Plus,
  CheckCircle2,
  Send,
  Bus,
  Info,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function RSVPWizard({ onCompleted }: { onCompleted?: () => void }) {
  const { transport } = weddingData;
  const journeys = transport.journeys.filter((j) => j.enabled);

  // Wizard state: 1: Attendance, 2: Family & Guest Count, 3: Guest Names & Contact, 4: Transport, 5: Review, 6: Success
  const [step, setStep] = useState<number>(1);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestSide, setGuestSide] = useState<"groom" | "bride">("groom");

  // Applicable journey for the selected family side:
  // - Groom side: ONLY Train departing 8th Jan night (reaching 9th Jan for Engagement)
  // - Bride side: ONLY Bus departing 15th Jan (reaching 16th Jan for Holy Matrimony & Lunch)
  const applicableJourneys = useMemo(() => {
    return journeys.filter((j) => {
      if (guestSide === "groom") {
        return j.id === "journey-9" || j.side === "groom";
      }
      if (guestSide === "bride") {
        return j.id === "journey-16" || j.side === "bride";
      }
      return true;
    });
  }, [journeys, guestSide]);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [guestNames, setGuestNames] = useState<string[]>([""]);
  const [primaryName, setPrimaryName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [specialRequirements, setSpecialRequirements] = useState<string>("");

  // Transport state per journey
  const [transportSelections, setTransportSelections] = useState<{
    [journeyId: string]: JourneyTransportSelection;
  }>(() => {
    const initial: { [id: string]: JourneyTransportSelection } = {};
    journeys.forEach((j) => {
      initial[j.id] = {
        required: false,
        allGuests: true,
        passengerNames: [],
        passengerCount: 1,
        boardingStation: transport.boardingStations[0] || "Kottayam",
        customBoardingStation: "",
      };
    });
    return initial;
  });

  // Duplicate RSVP detection state
  const [existingRecord, setExistingRecord] = useState<RSVPData | null>(null);
  const [isUpdatingExisting, setIsUpdatingExisting] = useState<boolean>(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState<boolean>(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  // Sync guest names array when guest count changes
  useEffect(() => {
    setGuestNames((prev) => {
      const updated = [...prev];
      if (updated.length < guestCount) {
        while (updated.length < guestCount) {
          updated.push("");
        }
      } else if (updated.length > guestCount) {
        return updated.slice(0, guestCount);
      }
      return updated;
    });
  }, [guestCount]);

  // When primaryName changes, auto-fill guest 1
  useEffect(() => {
    if (primaryName) {
      setGuestNames((prev) => {
        const next = [...prev];
        next[0] = primaryName;
        return next;
      });
    }
  }, [primaryName]);

  // Check for duplicate RSVP by phone
  const handlePhoneBlur = async () => {
    if (phone.trim().length >= 8) {
      setIsCheckingPhone(true);
      try {
        const found = await findRSVPByPhone(phone);
        if (found) {
          setExistingRecord(found);
        } else {
          setExistingRecord(null);
        }
      } catch (e) {
        console.warn("Duplicate phone check error:", e);
      } finally {
        setIsCheckingPhone(false);
      }
    }
  };

  // Load existing record for editing
  const handleLoadExisting = () => {
    if (!existingRecord) return;
    setIsUpdatingExisting(true);
    setAttending(existingRecord.attending);
    if (existingRecord.guestSide) {
      setGuestSide(existingRecord.guestSide);
    }
    setGuestCount(existingRecord.guestCount || 1);
    setPrimaryName(existingRecord.primaryGuestName || "");
    setEmail(existingRecord.email || "");
    setSpecialRequirements(existingRecord.specialRequirements || "");

    if (existingRecord.guests && existingRecord.guests.length > 0) {
      setGuestNames(existingRecord.guests.map((g) => g.name));
    }

    if (existingRecord.transport) {
      setTransportSelections(existingRecord.transport);
    }
  };

  // Transport toggle for a journey
  const toggleJourneyRequired = (journeyId: string, required: boolean) => {
    setTransportSelections((prev) => ({
      ...prev,
      [journeyId]: {
        ...prev[journeyId],
        required,
        allGuests: true,
        passengerCount: required ? guestCount : 0,
        passengerNames: required ? guestNames.filter(Boolean) : [],
      },
    }));
  };

  // Transport passenger toggle
  const togglePassengerForJourney = (journeyId: string, name: string) => {
    setTransportSelections((prev) => {
      const current = prev[journeyId];
      const exists = current.passengerNames.includes(name);
      const newNames = exists
        ? current.passengerNames.filter((n) => n !== name)
        : [...current.passengerNames, name];

      return {
        ...prev,
        [journeyId]: {
          ...current,
          passengerNames: newNames,
          passengerCount: newNames.length,
          allGuests: newNames.length === guestCount,
        },
      };
    });
  };

  // Handle final submission to Firestore
  const handleSubmitRSVP = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validate guest names
      const validGuests = guestNames.map((name, idx) => ({
        name: name.trim() || `Guest ${idx + 1}`,
      }));

      // Default station and transport mode based on guest side
      const defaultStation =
        guestSide === "bride" ? "Pravattom (Bus)" : "Kanhangad (Train)";
      const defaultMode = guestSide === "bride" ? "bus" : "train";

      // Prepare transport payload
      const cleanedTransport: RSVPData["transport"] = {};
      journeys.forEach((j) => {
        const t = transportSelections[j.id];
        if (attending && t && t.required) {
          cleanedTransport[j.id] = {
            required: true,
            allGuests: t.allGuests,
            passengerNames: t.allGuests
              ? validGuests.map((g) => g.name)
              : t.passengerNames.filter(Boolean),
            passengerCount: t.allGuests ? validGuests.length : t.passengerNames.length,
            boardingStation: defaultStation,
            transportMode: defaultMode,
          };
        } else {
          cleanedTransport[j.id] = {
            required: false,
            allGuests: false,
            passengerNames: [],
            passengerCount: 0,
            boardingStation: defaultStation,
            transportMode: defaultMode,
          };
        }
      });

      const payload: Omit<RSVPData, "id"> = {
        primaryGuestName: primaryName.trim() || validGuests[0]?.name || "Guest",
        phone: phone.trim(),
        email: email.trim(),
        guestSide,
        attending: Boolean(attending),
        guestCount: attending ? guestCount : 0,
        guests: attending ? validGuests : [],
        transport: cleanedTransport,
        specialRequirements: specialRequirements.trim(),
        submittedAt: existingRecord?.submittedAt || new Date().toISOString(),
      };

      const docId = await saveRSVP(payload, existingRecord?.id);
      setConfirmedId(docId);
      setStep(6); // Confirmation step

      // Trigger celebration
      if (attending) {
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#D4A33B", "#78223B", "#FAF7F2", "#E8C16A"],
          });
        } catch {
          // Fallback
        }
      }

      if (onCompleted) onCompleted();
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError("Failed to save response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // STEP 1: Attendance
  if (step === 1) {
    return (
      <div className="space-y-6 text-center animate-fade-in">
        <div className="space-y-2">
          <span className="text-xs text-[#D4A33B] font-bold">✝</span>
          <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#211B17] font-bold">
            We Would Love to Have You With Us
          </h3>
          <p className="font-serif-luxury italic text-sm sm:text-base text-[#5C4F46] max-w-md mx-auto">
            Your presence would make our celebration even more special.
          </p>
        </div>

        <div className="py-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8E681C] font-sans-clean font-bold mb-4">
            Will You Be Joining Us?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <button
              onClick={() => {
                setAttending(true);
                setStep(2);
              }}
              className="py-4 px-6 rounded-xl border-2 border-[#D4A33B] bg-[#78223B] hover:bg-[#58182B] text-white text-xs uppercase tracking-[0.2em] font-sans-clean font-bold transition-all shadow-md hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 text-[#F2DC9B]" />
              <span>Yes, I&apos;ll Be There</span>
            </button>

            <button
              onClick={() => {
                setAttending(false);
                setGuestCount(0);
                setStep(3); // Go straight to contact details for decline
              }}
              className="py-4 px-6 rounded-xl border-2 border-[#D4A33B]/40 hover:border-[#78223B] bg-white text-[#5C4F46] hover:text-[#78223B] text-xs uppercase tracking-[0.2em] font-sans-clean font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>Sorry, I Can&apos;t Attend</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: Family Affiliation & Guest Count
  if (step === 2) {
    return (
      <div className="space-y-6 text-center animate-fade-in max-w-md mx-auto">
        <div className="space-y-1">
          <span className="text-xs text-[#D4A33B] font-bold">✝</span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#211B17] font-bold">
            Family &amp; Guest Count
          </h3>
          <p className="text-xs text-[#5C4F46] font-sans-clean">
            Please select which family you are joining and how many will attend.
          </p>
        </div>

        {/* Family Affiliation Selection */}
        <div className="space-y-2 text-left pt-1">
          <label className="block text-[11px] uppercase tracking-wider text-[#78223B] font-sans-clean font-bold text-center mb-1">
            Which family side are you celebrating with? *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGuestSide("groom")}
              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all text-left flex items-start gap-2.5 ${
                guestSide === "groom"
                  ? "bg-[#FAF0DC] border-[#78223B] shadow-sm ring-2 ring-[#78223B]/20"
                  : "bg-white border-[#D4A33B]/40 hover:bg-[#FAF7F2]"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#78223B] text-[#F2DC9B] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                M
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-[#211B17] truncate">
                  Groom&apos;s Side
                </p>
                <p className="text-[11px] text-[#8E681C] font-semibold truncate">
                  Mishel Mathew (Mulavanal)
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#5C4F46] mt-1 bg-white/90 px-1.5 py-0.5 rounded border border-[#D4A33B]/30 font-medium">
                  <Train className="w-3 h-3 text-[#78223B]" />
                  <span>Train • Kanhangad</span>
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setGuestSide("bride")}
              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all text-left flex items-start gap-2.5 ${
                guestSide === "bride"
                  ? "bg-[#FAF0DC] border-[#78223B] shadow-sm ring-2 ring-[#78223B]/20"
                  : "bg-white border-[#D4A33B]/40 hover:bg-[#FAF7F2]"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#78223B] text-[#F2DC9B] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                S
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-[#211B17] truncate">
                  Bride&apos;s Side
                </p>
                <p className="text-[11px] text-[#8E681C] font-semibold truncate">
                  Sara Jose (Pazhayapurayil)
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#5C4F46] mt-1 bg-white/90 px-1.5 py-0.5 rounded border border-[#D4A33B]/30 font-medium">
                  <Bus className="w-3 h-3 text-[#78223B]" />
                  <span>Bus • Pravattom</span>
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Quantity Stepper Heading */}
        <div className="pt-2">
          <label className="block text-[11px] uppercase tracking-wider text-[#5C4F46] font-sans-clean font-bold mb-1">
            Number of Attending Guests:
          </label>
        </div>

        {/* Quantity Stepper */}
        <div className="py-2 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
            disabled={guestCount <= 1}
            className="w-12 h-12 rounded-full border-2 border-[#D4A33B]/40 disabled:opacity-40 hover:border-[#78223B] flex items-center justify-center text-[#78223B] transition-all cursor-pointer bg-[#FAF7F2]"
          >
            <Minus className="w-5 h-5" />
          </button>

          <span className="font-poppins text-5xl sm:text-6xl font-extrabold text-[#78223B] w-20 text-center">
            {guestCount}
          </span>

          <button
            type="button"
            onClick={() =>
              setGuestCount((prev) => Math.min(transport.maxGuests, prev + 1))
            }
            disabled={guestCount >= transport.maxGuests}
            className="w-12 h-12 rounded-full border-2 border-[#D4A33B]/40 disabled:opacity-40 hover:border-[#78223B] flex items-center justify-center text-[#78223B] transition-all cursor-pointer bg-[#FAF7F2]"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#D4A33B]/30">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-xs text-[#5C4F46] hover:text-[#78223B] font-sans-clean font-bold flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={() => setStep(3)}
            className="px-6 py-2.5 rounded-full bg-[#78223B] hover:bg-[#58182B] text-white text-xs uppercase tracking-wider font-sans-clean font-bold flex items-center gap-1 cursor-pointer shadow-md"
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // STEP 3: Guest Names & Contact
  if (step === 3) {
    return (
      <div className="space-y-6 text-left animate-fade-in max-w-lg mx-auto">
        <div className="text-center space-y-1 mb-4">
          <span className="text-xs text-[#D4A33B] font-bold">✝</span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#211B17] font-bold">
            {attending ? "Guest & Contact Details" : "Your Contact Details"}
          </h3>
          <p className="text-xs text-[#5C4F46] font-sans-clean">
            {attending
              ? "Please provide names for each attending guest."
              : "Let us know your name and contact so we can acknowledge your response."}
          </p>
        </div>

        {/* Duplicate detection notification */}
        {existingRecord && !isUpdatingExisting && (
          <div className="p-4 rounded-xl bg-[#FFF8EC] border-2 border-[#D4A33B] flex items-start gap-3 text-xs text-[#211B17]">
            <AlertCircle className="w-5 h-5 text-[#8E681C] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-[#78223B]">
                Existing Response Found for this Phone Number
              </p>
              <p className="text-[#5C4F46] mt-0.5">
                We found an RSVP under &ldquo;{existingRecord.primaryGuestName}&rdquo; (
                {existingRecord.attending ? "Attending" : "Declined"}).
              </p>
              <button
                type="button"
                onClick={handleLoadExisting}
                className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded bg-[#78223B] text-white text-[11px] font-sans-clean font-bold hover:bg-[#58182B]"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Load & Update Previous Response</span>
              </button>
            </div>
          </div>
        )}

        {/* Primary Contact Information */}
        <div className="space-y-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#D4A33B]/30">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#5C4F46] font-sans-clean font-bold mb-1">
              Primary Guest Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8E681C] absolute left-3 top-3" />
              <input
                type="text"
                required
                value={primaryName}
                onChange={(e) => setPrimaryName(e.target.value)}
                placeholder="e.g. Thomas Philip"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#D4A33B]/50 bg-white text-sm text-[#211B17] focus:outline-none focus:border-[#78223B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5C4F46] font-sans-clean font-bold mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8E681C] absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onBlur={handlePhoneBlur}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#D4A33B]/50 bg-white text-sm text-[#211B17] focus:outline-none focus:border-[#78223B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5C4F46] font-sans-clean font-bold mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E681C] absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#D4A33B]/50 bg-white text-sm text-[#211B17] focus:outline-none focus:border-[#78223B]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Guest Names Generation */}
        {attending && guestCount > 1 && (
          <div className="space-y-3">
            <label className="block text-[11px] uppercase tracking-wider text-[#78223B] font-sans-clean font-bold">
              Additional Attending Guests:
            </label>
            {guestNames.slice(1).map((name, index) => {
              const guestNumber = index + 2;
              return (
                <div key={guestNumber} className="flex items-center gap-2">
                  <span className="text-xs font-poppins font-bold text-[#8E681C] w-16 flex-shrink-0">
                    Guest {guestNumber}:
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      const updated = [...guestNames];
                      updated[index + 1] = e.target.value;
                      setGuestNames(updated);
                    }}
                    placeholder={`Full Name of Guest ${guestNumber}`}
                    className="flex-1 px-3.5 py-2 rounded-lg border border-[#D4A33B]/40 bg-white text-sm text-[#211B17] focus:outline-none focus:border-[#78223B]"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Decline Note */}
        {!attending && (
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4A33B]/30 text-center">
            <p className="font-serif-luxury italic text-sm text-[#5C4F46]">
              &ldquo;We&apos;re sorry we won&apos;t be celebrating together, but thank you
              for letting us know.&rdquo;
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-[#D4A33B]/30">
          <button
            type="button"
            onClick={() => setStep(attending ? 2 : 1)}
            className="text-xs text-[#5C4F46] hover:text-[#78223B] font-sans-clean font-bold flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            disabled={!primaryName.trim() || phone.trim().length < 8}
            onClick={() => setStep(attending ? 4 : 5)} // Skip transport if declining
            className="px-6 py-2.5 rounded-full bg-[#78223B] hover:bg-[#58182B] disabled:opacity-40 text-white text-xs uppercase tracking-wider font-sans-clean font-bold flex items-center gap-1 cursor-pointer shadow-md"
          >
            <span>{attending ? "Continue to Transport" : "Review Response"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // STEP 4: Transportation (Groom: Train on 8th reaching 9th / Bride: Bus on 15th reaching 16th)
  if (step === 4) {
    const isGroom = guestSide === "groom";
    const transportTitle = isGroom
      ? "🚆 Train Travel (Groom's Side • Mulavanal)"
      : "🚌 Bus Travel (Bride's Side • Pazhayapurayil)";
    const boardingDesc = isGroom
      ? "Train travel arrangements will be coordinated from Kanhangad Railway Station departing on Friday night, 8th January (reaching Saturday morning, 9th January for the Sacred Betrothal)."
      : "Chartered bus arrangements will be coordinated from Pravattom departing on Friday, 15th January (reaching Saturday, 16th January for the Holy Matrimony & Lunch).";

    return (
      <div className="space-y-6 text-left animate-fade-in max-w-xl mx-auto">
        <div className="text-center space-y-1 mb-4">
          <span className="text-xs text-[#D4A33B] font-bold">✝</span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#211B17] font-bold">
            {isGroom ? "Train Transportation" : "Bus Transportation"}
          </h3>
          <p className="text-xs text-[#5C4F46] font-sans-clean max-w-md mx-auto">
            {boardingDesc} Please indicate if you require this coordinated travel:
          </p>
        </div>

        {/* Side Info Pill */}
        <div className="p-3.5 rounded-xl bg-[#FAF0DC] border border-[#D4A33B]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            {isGroom ? (
              <Train className="w-4 h-4 text-[#78223B]" />
            ) : (
              <Bus className="w-4 h-4 text-[#78223B]" />
            )}
            <span className="font-bold text-[#78223B]">{transportTitle}</span>
          </div>
          <span className="text-[11px] font-bold text-[#8E681C] uppercase tracking-wider">
            {isGroom ? "Boarding: Kanhangad (Train)" : "Boarding: Pravattom (Bus)"}
          </span>
        </div>

        {/* Coordinated Journey Card */}
        <div className="space-y-5">
          {applicableJourneys.map((j) => {
            const currentSelection = transportSelections[j.id];
            const isReq = currentSelection.required;

            return (
              <div
                key={j.id}
                className={`p-5 rounded-xl border-2 transition-all ${
                  isReq
                    ? "bg-[#FFF9EE] border-[#D4A33B] shadow-md"
                    : "bg-white border-[#D4A33B]/30"
                }`}
              >
                {/* Journey Title & Date */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded bg-[#FAF0DC] text-[#78223B]">
                      {isGroom ? (
                        <Train className="w-4 h-4" />
                      ) : (
                        <Bus className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-poppins text-base font-bold text-[#211B17]">
                        {isGroom ? "🚆" : "🚌"} {j.label.toUpperCase()}
                      </h4>
                      <p className="text-[11px] text-[#5C4F46] font-sans-clean">
                        {j.eventName}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs font-sans-clean text-[#5C4F46] mb-3 font-semibold">
                  Will you require {isGroom ? "train transport from Kanhangad" : "bus transport from Pravattom"} on the {j.shortLabel}?
                </p>

                {/* Yes / No Choice Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => toggleJourneyRequired(j.id, true)}
                    className={`py-2 px-3 text-xs uppercase tracking-wider font-sans-clean font-bold rounded-lg border text-center cursor-pointer transition-all ${
                      isReq
                        ? "bg-[#78223B] text-white border-[#78223B] shadow-sm"
                        : "border-[#D4A33B]/40 text-[#5C4F46] bg-white hover:border-[#78223B]"
                    }`}
                  >
                    Yes, I Need Transport
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleJourneyRequired(j.id, false)}
                    className={`py-2 px-3 text-xs uppercase tracking-wider font-sans-clean font-bold rounded-lg border text-center cursor-pointer transition-all ${
                      !isReq
                        ? "bg-[#FAF7F2] text-[#78223B] border-[#78223B]/40 font-extrabold"
                        : "border-[#D4A33B]/40 text-[#5C4F46] bg-white"
                    }`}
                  >
                    No, I&apos;ll Arrange Travel
                  </button>
                </div>

                {/* Progressive disclosure for Boarding & Passengers */}
                {isReq && (
                  <div className="space-y-4 pt-3 border-t border-[#D4A33B]/30 animate-fade-in">
                    {/* Fixed Boarding Point Callout */}
                    <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#D4A33B]/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isGroom ? (
                          <Train className="w-4 h-4 text-[#78223B]" />
                        ) : (
                          <Bus className="w-4 h-4 text-[#78223B]" />
                        )}
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#8E681C] font-bold block">
                            Designated Boarding Point:
                          </span>
                          <span className="font-bold text-xs text-[#211B17]">
                            {isGroom
                              ? "Kanhangad Railway Station (Train)"
                              : "Pravattom Pickup Point (Bus)"}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF0DC] text-[#78223B]">
                        Confirmed
                      </span>
                    </div>

                    {/* All Guests vs Partial Passenger Selection */}
                    {guestCount > 1 && (
                      <div className="pt-2">
                        <label className="block text-[11px] uppercase tracking-wider text-[#5C4F46] font-sans-clean font-bold mb-1">
                          Will all attending guests ({guestCount}) travel by this {isGroom ? "train" : "bus"}?
                        </label>
                        <div className="flex gap-4 mb-2">
                          <label className="flex items-center gap-1.5 text-xs cursor-pointer font-medium">
                            <input
                              type="radio"
                              name={`allGuests-${j.id}`}
                              checked={currentSelection.allGuests}
                              onChange={() =>
                                setTransportSelections((prev) => ({
                                  ...prev,
                                  [j.id]: {
                                    ...prev[j.id],
                                    allGuests: true,
                                    passengerCount: guestCount,
                                    passengerNames: guestNames.filter(Boolean),
                                  },
                                }))
                              }
                              className="accent-[#78223B]"
                            />
                            <span>Yes, all {guestCount} guests</span>
                          </label>

                          <label className="flex items-center gap-1.5 text-xs cursor-pointer font-medium">
                            <input
                              type="radio"
                              name={`allGuests-${j.id}`}
                              checked={!currentSelection.allGuests}
                              onChange={() =>
                                setTransportSelections((prev) => ({
                                  ...prev,
                                  [j.id]: {
                                    ...prev[j.id],
                                    allGuests: false,
                                  },
                                }))
                              }
                              className="accent-[#78223B]"
                            />
                            <span>No, select passengers</span>
                          </label>
                        </div>

                        {/* Passenger Checkboxes */}
                        {!currentSelection.allGuests && (
                          <div className="p-3 rounded-lg bg-white border border-[#D4A33B]/40 space-y-1.5">
                            <span className="text-[10px] uppercase font-bold text-[#8E681C] block mb-1">
                              Who will be travelling?
                            </span>
                            {guestNames.map((name, idx) => {
                              const displayName = name.trim() || `Guest ${idx + 1}`;
                              const isChecked = currentSelection.passengerNames.includes(
                                displayName
                              );
                              return (
                                <label
                                  key={idx}
                                  className="flex items-center gap-2 text-xs font-sans-clean cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() =>
                                      togglePassengerForJourney(j.id, displayName)
                                    }
                                    className="accent-[#78223B] w-4 h-4 rounded"
                                  />
                                  <span>{displayName}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Family Travel Scope Clarification Note */}
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4A33B]/40 text-xs text-[#5C4F46] flex items-start gap-3">
          <Info className="w-4 h-4 text-[#8E681C] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#78223B] block">
              {isGroom
                ? "Holy Matrimony & Lunch (16th Jan) Travel Notice:"
                : "Sacred Betrothal (9th Jan) Travel Notice:"}
            </span>
            <p className="leading-relaxed">
              {isGroom
                ? "Groom's family coordinates train travel exclusively for the Sacred Betrothal (departing Friday night, 8th Jan from Kanhangad, reaching Saturday morning, 9th Jan). Transportation for the Wedding on 16th Jan is self-arranged."
                : "Bride's family coordinates chartered bus travel exclusively for the Holy Matrimony & Lunch (departing Friday, 15th Jan from Pravattom, reaching Saturday, 16th Jan). Transportation for the Engagement on 9th Jan is self-arranged."}
            </p>
          </div>
        </div>

        {/* Special Requirements Note */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-[#5C4F46] font-sans-clean font-bold mb-1">
            Anything else we should know? (Optional)
          </label>
          <textarea
            rows={2}
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            placeholder="Special travel requirements, accessibility needs, or dietary notes..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4A33B]/40 bg-white text-xs text-[#211B17] focus:outline-none focus:border-[#78223B]"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#D4A33B]/30">
          <button
            type="button"
            onClick={() => setStep(3)}
            className="text-xs text-[#5C4F46] hover:text-[#78223B] font-sans-clean font-bold flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={() => setStep(5)}
            className="px-6 py-2.5 rounded-full bg-[#78223B] hover:bg-[#58182B] text-white text-xs uppercase tracking-wider font-sans-clean font-bold flex items-center gap-1 cursor-pointer shadow-md"
          >
            <span>Review RSVP</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // STEP 5: RSVP Review Summary Before Save
  if (step === 5) {
    return (
      <div className="space-y-6 text-left animate-fade-in max-w-lg mx-auto">
        <div className="text-center space-y-1 mb-4">
          <span className="text-xs text-[#D4A33B] font-bold">✝</span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#211B17] font-bold">
            Review Your Response
          </h3>
          <p className="text-xs text-[#5C4F46] font-sans-clean">
            Please verify your details before submitting to the family.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border-2 border-[#D4A33B] shadow-md space-y-4 text-xs font-sans-clean text-[#211B17]">
          {/* Guest & Attendance */}
          <div className="flex items-start justify-between pb-3 border-b border-[#D4A33B]/20">
            <div>
              <p className="font-serif-luxury text-xl font-bold text-[#211B17]">
                {primaryName}
              </p>
              <p className="text-[#5C4F46]">{phone}</p>
              {email && <p className="text-[#5C4F46]">{email}</p>}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                attending
                  ? "bg-[#FAF0DC] text-[#78223B] border border-[#D4A33B]/40"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {attending ? "Attending" : "Declined"}
            </span>
          </div>

          {/* Family Affiliation */}
          <div className="pb-3 border-b border-[#D4A33B]/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8E681C] font-bold block">
                Family Affiliation:
              </span>
              <p className="font-bold text-[#78223B]">
                {guestSide === "bride"
                  ? "Bride's Side • Sara Jose (Pazhayapurayil)"
                  : "Groom's Side • Mishel Mathew (Mulavanal)"}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF0DC] text-[#78223B] border border-[#D4A33B]/40">
              {guestSide === "bride" ? "Bus • Pravattom" : "Train • Kanhangad"}
            </span>
          </div>

          {attending && (
            <>
              {/* Guests List */}
              <div className="pb-3 border-b border-[#D4A33B]/20">
                <span className="text-[10px] uppercase tracking-wider text-[#8E681C] font-bold block mb-1">
                  Total Guests ({guestCount}):
                </span>
                <p className="text-[#5C4F46]">
                  {guestNames.filter(Boolean).join(", ")}
                </p>
              </div>

              {/* Transport Breakdown */}
              <div className="space-y-2 pb-3 border-b border-[#D4A33B]/20">
                <span className="text-[10px] uppercase tracking-wider text-[#8E681C] font-bold block">
                  {guestSide === "bride" ? "Bus Transportation Summary:" : "Train Transportation Summary:"}
                </span>
                {applicableJourneys.map((j) => {
                  const t = transportSelections[j.id];
                  const isBride = guestSide === "bride";
                  const stationName = isBride ? "Pravattom (Bus Pickup)" : "Kanhangad (Railway Station)";

                  return (
                    <div
                      key={j.id}
                      className="flex items-start justify-between p-2 rounded bg-[#FAF7F2]"
                    >
                      <div>
                        <span className="font-bold text-[#78223B] block">
                          {isBride ? "🚌" : "🚆"} {j.shortLabel}:
                        </span>
                        {t?.required ? (
                          <p className="text-[11px] text-[#5C4F46]">
                            Boarding: <strong>{stationName}</strong>
                            {" • "}
                            {t.passengerCount} passenger(s)
                          </p>
                        ) : (
                          <p className="text-[11px] text-gray-500">
                            Arranging Own Travel
                          </p>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-bold ${
                          t?.required ? "text-[#78223B]" : "text-gray-400"
                        }`}
                      >
                        {t?.required ? "REQUIRED" : "NOT NEEDED"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {specialRequirements && (
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8E681C] font-bold block mb-1">
                Special Notes:
              </span>
              <p className="italic text-[#5C4F46]">&ldquo;{specialRequirements}&rdquo;</p>
            </div>
          )}
        </div>

        {submitError && (
          <p className="text-xs text-red-600 text-center font-bold">{submitError}</p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-[#D4A33B]/30">
          <button
            type="button"
            onClick={() => setStep(attending ? 4 : 3)}
            className="text-xs text-[#5C4F46] hover:text-[#78223B] font-sans-clean font-bold flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Edit Response</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmitRSVP}
            className="px-8 py-3 rounded-full bg-[#78223B] hover:bg-[#58182B] disabled:opacity-50 text-white text-xs uppercase tracking-wider font-sans-clean font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-all"
          >
            {isSubmitting ? (
              <span>Saving...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-[#F2DC9B]" />
                <span>Confirm My RSVP</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // STEP 6: Confirmation Experience (Section 15)
  return (
    <div className="py-8 text-center space-y-5 animate-fade-in max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-[#FAF0DC] border-2 border-[#D4A33B] text-[#78223B] flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="space-y-1">
        <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#211B17] font-bold">
          {attending ? "Your Presence is Confirmed" : "Thank You For Letting Us Know"}
        </h3>
        <p className="font-serif-luxury italic text-sm text-[#5C4F46]">
          {attending
            ? `Thank you for celebrating with the ${guestSide === "bride" ? "Pazhayapurayil" : "Mulavanal"} family.`
            : "We will miss your presence, but cherish your prayers and blessings."}
        </p>
      </div>

      {attending && (
        <div className="p-4 rounded-xl bg-[#FFF9EE] border border-[#D4A33B]/50 text-left space-y-2 text-xs font-sans-clean">
          <div className="flex items-center gap-2 text-[#78223B] font-bold">
            <Check className="w-4 h-4" />
            <span>
              RSVP Confirmed for {primaryName} ({guestCount} Guests • {guestSide === "bride" ? "Bride's Side" : "Groom's Side"})
            </span>
          </div>

          {journeys.map((j) => {
            const t = transportSelections[j.id];
            const isBride = guestSide === "bride";
            if (t?.required) {
              return (
                <div key={j.id} className="flex items-center gap-2 text-[#8E681C] pl-6">
                  {isBride ? <Bus className="w-3.5 h-3.5" /> : <Train className="w-3.5 h-3.5" />}
                  <span>
                    {j.shortLabel} {isBride ? "Bus (Pravattom)" : "Train (Kanhangad)"}: Required for {t.passengerCount} passenger(s)
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      <div className="pt-2">
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setConfirmedId(null);
          }}
          className="px-6 py-2 rounded-full border border-[#D4A33B] text-xs uppercase tracking-wider text-[#78223B] font-sans-clean font-bold hover:bg-[#FAF7F2] cursor-pointer"
        >
          Submit Another Response
        </button>
      </div>
    </div>
  );
}
