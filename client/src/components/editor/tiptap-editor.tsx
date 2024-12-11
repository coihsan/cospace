import { useEditor, EditorContent } from '@tiptap/react'
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { ChangeEventHandler, useEffect } from 'react'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import * as Y from 'yjs'
import MenuToolbar from '@/components/toolbar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '../ui/separator'

interface EditorProps {
  content: string;
  title: string;
  titleChange: ChangeEventHandler<HTMLInputElement>
  onChange: (content: string) => void
  ydoc: Y.Doc
  noteId: string
}

const TiptapEditor: React.FC<EditorProps> = ({ content, onChange, ydoc, noteId, title, titleChange,  }) => {
  const liveblocks = useLiveblocksExtension({
    offlineSupport_experimental: true,
  });

  const editor = useEditor({
    extensions: [
      liveblocks,
      Color,
      TextStyle,
      StarterKit.configure({
        history: false,
      }),
      Placeholder.configure({
        placeholder: () => {
          return 'Write something...'
        },
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
    ],
    content,
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
    <div>
      <MenuToolbar editor={editor} />
      <div className='max-w-screen-lg w-full h-full mx-auto pt-14 md:pt-16 md:pb-12'>
        <div className='bg-white min-h-[30cm] dark:bg-zinc-950 p-4 md:p-12 dark:border'>
          <input
            type="text"
            defaultValue={title}
            onChange={(e) => titleChange(e)}
            placeholder="Title it's here"
            className="text-2xl bg-transparent border-none outline-none w-full"
          />
          <Separator className='my-9' />
          <ScrollArea className='h-full'>
            <EditorContent editor={editor} />
          </ScrollArea>
        </div>
      </div>
    </div>
  )

}
export default TiptapEditor