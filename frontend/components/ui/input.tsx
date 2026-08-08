import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full rounded-md border border-hairline bg-canvas px-3 py-2 text-base text-ink tracking-[-0.03em] outline-none transition-colors placeholder:text-text-soft focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
