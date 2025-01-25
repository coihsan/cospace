import React, { useEffect, useRef } from "react"
import { Command, Plus, Trash } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { navMain } from "@/lib/const"
import { LabelText } from "@/lib/label-text"
import FolderItems from "../folders/folder-items"
import UserButton from "./user-button"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getApp, getNotes, selectFilteredNotes } from "@/lib/redux/selector"
import { setActiveMenu } from "@/lib/redux/slice/app.slice"
import { selectAllFolder } from "@/lib/redux/slice/folder.slice"
import NoteItems from "../notes/note-item"
import { EmptyTrashNote, createNewNote, selectAllNotes, setActiveNoteId, setSearchValue } from "@/lib/redux/slice/notes.slice"
import { NoteItem } from "@/lib/types"
import { v4 } from "uuid"
import { currentItem, debounceEvent } from "@/lib/helpers"
import { MenuType } from "@/lib/enums"
import SearchBar from "../global/search-bar"
import { useModal } from '@/providers/modal-provider';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const { setOpen } = useSidebar()

  const dispatch = useAppDispatch()

  const { activeMenu } = useAppSelector(getApp)
  const { activeFolderId, searchValue } = useAppSelector(getNotes)
  const folders = useAppSelector(selectAllFolder)
  const notes = useAppSelector(selectAllNotes)

  const initialNewNotes: NoteItem = {
    id: v4(),
    title: "",
    content: "",
    lastUpdated: currentItem,
    trash: false,
    favorite: false,
    tagsId: "",
    user: {
      id: v4(),
      fullName: "Achonk",
      username: "coihsan",
      role: "owner"
    },
    folderId: activeMenu === MenuType.FOLDER ? activeFolderId : "",
    isPublic: false,
    version: [],
    syncStatus: "pending",
    collaborators: [],
    roomId: "",
    ownerId: "",
    syncedAt: new Date(),
  }

  const handleNewNote = async () => {
    try {
      const newNote = { ...initialNewNotes, id: v4() };
      await dispatch(createNewNote(newNote as unknown as NoteItem))
      dispatch(setActiveNoteId(newNote.id))
    } catch (error) {
      console.log("Error creating new note:" + error)
    }
  }

  const getFolderName = (folderId: string) => {
    const folder = folders.find((folder) => folder.id === folderId)
    return folder ? folder.name : ""
  }

  const handleEmptyTrash = () => {dispatch(EmptyTrashNote())}

  const searchNotes = debounceEvent(() => {
    (searchValue: string) => dispatch(setSearchValue(searchValue))
  }, 50)

  const allNotes = notes.filter((item) => item && !item.trash);
  const favorites = notes.filter((item) => item.favorite === true && item.trash === false);
  const trash = notes.filter((item) => item.trash === true);
  const notesInFolder = notes.filter((item) => item.folderId === activeFolderId);

  let renderedNotes: Array<NoteItem> = [];

  if (activeMenu === MenuType.NOTES) {
    renderedNotes = allNotes;
  } else if (activeMenu === MenuType.FAVORITE) {
    renderedNotes = favorites;
  } else if (activeMenu === MenuType.TRASH) {
    renderedNotes = trash;
  } else if (activeMenu === MenuType.FOLDER) {
    renderedNotes = notesInFolder;
  } else {
    renderedNotes = allNotes;
  }

  const filterNote = searchValue
    ? renderedNotes.filter((note) =>
      note.title.toLowerCase().includes(searchValue.toLowerCase()))
    : renderedNotes;
  renderedNotes = filterNote

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="border-r w-full md:max-w-56"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    cospace
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarMenu>
                {navMain.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        dispatch(setActiveMenu(item.title))
                        setOpen(true)
                      }}
                      isActive={activeMenu === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <FolderItems folder={folders} />
        </SidebarContent>
        <SidebarFooter>
          <UserButton user={{
            name: "Achonk",
            email: "achonk.mail.com",
            avatar: "/shadcn.jpg"
          }} />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeMenu === MenuType.FOLDER ? (
                <div>{getFolderName(activeFolderId)}</div>
              ) : (
                activeMenu
              )}
            </div>
            {activeMenu === MenuType.TRASH ? (
              <SidebarMenuButton
                onClick={handleEmptyTrash}
                variant={'outline'}
                tooltip={{
                  children: LabelText.EMPTY_TRASH,
                  hidden: false,
                }} className="w-max">
                <Trash />
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                variant={'outline'}
                onClick={handleNewNote}
                tooltip={{
                  children: LabelText.CREATE_NEW_NOTE,
                  hidden: false,
                }} className="w-max">
                <Plus />
              </SidebarMenuButton>
            )}
          </div>
          <SearchBar searchRef={searchRef} onSearchQueryChange={searchNotes} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <NoteItems notes={filterNote} />
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
