import React from 'react'
import { ConnectionTypes } from '@/lib/types'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { CircleCheck } from 'lucide-react'
type Props = {
  type: ConnectionTypes
  icon: string
  title: ConnectionTypes
  description: string
  callback?: () => void
  connected: {} & any
}

const ConnectionCard = ({
  description,
  type,
  icon,
  title,
  connected,
}: Props) => {
  return (
    <Card className="flex w-full items-center justify-between">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <Image
            src={icon}
            alt={title}
            height={30}
            width={30}
            className="object-contain"
          />
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-col items-center gap-2 p-4">
        {connected[type] ? (
          <div className="flex items-center gap-2 bg-green-500/20 dark:bg-green-500/10 rounded-lg border-2 border-green-500/40 px-3 py-2 font-bold text-green-500 dark:text-green-400">
            <CircleCheck size={24} />
            <span>Connected</span>
          </div>
        ) : (
          <Link
          target='_blank'
            href={
              title == 'Discord'
                ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
                : title == 'Notion'
                ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL!
                : title == 'Slack'
                ? process.env.NEXT_PUBLIC_SLACK_REDIRECT!
                : '#'
            }
            className="rounded-lg bg-primary text-primary-foreground dark:text-primary-foreground-dark p-2 font-bold"
          >
            Connect
          </Link>
        )}
      </div>
    </Card>
  )
}

export default ConnectionCard