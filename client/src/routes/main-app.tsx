import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import FooterEditor from "@/components/editor/footer-editor"
import HeaderEditor from "@/components/editor/header-editor"
import PreviewEditor from "@/components/editor/preview-editor"
import ModalProvider from "@/providers/modal-provider"

const MainApp = () => {
  return (
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
          <HeaderEditor />
          <main className="h-full">
            <PreviewEditor />
          </main>
          <FooterEditor />
        </SidebarInset>
      </SidebarProvider>
    </ModalProvider>
  )
}
export default MainApp