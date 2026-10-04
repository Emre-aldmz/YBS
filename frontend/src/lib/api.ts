/**
 * API Client — Backend FastAPI ile iletişim katmanı
 * Decoupled architecture: Frontend ↔ Backend API fetch
 */

import type {
  HardwareSalesResponse,
  PSNUsersResponse,
  DepartmentRevenueResponse,
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
export async function getHardwareSales(): Promise<HardwareSalesResponse> {
  return fetchAPI<HardwareSalesResponse>("/api/v1/sales/hardware");
}

/** PSN aylık aktif kullanıcı verileri */
export async function getPSNUsers(): Promise<PSNUsersResponse> {
  return fetchAPI<PSNUsersResponse>("/api/v1/users/psn-monthly");
}

/** Departman gelir dağılımı verileri */
export async function getDepartmentRevenue(): Promise<DepartmentRevenueResponse> {
  return fetchAPI<DepartmentRevenueResponse>("/api/v1/revenue/departments");
}
