import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

function CtaBand() {
  return (
    <section className="page-gutter section-y bg-ink" id="pricing">
      <div className="mx-auto flex max-w-[820px] flex-col items-stretch gap-6 sm:gap-8 md:items-center md:text-center">
        <h2 className="text-display-lg text-on-ink">
          We&apos;re overwhelmed with the work about work.
        </h2>
        <p className="max-w-xl text-sm tracking-[-0.03em] text-on-ink/70 sm:text-base">
          Fold replaces the tab sprawl — briefs, trackers, and check-ins — with
          one page your team actually opens.
        </p>
        <Button
          variant="secondary"
          size="wide"
          className="w-full border-transparent sm:w-auto"
          nativeButton={false}
          render={<Link to="/signup" />}
        >
          Start building
        </Button>
      </div>
    </section>
  )
}

export { CtaBand }
