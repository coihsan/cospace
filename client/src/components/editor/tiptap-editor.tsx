import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import * as Y from 'yjs'

interface EditorProps {
  content: string
  onChange: (content: string) => void
  ydoc: Y.Doc
  noteId: number
}

const TiptapEditor = ({ content, onChange, ydoc, noteId }: EditorProps) => {
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
    editable: true,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return <EditorContent editor={editor} className="prose prose-sm max-w-none" />
}
export default TiptapEditor