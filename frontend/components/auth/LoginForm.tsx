import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { AuthField } from "@/components/auth/AuthField"
import { Button } from "@/components/ui/button"
import { login } from "@/lib/authApi"

function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)
    try {
      await login({ email, password })
      navigate("/app", { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <AuthField
        label="Work email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <AuthField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        hint={
          <button
            type="button"
            className="text-sm tracking-[-0.03em] text-accent-blue transition-opacity hover:opacity-80"
          >
            Forgot?
          </button>
        }
      />

      <Button type="submit" variant="primary" className="mt-2 w-full" disabled={pending}>
        {pending ? "Logging in…" : "Log in"}
      </Button>

      {error ? (
        <p className="rounded-md border border-hairline bg-canvas px-3 py-2 text-sm tracking-[-0.03em] text-red-700">
          {error}
        </p>
      ) : null}
    </form>
  )
}

export { LoginForm }
