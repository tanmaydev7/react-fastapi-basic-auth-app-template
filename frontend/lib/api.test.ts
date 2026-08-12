import { AxiosError, type InternalAxiosRequestConfig } from "axios"
import { beforeEach, describe, expect, it } from "vitest"

import { api } from "@/lib/api"
import { useAuthStore } from "@/src/stores/authStore"

describe("api", () => {
  beforeEach(() => {
    useAuthStore.getState().clearSession()
    useAuthStore.getState().setSession({
      user: {
        id: "11111111-1111-1111-1111-111111111111",
        email: "alex@example.com",
        name: "Alex",
        created_at: "2026-01-01T00:00:00Z",
      },
    })
  })

  it("on 401 refreshes once then retries without Authorization header", async () => {
    let meCalls = 0
    let refreshCalls = 0
    const authHeaders: unknown[] = []

    api.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
      authHeaders.push(config.headers?.Authorization)
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
          data: { ok: true },
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        }
      }

      throw new Error(`unexpected url: ${url}`)
    }

    const res = await api.get("/api/v1/me")
    expect(res.status).toBe(200)
    expect(res.data).toEqual({ ok: true })
    expect(meCalls).toBe(2)
    expect(refreshCalls).toBe(1)
    expect(authHeaders.every((h) => h == null || h === undefined)).toBe(true)
  })
})
