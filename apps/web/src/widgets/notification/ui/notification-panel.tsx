import { Bell } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Button, Popover, PopoverContent, PopoverTrigger,
  Separator, Badge,
} from '@hub/ui'

interface Notification {
  id: string
  title: string
  body: string
  isRead: boolean
  createdAt: string
  link?: string
}

interface NotificationPanelProps {
  notifications?: Notification[]
  unreadCount?: number
}

export function NotificationPanel({ notifications = [], unreadCount = 0 }: NotificationPanelProps) {
  const { t } = useTranslation()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="알림">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">알림</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              모두 읽음
            </Button>
          )}
        </div>
        <Separator />
        {notifications.length === 0 ? (
          <p className="p-4 text-center text-sm text-muted-foreground">새 알림이 없습니다</p>
        ) : (
          <ul className="max-h-80 overflow-y-auto">
            {notifications.map((n) => (
              <li key={n.id}>
                <button
                  className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors ${
                    !n.isRead ? 'bg-muted/50' : ''
                  }`}
                >
                  <p className={`text-sm font-medium ${!n.isRead ? '' : 'text-muted-foreground'}`}>
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.body}</p>
                </button>
                <Separator />
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  )
}
