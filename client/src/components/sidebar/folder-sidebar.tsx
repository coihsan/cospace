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

const FolderSidebar = ({
  projects,
}: {
  projects: {
    name: string
    url: string
  }[]
}) => {
  const { isMobile } = useSidebar()

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
            {projects.slice(0, 10).map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
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
