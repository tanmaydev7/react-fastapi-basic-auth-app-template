import { PARTNERS } from "@/src/constants/marketing"

function LogoWall() {
  return (
    <section
      className="page-gutter bg-canvas py-8 sm:py-10"
      aria-label="Trusted by teams"
    >
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-5 text-center text-sm tracking-[-0.03em] text-text-muted sm:mb-6">
          Teams already building in Fold
        </p>
        <ul className="grid grid-cols-3 items-center justify-items-center gap-x-4 gap-y-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10">
          {PARTNERS.map((partner) => (
            <li
              key={partner}
              className="font-display text-sm font-bold tracking-[-0.03em] text-text-soft sm:text-lg"
            >
              {partner}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export { LogoWall }
