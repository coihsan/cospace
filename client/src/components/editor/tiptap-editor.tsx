import React, { useEffect, ChangeEvent, useState, FormEvent } from 'react'
import { useEditor, EditorContent, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import MenuToolbar from '../toolbar'
import BubbleMenuToolbar from '../toolbar/bubble-menu-toolbar'
import HeaderEditor from './header-editor'
import FooterEditor from './footer-editor'
import { useYjsProviders } from '@/hooks/use-yjs-provider'
import { debounceEvent, getRandomElement } from '@/lib/helpers'
import { colorsCursor, names } from '@/lib/const'
import { NotePermission } from '@/lib/types'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store'
import { getNotes } from '@/lib/redux/selector'
import { updateTitleNotes } from '@/lib/redux/slice/notes.slice'
import { Input } from '../ui/input'

interface EditorProps {
    initialContent: Content;
    initialTitle: string;
    onChange: (content: Content) => void;
    noteId: string;
    permission: NotePermission;
}

const TiptapEditor: React.FC<EditorProps> = ({ initialContent, initialTitle, onChange, noteId, permission }) => {
    const dispatch = useAppDispatch()
    const { activeNoteId } = useAppSelector(getNotes)
    const [title, setTitle] = useState(initialTitle)
    // const { ydoc, provider } = useYjsProviders(noteId);
    // const getRandomColor = () => getRandomElement(colorsCursor)
    // const getRandomName = () => getRandomElement(names)

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading, paragraph'],
            }),
            Placeholder.configure({
                placeholder: () => {
                    return 'Write something … It’ll be shared with everyone else looking at this example.'
                },
            }),
            // Collaboration.configure({
            //     document: ydoc,
            // }),
            // CollaborationCursor.configure({
            //     provider,
            //     user: {
            //         name: getRandomName,
            //         color: getRandomColor,
            //     },
            // }),
        ],
        editable: permission.permission === 'canEdit' || 'owner' ? true : false,
        autofocus: true,
        content: initialContent ? initialContent : '',
        onUpdate: ({ editor }) => {
            const editorContent = editor.getHTML();
            onChange(editorContent)
        },
        onCreate: ({ editor }) => {
            editor.isEmpty
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

    const onUpdateTitle = debounceEvent((noteId: string, title: string) => {
        if (noteId === activeNoteId) {
          dispatch(updateTitleNotes({ noteId: activeNoteId, title: title }))
        }
      }, 500)

    useEffect(() => {
        if (editor && initialContent) {
            editor.commands.setContent(initialContent);
        } else {
            editor?.commands.clearContent()
        }
    }, [initialContent, editor]);

    // useEffect(() => {
    //     return () => {
    //         provider.destroy();
    //         ydoc.destroy();
    //     }
    // }, [noteId])

    return (
        <>
            <HeaderEditor />
            <div>
                <MenuToolbar editor={editor} />
                <BubbleMenuToolbar editor={editor} />
                <div className='max-w-screen-lg w-full h-full mx-auto pt-12 md:pt-16 md:pb-12'>
                    <div className='bg-white min-h-[30cm] border border-border dark:bg-zinc-950 p-4 md:p-12'>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => {
                                onUpdateTitle(noteId, title)
                                setTitle(e.target.value)
                            }}
                            placeholder="Title it's here"
                            className="text-2xl bg-transparent border-none outline-none ring-0 w-full"
                        />
                        <Separator className='my-6' />
                        <ScrollArea className='h-full'>
                            <EditorContent editor={editor} />
                        </ScrollArea>
                    </div>
                </div>
            </div>
            <FooterEditor />
        </>
    )
}
export default TiptapEditor