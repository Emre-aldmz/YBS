"""
Sony Küresel Satış & İş Zekası — Mock Veri Seti
================================================
PlayStation donanım satışları, PSN kullanıcı verileri ve
departman gelirlerini simüle eden kapsamlı sahte veri seti.
"""

import random
import math
from datetime import datetime, timedelta


# ─────────────────────────────────────────────
#  1) PlayStation Donanım Satışları (Bölgesel)
# ─────────────────────────────────────────────

REGIONS = ["North America", "Europe", "Asia-Pacific", "Japan", "Rest of World"]

PRODUCTS = [
    {"name": "PS5 Standard", "base_price": 499.99},
    {"name": "PS5 Digital Edition", "base_price": 399.99},
    {"name": "PS VR2", "base_price": 549.99},
    {"name": "DualSense Controller", "base_price": 69.99},
]

# Bölge bazlı ağırlıklar (toplam satıştaki pay)
REGION_WEIGHTS = {
    "North America": 0.34,
    "Europe": 0.28,
    "Asia-Pacific": 0.18,
    "Japan": 0.12,
    "Rest of World": 0.08,
}

# Ürün bazlı temel birim satış (çeyreklik, küresel)
PRODUCT_BASE_UNITS = {
    "PS5 Standard": 3_200_000,
    "PS5 Digital Edition": 2_400_000,
    "PS VR2": 850_000,
    "DualSense Controller": 5_500_000,
}


def _seasonal_factor(month: int) -> float:
    """Mevsimsel satış çarpanı — Q4 (Ekim-Aralık) yüksek."""
    # Sinüs dalgası ile doğal mevsimsellik
    return 1.0 + 0.35 * math.sin((month - 3) * math.pi / 6)


def generate_hardware_sales() -> dict:
    """Bölgesel PlayStation donanım satış verisi üretir."""
    months = []
    base_date = datetime(2025, 10, 1)

    for i in range(12):
        current_date = base_date + timedelta(days=30 * i)
        month_str = current_date.strftime("%Y-%m")
        month_num = current_date.month
        seasonal = _seasonal_factor(month_num)

        regions_data = []
        total_units = 0
        total_revenue = 0.0

        for region in REGIONS:
            weight = REGION_WEIGHTS[region]
            region_products = []
            region_units = 0
            region_revenue = 0.0

            for product in PRODUCTS:
                base = PRODUCT_BASE_UNITS[product["name"]] / 12  # Aylığa çevir
                units = int(base * weight * seasonal * random.uniform(0.88, 1.12))
                revenue = round(units * product["base_price"] / 1_000_000, 2)  # $M
                region_units += units
                region_revenue += revenue
                region_products.append({
                    "name": product["name"],
                    "units": units,
                    "revenue_million_usd": revenue,
                })

            yoy_growth = round(random.uniform(3.0, 18.5), 1)
            regions_data.append({
                "region": region,
                "units_sold": region_units,
                "revenue_million_usd": round(region_revenue, 2),
                "yoy_growth_pct": yoy_growth,
                "products": region_products,
            })
            total_units += region_units
            total_revenue += region_revenue

        months.append({
            "month": month_str,
            "total_units_sold": total_units,
            "total_revenue_million_usd": round(total_revenue, 2),
            "regions": regions_data,
        })

    # En son ayın verileri özet olarak üst seviyeye
    latest = months[-1]
    return {
        "period": latest["month"],
        "total_units_sold": latest["total_units_sold"],
        "total_revenue_million_usd": latest["total_revenue_million_usd"],
        "yoy_growth_pct": round(random.uniform(6.0, 14.0), 1),
        "regions": latest["regions"],
        "monthly_trend": [
            {
                "month": m["month"],
                "total_units": m["total_units_sold"],
                "total_revenue_million_usd": m["total_revenue_million_usd"],
            }
            for m in months
        ],
    }


# ─────────────────────────────────────────────
#  2) PSN Aylık Aktif Kullanıcı Verileri
# ─────────────────────────────────────────────

def generate_psn_users() -> dict:
    """PSN aylık aktif kullanıcı trend verisi üretir."""
    base_mau = 108_000_000
    base_ps_plus = 45_000_000
    base_session = 2.1  # saat

    monthly_trend = []
    base_date = datetime(2025, 10, 1)

    for i in range(12):
        current_date = base_date + timedelta(days=30 * i)
        month_str = current_date.strftime("%Y-%m")
        month_num = current_date.month

        # Doğal büyüme + mevsimsellik
        growth = 1 + (i * 0.008)  # %0.8 aylık organik büyüme
        seasonal = 1.0 + 0.12 * math.sin((month_num - 1) * math.pi / 6)

        mau = int(base_mau * growth * seasonal * random.uniform(0.97, 1.03))
        ps_plus = int(base_ps_plus * growth * random.uniform(0.96, 1.04))
        session = round(base_session * seasonal * random.uniform(0.9, 1.1), 1)

        monthly_trend.append({
            "month": month_str,
            "mau": mau,
            "ps_plus_subscribers": ps_plus,
            "avg_session_hours": session,
        })

    latest = monthly_trend[-1]

    # Bölge bazlı dağılım
    region_breakdown = [
        {"region": "North America", "mau": int(latest["mau"] * 0.32), "share_pct": 32.0},
        {"region": "Europe", "mau": int(latest["mau"] * 0.30), "share_pct": 30.0},
        {"region": "Asia-Pacific", "mau": int(latest["mau"] * 0.20), "share_pct": 20.0},
        {"region": "Japan", "mau": int(latest["mau"] * 0.11), "share_pct": 11.0},
        {"region": "Rest of World", "mau": int(latest["mau"] * 0.07), "share_pct": 7.0},
    ]

    return {
        "current_mau": latest["mau"],
        "ps_plus_subscribers": latest["ps_plus_subscribers"],
        "avg_session_hours": latest["avg_session_hours"],
        "mau_growth_pct": round(
            ((latest["mau"] - monthly_trend[0]["mau"]) / monthly_trend[0]["mau"]) * 100, 1
        ),
        "region_breakdown": region_breakdown,
        "monthly_trend": monthly_trend,
    }


# ─────────────────────────────────────────────
#  3) Departman Gelir Dağılımı
# ─────────────────────────────────────────────

DEPARTMENTS = [
    {
        "name": "Game & Network Services",
        "base_revenue": 29.1,
        "profit_margin": 13.2,
        "color": "#003087",
    },
    {
        "name": "Sony Music",
        "base_revenue": 12.8,
        "profit_margin": 18.5,
        "color": "#e91e63",
    },
    {
        "name": "Sony Pictures",
        "base_revenue": 11.2,
        "profit_margin": 8.7,
        "color": "#ff9800",
    },
    {
        "name": "Imaging & Sensing",
        "base_revenue": 10.9,
        "profit_margin": 15.3,
        "color": "#00bcd4",
    },
    {
        "name": "Electronics & Solutions",
        "base_revenue": 14.5,
        "profit_margin": 6.1,
        "color": "#8bc34a",
    },
    {
        "name": "Financial Services",
        "base_revenue": 10.2,
        "profit_margin": 11.8,
        "color": "#9c27b0",
    },
]


def generate_department_revenue() -> dict:
    """Departman bazlı gelir dağılımı verisi üretir."""
    departments_data = []
    total_revenue = 0.0

    for dept in DEPARTMENTS:
        quarterly_trend = []
        for q in range(1, 5):
            q_revenue = round(
                (dept["base_revenue"] / 4) * random.uniform(0.85, 1.15), 2
            )
            quarterly_trend.append({
                "quarter": f"Q{q}",
                "revenue_billion_usd": q_revenue,
            })

        annual_revenue = round(sum(q["revenue_billion_usd"] for q in quarterly_trend), 2)
        total_revenue += annual_revenue

        qoq_change = round(random.uniform(-5.0, 12.0), 1)
        profit_margin = round(dept["profit_margin"] * random.uniform(0.9, 1.1), 1)

        departments_data.append({
            "name": dept["name"],
            "revenue_billion_usd": annual_revenue,
            "profit_margin_pct": profit_margin,
            "qoq_change_pct": qoq_change,
            "color": dept["color"],
            "quarterly_trend": quarterly_trend,
        })

    # Pay oranlarını hesapla
    for dept in departments_data:
        dept["share_pct"] = round(
            (dept["revenue_billion_usd"] / total_revenue) * 100, 1
        )

    return {
        "fiscal_year": "FY2026",
        "total_revenue_billion_usd": round(total_revenue, 2),
        "yoy_growth_pct": round(random.uniform(3.0, 9.5), 1),
        "departments": departments_data,
    }


# ─────────────────────────────────────────────
#  Önbellek — Sunucu başlatıldığında bir kez üretilir
# ─────────────────────────────────────────────

random.seed(42)  # Tutarlı veri için sabit seed

HARDWARE_SALES_DATA = generate_hardware_sales()
PSN_USERS_DATA = generate_psn_users()
DEPARTMENT_REVENUE_DATA = generate_department_revenue()
