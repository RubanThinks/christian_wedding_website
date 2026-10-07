"use client";

import React, { useState, useMemo } from "react";
import { RSVPData } from "@/types/rsvp";
import { weddingData } from "@/config/wedding";
import { deleteRSVP } from "@/lib/firestore";
import {
  exportAllRSVPsToCSV,
  exportFilteredRSVPsToCSV,
  exportTrainRosterToCSV,
  exportBusRosterToCSV,
} from "@/utils/exportRSVP";
import RSVPDetailsModal from "./RSVPDetailsModal";
import RSVPEditModal from "./RSVPEditModal";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  Trash2,
  Train,
  Bus,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  AlertTriangle,
} from "lucide-react";

export default function RSVPTable({
  rsvps,
  onRefresh,
}: {
  rsvps: RSVPData[];
  onRefresh: () => void;
}) {
  const journeys = weddingData.transport.journeys;
  const boardingStations = weddingData.transport.boardingStations;

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [sideFilter, setSideFilter] = useState<string>("all");
  const [attendanceFilter, setAttendanceFilter] = useState<string>("all");
  const [transportFilter, setTransportFilter] = useState<string>("all");
  const [stationFilter, setStationFilter] = useState<string>("all");

  // Modal states
  const [viewingRSVP, setViewingRSVP] = useState<RSVPData | null>(null);
  const [editingRSVP, setEditingRSVP] = useState<RSVPData | null>(null);
  const [deletingRSVP, setDeletingRSVP] = useState<RSVPData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return rsvps.filter((item) => {
      // 1. Text search
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.primaryGuestName.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.guests &&
          item.guests.some((g) => g.name.toLowerCase().includes(q)));

      if (!matchSearch) return false;

      // 2. Family Side filter
      const itemSide = item.guestSide || "groom";
      if (sideFilter === "groom" && itemSide !== "groom") return false;
      if (sideFilter === "bride" && itemSide !== "bride") return false;

      // 3. Attendance filter
      if (attendanceFilter === "attending" && !item.attending) return false;
      if (attendanceFilter === "declined" && item.attending) return false;

      // 3. Transport filter
      const t9 = item.transport?.["journey-9"]?.required;
      const t16 = item.transport?.["journey-16"]?.required;

      if (transportFilter === "j9" && !t9) return false;
      if (transportFilter === "j16" && !t16) return false;
      if (transportFilter === "both" && (!t9 || !t16)) return false;
      if (transportFilter === "none" && (t9 || t16)) return false;

      // 4. Station filter
      if (stationFilter !== "all") {
        const s9 = item.transport?.["journey-9"]?.boardingStation;
        const s16 = item.transport?.["journey-16"]?.boardingStation;
        const custom9 = item.transport?.["journey-9"]?.customBoardingStation;
        const custom16 = item.transport?.["journey-16"]?.customBoardingStation;

        const matchesStation =
          (t9 && (s9 === stationFilter || custom9 === stationFilter)) ||
          (t16 && (s16 === stationFilter || custom16 === stationFilter));

        if (!matchesStation) return false;
      }

      return true;
    });
  }, [rsvps, searchTerm, attendanceFilter, transportFilter, stationFilter]);

  // Handle Delete
  const handleDeleteConfirm = async () => {
    if (!deletingRSVP || !deletingRSVP.id) return;
    setIsDeleting(true);
    try {
      await deleteRSVP(deletingRSVP.id);
      setDeletingRSVP(null);
      onRefresh();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (val?: unknown) => {
    if (!val) return "-";
    if (typeof val === "object" && val !== null && "seconds" in val) {
      return new Date((val as { seconds: number }).seconds * 1000).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    try {
      return new Date(String(val)).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return String(val);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E5DFD5] shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8E7F74] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone, or passenger..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#D5C9B8] text-xs font-medium focus:outline-none focus:border-[#78223B]"
            />
          </div>

          {/* Export Dropdown / Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => exportAllRSVPsToCSV(rsvps)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#FAF7F2] border border-[#D5C9B8] text-[#5C4F46] hover:bg-[#F2ECE1] transition-colors"
              title="Download all RSVP records"
            >
              <Download className="w-3.5 h-3.5 text-[#78223B]" />
              <span>Export All (CSV)</span>
            </button>

            {filteredData.length !== rsvps.length && (
              <button
                onClick={() =>
                  exportFilteredRSVPsToCSV(
                    filteredData,
                    `${attendanceFilter}-${transportFilter}`
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#FAF7F2] border border-[#D5C9B8] text-[#5C4F46] hover:bg-[#F2ECE1]"
              >
                <Filter className="w-3.5 h-3.5 text-[#78223B]" />
                <span>Export Filtered ({filteredData.length})</span>
              </button>
            )}

            {/* Train Roster Export (Kanhangad) */}
            <button
              onClick={() => exportTrainRosterToCSV(rsvps, "journey-9")}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#EBF3FB] border border-[#C3D9EE] text-[#1E429F] hover:bg-[#DCEBF8]"
              title="Download Train Passengers Roster (Kanhangad)"
            >
              <Train className="w-3.5 h-3.5" />
              <span>Train Roster (CSV)</span>
            </button>

            {/* Bus Roster Export (Pravattom) */}
            <button
              onClick={() => exportBusRosterToCSV(rsvps, "journey-9")}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#F3ECFB] border border-[#DFC9F3] text-[#572B91] hover:bg-[#EAE0F7]"
              title="Download Bus Passengers Roster (Pravattom)"
            >
              <Bus className="w-3.5 h-3.5" />
              <span>Bus Roster (CSV)</span>
            </button>
          </div>
        </div>

        {/* Filter Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-[#F0EAE1]">
          {/* Family Side filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#7A6C60] uppercase mb-1">
              Family Side
            </label>
            <select
              value={sideFilter}
              onChange={(e) => setSideFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium focus:outline-none"
            >
              <option value="all">All Families</option>
              <option value="groom">Groom&apos;s Side (Mulavanal • Train)</option>
              <option value="bride">Bride&apos;s Side (Pazhayapurayil • Bus)</option>
            </select>
          </div>

          {/* Attendance filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#7A6C60] uppercase mb-1">
              Attendance
            </label>
            <select
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium focus:outline-none"
            >
              <option value="all">All Responses ({rsvps.length})</option>
              <option value="attending">Attending Only</option>
              <option value="declined">Declined Only</option>
            </select>
          </div>

          {/* Transport filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#7A6C60] uppercase mb-1">
              Transport Status
            </label>
            <select
              value={transportFilter}
              onChange={(e) => setTransportFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium focus:outline-none"
            >
              <option value="all">All Transport Statuses</option>
              <option value="j9">9th Jan Required</option>
              <option value="j16">16th Jan Required</option>
              <option value="both">Both Dates Required</option>
              <option value="none">No Transport Needed</option>
            </select>
          </div>

          {/* Boarding Point filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#7A6C60] uppercase mb-1">
              Boarding Location
            </label>
            <select
              value={stationFilter}
              onChange={(e) => setStationFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-[#D5C9B8] bg-white text-xs font-medium focus:outline-none"
            >
              <option value="all">All Boarding Points</option>
              <option value="Kanhangad">Kanhangad (Groom Train)</option>
              <option value="Pravattom">Pravattom (Bride Bus)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-[#E5DFD5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E5DFD5] text-[#5C4F46] font-sans font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Guest / Family</th>
                <th className="py-3.5 px-4">Side</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Guests</th>
                <th className="py-3.5 px-4">9th Jan Transport</th>
                <th className="py-3.5 px-4">16th Jan Transport</th>
                <th className="py-3.5 px-4">Submitted</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE1]">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-[#7A6C60] font-sans"
                  >
                    <p className="text-sm font-semibold text-[#211B17]">
                      {rsvps.length === 0
                        ? "Awaiting First Guest RSVP"
                        : "No RSVP records found matching your filter"}
                    </p>
                    <p className="text-xs text-[#A3968B] mt-1 max-w-sm mx-auto">
                      {rsvps.length === 0
                        ? "Your RSVP and Train Transportation system is live. Real guest confirmations will synchronize here automatically."
                        : "Try clearing your search query or filter options to see all responses."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => {
                  const t9 = row.transport?.["journey-9"];
                  const t16 = row.transport?.["journey-16"];

                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-[#FCFBF8] transition-colors"
                    >
                      {/* 1. Guest Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#211B17]">
                          {row.primaryGuestName}
                        </div>
                        {row.guests && row.guests.length > 1 && (
                          <div className="text-[10px] text-[#7A6C60] truncate max-w-[180px]">
                            +{row.guests.length - 1} family members
                          </div>
                        )}
                      </td>

                      {/* 2. Family Side */}
                      <td className="py-3.5 px-4">
                        {row.guestSide === "bride" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#F3ECFB] text-[#572B91] border border-[#DFC9F3]">
                            <span>👰 Bride (Pazhayapurayil)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF3FB] text-[#1E429F] border border-[#BFDBFE]">
                            <span>🤵 Groom (Mulavanal)</span>
                          </span>
                        )}
                      </td>

                      {/* 3. Phone */}
                      <td className="py-3.5 px-4">
                        <a
                          href={`tel:${row.phone}`}
                          className="font-mono text-[#5C4F46] hover:text-[#78223B]"
                        >
                          {row.phone}
                        </a>
                      </td>

                      {/* 4. Attending Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            row.attending
                              ? "bg-[#E6F4EA] text-[#1B6829] border border-[#C6E1C6]"
                              : "bg-[#FBEAEF] text-[#8A243D] border border-[#F2D4DA]"
                          }`}
                        >
                          {row.attending ? "Yes" : "No"}
                        </span>
                      </td>

                      {/* 5. Guest Count */}
                      <td className="py-3.5 px-4 text-center font-bold text-[#211B17]">
                        {row.attending ? row.guestCount : 0}
                      </td>

                      {/* 6. 9th Jan Transport */}
                      <td className="py-3.5 px-4">
                        {row.attending && t9?.required ? (
                          <div>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[10px] ${
                              row.guestSide === "bride"
                                ? "bg-[#F3ECFB] text-[#572B91]"
                                : "bg-[#EBF3FB] text-[#1E429F]"
                            }`}>
                              {row.guestSide === "bride" ? (
                                <Bus className="w-3 h-3" />
                              ) : (
                                <Train className="w-3 h-3" />
                              )}
                              <span>{t9.passengerCount} pax</span>
                            </span>
                            <div className="text-[10px] text-[#5C4F46] mt-0.5 font-medium">
                              {row.guestSide === "bride" ? "Pravattom (Bus)" : "Kanhangad (Train)"}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#A3968B]">-</span>
                        )}
                      </td>

                      {/* 7. 16th Jan Transport */}
                      <td className="py-3.5 px-4">
                        {row.attending && t16?.required ? (
                          <div>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[10px] ${
                              row.guestSide === "bride"
                                ? "bg-[#F3ECFB] text-[#572B91]"
                                : "bg-[#EBF3FB] text-[#1E429F]"
                            }`}>
                              {row.guestSide === "bride" ? (
                                <Bus className="w-3 h-3" />
                              ) : (
                                <Train className="w-3 h-3" />
                              )}
                              <span>{t16.passengerCount} pax</span>
                            </span>
                            <div className="text-[10px] text-[#5C4F46] mt-0.5 font-medium">
                              {row.guestSide === "bride" ? "Pravattom (Bus)" : "Kanhangad (Train)"}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#A3968B]">-</span>
                        )}
                      </td>

                      {/* 7. Submitted Date */}
                      <td className="py-3.5 px-4 text-[#7A6C60] whitespace-nowrap">
                        {formatDate(row.submittedAt)}
                      </td>

                      {/* 8. Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => setViewingRSVP(row)}
                            className="p-1.5 rounded-md text-[#5C4F46] hover:text-[#78223B] hover:bg-[#FAF7F2] transition-colors"
                            title="View Full RSVP Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setEditingRSVP(row)}
                            className="p-1.5 rounded-md text-[#5C4F46] hover:text-[#1E429F] hover:bg-[#F0F5FA] transition-colors"
                            title="Edit RSVP"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeletingRSVP(row)}
                            className="p-1.5 rounded-md text-[#8E7F74] hover:text-[#8A243D] hover:bg-[#FBF0F3] transition-colors"
                            title="Delete RSVP"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Count */}
        <div className="p-3 bg-[#FAF7F2] border-t border-[#E5DFD5] flex items-center justify-between text-xs text-[#7A6C60]">
          <span>
            Showing <strong className="text-[#211B17]">{filteredData.length}</strong>{" "}
            of <strong className="text-[#211B17]">{rsvps.length}</strong> total entries
          </span>
          <span className="text-[11px]">Click row action to view or edit</span>
        </div>
      </div>

      {/* View Details Modal */}
      {viewingRSVP && (
        <RSVPDetailsModal
          rsvp={viewingRSVP}
          onClose={() => setViewingRSVP(null)}
          onEdit={() => {
            setEditingRSVP(viewingRSVP);
            setViewingRSVP(null);
          }}
        />
      )}

      {/* Edit Modal */}
      {editingRSVP && (
        <RSVPEditModal
          rsvp={editingRSVP}
          onClose={() => setEditingRSVP(null)}
          onSaved={() => {
            onRefresh();
            setEditingRSVP(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingRSVP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-xl border border-[#E5DFD5]">
            <div className="w-12 h-12 rounded-full bg-[#FBEAEF] text-[#8A243D] flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#211B17] mb-1">
              Delete RSVP Record?
            </h4>
            <p className="text-xs text-[#7A6C60] mb-4">
              Are you sure you want to permanently remove the response for{" "}
              <strong>{deletingRSVP.primaryGuestName}</strong> ({deletingRSVP.phone})?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingRSVP(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#F5F2EB] text-[#5C4F46]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#8A243D] text-white hover:bg-[#6D1B2F]"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
