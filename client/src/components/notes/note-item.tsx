import { SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { NoteItem } from "@/lib/types"
import React from "react"
import { getNotesTitle } from "@/lib/helpers"
import { useNavigate } from "react-router"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getApp, getNotes } from "@/lib/redux/selector"
import { MenuType } from "@/lib/enums"
import { selectAllFolder } from "@/lib/redux/slice/folder.slice"
import { setActiveNoteId } from "@/lib/redux/slice/notes.slice"
import NoteOptios from "./note-options"

interface NoteItemProps {
    notes: NoteItem[];
}

const NoteItems: React.FC<NoteItemProps> = ({ notes, ...props }) => {
    const navigate = useNavigate()
    const { isMobile } = useSidebar()
    const { activeNoteId } = useAppSelector(getNotes)
    const { activeMenu } = useAppSelector(getApp);
    const folder = useAppSelector(selectAllFolder)
    const dispatch = useAppDispatch()

    const allNotes = notes.map((item) => item)
    const favorites = notes.filter((item) => item.favorite === true && item.trash === false)
    const trash = notes.filter((item) => item.trash === true)
    const notesInFolder = notes.filter((item) => item.folderId !== null)

    // const findFolderId = folder.filter((item) => item.id === notesInFolder[0].folderId)

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
            {renderedNotes.map((item) => (
                <SidebarMenuItem
                    onClick={() => handleActiveNote(item.id)}
                    className="cursor-pointer gap-0"
                    tabIndex={0}
                    key={item.id}>
                    <div
                        {...props}
                        className={cn(`flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`,
                            (activeNoteId === `${item.id}` ? "bg-sidebar-accent" : "")
                        )}
                    >
                        <div className="flex flex-col items-start gap-2">
                            <div className="flex w-full items-center gap-2">
                                <Badge>{item.ownerId}</Badge>
                                <span className="ml-auto text-xs text-muted-foreground">{item.lastUpdated}</span>
                            </div>
                            <span className="font-medium">{item.title}</span>
                            <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                                {getNotesTitle(item.content)}
                            </span>
                        </div>
                        <NoteOptios noteId={item.folderId} />
                    </div>
                </SidebarMenuItem>
            ))}
        </>
    )
}
export default NoteItems