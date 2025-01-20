import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import ModalProvider from "@/providers/modal-provider"
import TiptapEditor from "@/components/editor/tiptap-editor"
import { ChangeEvent, FormEvent, useEffect } from "react"
import { ThemeProvider } from "@/providers/theme-provider"
import { useAppSelector } from "@/lib/redux/store"
import { getNotes } from "@/lib/redux/selector"
import EmptyEditor from "@/components/editor/empty-editor"
import { useParams } from "react-router"
import { fetchAllFolder } from "@/lib/redux/slice/folder.slice"

const App = () => {
  const { activeNoteId } = useAppSelector(getNotes)
  const { noteId } = useParams()

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
                  initialContent={""} 
                  titleContent={""} 
                  titleChange={function (event: ChangeEvent<HTMLInputElement>): void {
                    throw new Error("Function not implemented.")
                  } } 
                  onChange={function (content: string): void {
                    throw new Error("Function not implemented.")
                  } } 
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