import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { WorkspaceMockup } from "@/components/marketing/workspace/WorkspaceMockup"

function HeroBand() {
  return (
    <section className="page-gutter bg-hero-canvas pb-8 pt-8 sm:pb-10 sm:pt-10 md:pt-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="animate-rise text-hero-display text-ink">Fold</h1>
          <p className="animate-rise-delay-1 mx-auto mt-4 max-w-[34rem] text-subtitle-lg text-text-muted sm:mt-5">
            Docs, tables, and team tools in one living workspace — without the
            busywork around the work.
          </p>
          <div className="animate-rise-delay-1 mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Button
              variant="primary"
              size="wide"
              className="w-full sm:w-auto"
              nativeButton={false}
              render={<Link to="/signup" />}
            >
              Get started for free
            </Button>
            <Button
              variant="secondary"
              size="wide"
              className="w-full sm:w-auto"
              nativeButton={false}
              render={<Link to="/login" />}
            >
              Log in
            </Button>
          </div>
        </div>

        <div className="animate-rise-delay-2 mx-auto mt-8 max-w-[960px] sm:mt-10">
          <WorkspaceMockup />
        </div>
      </div>
    </section>
  )
}

export { HeroBand }
