"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getAllRSVPs, computeRSVPStats, getLastFirestoreError } from "@/lib/firestore";
import { RSVPData, RSVPStats } from "@/types/rsvp";
import { weddingData } from "@/config/wedding";
import { exportTrainRosterToCSV } from "@/utils/exportRSVP";
import {
  Train,
  MapPin,
  Download,
  Search,
  Users,
  RefreshCw,
  Phone,
  FileText,
  Calendar,
  ShieldAlert,
} from "lucide-react";

export default function AdminTransportPage() {
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [stats, setStats] = useState<RSVPStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(false);
  const [activeJourneyTab, setActiveJourneyTab] = useState<string>("journey-9");
  const [passengerSearch, setPassengerSearch] = useState<string>("");
  const [stationFilter, setStationFilter] = useState<string>("all");

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

  const currentJourney = journeys.find((j) => j.id === activeJourneyTab);
  const currentJourneyStats = stats?.journeyStats[activeJourneyTab];

  // Filter passengers for active journey
  const filteredPassengers = useMemo(() => {
    if (!currentJourneyStats) return [];
    return currentJourneyStats.passengers.filter((p) => {
      const q = passengerSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.passengerName.toLowerCase().includes(q) ||
        p.primaryGuest.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        p.boardingStation.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (stationFilter !== "all" && p.boardingStation !== stationFilter) {
        return false;
      }

      return true;
    });
  }, [currentJourneyStats, passengerSearch, stationFilter]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#211B17]">
                Train Transportation Planning
              </h1>
              <span className="w-2 h-2 rounded-full bg-[#1E429F]" />
            </div>
            <p className="text-xs text-[#7A6C60] mt-1 font-medium">
              Independent logistics &amp; station allocations for 9th and 16th January 2027
            </p>
          </div>

          <button
            onClick={loadData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-[#D5C9B8] text-[#5C4F46] hover:bg-[#F5F2EB] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#78223B]" />
            <span>Sync Passengers</span>
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

        {/* Journey Summary Cards (Side by Side for Quick Comparison) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {journeys.map((j) => {
            const jStat = stats?.journeyStats[j.id];
            const isTabActive = activeJourneyTab === j.id;

            return (
              <div
                key={j.id}
                onClick={() => setActiveJourneyTab(j.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isTabActive
                    ? "bg-white border-[#1E429F] shadow-md ring-2 ring-[#1E429F]/10"
                    : "bg-[#FCFBF8] border-[#E5DFD5] hover:bg-white hover:border-[#C3D9EE]"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        j.id === "journey-9"
                          ? "bg-[#EBF3FB] text-[#1E429F]"
                          : "bg-[#F3ECFB] text-[#572B91]"
                      }`}
                    >
                      <Train className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-[#211B17]">
                        🚆 {j.label} Journey
                      </h2>
                      <p className="text-xs text-[#7A6C60] flex items-center gap-1 font-sans">
                        <Calendar className="w-3 h-3" />
                        <span>{j.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#211B17]">
                      {jStat?.totalPassengers || 0}
                    </span>
                    <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#7A6C60]">
                      Passengers
                    </span>
                  </div>
                </div>

                {/* Station Breakdown Pills */}
                <div className="pt-3 border-t border-[#F0EAE1]">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#8E7F74] block mb-2">
                    Station Breakdown:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {jStat && Object.keys(jStat.byStation).length > 0 ? (
                      Object.entries(jStat.byStation).map(([stn, count]) => (
                        <span
                          key={stn}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FAF7F2] border border-[#E5DFD5] text-[#211B17] flex items-center gap-1.5"
                        >
                          <span className="text-[#78223B] font-bold">
                            {count}
                          </span>
                          <span className="text-[#5C4F46]">{stn}</span>
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#A3968B] italic">
                        No passengers requested for this journey yet.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Passenger Roster for Selected Journey */}
        <div className="bg-white rounded-2xl border border-[#E5DFD5] shadow-xs overflow-hidden">
          {/* Section Toolbar */}
          <div className="p-4 sm:p-5 border-b border-[#F0EAE1] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#211B17] flex items-center gap-2">
                <span>{currentJourney?.label} Train Passenger List</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#EBF3FB] text-[#1E429F]">
                  {filteredPassengers.length} Total
                </span>
              </h3>
              <p className="text-xs text-[#7A6C60]">
                Individual passenger roster with family attribution and boarding stations
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() =>
                  exportTrainRosterToCSV(rsvps, activeJourneyTab)
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#78223B] text-white hover:bg-[#5C1A2D] shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export {currentJourney?.label} Roster (CSV)</span>
              </button>
            </div>
          </div>

          {/* Search & Station Filters */}
          <div className="p-4 bg-[#FAF7F2] border-b border-[#F0EAE1] flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="w-4 h-4 text-[#8E7F74] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={passengerSearch}
                onChange={(e) => setPassengerSearch(e.target.value)}
                placeholder="Search passenger name, family, or phone..."
                className="w-full pl-9 pr-3.5 py-1.5 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium focus:outline-none"
              />
            </div>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#7A6C60] uppercase whitespace-nowrap">
                Filter Station:
              </span>
              <select
                value={stationFilter}
                onChange={(e) => setStationFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium focus:outline-none"
              >
                <option value="all">All Stations</option>
                {currentJourneyStats &&
                  Object.keys(currentJourneyStats.byStation).map((stn) => (
                    <option key={stn} value={stn}>
                      {stn} ({currentJourneyStats.byStation[stn]})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Passenger Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#E5DFD5] text-[#5C4F46] font-sans font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 w-12 text-center">No.</th>
                  <th className="py-3 px-4">Passenger Name</th>
                  <th className="py-3 px-4">Family / Primary Guest</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">Boarding Station</th>
                  <th className="py-3 px-4">Special Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAE1]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#7A6C60]">
                      Loading passenger details...
                    </td>
                  </tr>
                ) : filteredPassengers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-[#7A6C60] font-sans"
                    >
                      <Train className="w-8 h-8 text-[#D5C9B8] mx-auto mb-2" />
                      <p className="text-sm font-semibold">
                        No passengers found for this filter
                      </p>
                      <p className="text-xs text-[#A3968B] mt-1">
                        Try clearing search term or station filter
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredPassengers.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#FCFBF8] transition-colors"
                    >
                      {/* No. */}
                      <td className="py-3 px-4 text-center font-mono font-bold text-[#8E7F74]">
                        {idx + 1}
                      </td>

                      {/* Passenger Name */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#211B17]">
                          {row.passengerName}
                        </span>
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

                      {/* Station */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF0DC] text-[#8E681C] border border-[#D4A33B]/30">
                          <MapPin className="w-3 h-3" />
                          <span>{row.boardingStation}</span>
                        </span>
                      </td>

                      {/* Notes */}
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
              Showing{" "}
              <strong className="text-[#211B17]">
                {filteredPassengers.length}
              </strong>{" "}
              passengers for {currentJourney?.label} train journey
            </span>
            <span className="text-[11px]">
              Ready for railway ticket bookings &amp; coach planning
            </span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
