import { useEffect, useState, type ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

import { restoreSession } from "@/lib/authApi"
import { useAuthStore } from "@/src/stores/authStore"

function RequireAuth({ children }: { children: ReactNode }) {
  const status = useAuthStore((s) => s.status)
  const location = useLocation()
  const [checked, setChecked] = useState(status === "authenticated")

  useEffect(() => {
    if (status === "authenticated") {
      setChecked(true)
      return
    }
    if (status === "loading") return

    let cancelled = false
    void restoreSession().finally(() => {
      if (!cancelled) setChecked(true)
    })
    return () => {
      cancelled = true
    }
  }, [status])

  if (status === "loading" || !checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas text-sm text-text-muted">
        Checking session…
      </div>
    )
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export { RequireAuth }
