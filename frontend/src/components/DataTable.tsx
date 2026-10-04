"use client";

import { TrendingUp, ArrowUpRight } from "lucide-react";
import type { RegionSales } from "@/types";

interface DataTableProps {
  regions: RegionSales[];
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("tr-TR").format(num);
};

export default function DataTable({ regions }: DataTableProps) {
  return (
    <div className="glass-card p-5 lg:p-6 animate-fade-in-up animate-delay-600 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white font-semibold text-base">
            Bölge Detay Tablosu
          </h3>
          <p className="text-text-muted text-xs mt-1">
            Tüm bölgelerin ürün bazlı satış kırılımı
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-electric-blue hover:text-electric-blue/80 transition-colors font-medium">
          Tümünü Gör <ArrowUpRight size={13} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-5 lg:-mx-6 px-5 lg:px-6">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-text-muted text-[11px] uppercase tracking-wider font-medium pb-3 pr-4">
                Bölge
              </th>
              <th className="text-right text-text-muted text-[11px] uppercase tracking-wider font-medium pb-3 px-4">
                Birim Satış
              </th>
              <th className="text-right text-text-muted text-[11px] uppercase tracking-wider font-medium pb-3 px-4">
                Gelir ($M)
              </th>
              <th className="text-right text-text-muted text-[11px] uppercase tracking-wider font-medium pb-3 pl-4">
                YoY Büyüme
              </th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region, idx) => (
              <tr
                key={region.region}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
              >
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{
                      background: ["#00aaff", "#003087", "#8b5cf6", "#f59e0b", "#10b981"][idx],
                    }} />
                    <span className="text-white text-sm font-medium group-hover:text-electric-blue transition-colors">
                      {region.region}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="text-white/80 text-sm font-mono">
                    {formatNumber(region.units_sold)}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="text-accent-amber text-sm font-mono font-semibold">
                    ${region.revenue_million_usd.toFixed(1)}
                  </span>
                </td>
                <td className="py-3.5 pl-4 text-right">
                  <span className="inline-flex items-center gap-1 text-accent-emerald text-xs font-semibold bg-accent-emerald/10 px-2 py-1 rounded-lg">
                    <TrendingUp size={11} />+{region.yoy_growth_pct}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
