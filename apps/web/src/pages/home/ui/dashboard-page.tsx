import { AddWidgetDialog } from '@widgets/dashboard'
import { DashboardGrid } from '@widgets/dashboard'

export function DashboardPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">대시보드</h1>
        <AddWidgetDialog />
      </div>
      <DashboardGrid />
    </div>
  )
}
