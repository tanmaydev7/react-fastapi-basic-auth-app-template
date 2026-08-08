import { Link, type LinkProps } from "react-router-dom"

import { cn } from "@/lib/utils"

type TextLinkProps = LinkProps & {
  className?: string
}

function TextLink({ className, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        "text-base tracking-[-0.03em] text-accent-blue transition-opacity hover:opacity-80",
        className
      )}
      {...props}
    />
  )
}

export { TextLink }
