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
    <div className="min-h-dvh bg-hero-canvas">
      <div className="page-gutter mx-auto flex min-h-dvh max-w-[480px] flex-col py-6 sm:py-8">
        <header className="animate-fade-in">
          <Wordmark />
        </header>

        <main className="flex flex-1 flex-col justify-center py-10 sm:py-12">
          <div className="animate-rise space-y-2">
            <p className="text-micro text-text-soft">{eyebrow}</p>
            <h1 className="text-display-md text-ink">{title}</h1>
            <p className="text-sm tracking-[-0.03em] text-text-muted sm:text-base">
              {subtitle}
            </p>
          </div>

          <div className="animate-rise-delay-1 mt-6 sm:mt-8">{children}</div>

          <p className="animate-rise-delay-2 mt-6 text-sm tracking-[-0.03em] text-text-muted sm:mt-8">
            {footer}
          </p>
        </main>

        <p className="pb-[max(0.5rem,env(safe-area-inset-bottom))] text-sm tracking-[-0.03em] text-text-soft">
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
