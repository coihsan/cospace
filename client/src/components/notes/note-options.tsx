import React from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, CornerUpRight, Folder, StarOff, Link, Trash2, Star } from "lucide-react"
import { SidebarMenuAction, useSidebar } from "../ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import {  selectAllFolder } from "@/lib/redux/slice/folder.slice"
import { moveNoteToTrash, selectNoteById, toggleNoteFavorite } from "@/lib/redux/slice/notes.slice"

interface NoteOptiosProps {
    noteId: string | undefined
}

const NoteOptios: React.FC<NoteOptiosProps> = ({ noteId }) => {
    const { isMobile } = useSidebar()
    const folders = useAppSelector(selectAllFolder)

    const notes = useAppSelector((state) => selectNoteById(state, noteId as string))
    const dispatch = useAppDispatch()

    const handleMoveNoteToTrash = (noteId: string, value: boolean) => {
        dispatch(moveNoteToTrash({ noteId, value }))
    }

    const handleToggleFavorite = (noteId: string, value: boolean) => {
        dispatch(toggleNoteFavorite({ noteId, value }))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(event) => event.stopPropagation()}
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
                            {folders.map((folder => (
                                <DropdownMenuItem key={folder.id}>
                                    <Folder className="text-muted-foreground" />
                                    <span>{folder.name}</span>
                                </DropdownMenuItem>
                            )))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                {notes?.favorite === true ? (
                    <DropdownMenuItem onClick={() => handleToggleFavorite(noteId as string, false)}>
                        <StarOff className="text-muted-foreground" />
                        <span>Remove from Favorites</span>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={() => handleToggleFavorite(noteId as string, true)}>
                        <Star className="text-muted-foreground" />
                        <span>Mark as Favorites</span>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link className="text-muted-foreground" />
                    <span>Copy Link</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleMoveNoteToTrash(noteId as string, true)} className="text-red-600 dark:text-red-500">
                    <Trash2 />
                    <span>Move to trash</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default NoteOptios

function markAsFavorite(arg0: { noteId: string; value: boolean }): any {
    throw new Error("Function not implemented.")
}
