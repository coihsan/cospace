import React, { FormEvent, FormEventHandler, useRef, useTransition } from "react"
import { ChevronDown, Plus } from "lucide-react"
import { SidebarGroup, SidebarGroupAction, SidebarGroupLabel } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible"
import { FolderItem } from "@/lib/types"
import FolderOptions from "./folder-options"
import { Folder, X, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "../ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getFolder } from "@/lib/redux/selector"
import { setActiveFolderId } from "@/lib/redux/slice/notes.slice"
import { currentItem } from "@/lib/helpers"
import { createNewFolder, renameFolder } from "@/lib/redux/slice/folder.slice"
import { v4 } from "uuid"
import { setActiveMenu } from "@/lib/redux/slice/app.slice"
import { MenuType } from "@/lib/enums"

interface FolderItemsProps {
    folder: FolderItem[]
}

const FolderItems: React.FC<FolderItemsProps> = ({ folder }) => {
    const [isOpen, setIsOpen] = React.useState(true)
    const [isVisible, setIsVisible] = React.useState(false)

    const dispatch = useAppDispatch()
    const { setOpen } = useSidebar()
    const ref = useRef<HTMLInputElement>(null)

    const handleNewFolder = (value: boolean) => {
        setIsVisible(value);
        setIsOpen(true)
    }

    const [, startTransition] = useTransition()

    const { editingFolderId } = useAppSelector(getFolder)

    // ACTION
    const handleActiveFolderId = (folderId: string) => {
        try {
            dispatch(setActiveFolderId(folderId))
            dispatch(setActiveMenu(MenuType.FOLDER))
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
                setIsVisible(false)
            }
        })
    }
    const handleCancelNewFolder = () => { setIsVisible(false) }

    const handleChangeFolderName = (folderId: string, folderName: string) => {
        try {
            dispatch(renameFolder({ folderId, folderName }))
        } catch (error) {
            console.log("Failed to rename folder" + error)
        }
    }

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                        <ChevronDown className="mr-2 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        Folder
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <SidebarGroupAction onClick={() => handleNewFolder(true)} title="Add Folder">
                    <Plus /> <span className="sr-only">Add Folder</span>
                </SidebarGroupAction>
                <CollapsibleContent>
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
                                    <>
                                        <SidebarMenuButton onClick={() => handleActiveFolderId(item.id)}>
                                            <div className='flex items-center gap-3' key={item.id}>
                                                <Folder className='size-4 text-muted-foreground' />
                                                <span>{item.name}</span>
                                            </div>
                                        </SidebarMenuButton>
                                        <FolderOptions folderId={item.id} />
                                    </>
                                )}
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
                </CollapsibleContent>
            </SidebarGroup></Collapsible>
    )
}
export default FolderItems
