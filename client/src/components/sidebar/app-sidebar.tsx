import * as React from "react"
import { Command, Plus } from "lucide-react"
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
  useSidebar
} from "@/components/ui/sidebar"
import { navMain } from "@/lib/const"
import { LabelText } from "@/lib/label-text"
import FolderSidebar from "./folder-sidebar"
import UserButton from "./user-button"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { getApp } from "@/lib/redux/selector"
import { setActiveMenu } from "@/lib/redux/slice/app.slice"
import { Badge } from "../ui/badge"
import NoteOptios from "../notes/note-options"

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
    {
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Re: Project Update",
      date: "Yesterday",
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Weekend Plans",
      date: "2 days ago",
      teaser:
        "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      subject: "Re: Question about Budget",
      date: "2 days ago",
      teaser:
        "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
    },
    {
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      subject: "Important Announcement",
      date: "1 week ago",
      teaser:
        "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
    },
    {
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      subject: "Re: Feedback on Proposal",
      date: "1 week ago",
      teaser:
        "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
    },
    {
      name: "David Lee",
      email: "davidlee@example.com",
      subject: "New Project Idea",
      date: "1 week ago",
      teaser:
        "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@example.com",
      subject: "Vacation Plans",
      date: "1 week ago",
      teaser:
        "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
    },
    {
      name: "James Martin",
      email: "jamesmartin@example.com",
      subject: "Re: Conference Registration",
      date: "1 week ago",
      teaser:
        "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
    },
    {
      name: "Sophia White",
      email: "sophiawhite@example.com",
      subject: "Team Dinner",
      date: "1 week ago",
      teaser:
        "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
    },
  ],
}

const projects = [
  {
    id: "dasdaeewqwe",
    name: "Design Engineering",
    url: "#",
  },
  {
    id: "dasdaeewqwe",
    name: "Sales & Marketing",
    url: "#",
  },
  {
    id: "dasdaeewqwe",
    name: "Travel",
    url: "#",
  },
  {
    id: "dasdaeewqwe",
    name: "UI Design",
    url: "#",
  },
  {
    id: "dasdaeewqwe",
    name: "SEO",
    url: "#",
  },
  {
    id: "dasdaeewqwe",
    name: "Digital Marketing",
    url: "#",
  },
  {
    id: "dasdaeewqwe",
    name: "Design Web",
    url: "#",
  },
  {
    id: "dasdaeewqwe",
    name: "TodoApp",
    url: "#",
  },
  {
    id: "dasdaeewqwe",
    name: "Nelly",
    url: "#",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch()

  const { activeMenu } = useAppSelector(getApp)

  const [mails, setMails] = React.useState(data.mails)
  const { setOpen } = useSidebar()

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
                        const mail = data.mails.sort(() => Math.random() - 0.5)
                        setMails(
                          mail.slice(
                            0,
                            Math.max(5, Math.floor(Math.random() * 10) + 1)
                          )
                        )
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
          <FolderSidebar folder={projects} />
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
            <SidebarMenuButton tooltip={{
              children: LabelText.CREATE_NEW_NOTE,
              hidden: false,
            }} className="w-max">
              <Plus />
            </SidebarMenuButton>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
              {mails.map((mail, index) => (
                <SidebarMenuItem key={index}>
                  <a
                    href="#"
                    className="flex flex-col border-b-[1px] items-start whitespace-nowrap p-4 text-sm leading-tight hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex w-full items-center gap-2">
                        <Badge variant={'outline'}>{mail.name}</Badge>
                        <span className="ml-auto text-xs text-muted-foreground">{mail.date}</span>
                      </div>
                      <span className="font-medium">{mail.subject}</span>
                      <span className="line-clamp-2 w-[270px] whitespace-break-spaces text-muted-foreground text-xs">
                        {mail.teaser}
                      </span>
                    </div>
                    <NoteOptios />
                  </a>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
