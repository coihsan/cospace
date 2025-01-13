import React, { useCallback, useEffect, useState, ChangeEventHandler } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
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
import { getRandomElement } from '@/lib/helpers'
import { colorsCursor, names } from '@/lib/const'


interface EditorProps {
    initialContent: string;
    titleContent: string;
    titleChange: ChangeEventHandler<HTMLInputElement>;
    onChange: (content: string) => void;
    noteId: string | undefined;
}

const TiptapEditor: React.FC<EditorProps> = ({ initialContent, titleContent, titleChange, onChange, noteId }) => {
    // const { ydoc, provider } = useYjsProviders(noteId);
    const getRandomColor = () => getRandomElement(colorsCursor)
    const getRandomName = () => getRandomElement(names)
    
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
                    return 'Write something...'
                },
            }),
            // Collaboration.configure({
            //     document: ydoc,
            // }),
            // CollaborationCursor.configure({
            //     provider,
            //     user: {
            //         name: 'Cyndi Lauper',
            //         color: '#f783ac',
            //     },
            // }),
        ],
        autofocus: true,
        content: initialContent,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
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

    useEffect(() => {
        if (editor && initialContent) {
            editor.commands.setContent(initialContent);
        }
    }, [noteId, initialContent, editor]);

    return (
        <div>
            <HeaderEditor />
            <div>
                <MenuToolbar editor={editor} />
                <BubbleMenuToolbar editor={editor} />
                <div className='max-w-screen-lg w-full h-full mx-auto pt-12 md:pt-16 md:pb-12'>
                    <div className='bg-white min-h-[30cm] border border-border dark:bg-zinc-950 p-4 md:p-12'>
                        <input
                            type="text"
                            defaultValue={titleContent}
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
            <FooterEditor />
        </div>
    )
}
export default TiptapEditor