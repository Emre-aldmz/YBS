"""
Router: PlayStation Donanım Satışları
Endpoint: GET /api/v1/sales/hardware
"""

from fastapi import APIRouter
from app.models import HardwareSalesResponse
from app.data.mock_data import HARDWARE_SALES_DATA

router = APIRouter(prefix="/api/v1/sales", tags=["Sales"])


@router.get(
    "/hardware",
    response_model=HardwareSalesResponse,
    summary="PlayStation Donanım Satışları",
    description="Bölgesel PS5 donanım satış verileri — ürün bazlı kırılım ve aylık trend.",
)
async def get_hardware_sales():
    """Küresel PlayStation donanım satışlarını döndürür."""
    return HARDWARE_SALES_DATA
