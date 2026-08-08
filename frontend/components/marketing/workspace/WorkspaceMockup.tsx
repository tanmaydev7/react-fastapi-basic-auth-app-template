import { MockupContent } from "@/components/marketing/workspace/MockupContent"
import { MockupSidebar } from "@/components/marketing/workspace/MockupSidebar"

function WorkspaceMockup() {
  return (
    <div
      className="overflow-hidden rounded-[9.6px] border border-hairline bg-canvas shadow-[0_16px_32px_-12px_rgba(0,0,0,0.08)] sm:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)]"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-hairline px-3 py-2.5 sm:gap-2 sm:px-4 sm:py-3">
        <span className="size-2 rounded-full bg-[#ff5f57] sm:size-2.5" />
        <span className="size-2 rounded-full bg-[#febc2e] sm:size-2.5" />
        <span className="size-2 rounded-full bg-[#28c840] sm:size-2.5" />
        <span className="ml-2 truncate text-xs tracking-[-0.03em] text-text-soft sm:ml-3 sm:text-sm">
          fold.app / acme / project-hub
        </span>
      </div>
      <div className="flex min-h-0 flex-col md:min-h-[300px] md:flex-row">
        <MockupSidebar />
        <MockupContent />
      </div>
    </div>
  )
}

export { WorkspaceMockup }
