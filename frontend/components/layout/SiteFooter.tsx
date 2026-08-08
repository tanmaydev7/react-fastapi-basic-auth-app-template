import { Wordmark } from "@/components/brand/Wordmark"
import { FOOTER_COLUMNS } from "@/src/constants/layout"

function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-8 py-[72px] md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-3">
          <Wordmark />
          <p className="max-w-xs text-sm tracking-[-0.03em] text-text-muted">
            One living workspace for the work about work.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="mb-3 text-sm font-semibold tracking-[-0.03em] text-ink">
              {column.title}
            </p>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm tracking-[-0.03em] text-text-muted transition-colors hover:text-ink"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

export { SiteFooter }
