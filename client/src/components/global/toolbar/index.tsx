import { Editor } from "@tiptap/react"
import ToolbarButton from "../toolbar-button"
import { FormatStyleMenuBar, NodeFormatMenuBar, HeadingFormatMenuBar, CodeFormatMenuBar } from "@/lib/const"
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface MenuToolbarProps {
    editor: Editor | null;
}

const MenuToolbar: React.FC<MenuToolbarProps> = ({ editor }) => {
    if (!editor) return null

    const formatStyle = FormatStyleMenuBar(editor)
    const nodeFormat = NodeFormatMenuBar(editor)
    const headingFormat = HeadingFormatMenuBar(editor)
    const codeFormat = CodeFormatMenuBar(editor)

    return (
        <div className="mb-6 ">
            <div className="flex items-center flex-1 flex-nowrap gap-1 h-auto bg-background overflow-x-hidden">
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
                {headingFormat.map((item, index) => (
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
            </div>
        </div>
    )
}
export default MenuToolbar