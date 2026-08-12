import { create } from "zustand"

export type AuthUser = {
  id: string
  email: string
  name: string
  created_at: string
}

type AuthStatus = "authenticated" | "anonymous"

type AuthState = {
  user: AuthUser | null
  status: AuthStatus
  setSession: (session: { user: AuthUser }) => void
  clearSession: () => void
}

/** Readable flag — HttpOnly cookies aren't visible to JS (esp. cross-origin API). */
export const SESSION_HINT_KEY = "has_session"

export function hasSessionHint(): boolean {
  try {
    return localStorage.getItem(SESSION_HINT_KEY) === "1"
  } catch {
    return false
  }
}

function writeSessionHint(on: boolean) {
  try {
    if (on) localStorage.setItem(SESSION_HINT_KEY, "1")
    else localStorage.removeItem(SESSION_HINT_KEY)
  } catch {
    /* private mode / disabled storage */
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "anonymous",
  setSession: ({ user }) => {
    writeSessionHint(true)
    set({ user, status: "authenticated" })
  },
  clearSession: () => {
    writeSessionHint(false)
    set({ user: null, status: "anonymous" })
  },
}))
