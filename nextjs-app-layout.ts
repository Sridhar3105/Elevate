"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, User, Bot, GraduationCap,
  ShoppingCart, Package, Briefcase, MessageSquare,
  Bell, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/profile",   icon: User,            label: "My Profile" },
  { href: "/ai",        icon: Bot,             label: "AI Assistant" },
  { href: "/courses",   icon: GraduationCap,   label: "Courses" },
  { href: "/store",     icon: ShoppingCart,    label: "Store" },
  { href: "/library",   icon: Package,         label: "Library" },
  { href: "/jobs",      icon: Briefcase,       label: "Jobs" },
  { href: "/forum",     icon: MessageSquare,   label: "Community" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* ── Sidebar ── */}
      <aside
        className="flex flex-col flex-shrink-0 border-r"
        style={{ width: 220, background: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="grad-text text-2xl font-black tracking-wide">Elevate</div>
          <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Hardware Design Platform
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-2 py-3 flex-1">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "font-bold"
                    : "hover:bg-purple-900/10"
                )}
                style={{
                  background: active ? "rgba(168,85,247,.14)" : undefined,
                  color: active ? "var(--pink)" : "var(--muted)",
                }}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-4 flex flex-col gap-2">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-purple-900/10 w-full"
            style={{ color: "var(--muted)" }}
          >
            <Bell size={17} />
            Notifications
            <span
              className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: "linear-gradient(135deg,#e879f9,#7c3aed)" }}
            >
              3
            </span>
          </button>

          {/* User card */}
          <div
            className="flex items-center gap-2.5 p-3 rounded-xl border"
            style={{ background: "rgba(168,85,247,.07)", borderColor: "var(--border)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#e879f9,#7c3aed)" }}
            >
              AR
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate">Arjun Rao</div>
              <div className="text-xs truncate" style={{ color: "var(--muted)" }}>
                PCB Designer
              </div>
            </div>
            <button style={{ color: "var(--muted)" }}>
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {children}
      </main>
    </div>
  );
}
