import { Editor } from "@tiptap/react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useCallback } from "react"

interface ToolbarHeadingProps {
    editor: Editor
}

const toolbarHeadings = [
    { value: "p", title: "Paragraph" },
    { value: "h1", title: "Heading 1" },
    { value: "h2", title: "Heading 2" },
    { value: "h3", title: "Heading 3" },
  ];

const ToolbarHeading: React.FC<ToolbarHeadingProps> = ({ editor }) => {

    const onHeadingChange = useCallback(
        (value: string) => {
          if (!editor) {
            return;
          }
    
          switch (value) {
            case "p":
              editor.chain().focus().setParagraph().run();
              break;
    
            case "h1":
              editor.chain().focus().setHeading({ level: 1 }).run();
              break;
    
            case "h2":
              editor.chain().focus().setHeading({ level: 2 }).run();
              break;
    
            case "h3":
              editor.chain().focus().setHeading({ level: 3 }).run();
              break;
          }
        },
        [editor]
      );

    return (
        <Select>
            <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Paragraph" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {toolbarHeadings.map((menu) => (
                        <SelectItem onClick={() => onHeadingChange(menu.value)} value={menu.value}>{menu.title}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default ToolbarHeading