import { Editor } from "@tiptap/react"
import ToolbarButton from "../global/toolbar-button"
import { FormatStyleMenuBar, NodeFormatMenuBar, CodeFormatMenuBar } from "@/lib/const"
import { Separator } from "@/components/ui/separator"
import ToolbarHeading from "./toolbar-heading";
import ButtonAction from "../global/button-action";
import { MessageCircle } from "lucide-react";
import ColorExtensions from "../extensions/color-extensions";

interface MenuToolbarProps {
    editor: Editor | null;
}

const MenuToolbar: React.FC<MenuToolbarProps> = ({ editor }) => {
    if (!editor) return null

    const formatStyle = FormatStyleMenuBar(editor)
    const nodeFormat = NodeFormatMenuBar(editor)
    const codeFormat = CodeFormatMenuBar(editor)

    return (
        <div className="fixed z-50 bg-white dark:bg-zinc-900 border-b border-border w-full p-1">
            <div className="flex items-center flex-1 flex-nowrap gap-1 h-auto bg-transparent overflow-x-hidden">
                <ColorExtensions editor={editor} />
                {nodeFormat.map((item, index) => (
                    <ToolbarButton
                        key={index}
                        onClick={item.onClick}
                        tooltip={item.label}
                        disabled={item.disabled}
                        className={item.className}
                    >
                        <item.icon />
                    </ToolbarButton>
                ))}
                <Separator className="h-6" orientation="vertical" />
                <ToolbarHeading editor={editor} />
                <Separator className="h-6" orientation="vertical" />
                {formatStyle.map((item, index) => (
                    <ToolbarButton
                        key={index}
                        onClick={item.onClick}
                        tooltip={item.label}
                        disabled={item.disabled}
                        className={item.className}
                    >
                        <item.icon />
                    </ToolbarButton>
                ))}
                <Separator className="h-6" orientation="vertical" />
                {codeFormat.map((item, index) => (
                    <ToolbarButton
                        key={index}
                        onClick={item.onClick}
                        tooltip={item.label}
                        disabled={item.disabled}
                        className={item.className}
                    >
                        <item.icon />
                    </ToolbarButton>
                ))}
                <Separator className="h-6" orientation="vertical" />
                <ToolbarButton
                    onClick={() => editor.chain().focus().addPendingComment().run()}
                    tooltip="Comment"
                >
                    <MessageCircle />
                </ToolbarButton>
            </div>
        </div>
    )
}
export default MenuToolbar