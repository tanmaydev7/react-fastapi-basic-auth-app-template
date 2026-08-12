import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { AuthField } from "@/components/auth/AuthField"
import { Button } from "@/components/ui/button"
import { register } from "@/lib/authApi"

function SignupForm() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)
    try {
      await register({ name, email, password })
      navigate("/app", { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed")
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <AuthField
        label="Full name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Alex Rivera"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
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
        autoComplete="new-password"
        placeholder="At least 8 characters"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minLength={8}
        required
      />

      <Button type="submit" variant="primary" className="mt-2 w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>

      {error ? (
        <p className="rounded-md border border-hairline bg-canvas px-3 py-2 text-sm tracking-[-0.03em] text-red-700">
          {error}
        </p>
      ) : null}
    </form>
  )
}

export { SignupForm }
