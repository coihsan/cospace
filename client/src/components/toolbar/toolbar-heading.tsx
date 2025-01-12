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
  { value: "h1", title: "Heading" },
  { value: "h2", title: "Sub heading 2" },
  { value: "h3", title: "Sub heading 3" },
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
          editor.chain().focus().toggleHeading({ level: 1 }).run();
          break;

        case "h2":
          editor.chain().focus().toggleHeading({ level: 2 }).run();
          break;

        case "h3":
          editor.chain().focus().toggleHeading({ level: 3 }).run();
          break;
      }
    },
    [editor]
  );

  return (
    <Select defaultValue={'p'} onValueChange={() => onHeadingChange} >
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Paragraph" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {toolbarHeadings.map((menu, index) => (
            <SelectItem key={index} value={menu.value}>{menu.title}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default ToolbarHeading