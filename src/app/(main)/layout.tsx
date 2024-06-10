import React from 'react'
import InfoBar from '@/components/infobar'
import SidebarOptions from '@/components/sidebar'
type Props = {
    children: React.ReactNode
}
const MainLayout = ({children}: Props) => {
    return (
        <main className='flex overflow-hidden h-screen'>
            <SidebarOptions />
            <section className='w-full'>
                <InfoBar />
                <div className='rounded-l-3xl'>
                    {children}
                </div>
            </section>
        </main>
    )
}

export default MainLayout