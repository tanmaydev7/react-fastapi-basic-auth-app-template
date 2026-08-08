export const MOCKUP_PAGES = [
  { label: "Overview", active: false },
  { label: "Project brief", active: true },
  { label: "Roadmap", active: false },
  { label: "Launch checklist", active: false },
  { label: "Decision log", active: false },
  { label: "Team roster", active: false },
] as const

export const MOCKUP_ROWS = [
  {
    item: "Positioning draft",
    owner: "Maya",
    status: { label: "In review", tone: "blue" as const },
  },
  {
    item: "Pricing experiments",
    owner: "Jules",
    status: { label: "On track", tone: "green" as const },
  },
  {
    item: "Launch assets",
    owner: "Sam",
    status: { label: "Needs eyes", tone: "pink" as const },
  },
] as const
