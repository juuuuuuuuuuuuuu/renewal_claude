import { useUIStore } from '@shared/model'
import { Sidebar } from '@widgets/sidebar'
import { Header } from '@widgets/header'
import { BottomNavigation } from '@widgets/bottom-nav'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* PC 사이드바 */}
      <Sidebar open={sidebarOpen} className="hidden md:flex" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 pb-20 md:pb-4">
          {children}
        </main>

        {/* 모바일 하단 탭 */}
        <BottomNavigation className="flex md:hidden" />
      </div>
    </div>
  )
}
