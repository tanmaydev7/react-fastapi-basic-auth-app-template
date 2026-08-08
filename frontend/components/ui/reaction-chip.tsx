import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type ReactionChipProps = {
  children: ReactNode
  className?: string
  variant?: "ring" | "amber"
}

function ReactionChip({
  children,
  className,
  variant = "ring",
}: ReactionChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl px-2 py-1",
        variant === "ring" &&
          "border border-kr-yellow bg-kr-yellow-light text-sm tracking-[-0.03em] text-kr-yellow",
        variant === "amber" && "bg-accent-amber text-micro text-ink",
        className
      )}
    >
      {children}
    </span>
  )
}

export { ReactionChip }
