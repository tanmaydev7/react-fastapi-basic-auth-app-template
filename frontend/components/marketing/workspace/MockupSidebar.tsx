import { MOCKUP_PAGES } from "@/src/constants/workspace"

function MockupSidebar() {
  return (
    <>
      <div className="border-b border-hairline px-3 py-2 md:hidden">
        <ul className="flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MOCKUP_PAGES.map((page) => (
            <li key={page.label} className="shrink-0">
              <div
                className={
                  page.active
                    ? "rounded-sm bg-surface-cool px-2.5 py-1 text-sm font-semibold tracking-[-0.03em] text-ink"
                    : "rounded-sm px-2.5 py-1 text-sm tracking-[-0.03em] text-text-body"
                }
              >
                {page.label}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="hidden w-[200px] shrink-0 border-r border-hairline p-3 md:block md:w-[220px]">
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
    </>
  )
}

export { MockupSidebar }
