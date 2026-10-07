"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getAllRSVPs, computeRSVPStats, getLastFirestoreError } from "@/lib/firestore";
import { RSVPData, RSVPStats, PassengerRosterItem } from "@/types/rsvp";
import { weddingData } from "@/config/wedding";
import { exportTrainRosterToCSV, exportBusRosterToCSV } from "@/utils/exportRSVP";
import {
  Train,
  Bus,
  MapPin,
  Download,
  Search,
  Users,
  RefreshCw,
  Phone,
  FileText,
  Calendar,
  ShieldAlert,
  CheckCircle,
} from "lucide-react";

export default function AdminTransportPage() {
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [stats, setStats] = useState<RSVPStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(false);

  // Management categories
  const [selectedSide, setSelectedSide] = useState<"groom" | "bride">("groom");
  const [selectedJourney, setSelectedJourney] = useState<string>("all");
  const [passengerSearch, setPassengerSearch] = useState<string>("");

  const journeys = weddingData.transport.journeys;

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const records = await getAllRSVPs();
      setRsvps(records);
      const computed = computeRSVPStats(records);
      setStats(computed);
      setPermissionError(getLastFirestoreError() === "PERMISSION_DENIED");
    } catch (err) {
      console.error("Transport load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const isGroom = selectedSide === "groom";

  // Aggregate passengers for the active side
  const allSidePassengers = useMemo(() => {
    if (!stats) return [];
    const list: PassengerRosterItem[] = [];

    journeys.forEach((j) => {
      const jStat = stats.journeyStats[j.id];
      if (jStat && jStat.passengers) {
        jStat.passengers.forEach((p) => {
          if (p.guestSide === selectedSide) {
            list.push(p);
          }
        });
      }
    });

    return list;
  }, [stats, selectedSide, journeys]);

  // Filter by journey date and search
  const filteredPassengers = useMemo(() => {
    return allSidePassengers.filter((p) => {
      // 1. Date filter
      if (selectedJourney !== "all" && p.journeyId !== selectedJourney) {
        return false;
      }

      // 2. Search query
      const q = passengerSearch.toLowerCase().trim();
      if (!q) return true;

      return (
        p.passengerName.toLowerCase().includes(q) ||
        p.primaryGuest.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        p.boardingStation.toLowerCase().includes(q)
      );
    });
  }, [allSidePassengers, selectedJourney, passengerSearch]);

  // Specific side metrics
  const sideTotalPassengers = isGroom
    ? stats?.totalTrainPassengers || 0
    : stats?.totalBusPassengers || 0;

  const j9SideCount = isGroom
    ? stats?.journeyStats["journey-9"]?.groomPassengers || 0
    : stats?.journeyStats["journey-9"]?.bridePassengers || 0;

  const j16SideCount = isGroom
    ? stats?.journeyStats["journey-16"]?.groomPassengers || 0
    : stats?.journeyStats["journey-16"]?.bridePassengers || 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#211B17]">
                Guest Travel &amp; Logistics Management
              </h1>
              <span className="w-2 h-2 rounded-full bg-[#1E429F]" />
            </div>
            <p className="text-xs text-[#7A6C60] mt-1 font-medium">
              Separate booking rosters for Groom&apos;s Train (Kanhangad) and Bride&apos;s Bus (Pravattom)
            </p>
          </div>

          <button
            onClick={loadData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-[#D5C9B8] text-[#5C4F46] hover:bg-[#F5F2EB] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#78223B]" />
            <span>Sync Live Records</span>
          </button>
        </div>

        {/* Firestore Permission Guidance Banner */}
        {permissionError && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFBF0] border border-[#F0D59B] text-xs text-[#7A5200] space-y-2 shadow-xs">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#C98200] flex-shrink-0" />
              <h3 className="font-bold text-sm text-[#5C3D00]">
                Firestore Cloud Permissions Pending
              </h3>
            </div>
            <p className="text-xs text-[#6B4900]">
              Firebase reported <code className="bg-[#FAF0DC] px-1.5 py-0.5 rounded font-mono text-[11px] text-[#8E44AD]">Missing or insufficient permissions</code>. Please publish the rules in <strong>Firebase Console &gt; Firestore Database &gt; Rules</strong>.
            </p>
          </div>
        )}

        {/* Master Workflow Selector: Groom (Train) vs Bride (Bus) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A: Groom's Side - Train @ Kanhangad */}
          <div
            onClick={() => setSelectedSide("groom")}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedSide === "groom"
                ? "bg-white border-[#1E4A8A] shadow-md ring-2 ring-[#1E4A8A]/10"
                : "bg-[#FCFBF8] border-[#E5DFD5] hover:bg-white hover:border-[#BFDBFE]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EBF3FB] text-[#1E4A8A] flex items-center justify-center font-bold">
                  <Train className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-lg font-bold text-[#211B17]">
                      Groom&apos;s Side • Train Bookings
                    </h2>
                    {selectedSide === "groom" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1E4A8A] text-white">
                        Active Roster
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5C4F46] font-sans">
                    Mishel Mathew (Mulavanal) • Boarding: <strong>Kanhangad Railway Station</strong>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-3xl font-serif font-bold text-[#1E4A8A]">
                  {stats?.totalTrainPassengers || 0}
                </span>
                <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#7A6C60]">
                  Train Tickets
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#5C4F46]">
              <span>9th Jan: <strong>{stats?.journeyStats["journey-9"]?.groomPassengers || 0}</strong> tickets</span>
              <span>16th Jan: <strong>{stats?.journeyStats["journey-16"]?.groomPassengers || 0}</strong> tickets</span>
            </div>
          </div>

          {/* Option B: Bride's Side - Bus @ Pravattom */}
          <div
            onClick={() => setSelectedSide("bride")}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedSide === "bride"
                ? "bg-white border-[#572B91] shadow-md ring-2 ring-[#572B91]/10"
                : "bg-[#FCFBF8] border-[#E5DFD5] hover:bg-white hover:border-[#DFC9F3]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#F3ECFB] text-[#572B91] flex items-center justify-center font-bold">
                  <Bus className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-lg font-bold text-[#211B17]">
                      Bride&apos;s Side • Bus Bookings
                    </h2>
                    {selectedSide === "bride" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#572B91] text-white">
                        Active Roster
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5C4F46] font-sans">
                    Sara Jose (Pazhayapurayil) • Boarding: <strong>Pravattom (Bus Pickup)</strong>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-3xl font-serif font-bold text-[#572B91]">
                  {stats?.totalBusPassengers || 0}
                </span>
                <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#7A6C60]">
                  Bus Seats
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#5C4F46]">
              <span>9th Jan: <strong>{stats?.journeyStats["journey-9"]?.bridePassengers || 0}</strong> seats</span>
              <span>16th Jan: <strong>{stats?.journeyStats["journey-16"]?.bridePassengers || 0}</strong> seats</span>
            </div>
          </div>
        </div>

        {/* Detailed Passenger Roster */}
        <div className="bg-white rounded-2xl border border-[#E5DFD5] shadow-xs overflow-hidden">
          {/* Section Toolbar */}
          <div className="p-4 sm:p-5 border-b border-[#F0EAE1] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#211B17] flex items-center gap-2">
                <span>
                  {isGroom
                    ? "🚆 Groom's Train Passenger List (Kanhangad)"
                    : "🚌 Bride's Bus Passenger List (Pravattom)"}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isGroom ? "bg-[#EBF3FB] text-[#1E4A8A]" : "bg-[#F3ECFB] text-[#572B91]"
                }`}>
                  {filteredPassengers.length} Total
                </span>
              </h3>
              <p className="text-xs text-[#7A6C60]">
                {isGroom
                  ? "Train bookings allocated for Mulavanal family departing from Kanhangad Station"
                  : "Chartered bus seat roster allocated for Pazhayapurayil family departing from Pravattom"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => {
                  const targetJourney = selectedJourney === "all" ? "journey-9" : selectedJourney;
                  if (isGroom) {
                    exportTrainRosterToCSV(rsvps, targetJourney);
                  } else {
                    exportBusRosterToCSV(rsvps, targetJourney);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer ${
                  isGroom ? "bg-[#1E4A8A] hover:bg-[#163868]" : "bg-[#572B91] hover:bg-[#432170]"
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {isGroom
                    ? "Export Train Roster (CSV)"
                    : "Export Bus Roster (CSV)"}
                </span>
              </button>
            </div>
          </div>

          {/* Date Filter & Search Bar */}
          <div className="p-4 bg-[#FAF7F2] border-b border-[#F0EAE1] flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Date Tabs */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[11px] font-bold text-[#7A6C60] uppercase mr-1">
                Event Date:
              </span>
              <button
                onClick={() => setSelectedJourney("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedJourney === "all"
                    ? "bg-[#78223B] text-white shadow-xs"
                    : "bg-white border border-[#D5C9B8] text-[#5C4F46] hover:bg-[#F2ECE1]"
                }`}
              >
                All Dates ({allSidePassengers.length})
              </button>
              <button
                onClick={() => setSelectedJourney("journey-9")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedJourney === "journey-9"
                    ? "bg-[#78223B] text-white shadow-xs"
                    : "bg-white border border-[#D5C9B8] text-[#5C4F46] hover:bg-[#F2ECE1]"
                }`}
              >
                9th Jan Engagement ({j9SideCount})
              </button>
              <button
                onClick={() => setSelectedJourney("journey-16")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedJourney === "journey-16"
                    ? "bg-[#78223B] text-white shadow-xs"
                    : "bg-white border border-[#D5C9B8] text-[#5C4F46] hover:bg-[#F2ECE1]"
                }`}
              >
                16th Jan Wedding ({j16SideCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#8E7F74] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={passengerSearch}
                onChange={(e) => setPassengerSearch(e.target.value)}
                placeholder="Search passenger name or phone..."
                className="w-full pl-9 pr-3.5 py-1.5 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* Passenger Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#E5DFD5] text-[#5C4F46] font-sans font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 w-12 text-center">No.</th>
                  <th className="py-3 px-4">Passenger Name</th>
                  <th className="py-3 px-4">Primary Contact / Family</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Event Date</th>
                  <th className="py-3 px-4">Boarding Location</th>
                  <th className="py-3 px-4">Special Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAE1]">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#7A6C60]">
                      Loading passenger roster...
                    </td>
                  </tr>
                ) : filteredPassengers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center text-[#7A6C60] font-sans"
                    >
                      {isGroom ? (
                        <Train className="w-8 h-8 text-[#D5C9B8] mx-auto mb-2" />
                      ) : (
                        <Bus className="w-8 h-8 text-[#D5C9B8] mx-auto mb-2" />
                      )}
                      <p className="text-sm font-semibold text-[#211B17]">
                        No passengers found for this filter
                      </p>
                      <p className="text-xs text-[#A3968B] mt-1">
                        Try switching date filter or clearing search query
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredPassengers.map((row, idx) => (
                    <tr
                      key={`${row.passengerName}-${row.journeyId}-${idx}`}
                      className="hover:bg-[#FCFBF8] transition-colors"
                    >
                      {/* No. */}
                      <td className="py-3 px-4 text-center font-mono font-bold text-[#8E7F74]">
                        {idx + 1}
                      </td>

                      {/* Passenger Name */}
                      <td className="py-3 px-4 font-bold text-[#211B17]">
                        {row.passengerName}
                      </td>

                      {/* Family */}
                      <td className="py-3 px-4 text-[#5C4F46]">
                        {row.primaryGuest} Family
                      </td>

                      {/* Phone */}
                      <td className="py-3 px-4">
                        <a
                          href={`tel:${row.phone}`}
                          className="font-mono text-[#5C4F46] hover:text-[#78223B]"
                        >
                          {row.phone}
                        </a>
                      </td>

                      {/* Event Date */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-[#FAF0DC] text-[#8E681C]">
                          <Calendar className="w-3 h-3" />
                          <span>{row.journeyLabel.split("(")[0].trim()}</span>
                        </span>
                      </td>

                      {/* Boarding Point */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isGroom
                            ? "bg-[#EBF3FB] text-[#1E4A8A] border border-[#BFDBFE]"
                            : "bg-[#F3ECFB] text-[#572B91] border border-[#DFC9F3]"
                        }`}>
                          <MapPin className="w-3 h-3" />
                          <span>{row.boardingStation}</span>
                        </span>
                      </td>

                      {/* Special Notes */}
                      <td className="py-3 px-4 text-[#7A6C60] max-w-xs">
                        {row.specialRequirements ? (
                          <span className="italic text-[#5C4F46]">
                            {row.specialRequirements}
                          </span>
                        ) : (
                          <span className="text-[#C2B7AC]">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-3 bg-[#FAF7F2] border-t border-[#E5DFD5] flex items-center justify-between text-xs text-[#7A6C60]">
            <span>
              Showing <strong className="text-[#211B17]">{filteredPassengers.length}</strong> {isGroom ? "train passengers" : "bus passengers"}
            </span>
            <span className="text-[11px]">
              {isGroom ? "Ready for railway coach reservations" : "Ready for chartered bus bookings"}
            </span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
