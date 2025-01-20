import { FolderItem } from "@/lib/types"
import React, { FormEvent, useRef, useTransition, useState } from "react"
import FolderOptions from "./folder-options"
import { Folder, X, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "../ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getFolder } from "@/lib/redux/selector"
import { setActiveFolderId } from "@/lib/redux/slice/notes.slice"
import { currentItem } from "@/lib/helpers"
import { createNewFolder, renameFolder, removeFolder, setFolderVisibility } from "@/lib/redux/slice/folder.slice"
import { v4 } from "uuid"

interface FolderItemsProps {
    folder: FolderItem[]
}

const FolderItems: React.FC<FolderItemsProps> = ({ folder }) => {
    const dispatch = useAppDispatch()
    const { setOpen } = useSidebar()
    const ref = useRef<HTMLInputElement>(null)
    const [, startTransition] = useTransition()
    
    const { isVisible } = useAppSelector(getFolder)
    
    const {
        editingFolderId: { id: editingFolderId, name }
    } = useAppSelector(getFolder)

    // ACTION
    const handleActiveFolderId = (folderId: string) => {
        try {
            dispatch(setActiveFolderId(folderId))
            setOpen(true)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmitNewFolder = (event: FormEvent) => {
        event.preventDefault()
        startTransition(() => {
            const newFolderName = ref.current?.value;
            if (newFolderName) {
                const initialFolderName: FolderItem = {
                    id: v4(),
                    name: newFolderName,
                    createdAt: currentItem,
                    lastUpdated: currentItem,
                    isSharing: false
                }
                dispatch(createNewFolder(initialFolderName))
                ref.current!.value = '';
                setFolderVisibility(false)
            }
        })
    }
    const handleCancelNewFolder = () => { setFolderVisibility(false) }

    const handleChangeFolderName = (folderId: string, folderName: string) => {
        try {
            dispatch(renameFolder({ folderId, folderName }))
        } catch (error) {
            console.log("Failed to rename folder" + error)
        }
    }

    const handleDeleteFolderId = (folderId: string) => { dispatch(removeFolder({ folderId })) }

    return (
        <SidebarMenu>
            {folder.slice(0, 10).map((item) => (
                <SidebarMenuItem key={item.name}>
                    {editingFolderId === item.id ? (
                        <form onSubmit={(event: FormEvent) => event.preventDefault()}>
                            <Input
                                aria-label="folder name"
                                type="text"
                                autoFocus
                                maxLength={30}
                                ref={ref}
                                value={item.name}
                                onChange={(event) => {
                                    event.target.value
                                    handleChangeFolderName(item.id, event.target.value)
                                }}
                            />
                        </form>
                    ) : (
                        <SidebarMenuButton onClick={() => handleActiveFolderId(item.id)}>
                            <div className='flex items-center gap-3' key={item.id}>
                                <Folder className='size-4 text-muted-foreground' />
                                <span>{item.name}</span>
                            </div>
                        </SidebarMenuButton>
                    )}
                    <FolderOptions folderId={item.id} />
                </SidebarMenuItem>
            ))}
            {isVisible && (
                <div className='flex gap-1'>
                    <form onSubmit={onSubmitNewFolder}>
                        <Input
                            type='text'
                            placeholder='New folder...'
                            autoFocus
                            maxLength={30}
                            ref={ref}
                        />
                    </form>
                    <Button size={'icon'} variant={'ghost'} onClick={handleCancelNewFolder}><X /></Button>
                </div>
            )}
            <SidebarMenuItem>
                {folder.length >= 10 && (
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <MoreHorizontal className="text-sidebar-foreground/70" />
                        <span className="text-xs">More</span>
                    </SidebarMenuButton>
                )}
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default FolderItems