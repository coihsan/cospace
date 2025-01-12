import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { colorValue } from "@/lib/const"
import { Editor } from "@tiptap/react"
import React from "react"
import { Toggle } from "@/components/ui/toggle"

type ColorExtensionsProps = {
    editor: Editor
}

const ColorExtensions: React.FC<ColorExtensionsProps> = ({ editor }) => {
    const currentColor = editor.getAttributes('textStyle').color;

    return (
        <Popover>
            <PopoverTrigger>
                <Toggle>
                    <div className="size-5 border rounded-md" style={{backgroundColor : currentColor}} />
                </Toggle>
            </PopoverTrigger>
            <PopoverContent>
                <input
                    type="color"
                    color="hex"
                    className="w-full border-0 ring-0 outline-0 bg-transparent"
                    onChange={event => editor.chain().focus().setColor(event.target.value).run()}
                    value={currentColor}
                    data-testid="setColor"
                />
                <div className="flex flex-1 flex-wrap">
                    {colorValue.map((color, index) => (
                        <Button key={index} 
                        size={'icon'} 
                        variant={'ghost'} 
                        onClick={() => {
                            editor.chain().focus().setColor(color).run();
                          }} 
                        >
                            <div className={`size-5 rounded-md border`} style={{backgroundColor : color}} />
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
export default ColorExtensions