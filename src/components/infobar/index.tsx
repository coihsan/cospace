'use client'
import React from 'react'
import { ModeToggle } from '../global/mode-toggle'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { Separator } from '../ui/separator'
const InfoBar = () =>{
    return (
        <div className='flex flex-row justify-end gap-6 items-center px-4 py-4'>
            <div>
                <SignedOut>
                <SignInButton />
                </SignedOut>
                <SignedIn>
                <UserButton />
                </SignedIn>
            </div>
            <div>
                <Separator orientation="vertical" />
                <ModeToggle />
            </div>
        </div>
    )
}

export default InfoBar