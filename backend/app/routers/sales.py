"""
Router: PlayStation Donanım Satışları
Endpoint: GET /api/v1/sales/hardware
"""

from fastapi import APIRouter, Query
from typing import Optional
import copy
from app.models import HardwareSalesResponse
from app.data.mock_data import HARDWARE_SALES_DATA

router = APIRouter(prefix="/api/v1/sales", tags=["Sales"])


@router.get(
    "/hardware",
    response_model=HardwareSalesResponse,
    summary="PlayStation Donanım Satışları",
    description="Bölgesel PS5 donanım satış verileri — ürün bazlı kırılım ve aylık trend.",
)
async def get_hardware_sales(region: Optional[str] = Query(None, description="Bölge adına göre filtrele")):
    """Küresel PlayStation donanım satışlarını döndürür."""
    data = copy.deepcopy(HARDWARE_SALES_DATA)
    if region:
        filtered_regions = [r for r in data["regions"] if r["region"].lower() == region.lower()]
        data["regions"] = filtered_regions
        # Toplamları yeniden hesapla
        if filtered_regions:
            data["total_units_sold"] = sum(r["units_sold"] for r in filtered_regions)
            data["total_revenue_million_usd"] = sum(r["revenue_million_usd"] for r in filtered_regions)
        else:
            data["total_units_sold"] = 0
            data["total_revenue_million_usd"] = 0.0
    return data
