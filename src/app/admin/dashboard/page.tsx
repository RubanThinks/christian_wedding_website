"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStats from "@/components/admin/DashboardStats";
import RSVPTable from "@/components/admin/RSVPTable";
import { getAllRSVPs, computeRSVPStats } from "@/lib/firestore";
import { RSVPData, RSVPStats } from "@/types/rsvp";
import { weddingData } from "@/config/wedding";
import { RefreshCw, Users, AlertCircle, Train, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [stats, setStats] = useState<RSVPStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const records = await getAllRSVPs();
      setRsvps(records);
      const computed = computeRSVPStats(records);
      setStats(computed);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load RSVPs");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Title & Actions Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#211B17]">
                Guest RSVPs &amp; Invitations
              </h1>
              <span className="w-2 h-2 rounded-full bg-[#22863A]" />
            </div>
            <p className="text-xs text-[#7A6C60] mt-1 font-medium">
              Real-time synchronization of guest confirmations and train passenger requirements
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/transport"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#FAF0DC] text-[#8E681C] border border-[#D4A33B]/40 hover:bg-[#F5E5C4] transition-colors"
            >
              <Train className="w-3.5 h-3.5" />
              <span>Transport Plan</span>
            </Link>

            <button
              onClick={() => loadData(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-[#D5C9B8] text-[#5C4F46] hover:bg-[#F5F2EB] transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#78223B]" : ""}`}
              />
              <span>{refreshing ? "Syncing..." : "Sync Data"}</span>
            </button>
          </div>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-4 rounded-xl bg-[#FDF5F7] border border-[#F2D4DA] text-xs text-[#8A243D] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => loadData(true)}
              className="underline font-bold ml-4"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && !refreshing ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-3 border-[#78223B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-sans text-[#7A6C60]">
              Loading guest responses from Firestore...
            </p>
          </div>
        ) : (
          <>
            {/* Dashboard Stats */}
            {stats && <DashboardStats stats={stats} />}

            {/* RSVP Table */}
            <RSVPTable rsvps={rsvps} onRefresh={() => loadData(true)} />
          </>
        )}
      </div>
    </AdminLayout>
  );
}
