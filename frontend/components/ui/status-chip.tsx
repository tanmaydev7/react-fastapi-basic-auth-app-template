import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

const toneStyles = {
  blue: "bg-kr-blue-light text-kr-blue",
  green: "bg-kr-green-light text-kr-green",
  pink: "bg-kr-pink-light text-kr-pink",
  yellow: "bg-kr-yellow-light text-kr-yellow",
} as const

type StatusChipProps = {
  tone?: keyof typeof toneStyles
  children: ReactNode
  className?: string
}

function StatusChip({
  tone = "blue",
  children,
  className,
}: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-sm tracking-[-0.03em]",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  )
}

export { StatusChip }
