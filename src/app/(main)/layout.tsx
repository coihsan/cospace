import React from 'react'
import Sidebar from '@/components/sidebar'
import InfoBar from '@/components/infobar'
type Props = { children: React.ReactNode }
import { checkUser } from '@/lib/checkUser'

const Layout = async (props: Props) => {
  const user = await checkUser()
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="w-full">
        <InfoBar />
        {props.children}
      </div>
    </div>
  )
}

export default Layout