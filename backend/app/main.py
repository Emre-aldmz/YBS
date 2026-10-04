"""
Sony Küresel Satış & İş Zekası Dashboard — FastAPI Backend
==========================================================
Ana uygulama giriş noktası. CORS yapılandırması ve router kayıtları.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import sales, users, revenue, cube
from app.models import APIInfo

app = FastAPI(
    title="Sony Intelligence API",
    description="Sony Küresel Satış ve İş Zekası Dashboard Backend API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS Yapılandırması ───
# Frontend (Vercel) ve lokal geliştirme ortamları için
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Geçici olarak tüm originlere izin veriyoruz
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Router Kayıtları ───
app.include_router(sales.router)
app.include_router(users.router)
app.include_router(revenue.router)
app.include_router(cube.router)


# ─── Root Endpoint ───
@app.get("/", response_model=APIInfo, tags=["Root"])
async def root():
    """API bilgi ve durum kontrolü."""
    return APIInfo(
        name="Sony Intelligence API",
        version="1.0.0",
        description="Sony Küresel Satış ve İş Zekası Dashboard Backend",
        endpoints=[
            "/api/v1/sales/hardware",
            "/api/v1/users/psn-monthly",
            "/api/v1/revenue/departments",
            "/api/v1/olap-cube",
            "/docs",
        ],
    )


@app.get("/health", tags=["Health"])
async def health_check():
    """Sağlık kontrolü — Cloud Run ve load balancer için."""
    return {"status": "healthy", "service": "sony-intelligence-api"}
