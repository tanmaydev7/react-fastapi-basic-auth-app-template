import axios from "axios"

import { api } from "@/lib/api"
import { useAuthStore, type AuthUser } from "@/src/stores/authStore"

function errorDetail(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail
    if (typeof detail === "string") return detail
  }
  return fallback
}

async function applySession(): Promise<AuthUser> {
  const { data: user } = await api.get<AuthUser>("/api/v1/me")
  useAuthStore.getState().setSession({ user })
  return user
}

export async function register(input: {
  name: string
  email: string
  password: string
}): Promise<AuthUser> {
  try {
    await api.post("/auth/v1/register", input)
    return applySession()
  } catch (error) {
    throw new Error(errorDetail(error, "Registration failed"))
  }
}

export async function login(input: {
  email: string
  password: string
}): Promise<AuthUser> {
  try {
    await api.post("/auth/v1/login", input)
    return applySession()
  } catch {
    throw new Error("Invalid email or password")
  }
}

export async function logout(): Promise<void> {
  await api.post("/auth/v1/logout")
  useAuthStore.getState().clearSession()
}

/** Call on protected routes; 401 → interceptor refresh if cookie exists. */
let restorePromise: Promise<boolean> | null = null

export async function restoreSession(): Promise<boolean> {
  if (restorePromise) return restorePromise

  restorePromise = (async () => {
    try {
      await applySession()
      return true
    } catch {
      useAuthStore.getState().clearSession()
      return false
    } finally {
      restorePromise = null
    }
  })()

  return restorePromise
}
