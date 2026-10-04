"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: ReactNode;
  glowClass: string;
  accentColor: string;
  delay: string;
}

export default function KpiCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  glowClass,
  accentColor,
  delay,
}: KpiCardProps) {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <div
      className={`glass-card ${glowClass} p-5 lg:p-6 animate-fade-in-up ${delay} group relative overflow-hidden`}
    >
      {/* Background Gradient Accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: accentColor }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="text-text-muted text-xs font-medium uppercase tracking-wider">
          {title}
        </span>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${accentColor}15` }}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="relative z-10">
        <p className="stat-value text-3xl lg:text-4xl text-white mb-3">
          {value}
        </p>

        {/* Change Indicator */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
              isPositive
                ? "bg-accent-emerald/10 text-accent-emerald"
                : isNeutral
                ? "bg-white/5 text-text-muted"
                : "bg-accent-rose/10 text-accent-rose"
            }`}
          >
            {isPositive ? (
              <TrendingUp size={12} />
            ) : isNeutral ? (
              <Minus size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className="text-text-muted text-xs">{changeLabel}</span>
        </div>
      </div>
    </div>
  );
}
