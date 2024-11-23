import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import PreviewEditor from "./components/editor/preview-editor"
import FooterEditor from "./components/editor/footer-editor"
import HeaderEditor from "./components/editor/header-editor"

export function App() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <HeaderEditor />
        <main className="h-full">
          <PreviewEditor />
        </main>
        <FooterEditor />
      </SidebarInset>
    </SidebarProvider>
  )
}
