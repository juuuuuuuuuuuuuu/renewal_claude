import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Skeleton } from '@hub/ui'

import { PageHeader, ErrorBoundary } from '@shared/ui'
import { ROUTES } from '@shared/config'
import { useAuthStore } from '@shared/model'
import { useLeaveList, useLeaveBalance } from '@entities/leave'

import type { Leave } from '@entities/leave'

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  approved: 'default',
  rejected: 'destructive',
  cancelled: 'outline',
}

const STATUS_LABEL: Record<string, string> = {
  pending: '대기',
  approved: '승인',
  rejected: '반려',
  cancelled: '취소',
}

export function LeaveManagementPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { data: leaves, isLoading } = useLeaveList()
  const { data: balance, isLoading: isLoadingBalance } = useLeaveBalance(user?.id ?? '')

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <PageHeader
          title={t('leave.title')}
          actions={
            <Button onClick={() => navigate(ROUTES.LEAVE.REQUEST)}>
              {t('leave.request')}
            </Button>
          }
        />

        {/* 잔여 휴가 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {isLoadingBalance ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)
          ) : (
            <>
              <Card><CardHeader className="pb-1"><CardTitle className="text-sm">연차</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{balance?.annual ?? 0}일</p></CardContent></Card>
              <Card><CardHeader className="pb-1"><CardTitle className="text-sm">사용</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{balance?.used ?? 0}일</p></CardContent></Card>
              <Card><CardHeader className="pb-1"><CardTitle className="text-sm">잔여</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-primary">{balance?.remaining ?? 0}일</p></CardContent></Card>
              <Card><CardHeader className="pb-1"><CardTitle className="text-sm">병가</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{balance?.sick ?? 0}일</p></CardContent></Card>
            </>
          )}
        </div>

        {/* 휴가 목록 */}
        {isLoading ? (
          <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : (
          <div className="space-y-2">
            {((leaves ?? []) as Leave[]).map((leave) => (
              <Card key={leave.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{leave.type === 'annual' ? '연차' : leave.type === 'sick' ? '병가' : '특별휴가'}</p>
                    <p className="text-sm text-muted-foreground">{leave.startDate} ~ {leave.endDate} ({leave.days}일)</p>
                  </div>
                  <Badge variant={STATUS_VARIANT[leave.status]}>{STATUS_LABEL[leave.status]}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
