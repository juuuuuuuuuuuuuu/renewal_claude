import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@hub/ui'

import { useAuthStore } from '@shared/model'
import { PageHeader } from '@shared/ui'
import { AttendanceCheckIn } from '@features/attendance-check'
import { usePendingApprovals } from '@entities/approval'
import { useLeaveBalance } from '@entities/leave'

export function DashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const { data: pendingApprovals, isLoading: isLoadingApprovals } = usePendingApprovals()
  const { data: leaveBalance, isLoading: isLoadingLeave } = useLeaveBalance(user?.id ?? '')

  return (
    <div className="space-y-6">
      <PageHeader
        title={`안녕하세요, ${user?.name ?? ''}님`}
        description="오늘도 좋은 하루 되세요"
      />

      {/* 출퇴근 */}
      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-2">오늘의 근태</h2>
        <AttendanceCheckIn />
      </section>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">대기 중인 결재</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingApprovals ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{pendingApprovals?.length ?? 0}건</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">잔여 연차</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingLeave ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{leaveBalance?.remaining ?? 0}일</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">부서</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold truncate">{user?.department ?? '-'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
