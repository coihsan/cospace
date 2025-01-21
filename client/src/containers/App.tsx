import React, { FormEvent, useEffect } from "react"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import ModalProvider from "@/providers/modal-provider"
import TiptapEditor from "@/components/editor/tiptap-editor"
import { ThemeProvider } from "@/providers/theme-provider"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getNotes } from "@/lib/redux/selector"
import EmptyEditor from "@/components/editor/empty-editor"
import { useParams } from "react-router"
import { Content } from "@tiptap/react"
import { getActiveNoteId, selectNoteById, updateSelectedNotes, updateTitleNotes } from "@/lib/redux/slice/notes.slice"
import { debounceEvent } from "@/lib/helpers"

const App = () => {
  const dispatch = useAppDispatch()
  const { noteId } = useParams()
  const { activeNoteId } = useAppSelector(getNotes)
  const notes = useAppSelector((state) => selectNoteById(state, noteId as string))

  const handleUpdateContent = debounceEvent((noteId: string, content: Content) => {
    if(noteId) {
      dispatch(updateSelectedNotes({ noteId, content }))
    }
  })

  const handleUpdateTitle = debounceEvent((noteId: string, title: string) => {
    if(noteId){
      dispatch(updateTitleNotes({ noteId, title }))
    }
  }) 

  useEffect(() => {
    if(noteId){
      dispatch(getActiveNoteId(noteId))
    }
  }, [noteId, dispatch])

  return (
    <ThemeProvider>
      <ModalProvider>
        <SidebarProvider style={{"--sidebar-width": "550px",} as React.CSSProperties}>
          <AppSidebar />
          <SidebarInset>
            <main className="h-full">
              {activeNoteId ? (
                <>
                  <TiptapEditor 
                  initialContent={notes.content} 
                  titleContent={notes.title} 
                  titleChange={(event: FormEvent) => {
                    handleUpdateContent(activeNoteId, notes.title)
                    event.preventDefault()
                  } } 
                  onChange={() => handleUpdateTitle(activeNoteId, notes.content as string)}
                  noteId={noteId as string} 
                  permission={{
                    userId: ``,
                    permission: 'owner'
                  }} />
                </>
              ) : (
                <EmptyEditor />
            )}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ModalProvider>
    </ThemeProvider>
  )
}
export default App