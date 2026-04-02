import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Home, MessageSquare, CalendarDays, Bell, User, Building2,
  Clock, FileCheck, Settings, ChevronLeft,
} from 'lucide-react'

import { Button, cn } from '@hub/ui'

import { ROUTES } from '@shared/config'

const MENU_ITEMS = [
  { labelKey: 'nav.home', path: ROUTES.HOME, icon: Home },
  { labelKey: 'nav.community', path: ROUTES.COMMUNITY.LIST, icon: MessageSquare },
  { labelKey: 'nav.leave', path: ROUTES.LEAVE.LIST, icon: CalendarDays },
  { labelKey: 'nav.notice', path: ROUTES.NOTICE.LIST, icon: Bell },
  { labelKey: 'nav.profile', path: ROUTES.PROFILE, icon: User },
  { labelKey: 'nav.organization', path: ROUTES.ORGANIZATION, icon: Building2 },
  { labelKey: 'nav.attendance', path: ROUTES.ATTENDANCE, icon: Clock },
  { labelKey: 'nav.approval', path: ROUTES.APPROVAL.LIST, icon: FileCheck },
  { labelKey: 'nav.settings', path: ROUTES.SETTINGS, icon: Settings },
] as const

interface SidebarProps {
  open: boolean
  className?: string
  onClose?: () => void
}

export function Sidebar({ open, className, onClose }: SidebarProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside
      className={cn(
        'flex-col border-r bg-background transition-all duration-200',
        open ? 'w-60' : 'w-16',
        className
      )}
    >
      {/* 헤더 */}
      <div className="flex h-16 items-center justify-between px-3 border-b shrink-0">
        {open && <span className="text-lg font-bold">Hub</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className={cn('ml-auto', !open && 'rotate-180')}
          aria-label={open ? '사이드바 접기' : '사이드바 펼치기'}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-1 px-2">
          {MENU_ITEMS.map(({ labelKey, path, icon: Icon }) => {
            const isActive = location.pathname === path || location.pathname.startsWith(path + '/')
            return (
              <li key={path}>
                <button
                  onClick={() => navigate(path)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-accent text-accent-foreground',
                    !open && 'justify-center px-2'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  title={!open ? t(labelKey) : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {open && <span className="truncate">{t(labelKey)}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
