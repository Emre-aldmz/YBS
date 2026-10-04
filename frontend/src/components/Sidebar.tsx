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
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Gamepad2, label: "PlayStation Satışları", active: false },
  { icon: Users, label: "PSN Kullanıcıları", active: false },
  { icon: DollarSign, label: "Gelir Analizi", active: false },
  { icon: BarChart3, label: "Raporlar", active: false },
];

const bottomItems = [
  { icon: Settings, label: "Ayarlar" },
  { icon: HelpCircle, label: "Yardım" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

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
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric-blue to-sony-blue flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-white font-bold text-base tracking-tight leading-none">
              SONY
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
          <div
            key={item.label}
            className={`sidebar-item ${item.active ? "active" : ""}`}
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
