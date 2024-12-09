import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bell, Bold, Code, CodeSquare, Folder, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Minus, NotepadText, Pilcrow, Quote, Settings, Star, Strikethrough, Trash2 } from 'lucide-react';
import { MenuType } from './enums';
import { LabelMenubar } from './label-text';
import { Editor } from '@tiptap/react';

export const navMain = [
    {
        title: MenuType.NOTES,
        url: "#",
        icon: NotepadText,
        isActive: true,
    },
    {
        title: MenuType.NOTIFICATION,
        url: "#",
        icon: Bell,
        isActive: false,
    },
    {
        title: MenuType.TRASH,
        url: "/",
        icon: Trash2,
        isActive: false,
    },
    {
        title: MenuType.SETTINGS,
        url: "/",
        icon: Settings,
        isActive: false,
    }
]

interface TextEditorMenuBarProps {
    icon: any;
    onClick: () => void;
    className?: string;
    active?: boolean;
    label: LabelMenubar
    disabled?: boolean
}

export const FormatStyleMenuBar = (editor: Editor): TextEditorMenuBarProps[] =>
    [
        {
            icon: AlignLeft,
            label: LabelMenubar.TEXT_ALIGN_LEFT,
            onClick: () => editor.chain().focus().setTextAlign('left').run() && !editor.isActive('codeBlock'),
            className: editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : '',
        },
        {
            icon: AlignCenter,
            label: LabelMenubar.TEXT_ALIGN_CENTER,
            onClick: () => editor.chain().focus().setTextAlign('center').run() && !editor.isActive('codeBlock'),
            className: editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : '',
        },
        {
            icon: AlignRight,
            label: LabelMenubar.TEXT_ALIGN_RIGHT,
            onClick: () => editor.chain().focus().setTextAlign('right').run() && !editor.isActive('codeBlock'),
            className: editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : '',
        },
        {
            icon: AlignJustify,
            label: LabelMenubar.TEXT_ALIGN_JUSTIFY,
            onClick: () => editor.chain().focus().setTextAlign('justify').run() && !editor.isActive('codeBlock'),
            className: editor.isActive({ textAlign: 'justify' }) ? 'bg-muted' : '',
        },
        {
            icon: List,
            label: LabelMenubar.UL,
            onClick: () => editor.chain().focus().toggleBulletList().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('bulletList') ? 'bg-muted' : '',
        },
        {
            icon: ListOrdered,
            label: LabelMenubar.OL,
            onClick: () => editor.chain().focus().toggleOrderedList().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('orderedList') ? 'bg-muted' : '',
        },
        {
            icon: Minus,
            label: LabelMenubar.HR,
            onClick: () => editor.chain().focus().setHorizontalRule().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('horizontalRule') ? 'bg-muted' : '',
        },

    ]

export const NodeFormatMenuBar = (editor: Editor): TextEditorMenuBarProps[] => [
    {
        icon: Bold,
        label: LabelMenubar.BOLD,
        onClick: () => editor.chain().focus().toggleBold().run() && !editor.isActive('codeBlock'),
        className: editor.isActive('bold') ? 'bg-muted' : '',
    },
    {
        icon: Italic,
        label: LabelMenubar.ITALIC,
        onClick: () => editor.chain().focus().toggleItalic().run() && !editor.isActive('codeBlock'),
        className: editor.isActive('italic') ? 'bg-muted' : '',
    },
    {
        icon: Strikethrough,
        label: LabelMenubar.STRIKE,
        onClick: () => editor.chain().focus().toggleStrike().run() && !editor.isActive('codeBlock'),
        className: editor.isActive('strike') ? 'bg-muted' : '',
    },
]

export const HeadingFormatMenuBar = (editor: Editor): TextEditorMenuBarProps[] => [
    {
        icon: Pilcrow,
        label: LabelMenubar.P,
        onClick: () => editor.chain().focus().setParagraph().run() && !editor.isActive('codeBlock'),
        className: editor.isActive('paragraph') ? 'bg-muted' : '',
    },
    {
        icon: Heading1,
        label: LabelMenubar.H1,
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        className: editor.isActive('heading', { level: 1 }) ? 'bg-muted' : '',
    },
    {
        icon: Heading2,
        label: LabelMenubar.H2,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        className: editor.isActive('heading', { level: 2 }) ? 'bg-muted' : 'bg-transparent',
    },
    {
        icon: Heading3,
        label: LabelMenubar.H3,
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        className: editor.isActive('heading', { level: 3 }) ? 'bg-muted' : '',
    },
]

export const CodeFormatMenuBar = (editor: Editor): TextEditorMenuBarProps[] => [
    {
        icon: Code,
        label: LabelMenubar.CODE,
        onClick: () => editor.chain().focus().toggleCode().run() && !editor.isActive('codeBlock'),
        className: editor.isActive('code') ? 'bg-muted' : '',
        disabled: !editor.can().chain().focus().toggleCode().run()
    },
    {
        icon: CodeSquare,
        label: LabelMenubar.CODE_BLOCK,
        onClick: () => editor.chain().focus().toggleCodeBlock().run() && !editor.isActive('codeBlock'),
        className: editor.isActive('codeBlock') ? 'bg-muted' : '',
    },
    {
        icon: Quote,
        label: LabelMenubar.QUOTE,
        onClick: () => editor.chain().focus().toggleBlockquote().run() && !editor.isActive('codeBlock'),
        className: editor.isActive('blockquote') ? 'bg-muted' : '',
    },
]