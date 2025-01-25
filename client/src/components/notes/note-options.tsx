import React from "react"
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
import { MoreHorizontal, CornerUpRight, Folder, StarOff, Link, Trash2, Star, CornerUpLeft } from "lucide-react"
import { SidebarMenuAction, useSidebar } from "../ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { selectAllFolder } from "@/lib/redux/slice/folder.slice"
import { toggleNoteTrash, selectAllNotes, toggleNoteFavorite, deleteNotePermanently } from "@/lib/redux/slice/notes.slice"
import { getApp } from "@/lib/redux/selector"
import { MenuType } from "@/lib/enums"

interface NoteOptiosProps {
    noteId: string | undefined
}

const NoteOptios: React.FC<NoteOptiosProps> = ({ noteId }) => {

    const { isMobile } = useSidebar()
    const dispatch = useAppDispatch()

    const { activeMenu } = useAppSelector(getApp)
    const folders = useAppSelector(selectAllFolder)
    const notes = useAppSelector(selectAllNotes)
    const currentNote = notes.find((note) => note.id === noteId);
    const favorites = currentNote?.favorite || false;

    const handleToggleNoteTrash = (noteId: string, value: boolean) => {
        dispatch(toggleNoteTrash({ noteId, value }))
    }
    const handleToggleFavorite = (noteId: string, value: boolean) => {
        dispatch(toggleNoteFavorite({ noteId, value }))
    }
    const handleDeleteNotePermanent = (noteId: string) => {
        dispatch(deleteNotePermanently({ noteId }))
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
                {activeMenu !== MenuType.TRASH ? (
                    <>
                        <DropdownMenuSub>
                            {folders.length > 0 && (
                                <DropdownMenuSubTrigger>
                                    <CornerUpRight className="text-muted-foreground" />
                                    <span>Move to folder</span>
                                </DropdownMenuSubTrigger>
                            )}
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
                        <DropdownMenuSeparator />
                        {favorites ? (
                            <DropdownMenuItem onClick={() => handleToggleFavorite(noteId as string, false)}>
                                <StarOff className="text-muted-foreground" />
                                <span>Remove from Favorite</span>
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem onClick={() => handleToggleFavorite(noteId as string, true)}>
                                <Star className="text-muted-foreground" />
                                <span>Mark as Favorite</span>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                            <Link className="text-muted-foreground" />
                            <span>Copy Link</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleToggleNoteTrash(noteId as string, true)} className="text-red-600 dark:text-red-500">
                            <Trash2 />
                            <span>Move to trash</span>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem onClick={() => handleToggleNoteTrash(noteId as string, false)}>
                            <CornerUpLeft className="text-muted-foreground" />
                            <span>Restore from trash</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteNotePermanent(noteId as string)} className="text-red-600 dark:text-red-500">
                            <Trash2 />
                            <span>Delete permanent</span>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default NoteOptios