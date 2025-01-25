import { SidebarMenuItem } from "@/components/ui/sidebar"
import { NoteItem } from "@/lib/types"
import React from "react"
import { getNotesTitle } from "@/lib/helpers"
import { useNavigate } from "react-router"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getNotes } from "@/lib/redux/selector"
import { setActiveNoteId } from "@/lib/redux/slice/notes.slice"
import NoteOptios from "./note-options"
import { selectAllFolder } from "@/lib/redux/slice/folder.slice"
import { Folder, Star } from "lucide-react"

interface NoteItemProps {
    notes: NoteItem[];
}

const NoteItems: React.FC<NoteItemProps> = ({ notes, ...props }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { activeNoteId } = useAppSelector(getNotes)
    const folders = useAppSelector(selectAllFolder)

    const handleActiveNote = (noteId: string) => {
        dispatch(setActiveNoteId(noteId))
        navigate(`/app/${noteId}`)
    }

    return (
        <>
            {notes.map((item) => {
                const findFolder = folders.find((folderItem) => folderItem.id === item.folderId);
                return (
                    <SidebarMenuItem
                        onClick={() => handleActiveNote(item.id)}
                        className="cursor-pointer gap-0"
                        tabIndex={0}
                        key={item.id}>
                        <div
                            {...props}
                            className={cn(`flex flex-col items-center gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`,
                                (activeNoteId === `${item.id}` ? "bg-sidebar-accent" : ""))}>
                            <div className="flex items-center">
                                <div className="mr-4">
                                    {item.favorite && (
                                        <Star className='size-4 brandTextColor' />
                                    )}
                                </div>
                                <div className="flex flex-col items-start gap-2 w-[250px]">
                                    <span className="font-medium">
                                        {getNotesTitle(item.title)}
                                    </span>
                                    <div className='flex items-center gap-3'>
                                        {item.folderId !== "" && (
                                            <div className="flex items-center gap-2">
                                                <Folder className="size-4 text-muted-foreground" />
                                                <span className="text-xs">{findFolder?.name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <NoteOptios noteId={item.id} />
                        </div>
                    </SidebarMenuItem>
                )
            })}
        </>
    )
}
export default NoteItems