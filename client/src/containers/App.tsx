import React, { useState } from "react"
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

  const handleUpdateContent = debounceEvent((content: Content) => {
    if (activeNoteId) {
      dispatch(updateSelectedNotes({ noteId: activeNoteId, content }))
    }
  }, 500)

  const handleUpdateTitle = debounceEvent((e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeNoteId) {
      dispatch(updateTitleNotes({ noteId: activeNoteId, title: e.target.value }))
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
                  onTitleChange={handleUpdateTitle}
                  onChange={handleUpdateContent}
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