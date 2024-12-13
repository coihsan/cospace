import React, { useCallback, useEffect, useState, ChangeEventHandler } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import MenuToolbar from '@/components/toolbar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '../ui/separator'
import { useYjsProviders } from '@/hooks/use-yjs-provider'
import { getRandomElement } from '@/lib/helpers'
import { colorsCursor, names } from '@/lib/const'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store'
import { getApp } from '@/lib/redux/selector'
import { setEditable } from '@/lib/redux/slice/app.slice'

interface EditorProps {
  content: string;
  title: string;
  titleChange: ChangeEventHandler<HTMLInputElement>
  onChange: (content: string) => void
  noteId: string
}

const TiptapEditor: React.FC<EditorProps> = ({ content, onChange, noteId, title, titleChange }) => {
  // const { ydoc, provider } = useYjsProviders(noteId);
  const dispatch = useAppDispatch()
  const { editable } = useAppSelector(getApp)

  const getRandomColor = () => getRandomElement(colorsCursor)
  const getRandomName = () => getRandomElement(names)

  const editor = useEditor({
    extensions: [
      Color,
      TextStyle,
      StarterKit,
      Placeholder.configure({
        placeholder: () => {
          return 'Write something...'
        },
      }),
      TextAlign.configure({
        types: ['heading, paragraph'],
      }),
      // Collaboration.extend().configure({
      //   document: ydoc,
      // }),
      // CollaborationCursor.configure({
      //   provider,
      //   user: {
      //     name: getRandomName(),
      //     color: getRandomColor(),
      //   },
      // }),
    ],
    content: content,
    editable: editable,
    autofocus: true,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    onCreate: ({ editor }) => {
      editor.isEmpty
      dispatch(setEditable(true))
    },
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: "prose prose-sm max-w-none outline-none border-none"
      }
    }
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    } else {
      editor?.commands.clearContent()
    }
  }, [content, editor])

  return (
    <div>
      {editable && <MenuToolbar className='pb-10 md:pb-12' editor={editor} />}
      <div className='max-w-screen-lg w-full h-full mx-auto pt-4 md:pb-12'>
        <div className='bg-white min-h-[30cm] dark:bg-zinc-950 p-4 md:p-12 dark:border'>
          <input
            type="text"
            defaultValue={title}
            disabled={editable}
            onChange={(e) => titleChange(e)}
            placeholder="Title it's here"
            className="text-2xl bg-transparent border-none outline-none w-full"
          />
          <Separator className='my-6' />
          <ScrollArea className='h-full'>
            <EditorContent editor={editor} />
          </ScrollArea>
        </div>
      </div>
    </div>
  )

}
export default TiptapEditor