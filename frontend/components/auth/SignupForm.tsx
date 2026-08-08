import { useState, type FormEvent } from "react"

import { AuthField } from "@/components/auth/AuthField"
import { Button } from "@/components/ui/button"

function SignupForm() {
  const [name, setName] = useState("")
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

      <Button type="submit" variant="primary" className="mt-2 w-full">
        Create account
      </Button>

      {submitted ? (
        <p className="rounded-md border border-hairline bg-canvas px-3 py-2 text-sm tracking-[-0.03em] text-text-muted">
          Sample form only — connect signup to your backend when ready.
        </p>
      ) : null}
    </form>
  )
}

export { SignupForm }
