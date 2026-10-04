"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { DepartmentRevenue } from "@/types";

interface RevenueChartProps {
  departments: DepartmentRevenue[];
  totalRevenue: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const dept = payload[0].payload;

  return (
    <div className="glass-card !rounded-xl p-4 !border-white/10 shadow-2xl min-w-[200px]">
      <p className="text-white font-semibold text-sm mb-2">{dept.name}</p>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-text-muted">Gelir</span>
          <span className="text-white font-mono font-bold">
            ${dept.revenue_billion_usd.toFixed(1)}B
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-text-muted">Kâr Marjı</span>
          <span className="text-accent-emerald font-mono font-bold">
            {dept.profit_margin_pct}%
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-text-muted">Pay</span>
          <span className="text-electric-blue font-mono font-bold">
            {dept.share_pct}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default function RevenueChart({
  departments,
  totalRevenue,
}: RevenueChartProps) {
  return (
    <div className="glass-card p-5 lg:p-6 animate-fade-in-up animate-delay-600">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-base">
            Departman Gelir Dağılımı
          </h3>
          <p className="text-text-muted text-xs mt-1">
            FY2026 yıllık gelir payları
          </p>
        </div>
        <span className="text-[10px] font-mono text-text-muted bg-white/5 px-2.5 py-1 rounded-lg">
          YIL
        </span>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Donut Chart */}
        <div className="relative w-[220px] h-[220px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departments}
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={100}
                paddingAngle={3}
                dataKey="revenue_billion_usd"
                stroke="none"
              >
                {departments.map((dept, index) => (
                  <Cell key={index} fill={dept.color} fillOpacity={0.85} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-text-muted text-[10px] uppercase tracking-wider">
              Toplam
            </span>
            <span className="stat-value text-2xl text-white mt-1">
              ${totalRevenue.toFixed(1)}B
            </span>
          </div>
        </div>

        {/* Legend & Stats */}
        <div className="flex-1 w-full space-y-2.5">
          {departments.map((dept) => (
            <div
              key={dept.name}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/3 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: dept.color }}
                />
                <span className="text-white/80 text-sm truncate group-hover:text-white transition-colors">
                  {dept.name}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-white font-mono text-sm font-semibold">
                  ${dept.revenue_billion_usd.toFixed(1)}B
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                    dept.qoq_change_pct >= 0
                      ? "text-accent-emerald"
                      : "text-accent-rose"
                  }`}
                >
                  {dept.qoq_change_pct >= 0 ? (
                    <TrendingUp size={11} />
                  ) : (
                    <TrendingDown size={11} />
                  )}
                  {dept.qoq_change_pct >= 0 ? "+" : ""}
                  {dept.qoq_change_pct}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
