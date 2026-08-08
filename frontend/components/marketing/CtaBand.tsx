import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

function CtaBand() {
  return (
    <section className="bg-ink px-8 py-[72px]" id="pricing">
      <div className="mx-auto flex max-w-[820px] flex-col items-start gap-8 md:items-center md:text-center">
        <h2 className="text-display-lg text-on-ink">
          We&apos;re overwhelmed with the work about work.
        </h2>
        <p className="max-w-xl text-base tracking-[-0.03em] text-on-ink/70">
          Fold replaces the tab sprawl — briefs, trackers, and check-ins — with
          one page your team actually opens.
        </p>
        <Button
          variant="secondary"
          size="wide"
          className="border-transparent"
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
