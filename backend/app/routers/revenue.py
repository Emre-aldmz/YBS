"""
Router: Departman Gelirleri
Endpoint: GET /api/v1/revenue/departments
"""

from fastapi import APIRouter, Query
from typing import Optional
import copy
from app.models import DepartmentRevenueResponse
from app.data.mock_data import DEPARTMENT_REVENUE_DATA

router = APIRouter(prefix="/api/v1/revenue", tags=["Revenue"])


@router.get(
    "/departments",
    response_model=DepartmentRevenueResponse,
    summary="Departman Gelir Dağılımı",
    description="Sony departmanlarının yıllık gelir, kâr marjı ve çeyreklik trend verileri.",
)
async def get_department_revenue(department: Optional[str] = Query(None, description="Departman adına göre filtrele")):
    """Departman bazlı gelir dağılımını döndürür."""
    data = copy.deepcopy(DEPARTMENT_REVENUE_DATA)
    if department:
        filtered = [d for d in data["departments"] if department.lower() in d["name"].lower()]
        data["departments"] = filtered
        if filtered:
            data["total_revenue_billion_usd"] = sum(d["revenue_billion_usd"] for d in filtered)
        else:
            data["total_revenue_billion_usd"] = 0.0
    return data
