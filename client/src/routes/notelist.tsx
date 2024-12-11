import { NoteItem } from "@/lib/types"
import { SidebarContent, SidebarGroup, SidebarGroupContent } from "../components/ui/sidebar"
import React from "react"
import { Star } from "lucide-react"

interface NoteListProps {
    data: NoteItem[]
}

const NoteList : React.FC<NoteListProps> = ({ data }) => {

    return(
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {data.map((item) => (
                <a
                  href="#"
                  key={item.id}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{item.title}</span>{" "}
                    <span className="ml-auto text-xs">{item?.lastModified.toDateString()}</span>
                  </div>
                  <div>
                    {item.favorite && <Star />}
                  </div>
                  <span className="font-medium">{item?.content?.toString()}</span>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                    {item.user.map((person) => (
                        <span>{person.fullName}</span>
                    ))}
                  </span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
    )
}
export default NoteList