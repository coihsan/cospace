import UseBubbleMenu from "@/hooks/use-bubblemenu"
import { Editor } from "@tiptap/react"
import React from "react"

interface Props {
    editor: Editor | null
}

const BubbleMenuToolbar : React.FC<Props> = ({
    editor,
}) =>{
    return(
        <UseBubbleMenu editor={editor}>
            hello
        </UseBubbleMenu>
    )
}
export default BubbleMenuToolbar