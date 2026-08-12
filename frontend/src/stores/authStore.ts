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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "anonymous",
  setSession: ({ user }) => set({ user, status: "authenticated" }),
  clearSession: () => set({ user: null, status: "anonymous" }),
}))
