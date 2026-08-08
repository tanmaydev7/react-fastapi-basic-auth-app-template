import { FEATURES } from "@/src/constants/marketing"

function FeatureStrip() {
  return (
    <section className="bg-canvas px-8 py-[72px]">
      <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 md:gap-16">
        {FEATURES.map((feature) => (
          <div key={feature.id} id={feature.id}>
            <h2 className="text-display-md text-ink">{feature.title}</h2>
            <p className="mt-4 max-w-md text-base tracking-[-0.03em] text-text-muted">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export { FeatureStrip }
