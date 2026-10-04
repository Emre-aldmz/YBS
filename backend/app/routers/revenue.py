"""
Router: Departman Gelirleri
Endpoint: GET /api/v1/revenue/departments
"""

from fastapi import APIRouter
from app.models import DepartmentRevenueResponse
from app.data.mock_data import DEPARTMENT_REVENUE_DATA

router = APIRouter(prefix="/api/v1/revenue", tags=["Revenue"])


@router.get(
    "/departments",
    response_model=DepartmentRevenueResponse,
    summary="Departman Gelir Dağılımı",
    description="Sony departmanlarının yıllık gelir, kâr marjı ve çeyreklik trend verileri.",
)
async def get_department_revenue():
    """Departman bazlı gelir dağılımını döndürür."""
    return DEPARTMENT_REVENUE_DATA
