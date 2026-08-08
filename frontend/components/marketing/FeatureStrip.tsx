import { FEATURES } from "@/src/constants/marketing"

function FeatureStrip() {
  return (
    <section className="page-gutter section-y bg-canvas">
      <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-2 md:gap-16">
        {FEATURES.map((feature) => (
          <div key={feature.id} id={feature.id}>
            <h2 className="text-display-md text-ink">{feature.title}</h2>
            <p className="mt-3 max-w-md text-sm tracking-[-0.03em] text-text-muted sm:mt-4 sm:text-base">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export { FeatureStrip }
