import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import ModalProvider from "@/providers/modal-provider"
import TiptapEditor from "@/components/editor/tiptap-editor"
import { ChangeEvent } from "react"
import { ThemeProvider } from "@/providers/theme-provider"
import { useAppSelector } from "@/lib/redux/store"
import { getNotes } from "@/lib/redux/selector"
import EmptyEditor from "@/components/editor/empty-editor"

const App = () => {
  const { selectedNotesIds } = useAppSelector(getNotes)
  return (
    <ThemeProvider>
      <ModalProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "550px",
            } as React.CSSProperties
          }
        >
          <AppSidebar />
          <SidebarInset>
            <main className="h-full">
              {selectedNotesIds ? (
                <>
                  <TiptapEditor initialContent={""} titleContent={""} titleChange={function (event: ChangeEvent<HTMLInputElement>): void {
                    throw new Error("Function not implemented.")
                  }} onChange={function (content: string): void {
                    throw new Error("Function not implemented.")
                  }} noteId={""} />
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