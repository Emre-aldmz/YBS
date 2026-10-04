import {
  DollarSign,
  Gamepad2,
  Users,
  CreditCard,
} from "lucide-react";

import { getHardwareSales, getPSNUsers, getDepartmentRevenue } from "@/lib/api";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import KpiCard from "@/components/KpiCard";
import SalesChart from "@/components/SalesChart";
import UsersChart from "@/components/UsersChart";
import RevenueChart from "@/components/RevenueChart";
import DataTable from "@/components/DataTable";

// Server Component — veriler sunucu tarafında fetch edilir
export default async function DashboardPage() {
  // Paralel veri çekimi (Decoupled Architecture — Backend API'den)
  const [salesData, usersData, revenueData] = await Promise.all([
    getHardwareSales(),
    getPSNUsers(),
    getDepartmentRevenue(),
  ]);

  // KPI hesaplamaları
  const formatLargeNumber = (num: number): string => {
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="flex min-h-screen bg-background bg-grid-pattern">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 lg:p-8 space-y-6 lg:space-y-8 overflow-y-auto">
          {/* ─── KPI Cards Row ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            <KpiCard
              title="Toplam Gelir"
              value={`$${revenueData.total_revenue_billion_usd.toFixed(1)}B`}
              change={revenueData.yoy_growth_pct}
              changeLabel="yıllık büyüme"
              icon={<DollarSign size={20} className="text-electric-blue" />}
              glowClass="kpi-glow-blue"
              accentColor="#00aaff"
              delay="animate-delay-100"
            />
            <KpiCard
              title="PS5 Satışları"
              value={formatLargeNumber(salesData.total_units_sold)}
              change={salesData.yoy_growth_pct}
              changeLabel="YoY büyüme"
              icon={<Gamepad2 size={20} className="text-accent-amber" />}
              glowClass="kpi-glow-amber"
              accentColor="#f59e0b"
              delay="animate-delay-200"
            />
            <KpiCard
              title="PSN Aktif Kullanıcı"
              value={formatLargeNumber(usersData.current_mau)}
              change={usersData.mau_growth_pct}
              changeLabel="12 aylık büyüme"
              icon={<Users size={20} className="text-accent-emerald" />}
              glowClass="kpi-glow-emerald"
              accentColor="#10b981"
              delay="animate-delay-300"
            />
            <KpiCard
              title="PS Plus Abone"
              value={formatLargeNumber(usersData.ps_plus_subscribers)}
              change={8.4}
              changeLabel="yıllık büyüme"
              icon={<CreditCard size={20} className="text-accent-violet" />}
              glowClass="kpi-glow-violet"
              accentColor="#8b5cf6"
              delay="animate-delay-400"
            />
          </div>

          {/* ─── Charts Row 1: Sales Bar + Users Area ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <SalesChart regions={salesData.regions} />
            <UsersChart monthlyTrend={usersData.monthly_trend} />
          </div>

          {/* ─── Charts Row 2: Revenue Donut + Data Table ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <RevenueChart
              departments={revenueData.departments}
              totalRevenue={revenueData.total_revenue_billion_usd}
            />
            <DataTable regions={salesData.regions} />
          </div>

          {/* ─── Footer ─── */}
          <footer className="text-center py-6 border-t border-white/5">
            <p className="text-text-muted text-xs">
              Sony Intelligence Dashboard — YBS Dersi Projesi © 2026 ·{" "}
              <span className="text-electric-blue">Decoupled Architecture</span>{" "}
              · FastAPI + Next.js
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
