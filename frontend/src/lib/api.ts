/**
 * API Client — Backend FastAPI ile iletişim katmanı
 * Decoupled architecture: Frontend ↔ Backend API fetch
 */

import type {
  HardwareSalesResponse,
  PSNUsersResponse,
  DepartmentRevenueResponse,
  CubeResponse,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: "no-store", // SSR — her istekte taze veri
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/** PlayStation donanım satış verileri */
export async function getHardwareSales(region?: string): Promise<HardwareSalesResponse> {
  const query = region ? `?region=${encodeURIComponent(region)}` : "";
  return fetchAPI<HardwareSalesResponse>(`/api/v1/sales/hardware${query}`);
}

/** PSN aylık aktif kullanıcı verileri */
export async function getPSNUsers(region?: string): Promise<PSNUsersResponse> {
  const query = region ? `?region=${encodeURIComponent(region)}` : "";
  return fetchAPI<PSNUsersResponse>(`/api/v1/users/psn-monthly${query}`);
}

/** Departman gelir dağılımı verileri */
export async function getDepartmentRevenue(department?: string): Promise<DepartmentRevenueResponse> {
  const query = department ? `?department=${encodeURIComponent(department)}` : "";
  return fetchAPI<DepartmentRevenueResponse>(`/api/v1/revenue/departments${query}`);
}

/** 3D OLAP Küp Verisi */
export async function getOlapCube(): Promise<CubeResponse> {
  return fetchAPI<CubeResponse>("/api/v1/olap-cube");
}

