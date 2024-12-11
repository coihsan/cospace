import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ColorStyle } from "@/lib/const"
import { Editor } from "@tiptap/react"
import React from "react"

type ColorExtensionsProps = {
    editor: Editor
}

const ColorExtensions: React.FC<ColorExtensionsProps> = ({ editor }) => {
    const index = ColorStyle(editor)

    return (
        <Popover>
            <PopoverTrigger>
                <div className={`bg-[${index[0].color}] size-6 border`} defaultValue={editor.getAttributes('textStyle').color} />
            </PopoverTrigger>
            <PopoverContent>
                <Input
                    type="color"
                    onInput={event => editor.chain().focus().setColor(event.target.value).run()}
                    value={editor.getAttributes('textStyle').color}
                    data-testid="setColor"
                />
                <div className="flex flex-1 flex-wrap gap-px pt-3">
                    {index.map((color) => (
                        <Button size={'icon'} variant={'ghost'} data-testid={color.dataTestid} onClick={color.onClick} className={color.className}>
                            <div className={`bg-[${color.color}] border`} />
                            <span className="sr-only">{color.color}</span>
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
export default ColorExtensions