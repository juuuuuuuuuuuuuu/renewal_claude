import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, MessageSquare, Bell, Clock, Settings } from 'lucide-react'

import { cn } from '@hub/ui'

import { ROUTES } from '@shared/config'

const TAB_ITEMS = [
  { labelKey: 'nav.home', path: ROUTES.HOME, icon: Home },
  { labelKey: 'nav.community', path: ROUTES.COMMUNITY.LIST, icon: MessageSquare },
  { labelKey: 'nav.notice', path: ROUTES.NOTICE.LIST, icon: Bell },
  { labelKey: 'nav.attendance', path: ROUTES.ATTENDANCE, icon: Clock },
  { labelKey: 'nav.settings', path: ROUTES.SETTINGS, icon: Settings },
] as const

interface BottomNavigationProps {
  className?: string
}

export function BottomNavigation({ className }: BottomNavigationProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 border-t bg-background flex items-center justify-around h-16 px-2',
        className
      )}
    >
      {TAB_ITEMS.map(({ labelKey, path, icon: Icon }) => {
        const isActive = location.pathname === path || location.pathname.startsWith(path + '/')
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-colors min-w-0 flex-1',
              'hover:text-primary',
              isActive ? 'text-primary' : 'text-muted-foreground'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="h-5 w-5" />
            <span className="truncate">{t(labelKey)}</span>
          </button>
        )
      })}
    </nav>
  )
}
