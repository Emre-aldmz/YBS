"""
Router: PSN Aylık Aktif Kullanıcılar
Endpoint: GET /api/v1/users/psn-monthly
"""

from fastapi import APIRouter
from app.models import PSNUsersResponse
from app.data.mock_data import PSN_USERS_DATA

router = APIRouter(prefix="/api/v1/users", tags=["Users"])


@router.get(
    "/psn-monthly",
    response_model=PSNUsersResponse,
    summary="PSN Aylık Aktif Kullanıcılar",
    description="PlayStation Network aylık aktif kullanıcı trendi ve bölge dağılımı.",
)
async def get_psn_monthly_users():
    """PSN kullanıcı metriklerini döndürür."""
    return PSN_USERS_DATA
