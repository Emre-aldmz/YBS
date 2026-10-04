"""
Router: 3D OLAP Cube Data
Endpoint: GET /api/v1/olap-cube
"""

from fastapi import APIRouter
from app.data.mock_data import OLAP_CUBE_DATA
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/olap-cube", tags=["OLAP Cube"])

class CubeNode(BaseModel):
    id: str
    region: str
    year: str
    category: str
    revenue_million_usd: float
    status: str
    coordinates: List[int]

class CubeResponse(BaseModel):
    nodes: List[CubeNode]
    total_revenue_billion: float

@router.get(
    "/",
    response_model=CubeResponse,
    summary="3D OLAP Küp Verisi",
    description="3x3x3 uzay koordinatları ve analiz durumlarını içeren küp matris verisi."
)
async def get_olap_cube():
    """3 boyutlu OLAP analiz verilerini döndürür."""
    return OLAP_CUBE_DATA
