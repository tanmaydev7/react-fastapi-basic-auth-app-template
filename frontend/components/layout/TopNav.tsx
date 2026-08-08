import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"

import { Wordmark } from "@/components/brand/Wordmark"
import { NAV_LINKS } from "@/src/constants/layout"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function TopNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-hero-canvas/95 backdrop-blur-sm">
      <div className="page-gutter mx-auto flex h-14 max-w-[1280px] items-center justify-between md:h-16">
        <Wordmark />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 text-nav text-ink transition-colors hover:bg-ink/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="secondary"
            size="nav"
            nativeButton={false}
            render={<Link to="/login" />}
          >
            Log in
          </Button>
          <Button
            variant="deep"
            size="nav"
            nativeButton={false}
            render={<Link to="/signup" />}
          >
            Get started
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "page-gutter border-t border-hairline py-3 lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-3 text-base tracking-[-0.03em] text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-3 flex flex-col gap-2 pb-2">
          <Button
            variant="secondary"
            className="w-full"
            nativeButton={false}
            render={<Link to="/login" />}
          >
            Log in
          </Button>
          <Button
            variant="deep"
            className="w-full"
            nativeButton={false}
            render={<Link to="/signup" />}
          >
            Get started
          </Button>
        </div>
      </div>
    </header>
  )
}

export { TopNav }
