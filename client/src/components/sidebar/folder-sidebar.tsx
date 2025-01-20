import React, { useRef, useState } from 'react'
import { ChevronDown, Plus } from "lucide-react"
import { SidebarGroup, SidebarGroupAction, SidebarGroupLabel, useSidebar } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getApp, getFolder, getNotes } from "@/lib/redux/selector"
import { FolderItem } from "@/lib/types"
import FolderItems from '../folders/folder-item'
import { setFolderVisibility } from '@/lib/redux/slice/folder.slice'

interface FolderSidebarProps {
  folder: FolderItem[]
}

const FolderSidebar: React.FC<FolderSidebarProps> = ({ folder }) => {
  const [isOpen, setIsOpen] = React.useState(true)

  const handleNewFolder = (value: boolean) => { 
    setFolderVisibility(value); 
    setIsOpen(true)
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <ChevronDown className="mr-2 transition-transform group-data-[state=open]/collapsible:rotate-180" />
            Folder
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <SidebarGroupAction onClick={() => handleNewFolder(true)} title="Add Folder">
          <Plus /> <span className="sr-only">Add Folder</span>
        </SidebarGroupAction>
        <CollapsibleContent>
          <FolderItems folder={folder} />
        </CollapsibleContent>
      </SidebarGroup></Collapsible>
  )
}
export default FolderSidebar
