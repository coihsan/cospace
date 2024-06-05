'use client'
import React, { useEffect } from 'react'
import { ModeToggle } from '../global/mode-toggle'
import { Book, Headphones, Search } from 'lucide-react'
import Templates from '../icons/cloud_download'
import { Input } from '@/components/ui/input'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { UserButton } from '@clerk/nextjs'
const InfoBar = () =>{
    return (
        <div className='flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black'>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                <TooltipTrigger>
                    <Headphones />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Contact Support</p>
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                <TooltipTrigger>
                    <Book />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Guide</p>
                </TooltipContent>
                </Tooltip>
                </TooltipProvider>
            <UserButton />
        </div>
    )
}

export default InfoBar