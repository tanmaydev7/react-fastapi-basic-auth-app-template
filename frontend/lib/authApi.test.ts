import { AxiosError, type InternalAxiosRequestConfig } from "axios"
import { beforeEach, describe, expect, it } from "vitest"

import { api } from "@/lib/api"
import { bootstrapAuth, restoreSession } from "@/lib/authApi"
import { useAuthStore } from "@/src/stores/authStore"

describe("bootstrapAuth", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      status: "loading",
    })
  })

  it("marks anonymous without calling the network", async () => {
    const urls: string[] = []

    api.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
      urls.push(config.url ?? "")
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

    await bootstrapAuth()

    expect(urls).toEqual([])
    expect(useAuthStore.getState().status).toBe("anonymous")
  })
})

describe("restoreSession", () => {
  beforeEach(() => {
    useAuthStore.getState().clearSession()
  })

  it("refreshes via interceptor then sets the user from /me", async () => {
    let meCalls = 0

    api.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
      const url = config.url ?? ""

      if (url === "/auth/v1/refresh") {
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
    expect(useAuthStore.getState().status).toBe("authenticated")
    expect(useAuthStore.getState().user?.email).toBe("alex@example.com")
  })
})
