import { Editor } from "@tiptap/react"
import React from "react"
import BubbleMenuTiptap from "../primitive/bubble-menu-tiptap"

interface Props {
    editor: Editor | null
}

const BubbleMenuToolbar : React.FC<Props> = ({
    editor,
}) =>{
    return(
        <BubbleMenuTiptap editor={editor}>
            hello
        </BubbleMenuTiptap>
    )
}
export default BubbleMenuToolbar