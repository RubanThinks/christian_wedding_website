"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAdminAuthStateChanged, logoutAdmin, AdminUser } from "@/lib/auth";
import { weddingData } from "@/config/wedding";
import {
  Users,
  Train,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAdminAuthStateChanged((user) => {
      if (!user) {
        router.push("/admin/login");
      } else {
        setAdminUser(user);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-12 h-12 border-3 border-[#78223B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-sans text-[#5C4F46] font-medium tracking-wide">
            Verifying Admin Credentials...
          </p>
        </div>
      </div>
    );
  }

  const navLinks = [
    {
      name: "RSVPs & Overview",
      href: "/admin/dashboard",
      icon: Users,
    },
    {
      name: "Train Transportation",
      href: "/admin/transport",
      icon: Train,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col text-[#211B17]">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5DFD5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand / Wedding Name */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#78223B] text-[#F2DC9B] flex items-center justify-center font-serif text-lg font-bold shadow-xs">
                ✝
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base sm:text-lg font-bold text-[#211B17] tracking-tight">
                    {weddingData.couple.groom.firstName} & {weddingData.couple.bride.firstName}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-[#FAF0DC] text-[#8E681C] border border-[#D4A33B]/40 uppercase tracking-wider">
                    Admin
                  </span>
                </div>
                <p className="text-[11px] font-sans text-[#7A6C60] hidden sm:block">
                  Guest & Train Transport Management
                </p>
              </div>
            </div>

            {/* Middle: Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? "bg-[#78223B] text-white shadow-xs"
                        : "text-[#5C4F46] hover:bg-[#F2ECE1] hover:text-[#211B17]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: User Email + Live Site + Logout */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-medium text-[#211B17] block truncate max-w-[180px]">
                  {adminUser?.email}
                </span>
                <span className="text-[10px] text-[#22863A] font-semibold flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22863A]" />
                  Active Session
                </span>
              </div>

              <div className="h-6 w-px bg-[#E5DFD5]" />

              <Link
                href="/"
                target="_blank"
                className="p-2 rounded-lg text-[#5C4F46] hover:bg-[#F2ECE1] hover:text-[#78223B] transition-colors"
                title="View Public Wedding Website"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#78223B] bg-[#FBF0F3] hover:bg-[#F5DEE4] transition-colors"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#5C4F46] hover:bg-[#F2ECE1]"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5DFD5] bg-white px-4 pt-3 pb-4 space-y-2">
            <div className="pb-2 border-b border-[#F0EAE1]">
              <p className="text-xs font-semibold text-[#211B17]">
                {adminUser?.email}
              </p>
              <p className="text-[11px] text-[#22863A]">Active Admin Session</p>
            </div>

            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-[#78223B] text-white"
                      : "text-[#5C4F46] hover:bg-[#F2ECE1]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-[#F0EAE1] flex items-center justify-between">
              <Link
                href="/"
                target="_blank"
                className="text-xs text-[#5C4F46] flex items-center gap-1.5 py-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Site</span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-[#78223B] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FBF0F3]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Admin Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[#E5DFD5] bg-white py-4 text-center text-xs text-[#7A6C60]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Wedding of {weddingData.couple.groom.name} &amp; {weddingData.couple.bride.name}
          </p>
          <p className="text-[11px] text-[#A3968B]">
            Confidential Organizer Portal • Powered by Firebase Firestore
          </p>
        </div>
      </footer>
    </div>
  );
}
