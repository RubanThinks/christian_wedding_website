"use client";

import React from "react";
import { RSVPStats } from "@/types/rsvp";
import { weddingData } from "@/config/wedding";
import { Users, UserCheck, UserX, Train, Calendar, TrendingUp } from "lucide-react";

export default function DashboardStats({ stats }: { stats: RSVPStats }) {
  const attendingPercent =
    stats.totalResponses > 0
      ? Math.round((stats.attendingCount / stats.totalResponses) * 100)
      : 0;

  const journeys = weddingData.transport.journeys;
  const j9 = stats.journeyStats["journey-9"]?.totalPassengers || 0;
  const j16 = stats.journeyStats["journey-16"]?.totalPassengers || 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
      {/* 1. Total Responses */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E5DFD5] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7A6C60]">
            Total Responses
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#F5F2EB] text-[#5C4F46] flex items-center justify-center">
            <Users className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-[#211B17]">
          {stats.totalResponses}
        </div>
        <p className="text-[11px] text-[#8E7F74] mt-1">RSVP Submissions</p>
      </div>

      {/* 2. Attending */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#C6E1C6] bg-gradient-to-b from-white to-[#F6FAF6] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#1B6829]">
            Attending
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#E6F4EA] text-[#1B6829] flex items-center justify-center">
            <UserCheck className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1B6829]">
          {stats.attendingCount}
        </div>
        <p className="text-[11px] text-[#2E7D32] mt-1 font-medium">
          {attendingPercent}% acceptance rate
        </p>
      </div>

      {/* 3. Not Attending */}
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

      {/* 4. Total Guests Attending */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E9DEBC] bg-gradient-to-b from-white to-[#FDFBF7] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7A5B15]">
            Total Guests
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#FBF4E2] text-[#7A5B15] flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-[#7A5B15]">
          {stats.totalGuests}
        </div>
        <p className="text-[11px] text-[#8E7F74] mt-1">Heads expected</p>
      </div>

      {/* 5. 9th Train Passengers */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#D5E1F2] bg-gradient-to-b from-white to-[#F4F7FC] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#1E4A8A]">
            9th Train
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#E6F0FA] text-[#1E4A8A] flex items-center justify-center">
            <Train className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1E4A8A]">
          {j9}
        </div>
        <p className="text-[11px] text-[#2C5282] mt-1 font-medium">Passengers</p>
      </div>

      {/* 6. 16th Train Passengers */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E3D7F4] bg-gradient-to-b from-white to-[#F9F6FD] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#572B91]">
            16th Train
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#EFE9F8] text-[#572B91] flex items-center justify-center">
            <Train className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-[#572B91]">
          {j16}
        </div>
        <p className="text-[11px] text-[#553C9A] mt-1 font-medium">Passengers</p>
      </div>
    </div>
  );
}
