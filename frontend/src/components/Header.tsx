"use client";

import { Bell, Search, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-white/5 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
      {/* Left — Title */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-text-muted">
          <Menu size={20} />
        </button>

        <div>
          <h2 className="text-white font-semibold text-lg tracking-tight">
            Yönetici Paneli
          </h2>
          <p className="text-text-muted text-xs mt-0.5">
            Sony Küresel Satış & İş Zekası Dashboard — FY2026
          </p>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl px-4 py-2 focus-within:border-electric-blue/30 transition-colors">
          <Search size={16} className="text-text-muted" />
          <input
            type="text"
            placeholder="Ara..."
            className="bg-transparent text-sm text-white placeholder-text-muted outline-none w-40"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl hover:bg-white/5 text-text-muted transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-rose rounded-full animate-pulse" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 ml-2 pl-3 border-l border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sony-blue to-electric-blue flex items-center justify-center">
            <span className="text-white text-xs font-bold">YK</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-white text-sm font-medium leading-none">
              Yönetim Kurulu
            </p>
            <p className="text-text-muted text-[11px] mt-0.5">Yönetici</p>
          </div>
        </div>
      </div>
    </header>
  );
}
