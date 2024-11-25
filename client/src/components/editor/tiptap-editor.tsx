import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import * as Y from 'yjs'
import { Separator } from "@/components/ui/separator"
import MenuToolbar from '@/components/global/toolbar'
import { ScrollArea } from '@/components/ui/scroll-area'

interface EditorProps {
  content: string
  onChange: (content: string) => void
  ydoc: Y.Doc
  noteId: number
}

const TiptapEditor: React.FC<EditorProps> = ({ content, onChange, ydoc, noteId }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: () => {
          return 'Write something...'
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    // onFocus: ({editor}) => {
    //   editor.setEditable(true)
    //   console.log('true')
    // },
    // onBlur: ({editor}) => {
    //   editor.setEditable(false)
    //   console.log('false')
    // },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    onCreate: ({ editor }) => {
      editor.isEmpty
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none outline-none border-none"
      }
    }
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className=''>
      <MenuToolbar editor={editor} />
      <input
        type="text"
        value={''}
        placeholder="Title it's here"
        className="text-2xl bg-transparent border-none outline-none w-full"
      />
      <Separator className="my-5" />
      <ScrollArea className='h-full'>
        <EditorContent editor={editor} />
      </ScrollArea>
    </div>
  )

}
export default TiptapEditor