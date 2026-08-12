import { beforeEach, describe, expect, it } from "vitest"

import { useAuthStore } from "./authStore"

describe("authStore", () => {
  beforeEach(() => {
    useAuthStore.getState().clearSession()
  })

  it("setSession stores user and marks authenticated", () => {
    const user = {
      id: "11111111-1111-1111-1111-111111111111",
      email: "alex@example.com",
      name: "Alex Rivera",
      created_at: "2026-01-01T00:00:00Z",
    }

    useAuthStore.getState().setSession({ user })

    const state = useAuthStore.getState()
    expect(state.user).toEqual(user)
    expect(state.status).toBe("authenticated")
  })

  it("clearSession drops user and marks anonymous", () => {
    useAuthStore.setState({
      user: {
        id: "11111111-1111-1111-1111-111111111111",
        email: "alex@example.com",
        name: "Alex",
        created_at: "2026-01-01T00:00:00Z",
      },
      status: "authenticated",
    })

    useAuthStore.getState().clearSession()

    expect(useAuthStore.getState().user).toBeNull()
    expect(useAuthStore.getState().status).toBe("anonymous")
  })
})
