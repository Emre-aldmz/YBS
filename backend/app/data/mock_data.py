"""
LEGO Küresel Satış & İş Zekası — Mock Veri Seti
================================================
LEGO temalı satışlar, üye (Insiders) verileri ve
kategori gelirlerini simüle eden veri seti.
"""

import random
import math
from datetime import datetime, timedelta

# ─────────────────────────────────────────────
#  1) Temel Satışlar (Bölgesel) -> Hardware Sales endpointini kullanır
# ─────────────────────────────────────────────

REGIONS = ["Americas", "EMEA", "APAC"]

PRODUCTS = [
    {"name": "Star Wars Millennium Falcon", "base_price": 849.99},
    {"name": "Technic Porsche 911 GT3 RS", "base_price": 299.99},
    {"name": "City Police Station", "base_price": 69.99},
    {"name": "Ninjago City Gardens", "base_price": 349.99},
]

REGION_WEIGHTS = {
    "Americas": 0.45,
    "EMEA": 0.35,
    "APAC": 0.20,
}

PRODUCT_BASE_UNITS = {
    "Star Wars Millennium Falcon": 450_000,
    "Technic Porsche 911 GT3 RS": 850_000,
    "City Police Station": 3_500_000,
    "Ninjago City Gardens": 1_200_000,
}

def _seasonal_factor(month: int) -> float:
    # Q4 (Tatil dönemi) LEGO için çok yüksektir
    return 1.0 + 0.6 * math.sin((month - 3) * math.pi / 6)

def generate_hardware_sales() -> dict:
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
                base = PRODUCT_BASE_UNITS[product["name"]] / 12
                units = int(base * weight * seasonal * random.uniform(0.9, 1.1))
                revenue = round(units * product["base_price"] / 1_000_000, 2)
                region_units += units
                region_revenue += revenue
                region_products.append({
                    "name": product["name"],
                    "units": units,
                    "revenue_million_usd": revenue,
                })

            yoy_growth = round(random.uniform(2.0, 15.0), 1)
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

    latest = months[-1]
    return {
        "period": latest["month"],
        "total_units_sold": latest["total_units_sold"],
        "total_revenue_million_usd": latest["total_revenue_million_usd"],
        "yoy_growth_pct": round(random.uniform(5.0, 12.0), 1),
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
#  2) LEGO Insiders (PSN endpointini kullanır)
# ─────────────────────────────────────────────

def generate_psn_users() -> dict:
    base_mau = 35_000_000
    base_ps_plus = 15_000_000 # Premium Members
    base_session = 1.2

    monthly_trend = []
    base_date = datetime(2025, 10, 1)

    for i in range(12):
        current_date = base_date + timedelta(days=30 * i)
        month_str = current_date.strftime("%Y-%m")
        month_num = current_date.month

        growth = 1 + (i * 0.015)
        seasonal = 1.0 + 0.1 * math.sin((month_num - 1) * math.pi / 6)

        mau = int(base_mau * growth * seasonal * random.uniform(0.95, 1.05))
        ps_plus = int(base_ps_plus * growth * random.uniform(0.95, 1.05))
        session = round(base_session * seasonal * random.uniform(0.9, 1.1), 1)

        monthly_trend.append({
            "month": month_str,
            "mau": mau,
            "ps_plus_subscribers": ps_plus,
            "avg_session_hours": session,
        })

    latest = monthly_trend[-1]

    region_breakdown = [
        {"region": "Americas", "mau": int(latest["mau"] * 0.40), "share_pct": 40.0},
        {"region": "EMEA", "mau": int(latest["mau"] * 0.40), "share_pct": 40.0},
        {"region": "APAC", "mau": int(latest["mau"] * 0.20), "share_pct": 20.0},
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
#  3) LEGO Kategorileri (Departments endpointini kullanır)
# ─────────────────────────────────────────────

DEPARTMENTS = [
    {
        "name": "Licensed Sets",
        "base_revenue": 4.5, # Billion USD
        "profit_margin": 14.5,
        "color": "#E3000B", # LEGO Red
    },
    {
        "name": "Original Themes",
        "base_revenue": 3.8,
        "profit_margin": 22.0,
        "color": "#FFD500", # LEGO Yellow
    },
    {
        "name": "Digital & Merch",
        "base_revenue": 1.2,
        "profit_margin": 18.2,
        "color": "#00B140", # LEGO Green
    },
]

def generate_department_revenue() -> dict:
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

        qoq_change = round(random.uniform(-2.0, 15.0), 1)
        profit_margin = round(dept["profit_margin"] * random.uniform(0.9, 1.1), 1)

        departments_data.append({
            "name": dept["name"],
            "revenue_billion_usd": annual_revenue,
            "profit_margin_pct": profit_margin,
            "qoq_change_pct": qoq_change,
            "color": dept["color"],
            "quarterly_trend": quarterly_trend,
        })

    for dept in departments_data:
        dept["share_pct"] = round(
            (dept["revenue_billion_usd"] / total_revenue) * 100, 1
        )

    return {
        "fiscal_year": "FY2026",
        "total_revenue_billion_usd": round(total_revenue, 2),
        "yoy_growth_pct": round(random.uniform(4.0, 11.0), 1),
        "departments": departments_data,
    }


# ─────────────────────────────────────────────
#  4) 3D OLAP Cube Data (LEGO Matrix)
# ─────────────────────────────────────────────

def generate_olap_cube() -> dict:
    regions = ["Americas", "EMEA", "APAC"]
    years = ["2023", "2024", "2025"]
    categories = ["Licensed Sets", "Original Themes", "Digital & Merch"]
    
    nodes = []
    total_rev = 0.0
    
    for y_idx, region in enumerate(regions):
        for x_idx, year in enumerate(years):
            for z_idx, category in enumerate(categories):
                coords = [x_idx - 1, y_idx - 1, z_idx - 1]
                
                rev = round(random.uniform(0.5, 3.5), 2) # Billion USD
                total_rev += rev
                
                if rev > 2.5:
                    status = "optimal"
                elif rev > 1.5:
                    status = "warning"
                else:
                    status = "critical"
                    
                nodes.append({
                    "id": f"{region[:2].lower()}-{year[-2:]}-{category.split()[0].lower()}",
                    "region": region,
                    "year": year,
                    "category": category,
                    "revenue_million_usd": rev * 1000, 
                    "status": status,
                    "coordinates": coords
                })
                
    return {
        "nodes": nodes,
        "total_revenue_billion": round(total_rev, 2)
    }

random.seed(42)

HARDWARE_SALES_DATA = generate_hardware_sales()
PSN_USERS_DATA = generate_psn_users()
DEPARTMENT_REVENUE_DATA = generate_department_revenue()
OLAP_CUBE_DATA = generate_olap_cube()
