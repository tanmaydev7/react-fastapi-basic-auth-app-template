import { create } from "zustand"

export type AuthUser = {
  id: string
  email: string
  name: string
  created_at: string
}

type AuthStatus = "loading" | "authenticated" | "anonymous"

type AuthState = {
  user: AuthUser | null
  status: AuthStatus
  setSession: (session: { user: AuthUser }) => void
  setUser: (user: AuthUser) => void
  clearSession: () => void
  setStatus: (status: AuthStatus) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "loading",
  setSession: ({ user }) => set({ user, status: "authenticated" }),
  setUser: (user) => set({ user }),
  clearSession: () => set({ user: null, status: "anonymous" }),
  setStatus: (status) => set({ status }),
}))
