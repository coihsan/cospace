import { BubbleMenu, type Editor } from '@tiptap/react'

interface BubbleMenuToolbarProps {
    editor: Editor | null
    children: React.ReactNode
}

const BubbleMenuTiptap: React.FC<BubbleMenuToolbarProps> = ({ editor, children }) => {
    return (
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
export default BubbleMenuTiptap