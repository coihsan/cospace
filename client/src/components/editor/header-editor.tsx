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
import { useEffect } from "react"

const HeaderEditor = () => {
  const dispatch = useAppDispatch()
  const { editable } = useAppSelector(getApp)

  const handlePreview = () => { dispatch(setEditable(false)) }
  const handleEditNote = () => { dispatch(setEditable(true)) }

  useEffect(() => {
    if (editable) {dispatch(setEditable(true))}
  }, [editable, dispatch]);

  return (
    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-2 z-50 flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <p>note title</p>
      </div>
      <div className="flex items-center gap-1 w-max">
        {editable ? (
          <ButtonAction tooltip={LabelText.SAVE_NOTES} onClick={handlePreview} variant={'outline'} size={'icon'}>
            <Save />
          </ButtonAction>
        ) : (
          <ButtonAction tooltip={LabelText.EDIT_NOTE} variant={'outline'} size={'icon'}>
            <Pencil onClick={handleEditNote} />
          </ButtonAction>
        )}
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