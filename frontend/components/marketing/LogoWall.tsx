import { PARTNERS } from "@/src/constants/marketing"

function LogoWall() {
  return (
    <section className="bg-canvas px-8 py-10" aria-label="Trusted by teams">
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-6 text-center text-sm tracking-[-0.03em] text-text-muted">
          Teams already building in Fold
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PARTNERS.map((partner) => (
            <li
              key={partner}
              className="font-display text-lg font-bold tracking-[-0.03em] text-text-soft"
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
