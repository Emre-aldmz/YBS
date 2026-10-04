"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  Gamepad2,
  Users,
  CreditCard,
  Filter,
  Loader2,
} from "lucide-react";

import { getHardwareSales, getPSNUsers, getDepartmentRevenue } from "@/lib/api";
import type { HardwareSalesResponse, PSNUsersResponse, DepartmentRevenueResponse } from "@/types";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import KpiCard from "@/components/KpiCard";
import SalesChart from "@/components/SalesChart";
import UsersChart from "@/components/UsersChart";
import RevenueChart from "@/components/RevenueChart";
import DataTable from "@/components/DataTable";

export default function DashboardPage() {
  // Veri Durumları
  const [salesData, setSalesData] = useState<HardwareSalesResponse | null>(null);
  const [usersData, setUsersData] = useState<PSNUsersResponse | null>(null);
  const [revenueData, setRevenueData] = useState<DepartmentRevenueResponse | null>(null);
  
  // Arayüz Durumları
  const [loading, setLoading] = useState(true);
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [deptFilter, setDeptFilter] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      try {
        const [sales, users, revenue] = await Promise.all([
          getHardwareSales(regionFilter),
          getPSNUsers(regionFilter),
          getDepartmentRevenue(deptFilter),
        ]);
        
        if (isMounted) {
          setSalesData(sales);
          setUsersData(users);
          setRevenueData(revenue);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [regionFilter, deptFilter]);

  const formatLargeNumber = (num: number): string => {
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  const REGIONS = ["North America", "Europe", "Asia-Pacific", "Japan", "Rest of World"];
  const DEPARTMENTS = ["Game & Network Services", "Sony Music", "Sony Pictures", "Imaging & Sensing", "Electronics & Solutions", "Financial Services"];

  return (
    <div className="flex min-h-screen bg-background bg-grid-pattern">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 lg:p-8 space-y-6 lg:space-y-8 overflow-y-auto">
          
          {/* ─── Interactive Filter Bar ─── */}
          <div className="glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up hover:border-electric-blue/30 transition-colors duration-300">
            <div className="flex items-center gap-2 text-text-muted">
              <Filter size={18} className="text-electric-blue" />
              <span className="text-sm font-medium uppercase tracking-wider text-white/90">Akıllı Filtreler</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group">
                <select 
                  className="appearance-none bg-white/5 hover:bg-white/10 border border-white/10 hover:border-electric-blue/50 rounded-lg pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/20 transition-all duration-200 cursor-pointer"
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                >
                  <option value="" className="bg-sony-dark text-white">🌍 Tüm Bölgeler</option>
                  {REGIONS.map(r => <option key={r} value={r} className="bg-sony-dark text-white">{r}</option>)}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-electric-blue transition-colors">
                  ▼
                </div>
              </div>
              
              <div className="relative group">
                <select 
                  className="appearance-none bg-white/5 hover:bg-white/10 border border-white/10 hover:border-electric-blue/50 rounded-lg pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/20 transition-all duration-200 cursor-pointer"
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                >
                  <option value="" className="bg-sony-dark text-white">🏢 Tüm Departmanlar</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-sony-dark text-white">{d}</option>)}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-electric-blue transition-colors">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* ─── Content Area ─── */}
          <div className={`transition-opacity duration-500 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'} relative`}>
            
            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/20 backdrop-blur-sm rounded-2xl">
                <Loader2 size={36} className="animate-spin text-electric-blue mb-4 drop-shadow-lg" />
                <p className="text-sm font-medium text-white animate-pulse tracking-wide">Analitik Veriler Filtreleniyor...</p>
              </div>
            )}

            {salesData && usersData && revenueData && (
              <div className="space-y-6 lg:space-y-8">
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
              </div>
            )}
          </div>

          {/* ─── Footer ─── */}
          <footer className="text-center py-6 border-t border-white/5 mt-8">
            <p className="text-text-muted text-xs transition-colors hover:text-white/70">
              Sony Intelligence Dashboard — YBS Dersi Projesi © 2026 ·{" "}
              <span className="text-electric-blue font-medium hover:underline cursor-pointer">Decoupled Architecture</span>{" "}
              · FastAPI + Next.js
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
