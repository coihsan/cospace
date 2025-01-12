import { BubbleMenu, Editor } from "@tiptap/react"
import React from "react"

interface Props {
    editor: Editor | null
    children: React.ReactNode
}

const UseBubbleMenu : React.FC<Props> = ({
    editor,
    children,
}) =>{
    return(
        <>
            {editor &&
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <div className="bubble-menu">
                        {children}
                    </div>
                </BubbleMenu>
            }
        </>
    )
}
export default UseBubbleMenu