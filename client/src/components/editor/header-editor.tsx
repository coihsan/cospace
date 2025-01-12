import { Separator } from "@radix-ui/react-separator"
import { History, Pencil, Save, Star } from "lucide-react"
import { SidebarTrigger } from "../ui/sidebar"
import ButtonAction from "../global/button-action"
import { LabelText } from "@/lib/label-text"
import { ModeToggle } from "../global/mode-toggle"
import EditorOptions from "./editor-options"
import ShareDialog from "../global/share-dialog"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getApp } from "@/lib/redux/selector"
import { setEditable } from "@/lib/redux/slice/app.slice"
import { useParams } from "react-router"

const HeaderEditor = () => {
  const { noteId } = useParams()
  const dispatch = useAppDispatch()
  const { editable } = useAppSelector(getApp)

  const handlePreview = () => { dispatch(setEditable(false)) }
  const handleEditNote = () => { dispatch(setEditable(true)) }

  return (
    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-2 z-50 flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <p>{noteId ? noteId : ""}</p>
      </div>
      <div className="flex items-center gap-1 w-max">
        {/* {editable ? (
          <ButtonAction tooltip={LabelText.SAVE_NOTES} onClick={handlePreview} variant={'outline'} size={'icon'}>
            <Save />
          </ButtonAction>
        ) : (
          <ButtonAction onClick={handleEditNote} tooltip={LabelText.EDIT_NOTE} variant={'outline'} size={'icon'}>
            <Pencil />
          </ButtonAction>
        )} */}
        <ShareDialog />
        <ButtonAction size={'icon'} tooltip={LabelText.ADD_FAVORITES} variant={"outline"}>
          <Star />
        </ButtonAction>
        <ButtonAction size={'icon'} tooltip={LabelText.HISTORY} variant={"outline"}>
          <History />
        </ButtonAction>
        <ModeToggle />
        <EditorOptions />
      </div>
    </header>
  )
}
export default HeaderEditor