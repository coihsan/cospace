import { RefreshCcw } from "lucide-react"
import OnlineSystemStatus from "../global/online-system-status"

const FooterEditor = () => {
  return (
    <footer className="sticky bottom-0 flex shrink-0 items-center gap-2 border-t bg-background p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <RefreshCcw className="size-4" />
        <span className="text-[10px]">Last updated : 31 Maret 2019</span>
      </div>
      <OnlineSystemStatus status={"connecting"} />
    </footer>
  )
}
export default FooterEditor