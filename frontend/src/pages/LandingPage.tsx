import { TopNav } from "@/components/layout/TopNav"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { HeroBand } from "@/components/marketing/HeroBand"
import { LogoWall } from "@/components/marketing/LogoWall"
import { FeatureStrip } from "@/components/marketing/FeatureStrip"
import { CtaBand } from "@/components/marketing/CtaBand"
import { TestimonialQuote } from "@/components/marketing/TestimonialQuote"

function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <TopNav />
      <main>
        <HeroBand />
        <LogoWall />
        <FeatureStrip />
        <CtaBand />
        <TestimonialQuote />
      </main>
      <SiteFooter />
    </div>
  )
}

export { LandingPage }
