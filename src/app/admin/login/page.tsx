"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAdmin } from "@/lib/auth";
import { weddingData } from "@/config/wedding";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginAdmin(email, password);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid admin credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background warm aesthetic glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#FAF0DC]/70 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Wedding Identity */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#78223B] text-[#F2DC9B] text-xl font-serif font-bold shadow-md mb-3">
            ✝
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#211B17] tracking-tight">
            {weddingData.couple.groom.name}
            <span className="text-xs font-sans block text-[#8E681C] font-semibold mt-0.5">
              (House: {weddingData.couple.groom.houseName})
            </span>
            <span className="text-sm font-sans text-[#7A6C60] font-normal block">
              &amp; {weddingData.couple.bride.name}
            </span>
          </h1>
          <p className="text-xs font-sans text-[#7A6C60] mt-2 font-medium">
            Organizer Portal • RSVP &amp; Train Transportation System
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD5] shadow-xl relative">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#F0EAE1]">
            <Shield className="w-5 h-5 text-[#78223B]" />
            <h2 className="text-base font-bold text-[#211B17]">Admin Authentication</h2>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#FDF5F7] border border-[#F2D4DA] text-xs text-[#8A243D] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#5C4F46] uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E7F74] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@wedding.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D5C9B8] text-xs font-medium text-[#211B17] focus:outline-none focus:border-[#78223B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5C4F46] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8E7F74] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D5C9B8] text-xs font-medium text-[#211B17] focus:outline-none focus:border-[#78223B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#78223B] hover:bg-[#5C1A2D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Notice for Setup / Demo */}
          <div className="mt-6 pt-4 border-t border-[#F0EAE1] text-[11px] text-[#8E7F74] text-center">
            <p>
              Protected by Firebase Authentication.
              <br />
              <span className="text-[10px] text-[#A3968B]">
                (Demo login fallback: email containing &quot;admin&quot; and 6+ character password)
              </span>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-[#78223B] hover:underline font-semibold"
          >
            ← Return to Wedding Invitation
          </Link>
        </div>
      </div>
    </div>
  );
}
