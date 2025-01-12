import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Folder, StarOff, Link as LinkIcons, Trash2 } from "lucide-react"
import { SidebarMenuItem, SidebarMenuAction, useSidebar } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { NoteItem } from "@/lib/types"
import React from "react"
import { getNotesTitle } from "@/lib/helpers"
import { Link, useLocation } from "react-router"
import { cn } from "@/lib/utils"

interface NoteItemProps {
    notes: NoteItem[];
}

const NoteItems: React.FC<NoteItemProps> = ({ notes, ...props }) => {
    const location = useLocation();
    const { isMobile } = useSidebar()

    return (
        <>
            {notes.map((item) => (
                <SidebarMenuItem>
                    <Link
                        {...props}
                        to={`/app/${item.id}`}
                        key={item.id}
                        className={cn(`flex items-center gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`,
                            (location.pathname === `/app/${item.id}` ? "bg-sidebar-accent" : "")
                        )}
                    >
                        <div className="flex flex-col items-start gap-2">
                            <div className="flex w-full items-center gap-2">
                                <Badge>{item.ownerId}</Badge>
                                <span className="ml-auto text-xs text-muted-foreground">{item.lastModified}</span>
                            </div>
                            <span className="font-medium">{item.title}</span>
                            <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                                {getNotesTitle(item.content)}
                            </span>
                        </div>
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
                                        <Folder />
                                        <span>Move to folder</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>
                                                <Folder />
                                                <span>Folder 1</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Folder />
                                                <span>Folder 2</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuItem>
                                    <StarOff className="text-muted-foreground" />
                                    <span>Remove from Favorites</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LinkIcons className="text-muted-foreground" />
                                    <span>Copy Link</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Trash2 className="text-muted-foreground" />
                                    <span>Move to trash</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Link>
                </SidebarMenuItem>
            ))}
        </>
    )
}
export default NoteItems