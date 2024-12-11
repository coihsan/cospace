import {
    useInboxNotifications,
    useMarkAllInboxNotificationsAsRead,
    useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button"
import { Loading } from "./loading";
import { InboxIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const NotificationsPopover: React.FC = () => {

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant={'outline'} size={'icon'}><InboxIcon /></Button>
                <Suspense fallback={null}>
                    <UnreadNotificationsCount />
                </Suspense>
            </PopoverTrigger>
            <PopoverContent>
                <Suspense fallback={<Loading />}>
                    <Inbox />
                </Suspense>
            </PopoverContent>
        </Popover>
    )
}
export default NotificationsPopover

const UnreadNotificationsCount = () => {
    const { count } = useUnreadInboxNotificationsCount();

    if (count <= 0) return null;

    return (
        <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-[10px] inline-flex items-center p-1 bg-blue-500 text-white justify-center rounded-full w-4 h-4">
            {count}
        </span>
    );
}

const Inbox = () => {
    const { inboxNotifications } = useInboxNotifications();
    const markAllNotificationsAsRead = useMarkAllInboxNotificationsAsRead();

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-base">Notification</h2>
                <Button
                    disabled={inboxNotifications.length === 0}
                    onClick={markAllNotificationsAsRead}
                    variant={'ghost'}
                >
                    Mark all as read
                </Button>
            </div>

            <div className="max-h-[500px] overflow-auto">
                {inboxNotifications.length === 0 ? (
                    <div className="flex items-center justify-center p-6 text-muted-foreground">
                        No notifications yet
                    </div>
                ) : (
                    <InboxNotificationList>
                        {inboxNotifications.map((inboxNotification) => {
                            return (
                                <InboxNotification
                                    key={inboxNotification.id}
                                    inboxNotification={inboxNotification}
                                />
                            );
                        })}
                    </InboxNotificationList>
                )}
            </div>
        </>
    );
}