import { Bell, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage, Button } from '@hub/ui'

import { useAuthStore } from '@shared/model'
import { GlobalSearch } from '@features/search'

interface HeaderProps {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 shrink-0">
      {/* 모바일 메뉴 토글 */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuToggle}
        aria-label="메뉴 열기"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* 로고 */}
      <span
        className="text-lg font-bold cursor-pointer select-none"
        onClick={() => navigate('/')}
      >
        Hub
      </span>

      <div className="flex-1" />

      {/* 검색 */}
      <div className="hidden sm:block">
        <GlobalSearch />
      </div>

      {/* 알림 */}
      <Button variant="ghost" size="icon" aria-label="알림">
        <Bell className="h-5 w-5" />
      </Button>

      {/* 사용자 메뉴 */}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => navigate('/profile')}
        aria-label="프로필"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.profileImage} alt={user?.name} />
          <AvatarFallback className="text-xs">{user?.name?.slice(0, 2) ?? 'U'}</AvatarFallback>
        </Avatar>
      </Button>
    </header>
  )
}
