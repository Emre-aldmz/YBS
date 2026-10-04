"use client";

import {
  LayoutDashboard,
  BarChart3,
  Users,
  DollarSign,
  Gamepad2,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Box,
} from "lucide-react";
import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Box, label: "3D OLAP Küpü", href: "/olap-cube" },
  { icon: Gamepad2, label: "LEGO Temaları", href: "#" },
  { icon: Users, label: "LEGO Insiders", href: "#" },
  { icon: DollarSign, label: "Gelir Analizi", href: "#" },
  { icon: BarChart3, label: "Raporlar", href: "#" },
];

const bottomItems = [
  { icon: Settings, label: "Ayarlar" },
  { icon: HelpCircle, label: "Yardım" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();

  return (
    <aside
      className={`hidden lg:flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
      style={{
        background:
          "linear-gradient(180deg, rgba(6,7,13,0.97) 0%, rgba(10,12,24,0.99) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-lego-red flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(227,0,11,0.5)]">
          <span className="text-white font-bold text-sm">L</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-white font-bold text-base tracking-tight leading-none">
              LEGO
            </h1>
            <p className="text-text-muted text-[10px] tracking-widest uppercase mt-0.5">
              Intelligence
            </p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`sidebar-item ${pathname === item.href ? "active" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && (
              <span className="text-sm font-medium truncate">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 space-y-1 border-t border-white/5">
        {bottomItems.map((item) => (
          <div
            key={item.label}
            className="sidebar-item"
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && (
              <span className="text-sm font-medium truncate">
                {item.label}
              </span>
            )}
          </div>
        ))}

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-item w-full justify-center lg:justify-start"
          title={collapsed ? "Genişlet" : "Daralt"}
        >
          {collapsed ? (
            <ChevronRight size={20} className="flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft size={20} className="flex-shrink-0" />
              <span className="text-sm font-medium">Daralt</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
