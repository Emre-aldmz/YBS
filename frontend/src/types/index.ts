/* ─── API Type Definitions — Sony Dashboard ─── */

// ─── Hardware Sales ───

export interface ProductSales {
  name: string;
  units: number;
  revenue_million_usd: number;
}

export interface RegionSales {
  region: string;
  units_sold: number;
  revenue_million_usd: number;
  yoy_growth_pct: number;
  products: ProductSales[];
}

export interface MonthlyTrend {
  month: string;
  total_units: number;
  total_revenue_million_usd: number;
}

export interface HardwareSalesResponse {
  period: string;
  total_units_sold: number;
  total_revenue_million_usd: number;
  yoy_growth_pct: number;
  regions: RegionSales[];
  monthly_trend: MonthlyTrend[];
}

// ─── PSN Users ───

export interface PSNMonthlyTrend {
  month: string;
  mau: number;
  ps_plus_subscribers: number;
  avg_session_hours: number;
}

export interface RegionBreakdown {
  region: string;
  mau: number;
  share_pct: number;
}

export interface PSNUsersResponse {
  current_mau: number;
  ps_plus_subscribers: number;
  avg_session_hours: number;
  mau_growth_pct: number;
  region_breakdown: RegionBreakdown[];
  monthly_trend: PSNMonthlyTrend[];
}

// ─── Department Revenue ───

export interface QuarterlyTrend {
  quarter: string;
  revenue_billion_usd: number;
}

export interface DepartmentRevenue {
  name: string;
  revenue_billion_usd: number;
  profit_margin_pct: number;
  qoq_change_pct: number;
  color: string;
  share_pct: number;
  quarterly_trend: QuarterlyTrend[];
}

export interface DepartmentRevenueResponse {
  fiscal_year: string;
  total_revenue_billion_usd: number;
  yoy_growth_pct: number;
  departments: DepartmentRevenue[];
}

// ─── OLAP Cube ───

export interface CubeNode {
  id: string;
  region: string;
  year: string;
  category: string;
  revenue_million_usd: number;
  status: "optimal" | "warning" | "critical";
  coordinates: [number, number, number];
}

export interface CubeResponse {
  nodes: CubeNode[];
  total_revenue_billion: number;
}
