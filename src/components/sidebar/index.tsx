'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { menuOptions } from '@/lib/constant'
import clsx from 'clsx'
import { Separator } from '../ui/separator'
import { ModeToggle } from '../global/mode-toggle'
import { Database, GitBranch, LucideMousePointerClick } from 'lucide-react'
type Props = {}
const SidebarOptions = () => {
    const pathName = usePathname()
  return (
    <nav className="h-screen overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2 z-50 relative">
      <div className="flex items-center justify-center flex-col gap-8">
        <Link
          className="flex font-bold flex-row "
          href="/"
        >
          cospace
        </Link>
        <TooltipProvider>
          {menuOptions.map((menuItem) => (
            <ul key={menuItem.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <li>
                    <Link
                      href={menuItem.href}
                      className={clsx(
                        'group h-6 w-6 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer hover:border hover:border-muted-foreground/20',
                        {
                          'dark:bg-muted-foreground/20 bg-foreground text-white ':
                            pathName === menuItem.href,
                        }
                      )}
                    >
                      <menuItem.Component
                        selected={pathName === menuItem.href}
                      />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="dark:bg-muted-foreground/10 dark:text-white bg-foreground/20 text-black backdrop-blur-md"
                >
                  <p>{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
        <Separator />
        <div className="flex items-center flex-col gap-9 py-4 px-2 rounded-full h-56 overflow-scroll border-[1px] border-muted-foreground">
          <div className="relative  p-2 rounded-full dark:border-t-[2px] border-[1px] border-t-foreground dark:border-t-foreground">
            <LucideMousePointerClick
              className="dark:text-white"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
          </div>
          <div className="relative p-2 rounded-full dark:border-t-[2px] border-[1px] border-t-foreground dark:border-t-foreground">
            <GitBranch
              className="text-muted-foreground"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
          </div>
          <div className="relative p-2 rounded-full dark:border-t-[2px] border-[1px] border-t-foreground dark:border-t-foreground">
            <Database
              className="text-muted-foreground"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
          </div>
          <div className="relative p-2 rounded-full dark:border-t-[2px] border-[1px] border-t-foreground dark:border-t-foreground">
            <GitBranch
              className="text-muted-foreground"
              size={18}
            />
          </div>
        </div>
      </div>
      <div className="">
        <ModeToggle />
      </div>
    </nav>
  )
}

export default SidebarOptions