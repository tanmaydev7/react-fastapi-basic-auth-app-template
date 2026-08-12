import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { logout } from "@/lib/authApi"
import { useAuthStore } from "@/src/stores/authStore"

function AppPage() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate("/login", { replace: true })
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-6 px-6">
      <div>
        <p className="text-sm tracking-[-0.03em] text-text-muted">Signed in</p>
        <h1 className="mt-1 text-2xl tracking-[-0.04em] text-ink">
          {user?.name}
        </h1>
        <p className="mt-1 text-sm tracking-[-0.03em] text-text-muted">
          {user?.email}
        </p>
      </div>
      <Button type="button" variant="secondary" onClick={handleLogout}>
        Log out
      </Button>
    </main>
  )
}

export { AppPage }
