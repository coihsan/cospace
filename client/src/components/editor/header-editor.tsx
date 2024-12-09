import { Separator } from "@radix-ui/react-separator"
import { Star, UserPlus } from "lucide-react"
import { SidebarTrigger } from "../ui/sidebar"
import ButtonAction from "../global/button-action"
import { LabelText } from "@/lib/label-text"
import { ModeToggle } from "../global/mode-toggle"
import EditorOptions from "./editor-options"

const HeaderEditor = () => {

  return (
    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-2 z-50 flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <p>note title</p>
      </div>
      <div className="flex items-center gap-1 w-max">
        <ButtonAction tooltip={"Invite user to note"} variant={"outline"}>
          <UserPlus />
          Invite
        </ButtonAction>
        <ButtonAction size={'icon'} tooltip={LabelText.ADD_FAVORITES} variant={"outline"}>
          <Star />
        </ButtonAction>
        <EditorOptions />
        <ModeToggle />
      </div>
    </header>
  )
}
export default HeaderEditor