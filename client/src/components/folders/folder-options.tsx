import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Forward, Trash2 } from "lucide-react"
import { SidebarMenuAction, useSidebar } from "../ui/sidebar"
import { removeFolder } from "@/lib/redux/slice/folder.slice"
import { useAppDispatch } from "@/lib/redux/store"

type FolderOptionsProps = {
    folderId: string
}

const FolderOptions: React.FC<FolderOptionsProps> = ({ folderId }) => {
    const { isMobile } = useSidebar()
    const dispatch = useAppDispatch()

    const handleDeleteFolderId = (folderId: string) => { dispatch(removeFolder({ folderId })) }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
            >
                <DropdownMenuItem>
                    <Pencil className="text-muted-foreground" />
                    <span>Rename Folder</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Folder</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDeleteFolderId(folderId)} className="text-red-500 dark:text-red-600">
                    <Trash2 />
                    <span>Delete Folder</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default FolderOptions