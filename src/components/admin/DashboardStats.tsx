import React from "react";
import { RSVPStats } from "@/types/rsvp";
import { weddingData } from "@/config/wedding";
import { Users, UserCheck, UserX, Train, Bus, TrendingUp, HeartHandshake } from "lucide-react";

export default function DashboardStats({ stats }: { stats: RSVPStats }) {
  const attendingPercent =
    stats.totalResponses > 0
      ? Math.round((stats.attendingCount / stats.totalResponses) * 100)
      : 0;

  const j9 = stats.journeyStats["journey-9"]?.totalPassengers || 0;
  const j16 = stats.journeyStats["journey-16"]?.totalPassengers || 0;

  return (
    <div className="space-y-4 mb-8">
      {/* Primary Metrics: Attendance & Family Breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* 1. Total Responses */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E5DFD5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7A6C60]">
              Total RSVPs
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#F5F2EB] text-[#5C4F46] flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#211B17]">
            {stats.totalResponses}
          </div>
          <p className="text-[11px] text-[#8E7F74] mt-1 font-medium">Submissions</p>
        </div>

        {/* 2. Total Guests Attending */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E9DEBC] bg-gradient-to-b from-white to-[#FDFBF7] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7A5B15]">
              Total Attending
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#FBF4E2] text-[#7A5B15] flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#7A5B15]">
            {stats.totalGuests}
          </div>
          <p className="text-[11px] text-[#8E7F74] mt-1 font-medium">
            {stats.attendingCount} families ({attendingPercent}%)
          </p>
        </div>

        {/* 3. Groom's Side Guests (Mulavanal) */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#D5E1F2] bg-gradient-to-b from-white to-[#F4F7FC] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#1E4A8A]">
              Groom&apos;s Side
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#E6F0FA] text-[#1E4A8A] flex items-center justify-center font-bold text-xs">
              M
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1E4A8A]">
            {stats.groomSideGuests}
          </div>
          <p className="text-[11px] text-[#2C5282] mt-1 font-medium">
            Mulavanal Family
          </p>
        </div>

        {/* 4. Bride's Side Guests (Pazhayapurayil) */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E3D7F4] bg-gradient-to-b from-white to-[#F9F6FD] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#572B91]">
              Bride&apos;s Side
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EFE9F8] text-[#572B91] flex items-center justify-center font-bold text-xs">
              S
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#572B91]">
            {stats.brideSideGuests}
          </div>
          <p className="text-[11px] text-[#553C9A] mt-1 font-medium">
            Pazhayapurayil Family
          </p>
        </div>

        {/* 5. Declined */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#F2D4DA] bg-gradient-to-b from-white to-[#FCF4F6] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#8A243D]">
              Declined
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#FBEAEF] text-[#8A243D] flex items-center justify-center">
              <UserX className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#8A243D]">
            {stats.notAttendingCount}
          </div>
          <p className="text-[11px] text-[#A8324E] mt-1">Unable to attend</p>
        </div>
      </div>

      {/* Secondary Row: Transport Breakdown for Logistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Train Passengers (Groom - Kanhangad) */}
        <div className="bg-white rounded-xl p-4 border border-[#BBD5EE] bg-[#F7FAFD]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#164E87]">
              🚆 Train Bookings
            </span>
            <Train className="w-4 h-4 text-[#164E87]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#164E87]">
            {stats.totalTrainPassengers}
          </div>
          <p className="text-[11px] text-[#345D8C] mt-0.5">
            Groom&apos;s Side • Boarding @ Kanhangad
          </p>
        </div>

        {/* Bus Passengers (Bride - Pravattom) */}
        <div className="bg-white rounded-xl p-4 border border-[#D8C7F0] bg-[#FAF8FE]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4E247E]">
              🚌 Bus Bookings
            </span>
            <Bus className="w-4 h-4 text-[#4E247E]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#4E247E]">
            {stats.totalBusPassengers}
          </div>
          <p className="text-[11px] text-[#5D378E] mt-0.5">
            Bride&apos;s Side • Boarding @ Pravattom
          </p>
        </div>

        {/* 9th Jan Engagement Travel */}
        <div className="bg-white rounded-xl p-4 border border-[#E5DFD5]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C4F46]">
              9th Jan (Engagement)
            </span>
            <span className="text-[10px] font-bold bg-[#FAF0DC] text-[#8E681C] px-1.5 py-0.5 rounded">
              Neendoor
            </span>
          </div>
          <div className="text-2xl font-serif font-bold text-[#211B17]">
            {j9}
          </div>
          <p className="text-[11px] text-[#7A6C60] mt-0.5">
            Combined travel requests
          </p>
        </div>

        {/* 16th Jan Wedding Travel */}
        <div className="bg-white rounded-xl p-4 border border-[#E5DFD5]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C4F46]">
              16th Jan (Wedding)
            </span>
            <span className="text-[10px] font-bold bg-[#FAF0DC] text-[#8E681C] px-1.5 py-0.5 rounded">
              Chullikkara
            </span>
          </div>
          <div className="text-2xl font-serif font-bold text-[#211B17]">
            {j16}
          </div>
          <p className="text-[11px] text-[#7A6C60] mt-0.5">
            Combined travel requests
          </p>
        </div>
      </div>
    </div>
  );
}
