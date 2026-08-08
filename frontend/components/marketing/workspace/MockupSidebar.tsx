import { MOCKUP_PAGES } from "@/src/constants/workspace"

function MockupSidebar() {
  return (
    <aside className="hidden w-[220px] shrink-0 border-r border-hairline p-3 sm:block">
      <p className="px-2 text-micro text-text-soft">Project hub</p>
      <p className="mt-1 px-2 text-sm font-semibold tracking-[-0.03em] text-ink">
        Acme / Product
      </p>
      <ul className="mt-4 space-y-1">
        {MOCKUP_PAGES.map((page) => (
          <li key={page.label}>
            <div
              className={
                page.active
                  ? "rounded-sm bg-surface-cool px-2 py-1 text-sm font-semibold tracking-[-0.03em] text-ink"
                  : "rounded-sm px-2 py-1 text-sm tracking-[-0.03em] text-text-body"
              }
            >
              {page.label}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export { MockupSidebar }
