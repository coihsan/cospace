import React from 'react'
import InfoBar from '@/components/infobar'
import SidebarOptions from '@/components/sidebar'
type Props = {
    children: React.ReactNode
}
const Layout = ({children}: Props) => {
    return (
        <div className='flex overflow-hidden h-screen'>
            <SidebarOptions />
            <div className='w-full'>
                <InfoBar />
                <main className='rounded-l-3xl'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout