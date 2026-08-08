import { MockupContent } from "@/components/marketing/workspace/MockupContent"
import { MockupSidebar } from "@/components/marketing/workspace/MockupSidebar"

function WorkspaceMockup() {
  return (
    <div
      className="overflow-hidden rounded-[9.6px] border border-hairline bg-canvas shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)]"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-sm tracking-[-0.03em] text-text-soft">
          fold.app / acme / project-hub
        </span>
      </div>
      <div className="flex min-h-[320px]">
        <MockupSidebar />
        <MockupContent />
      </div>
    </div>
  )
}

export { WorkspaceMockup }
