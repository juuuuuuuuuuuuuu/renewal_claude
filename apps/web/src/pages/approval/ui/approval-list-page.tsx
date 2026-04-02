import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Badge, Button, Card, CardContent, Skeleton } from '@hub/ui'

import { PageHeader, EmptyState, ErrorBoundary } from '@shared/ui'
import { ROUTES } from '@shared/config'
import { formatRelativeTime } from '@shared/lib'
import { useApprovalList } from '@entities/approval'

import type { ApprovalRequest } from '@entities/approval'

const STATUS_MAP: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: '대기', variant: 'secondary' },
  approved: { label: '승인', variant: 'default' },
  rejected: { label: '반려', variant: 'destructive' },
  cancelled: { label: '취소', variant: 'outline' },
}

export function ApprovalListPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: approvals, isLoading } = useApprovalList()

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <PageHeader
          title={t('approval.title')}
          actions={
            <Button onClick={() => navigate(ROUTES.APPROVAL.REQUEST)}>결재 요청</Button>
          }
        />

        {isLoading ? (
          <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : !approvals?.length ? (
          <EmptyState title="결재 항목이 없습니다" />
        ) : (
          <div className="space-y-2">
            {((approvals ?? []) as ApprovalRequest[]).map((a) => (
              <Card
                key={a.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(ROUTES.APPROVAL.DETAIL(a.id))}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {a.requester.name} · {formatRelativeTime(a.createdAt)}
                    </p>
                  </div>
                  <Badge variant={STATUS_MAP[a.status]?.variant ?? 'outline'}>
                    {STATUS_MAP[a.status]?.label ?? a.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
