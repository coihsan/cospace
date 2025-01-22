import React, { FormEvent } from "react"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import ModalProvider from "@/providers/modal-provider"
import TiptapEditor from "@/components/editor/tiptap-editor"
import { ThemeProvider } from "@/providers/theme-provider"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getNotes } from "@/lib/redux/selector"
import EmptyEditor from "@/components/editor/empty-editor"
import { Content } from "@tiptap/react"
import { selectNoteById, updateSelectedNotes, updateTitleNotes } from "@/lib/redux/slice/notes.slice"
import { debounceEvent } from "@/lib/helpers"

const App = () => {
  const dispatch = useAppDispatch()
  const { activeNoteId } = useAppSelector(getNotes)
  const notes = useAppSelector((state) => selectNoteById(state, activeNoteId))

  const handleUpdateContent = debounceEvent((noteId: string, content: Content) => {
    if (noteId) {
      dispatch(updateSelectedNotes({ noteId, content }))
    }
  }, 500)

  const handleUpdateTitle = debounceEvent((noteId: string, title: string) => {
    if (noteId) {
      dispatch(updateTitleNotes({ noteId, title }))
    }
  }, 500)

  return (
    <ThemeProvider>
      <ModalProvider>
        <SidebarProvider style={{ "--sidebar-width": "550px", } as React.CSSProperties}>
          <AppSidebar />
          <SidebarInset>
            <main className="h-full">
              {activeNoteId ? (
                <TiptapEditor
                initialContent={notes.content}
                initialTitle={notes.title}
                titleChange={() => handleUpdateContent(activeNoteId, notes.title)}
                onChange={() => handleUpdateTitle(activeNoteId, notes.content as string)}
                noteId={activeNoteId}
                permission={{
                  userId: ``,
                  permission: 'owner'
                }} />
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