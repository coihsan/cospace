import { Separator } from "@radix-ui/react-separator"
import { History, Star } from "lucide-react"
import { SidebarTrigger } from "../ui/sidebar"
import ButtonAction from "../global/button-action"
import { LabelText } from "@/lib/label-text"
import { ModeToggle } from "../global/mode-toggle"
import EditorOptions from "./editor-options"
import NotificationsPopover from "../global/notification-popover"
import ShareDialog from "../global/share-dialog"

const HeaderEditor = () => {

  return (
    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-2 z-50 flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <p>note title</p>
      </div>
      <div className="flex items-center gap-1 w-max">
        <ShareDialog />
        <ButtonAction size={'icon'} tooltip={LabelText.ADD_FAVORITES} variant={"outline"}>
          <Star />
        </ButtonAction>
        <ButtonAction size={'icon'} tooltip={LabelText.HISTORY} variant={"outline"}>
          <History />
        </ButtonAction>
        <ModeToggle />
        <NotificationsPopover />
        <EditorOptions />
      </div>
    </header>
  )
}
export default HeaderEditor