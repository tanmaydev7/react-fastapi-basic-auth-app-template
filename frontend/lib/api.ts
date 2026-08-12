import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"

import { hasSessionHint, useAuthStore } from "@/src/stores/authStore"

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean }

export const api = axios.create({
  baseURL: process.env.BACKEND_URL ?? "http://localhost:8000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
})

let refreshPromise: Promise<boolean> | null = null

async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    try {
      await api.post("/auth/v1/refresh")
      return true
    } catch {
      useAuthStore.getState().clearSession()
      return false
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined
    const url = original?.url ?? ""

    if (
      error.response?.status !== 401 ||
      !original ||
      original._retry ||
      url.includes("/auth/v1/") ||
      !hasSessionHint()
    ) {
      return Promise.reject(error)
    }

    original._retry = true
    const refreshed = await refreshAccessToken()
    if (!refreshed) return Promise.reject(error)
    return api(original)
  }
)
