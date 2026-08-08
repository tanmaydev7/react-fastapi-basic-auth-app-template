import { MOCKUP_ROWS } from "@/src/constants/workspace"
import { ReactionChip } from "@/components/ui/reaction-chip"
import { StatusChip } from "@/components/ui/status-chip"

function MockupContent() {
  return (
    <div className="min-w-0 flex-1 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold tracking-[-0.03em] text-ink">
          Project brief
        </h3>
        <StatusChip tone="blue">Synced</StatusChip>
        <ReactionChip>👀 Done reading 5</ReactionChip>
      </div>

      <p className="mt-3 max-w-xl text-sm tracking-[-0.03em] text-text-muted">
        Ship a single source of truth for Q3 launch — goals, owners, and the
        decisions that keep slipping into Slack.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <ReactionChip variant="amber">Option 1</ReactionChip>
        <ReactionChip variant="amber">Option 2</ReactionChip>
        <StatusChip tone="yellow">Due Fri</StatusChip>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-hairline">
        <div className="grid grid-cols-[1.4fr_0.7fr_0.9fr] gap-2 border-b border-hairline bg-hero-canvas px-3 py-2 text-micro text-text-soft">
          <span>Item</span>
          <span>Owner</span>
          <span>Status</span>
        </div>
        {MOCKUP_ROWS.map((row) => (
          <div
            key={row.item}
            className="grid grid-cols-[1.4fr_0.7fr_0.9fr] items-center gap-2 border-b border-hairline px-3 py-2.5 last:border-b-0"
          >
            <span className="truncate text-sm tracking-[-0.03em] text-ink">
              {row.item}
            </span>
            <span className="truncate text-sm tracking-[-0.03em] text-text-muted">
              {row.owner}
            </span>
            <StatusChip tone={row.status.tone}>{row.status.label}</StatusChip>
          </div>
        ))}
      </div>
    </div>
  )
}

export { MockupContent }
