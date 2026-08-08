import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { WorkspaceMockup } from "@/components/marketing/workspace/WorkspaceMockup"

function HeroBand() {
  return (
    <section className="bg-hero-canvas px-8 pb-10 pt-10 md:pt-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="animate-rise text-hero-display text-ink">Fold</h1>
          <p className="animate-rise-delay-1 mx-auto mt-5 max-w-[34rem] text-subtitle-lg text-text-muted">
            Docs, tables, and team tools in one living workspace — without the
            busywork around the work.
          </p>
          <div className="animate-rise-delay-1 mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="wide"
              nativeButton={false}
              render={<Link to="/signup" />}
            >
              Get started for free
            </Button>
            <Button
              variant="secondary"
              size="wide"
              nativeButton={false}
              render={<Link to="/login" />}
            >
              Log in
            </Button>
          </div>
        </div>

        <div className="animate-rise-delay-2 mx-auto mt-10 max-w-[960px]">
          <WorkspaceMockup />
        </div>
      </div>
    </section>
  )
}

export { HeroBand }
