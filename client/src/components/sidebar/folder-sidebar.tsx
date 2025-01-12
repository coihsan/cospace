import {
  ChevronDown,
  Folder,
  Forward,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getApp, getNotes } from "@/lib/redux/selector"
import { setActiveMenu } from "@/lib/redux/slice/app.slice"
import { setActiveFolderId } from "@/lib/redux/slice/notes.slice"

const FolderSidebar = ({
  folder,
}: {
  folder: {
    id: string;
    name: string;
    url: string;
  }[]
}) => {
  const { isMobile, setOpen } = useSidebar()
  const dispatch = useAppDispatch()

  const { activeMenu } = useAppSelector(getApp)
  const { activeFolderId } = useAppSelector(getNotes)

  const handleActiveFolderId = (folderId: string) => {
    try {
      dispatch(setActiveFolderId(folderId))
      setOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <ChevronDown className="mr-2 transition-transform group-data-[state=open]/collapsible:rotate-180" />
            Folder
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <SidebarGroupAction title="Add Folder">
          <Plus /> <span className="sr-only">Add Folder</span>
        </SidebarGroupAction>
        <CollapsibleContent>
          <SidebarMenu>
            {folder.slice(0, 10).map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton onClick={() => handleActiveFolderId(item.id)} asChild>
                  <a href={item.url}>
                    <Folder />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem>
                      <Pencil className="text-muted-foreground" />
                      <span>Rename Folder</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Forward className="text-muted-foreground" />
                      <span>Share Folder</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500 dark:text-red-600">
                      <Trash2 />
                      <span>Delete Folder</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreHorizontal className="text-sidebar-foreground/70" />
                <span className="text-xs">More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup></Collapsible>
  )
}
export default FolderSidebar
