import type { ReactNode } from "react"

import { Wordmark } from "@/components/brand/Wordmark"
import { TextLink } from "@/components/ui/text-link"

type AuthLayoutProps = {
  children: ReactNode
  eyebrow: string
  title: string
  subtitle: string
  footer: ReactNode
}

function AuthLayout({
  children,
  eyebrow,
  title,
  subtitle,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-hero-canvas">
      <div className="mx-auto flex min-h-screen max-w-[480px] flex-col px-8 py-8">
        <header className="animate-fade-in">
          <Wordmark />
        </header>

        <main className="flex flex-1 flex-col justify-center py-12">
          <div className="animate-rise space-y-2">
            <p className="text-micro text-text-soft">{eyebrow}</p>
            <h1 className="text-display-md text-ink">{title}</h1>
            <p className="text-base tracking-[-0.03em] text-text-muted">
              {subtitle}
            </p>
          </div>

          <div className="animate-rise-delay-1 mt-8">{children}</div>

          <p className="animate-rise-delay-2 mt-8 text-sm tracking-[-0.03em] text-text-muted">
            {footer}
          </p>
        </main>

        <p className="text-sm tracking-[-0.03em] text-text-soft">
          By continuing you agree to our{" "}
          <TextLink to="/" className="text-sm">
            Terms
          </TextLink>{" "}
          and{" "}
          <TextLink to="/" className="text-sm">
            Privacy
          </TextLink>
          .
        </p>
      </div>
    </div>
  )
}

export { AuthLayout }
