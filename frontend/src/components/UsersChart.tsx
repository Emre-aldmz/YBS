"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { PSNMonthlyTrend } from "@/types";

interface UsersChartProps {
  monthlyTrend: PSNMonthlyTrend[];
}

const formatMillions = (num: number) => `${(num / 1_000_000).toFixed(0)}M`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="glass-card !rounded-xl p-4 !border-white/10 shadow-2xl min-w-[220px]">
      <p className="text-white font-semibold text-sm mb-2">{label}</p>
      <div className="space-y-1.5">
        {payload.map((entry: any, idx: number) => (
          <div key={idx} className="flex justify-between text-xs">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: entry.color }}
              />
              <span className="text-text-muted">{entry.name}</span>
            </span>
            <span className="text-white font-mono font-bold">
              {formatMillions(entry.value)}
            </span>
          </div>
        ))}
        {payload[0]?.payload?.avg_session_hours && (
          <div className="flex justify-between text-xs pt-1 border-t border-white/5">
            <span className="text-text-muted">Ort. Oturum</span>
            <span className="text-accent-amber font-mono font-bold">
              {payload[0].payload.avg_session_hours}h
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function UsersChart({ monthlyTrend }: UsersChartProps) {
  const data = monthlyTrend.map((m) => ({
    ...m,
    month: m.month.slice(5), // "2025-10" → "10"
  }));

  return (
    <div className="glass-card p-5 lg:p-6 animate-fade-in-up animate-delay-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-base">
            PSN Aylık Aktif Kullanıcılar
          </h3>
          <p className="text-text-muted text-xs mt-1">
            MAU ve PS Plus abone trendi (12 ay)
          </p>
        </div>
        <span className="text-[10px] font-mono text-text-muted bg-white/5 px-2.5 py-1 rounded-lg">
          TREND
        </span>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="mauGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00aaff" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00aaff" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="psPlusGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatMillions}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                fontSize: "12px",
                color: "#64748b",
                paddingTop: "12px",
              }}
            />
            <Area
              name="MAU"
              type="monotone"
              dataKey="mau"
              stroke="#00aaff"
              strokeWidth={2.5}
              fill="url(#mauGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#00aaff",
                stroke: "#0a0c18",
                strokeWidth: 2,
              }}
            />
            <Area
              name="PS Plus"
              type="monotone"
              dataKey="ps_plus_subscribers"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#psPlusGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#8b5cf6",
                stroke: "#0a0c18",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
