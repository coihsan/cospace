import { SidebarMenuItem } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { NoteItem } from "@/lib/types"
import React from "react"
import { getNotesTitle } from "@/lib/helpers"
import { useNavigate } from "react-router"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getApp, getNotes } from "@/lib/redux/selector"
import { MenuType } from "@/lib/enums"
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

    const { activeNoteId, activeFolderId } = useAppSelector(getNotes)
    const { activeMenu } = useAppSelector(getApp);
    const folders = useAppSelector(selectAllFolder)

    const allNotes = notes.filter((item) => item && !item.trash)
    const favorites = notes.filter((item) => item.favorite === true && item.trash === false)
    const trash = notes.filter((item) => item.trash === true)
    const notesInFolder = notes.filter((item) => item.folderId === activeFolderId)

    const handleActiveNote = (noteId: string) => {
        dispatch(setActiveNoteId(noteId))
        navigate(`/app/${noteId}`)
    }

    let renderedNotes: Array<NoteItem> = [];

    if (activeMenu === MenuType.NOTES) {
        renderedNotes = allNotes;
    } else if (activeMenu === MenuType.FAVORITE) {
        renderedNotes = favorites;
    } else if (activeMenu === MenuType.TRASH) {
        renderedNotes = trash;
    } else if (activeMenu === MenuType.FOLDER) {
        renderedNotes = notesInFolder;
    } else {
        renderedNotes = allNotes;
    }

    return (
        <>
            {renderedNotes.map((item) => {
                const findFolder = folders.find((folderItem) => folderItem.id === item.folderId);
                return (
                    <SidebarMenuItem
                        onClick={() => handleActiveNote(item.id)}
                        className="cursor-pointer gap-0"
                        tabIndex={0}
                        key={item.id}>
                        <div
                            {...props}
                            className={cn(`flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`,
                                (activeNoteId === `${item.id}` ? "bg-sidebar-accent" : ""))}>
                            <div className="flex flex-col items-start gap-2 w-[260px] ">
                                <div className="flex w-full items-center justify-center gap-2">
                                    <Badge variant={'outline'}>{item.ownerId}</Badge>
                                    <span className="ml-auto text-xs text-muted-foreground">{item.lastUpdated}</span>
                                </div>
                                <span className="font-medium">
                                    {getNotesTitle(item.title)}
                                </span>
                                <span className="line-clamp-2 whitespace-break-spaces text-xs">
                                    {getNotesTitle(item.content)}
                                </span>
                                <div className='flex items-center gap-3'>
                                    <div>
                                        {item.favorite && (
                                            <Star className='size-4 brandTextColor' />
                                        )}
                                    </div>
                                    {item.folderId !== "" && (
                                        <Badge className="flex items-center gap-2" variant={'outline'}>
                                            <Folder className="size-4 brandTextColor" />
                                            <span className="text-[10px]">{findFolder?.name}</span>
                                        </Badge>
                                    )}
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