import React from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, CornerUpRight, Folder, StarOff, Link, Trash2 } from "lucide-react"
import { SidebarMenuAction, useSidebar } from "../ui/sidebar"

const NoteOptios: React.FC = () => {
    const { isMobile } = useSidebar()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
            >
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <CornerUpRight className="text-muted-foreground" />
                        <span>Move to folder</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>
                                <Folder className="text-muted-foreground" />
                                <span>Folder 1</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                    <StarOff className="text-muted-foreground" />
                    <span>Remove from Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link className="text-muted-foreground" />
                    <span>Copy Link</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 dark:text-red-500">
                    <Trash2 />
                    <span>Move to trash</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default NoteOptios