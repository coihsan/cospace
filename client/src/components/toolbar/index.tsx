import { Editor } from "@tiptap/react"
import ToolbarButton from "./toolbar-button"
import { FormatStyleMenuBar, NodeFormatMenuBar, CodeFormatMenuBar, HistoryToolbar } from "@/lib/const"
import { Separator } from "@/components/ui/separator"
import ToolbarHeading from "./toolbar-heading";
import { MessageCircle } from "lucide-react";
import ColorExtensions from "../editor/extensions/color-extensions";

interface MenuToolbarProps {
    editor: Editor | null;
    className?: string
}

const MenuToolbar: React.FC<MenuToolbarProps> = ({ editor, className }) => {
    if (!editor) return null

    const formatStyle = FormatStyleMenuBar(editor)
    const nodeFormat = NodeFormatMenuBar(editor)
    const codeFormat = CodeFormatMenuBar(editor)
    const history = HistoryToolbar(editor)

    return (
        <div className={`fixed z-50 bg-white dark:bg-zinc-900 border-b border-border w-full p-1 ${className}`}>
            <div className="flex items-center flex-1 flex-nowrap gap-1 h-auto bg-transparent overflow-x-hidden">
                <ColorExtensions editor={editor} />
                {history.map((item, index) => (
                    <ToolbarButton
                        key={index}
                        onClick={item.onClick}
                        tooltip={item.label}
                        className={item.className}
                    >
                        <item.icon />
                    </ToolbarButton>
                ))}
                <Separator className="h-6" orientation="vertical" />
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
                    tooltip="Comment"
                >
                    <MessageCircle />
                </ToolbarButton>
            </div>
        </div>
    )
}
export default MenuToolbar