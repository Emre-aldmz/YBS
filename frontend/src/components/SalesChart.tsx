"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { RegionSales } from "@/types";

interface SalesChartProps {
  regions: RegionSales[];
}

const COLORS = ["#00aaff", "#003087", "#8b5cf6", "#f59e0b", "#10b981"];

const formatNumber = (num: number) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="glass-card !rounded-xl p-4 !border-white/10 shadow-2xl min-w-[200px]">
      <p className="text-white font-semibold text-sm mb-2">{label}</p>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-text-muted">Birim Satış</span>
          <span className="text-white font-mono font-bold">
            {formatNumber(payload[0]?.value)}
          </span>
        </div>
        {payload[0]?.payload?.revenue_million_usd && (
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Gelir</span>
            <span className="text-accent-amber font-mono font-bold">
              ${payload[0].payload.revenue_million_usd.toFixed(1)}M
            </span>
          </div>
        )}
        {payload[0]?.payload?.yoy_growth_pct && (
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">YoY Büyüme</span>
            <span className="text-accent-emerald font-mono font-bold">
              +{payload[0].payload.yoy_growth_pct}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function SalesChart({ regions }: SalesChartProps) {
  const data = regions.map((r) => ({
    name: r.region.length > 14 ? r.region.slice(0, 12) + "…" : r.region,
    fullName: r.region,
    units_sold: r.units_sold,
    revenue_million_usd: r.revenue_million_usd,
    yoy_growth_pct: r.yoy_growth_pct,
  }));

  return (
    <div className="glass-card p-5 lg:p-6 animate-fade-in-up animate-delay-400">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-base">
            Bölgesel PS5 Donanım Satışları
          </h3>
          <p className="text-text-muted text-xs mt-1">
            Birim satış bazında bölge karşılaştırması
          </p>
        </div>
        <span className="text-[10px] font-mono text-text-muted bg-white/5 px-2.5 py-1 rounded-lg">
          SON AY
        </span>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            barCategoryGap="25%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatNumber}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar dataKey="units_sold" radius={[8, 8, 0, 0]} maxBarSize={48}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
