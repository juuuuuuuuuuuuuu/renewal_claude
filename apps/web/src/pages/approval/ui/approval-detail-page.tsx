import { useParams, useNavigate } from 'react-router-dom'

import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Separator, Skeleton } from '@hub/ui'

import { PageHeader, ErrorBoundary } from '@shared/ui'
import { formatDateTime } from '@shared/lib'
import { useApprovalDetail } from '@entities/approval'
import { useProcessApproval } from '@features/approval-request'

import type { ApprovalRequest } from '@entities/approval'

export function ApprovalDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: approval, isLoading } = useApprovalDetail(id ?? '')
  const { mutate: process, isPending } = useProcessApproval()

  if (isLoading) return <Skeleton className="h-96 w-full" />
  if (!approval) return null

  const a = approval as unknown as ApprovalRequest

  return (
    <ErrorBoundary>
      <div className="max-w-2xl space-y-4">
        <PageHeader
          title={a.title}
          actions={<Button variant="outline" onClick={() => navigate(-1)}>목록</Button>}
        />

        <Card>
          <CardHeader><CardTitle className="text-sm">요청 정보</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">요청자</span><span>{a.requester.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">유형</span><span>{a.type}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">요청일</span><span>{formatDateTime(a.createdAt)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">상태</span><Badge>{a.status}</Badge></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">내용</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{a.content}</p>
          </CardContent>
        </Card>

        {a.status === 'pending' && (
          <div className="flex gap-2 justify-end">
            <Button
              variant="destructive"
              onClick={() => process({ approvalId: id!, action: 'reject' })}
              loading={isPending}
            >
              반려
            </Button>
            <Button
              onClick={() => process({ approvalId: id!, action: 'approve' })}
              loading={isPending}
            >
              승인
            </Button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
