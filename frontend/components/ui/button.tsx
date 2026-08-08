import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md text-button-md whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-on-ink hover:bg-ink/90",
        deep:
          "bg-ink-deep text-on-ink hover:bg-ink-deep/90",
        secondary:
          "border border-hairline bg-canvas text-ink hover:bg-hero-canvas",
        ghost:
          "bg-transparent text-ink hover:bg-ink/5",
        link:
          "h-auto rounded-none bg-transparent p-0 text-accent-blue hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        nav: "h-10 px-3 py-2",
        sm: "h-9 px-3 py-2",
        wide: "h-10 px-5 py-2 min-w-[10.5rem]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
