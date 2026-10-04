"""
Pydantic Response Modelleri — Sony Dashboard API
"""

from pydantic import BaseModel
from typing import Optional


# ─── Donanım Satışları ───

class ProductSales(BaseModel):
    name: str
    units: int
    revenue_million_usd: float


class RegionSales(BaseModel):
    region: str
    units_sold: int
    revenue_million_usd: float
    yoy_growth_pct: float
    products: list[ProductSales]


class MonthlyTrend(BaseModel):
    month: str
    total_units: int
    total_revenue_million_usd: float


class HardwareSalesResponse(BaseModel):
    period: str
    total_units_sold: int
    total_revenue_million_usd: float
    yoy_growth_pct: float
    regions: list[RegionSales]
    monthly_trend: list[MonthlyTrend]


# ─── PSN Kullanıcıları ───

class PSNMonthlyTrend(BaseModel):
    month: str
    mau: int
    ps_plus_subscribers: int
    avg_session_hours: float


class RegionBreakdown(BaseModel):
    region: str
    mau: int
    share_pct: float


class PSNUsersResponse(BaseModel):
    current_mau: int
    ps_plus_subscribers: int
    avg_session_hours: float
    mau_growth_pct: float
    region_breakdown: list[RegionBreakdown]
    monthly_trend: list[PSNMonthlyTrend]


# ─── Departman Gelirleri ───

class QuarterlyTrend(BaseModel):
    quarter: str
    revenue_billion_usd: float


class DepartmentRevenue(BaseModel):
    name: str
    revenue_billion_usd: float
    profit_margin_pct: float
    qoq_change_pct: float
    color: str
    share_pct: float
    quarterly_trend: list[QuarterlyTrend]


class DepartmentRevenueResponse(BaseModel):
    fiscal_year: str
    total_revenue_billion_usd: float
    yoy_growth_pct: float
    departments: list[DepartmentRevenue]


# ─── Genel API Yanıtı ───

class APIInfo(BaseModel):
    name: str
    version: str
    description: str
    endpoints: list[str]
