import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

type WordmarkProps = {
  className?: string
  tone?: "ink" | "on-ink"
}

function Wordmark({ className, tone = "ink" }: WordmarkProps) {
  return (
    <Link
      to="/"
      aria-label="Fold home"
      className={cn(
        "font-display text-[1.35rem] font-bold tracking-[-0.04em] leading-none",
        tone === "ink" ? "text-ink" : "text-on-ink",
        className
      )}
    >
      Fold
    </Link>
  )
}

export { Wordmark }
