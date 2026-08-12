import { AxiosError, type InternalAxiosRequestConfig } from "axios"
import { beforeEach, describe, expect, it } from "vitest"

import { api } from "@/lib/api"
import { restoreSession } from "@/lib/authApi"
import { SESSION_HINT_KEY, useAuthStore } from "@/src/stores/authStore"

describe("restoreSession", () => {
  beforeEach(() => {
    useAuthStore.getState().clearSession()
  })

  it("refreshes via interceptor then sets the user from /me", async () => {
    // Simulate reload: HttpOnly cookies may still exist; hint survived in localStorage.
    localStorage.setItem(SESSION_HINT_KEY, "1")
    let meCalls = 0
    let refreshCalls = 0

    api.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
      const url = config.url ?? ""

      if (url === "/auth/v1/refresh") {
        refreshCalls += 1
        return {
          data: null,
          status: 204,
          statusText: "No Content",
          headers: {},
          config,
        }
      }

      if (url === "/api/v1/me") {
        meCalls += 1
        if (meCalls === 1) {
          throw new AxiosError(
            "Unauthorized",
            "ERR_BAD_REQUEST",
            config,
            null,
            {
              data: null,
              status: 401,
              statusText: "Unauthorized",
              headers: {},
              config,
            }
          )
        }
        return {
          data: {
            id: "11111111-1111-1111-1111-111111111111",
            email: "alex@example.com",
            name: "Alex",
            created_at: "2026-01-01T00:00:00Z",
          },
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        }
      }

      throw new Error(`unexpected url: ${url}`)
    }

    const ok = await restoreSession()

    expect(ok).toBe(true)
    expect(refreshCalls).toBe(1)
    expect(useAuthStore.getState().status).toBe("authenticated")
    expect(useAuthStore.getState().user?.email).toBe("alex@example.com")
  })

  it("does not call refresh when there is no session hint", async () => {
    let refreshCalls = 0

    api.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
      const url = config.url ?? ""
      if (url === "/auth/v1/refresh") {
        refreshCalls += 1
        return {
          data: null,
          status: 204,
          statusText: "No Content",
          headers: {},
          config,
        }
      }
      if (url === "/api/v1/me") {
        throw new AxiosError("Unauthorized", "ERR_BAD_REQUEST", config, null, {
          data: null,
          status: 401,
          statusText: "Unauthorized",
          headers: {},
          config,
        })
      }
      throw new Error(`unexpected url: ${url}`)
    }

    const ok = await restoreSession()

    expect(ok).toBe(false)
    expect(refreshCalls).toBe(0)
    expect(useAuthStore.getState().status).toBe("anonymous")
  })
})
