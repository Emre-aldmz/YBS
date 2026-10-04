# 🎮 Sony Küresel Satış & İş Zekası Dashboard

YBS (Yönetim Bilişim Sistemleri) dersi için geliştirilmiş, **Decoupled Architecture** (İki Katmanlı Mimari) prensiplerini kullanan modern bir yönetici analitik paneli.

## 🏗️ Mimari

```
┌────────────────────────┐     HTTP/JSON      ┌────────────────────────┐
│   ▲ Frontend (Vercel)  │ ──────────────────→ │ ☁️ Backend (Cloud Run) │
│   Next.js 15           │ ←────────────────── │ FastAPI + Python       │
│   Tailwind CSS v4      │                     │ Mock Data Engine       │
│   Recharts             │                     │ Pydantic Models        │
└────────────────────────┘                     └────────────────────────┘
```

## 🚀 Hızlı Başlangıç

### Backend (Terminal 1)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API: http://localhost:8000 · Swagger Docs: http://localhost:8000/docs

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
Dashboard: http://localhost:3000

## 📡 API Endpoint'leri

| Endpoint | Açıklama |
|---|---|
| `GET /api/v1/sales/hardware` | PlayStation donanım satışları (bölgesel) |
| `GET /api/v1/users/psn-monthly` | PSN aylık aktif kullanıcı trendi |
| `GET /api/v1/revenue/departments` | Departman gelir dağılımı |
| `GET /docs` | Swagger API dokümantasyonu |
| `GET /health` | Cloud Run sağlık kontrolü |

## 🛠️ Teknoloji Yığını

**Backend:** Python 3.12, FastAPI, Pydantic, Uvicorn  
**Frontend:** Next.js 15, TypeScript, Tailwind CSS v4, Recharts, Lucide Icons  
**Deploy:** Google Cloud Run (Backend) + Vercel (Frontend)

## 📁 Proje Yapısı

```
YBS/
├── backend/          # Python FastAPI Backend
│   ├── app/
│   │   ├── main.py         # Ana uygulama (CORS, router)
│   │   ├── models.py       # Pydantic modelleri
│   │   ├── data/mock_data.py  # Sony mock veri seti
│   │   └── routers/        # API endpoint'leri
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/         # Next.js Frontend
│   ├── src/
│   │   ├── app/            # Next.js App Router
│   │   ├── components/     # React bileşenleri
│   │   ├── lib/api.ts      # Backend API istemcisi
│   │   └── types/          # TypeScript tipleri
│   └── package.json
└── README.md
```
