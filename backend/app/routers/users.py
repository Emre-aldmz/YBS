"""
Router: PSN Aylık Aktif Kullanıcılar
Endpoint: GET /api/v1/users/psn-monthly
"""

from fastapi import APIRouter, Query
from typing import Optional
import copy
from app.models import PSNUsersResponse
from app.data.mock_data import PSN_USERS_DATA

router = APIRouter(prefix="/api/v1/users", tags=["Users"])


@router.get(
    "/psn-monthly",
    response_model=PSNUsersResponse,
    summary="PSN Aylık Aktif Kullanıcılar",
    description="PlayStation Network aylık aktif kullanıcı trendi ve bölge dağılımı.",
)
async def get_psn_monthly_users(region: Optional[str] = Query(None, description="Bölge adına göre filtrele")):
    """PSN kullanıcı metriklerini döndürür."""
    data = copy.deepcopy(PSN_USERS_DATA)
    if region:
        filtered = [r for r in data["region_breakdown"] if r["region"].lower() == region.lower()]
        data["region_breakdown"] = filtered
        if filtered:
            # Seçili bölgenin MAU değerini güncel MAU olarak göster
            data["current_mau"] = filtered[0]["mau"]
        else:
            data["current_mau"] = 0
    return data
