import { MenuType } from '@/lib/enums';
import { FolderItem, NoteItem } from '@/lib/types';
import React, { useContext, createContext, useState } from 'react'
import { useAppSelector } from '@/lib/redux/store';
import { getApp, getNotes } from '@/lib/redux/selector';
import { selectAllFolder } from '@/lib/redux/slice/folder.slice';
import { selectAllNotes } from '@/lib/redux/slice/notes.slice';

interface SidebarContextInterface {
    isMenuOpen : boolean;
    toggleSidebar : () => void;
    folder: FolderItem[];
    notes: NoteItem[];
    setFolderId: (folderId: string) => void;
    sidebarMenuName: string;
    setSidebarMenuName: (sidebarMenuName: string) => void;
    handleAddNote: (note: NoteItem) => void;
    type: MenuType;
    activeFolderId: string;
    menuClicked : (menu: MenuType) => void;
    hendleDeleteAllNotes: () => void;
}

const initialSidebarPrimaryValue = {
    isMenuOpen: true,
    toggleSidebar: () => {},
    folder: [],
    notes: [],
    setFolderId: (folderId: string) => {},
    sidebarMenuName: '',
    setSidebarMenuName: (sidebarMenuName: string) => {},
    handleAddNote: (note: NoteItem) => {},
    type: MenuType.NOTES,
    menuClicked : (menu: MenuType) => {},
    activeFolderId: '',
    hendleDeleteAllNotes: () => {}
}

const SidebarContext = createContext<SidebarContextInterface>(initialSidebarPrimaryValue)

const useContextSidebar = () => {
    const context = useContext(SidebarContext)
    
    if(!context){
        throw new Error('useContextSidebar must be used within a SidebarProvider')
    }

    return context
}

const ContextSidebarProvider = ({ children } : {children : React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(true)

    const { activeMenu } = useAppSelector(getApp)
    const { activeFolderId } = useAppSelector(getNotes)
    const folders = useAppSelector(selectAllFolder)
    const notes = useAppSelector(selectAllNotes)

    const value = {
        isMenuOpen: isOpen,
        toggleSidebar: () => setIsOpen(!isOpen),
        folder: folders,
        notes: notes,
        setFolderId: (folderId: string) => {},
        sidebarMenuName: '',
        setSidebarMenuName: (sidebarMenuName: string) => {},
        handleAddNote: (note: NoteItem) => {},
        type: MenuType.NOTES,
        activeFolderId: activeFolderId,
        menuClicked : (menu: typeof activeMenu) => {},
        hendleDeleteAllNotes: () => {}
    }

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export { ContextSidebarProvider, useContextSidebar }

