import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { MoreHorizontal, ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import NoteOptios from "../notes/note-options"

const FavoritesSidebar = ({ favorites }: {
    favorites: {
        name: string,
        url: string,
    }[]
}) => {
    const { isMobile } = useSidebar()

    return (
        <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                <CollapsibleTrigger>
                    <SidebarGroupLabel>
                        <ChevronDown className="mr-2 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        Quick link
                    </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenu>
                        {favorites.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url} title={item.name}>
                                        <span>{item.name}</span>
                                    </a>
                                </SidebarMenuButton>
                                <NoteOptios noteId={undefined} />
                            </SidebarMenuItem>
                        ))}
                        <SidebarMenuItem>
                            <SidebarMenuButton className="text-sidebar-foreground/70">
                                <MoreHorizontal />
                                <span className="text-xs">More</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    )
}
export default FavoritesSidebar