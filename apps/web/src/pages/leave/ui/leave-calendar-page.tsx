import { PageHeader, EmptyState } from '@shared/ui'

export function LeaveCalendarPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="휴가 캘린더" />
      <EmptyState title="캘린더 뷰" description="팀원들의 휴가 일정을 확인하세요" />
    </div>
  )
}
