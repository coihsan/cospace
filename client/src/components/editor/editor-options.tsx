import React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LabelText } from "@/lib/label-text"
import { Copy, Settings, Trash, UserRound } from "lucide-react"
import ButtonAction from "../global/button-action"

const EditorOptions : React.FC = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ButtonAction size={'icon'} tooltip={LabelText.SETTINGS} variant={'outline'}>
                    <Settings />
                </ButtonAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>noteId</DropdownMenuLabel>
                <DropdownMenuSeparator />
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