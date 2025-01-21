import * as React from "react"
import { Command, Plus, Trash } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
  SidebarMenuAction
} from "@/components/ui/sidebar"
import { navMain } from "@/lib/const"
import { LabelText } from "@/lib/label-text"
import FolderSidebar from "./folder-sidebar"
import UserButton from "./user-button"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getApp, getNotes } from "@/lib/redux/selector"
import { setActiveMenu } from "@/lib/redux/slice/app.slice"
import { selectAllFolder } from "@/lib/redux/slice/folder.slice"
import NoteItems from "../notes/note-item"
import { createNewNote, selectAllNotes, setActiveNoteId } from "@/lib/redux/slice/notes.slice"
import { NoteItem } from "@/lib/types"
import { v4 } from "uuid"
import { currentItem } from "@/lib/helpers"
import { MenuType } from "@/lib/enums"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch()

  const { activeMenu } = useAppSelector(getApp)
  const { activeFolderId } = useAppSelector(getNotes)
  const folders = useAppSelector(selectAllFolder)
  const notes = useAppSelector(selectAllNotes)
  const { setOpen } = useSidebar()

  const initialNewNotes: NoteItem = {
    id: v4(),
    title: "",
    content: "",
    lastUpdated: currentItem,
    trash: false,
    favorite: false,
    user: {
      id: v4(),
      fullName: "",
      username: "",
      role: "owner"
    },
    folderId: activeFolderId || "",
    isPublic: false,
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
          <FolderSidebar folder={folders} />
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
              {activeMenu}
            </div>
            {activeMenu === MenuType.TRASH ? (
              <SidebarMenuButton
                tooltip={{
                  children: LabelText.EMPTY_TRASH,
                  hidden: false,
                }} className="w-max">
                <Trash />
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                onClick={handleNewNote}
                tooltip={{
                  children: LabelText.CREATE_NEW_NOTE,
                  hidden: false,
                }} className="w-max">
                <Plus />
              </SidebarMenuButton>
            )}
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <NoteItems notes={notes} />
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
