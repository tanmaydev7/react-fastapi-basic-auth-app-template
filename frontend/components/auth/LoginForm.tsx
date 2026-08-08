import { useState, type FormEvent } from "react"

import { AuthField } from "@/components/auth/AuthField"
import { Button } from "@/components/ui/button"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
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

      <Button type="submit" variant="primary" className="mt-2 w-full">
        Log in
      </Button>

      {submitted ? (
        <p className="rounded-md border border-hairline bg-canvas px-3 py-2 text-sm tracking-[-0.03em] text-text-muted">
          Sample form only — wire this to your FastAPI auth next.
        </p>
      ) : null}
    </form>
  )
}

export { LoginForm }
