import type { ComponentProps, ReactNode } from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type AuthFieldProps = ComponentProps<"input"> & {
  label: string
  hint?: ReactNode
  error?: string
}

function AuthField({
  id,
  label,
  hint,
  error,
  className,
  ...props
}: AuthFieldProps) {
  const fieldId = id ?? props.name

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={fieldId}
          className="text-sm font-semibold tracking-[-0.03em] text-ink"
        >
          {label}
        </label>
        {hint}
      </div>
      <Input
        id={fieldId}
        aria-invalid={Boolean(error) || undefined}
        className={cn(
          error && "border-kr-red focus-visible:border-kr-red focus-visible:ring-kr-red/15",
          className
        )}
        {...props}
      />
      {error ? (
        <p className="text-sm tracking-[-0.03em] text-kr-red">{error}</p>
      ) : null}
    </div>
  )
}

export { AuthField }
