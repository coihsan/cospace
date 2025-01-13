import React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LabelText } from "@/lib/label-text"
import { Copy, Ellipsis, Trash, UserRound } from "lucide-react"
import ButtonAction from "../primitive/button-action"

const EditorOptions: React.FC = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ButtonAction size={'icon'} tooltip={LabelText.SETTINGS} variant={'outline'}>
                    <Ellipsis />
                </ButtonAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Copy />
                    Copy note reference
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Copy />
                    Copy note content
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <UserRound />
                    Start collaboration
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Trash />
                    Move to trash
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default EditorOptions