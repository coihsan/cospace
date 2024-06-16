"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
export function ModeToggle() {
  const { setTheme } = useTheme()

  return(
    <Tabs className="">
      <TabsList className="grid w-full grid-cols-3 rounded-full">
        <TabsTrigger className="rounded-full" onClick={() => setTheme('light')} value="light"><Sun className="size-4" /></TabsTrigger>
        <TabsTrigger className="rounded-full" onClick={() => setTheme('dark')} value="dark"><Moon className="size-4 " /></TabsTrigger>
        <TabsTrigger className="rounded-full" onClick={() => setTheme('system')} value="system"><Monitor className="size-4" /></TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
