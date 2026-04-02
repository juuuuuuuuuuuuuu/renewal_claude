import { useParams, useNavigate } from 'react-router-dom'

import { Button, Skeleton } from '@hub/ui'

import { PageHeader, ErrorBoundary } from '@shared/ui'
import { formatDateTime } from '@shared/lib'
import { useNoticeDetail } from '@entities/notice'

export function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: notice, isLoading } = useNoticeDetail(id ?? '')

  if (isLoading) return <Skeleton className="h-96 w-full" />
  if (!notice) return null

  const n = notice as unknown as { title: string; author: { name: string }; createdAt: string; content: string; category: string }

  return (
    <ErrorBoundary>
      <div className="max-w-3xl space-y-4">
        <PageHeader
          title={n.title}
          actions={<Button variant="outline" onClick={() => navigate(-1)}>목록</Button>}
        />
        <div className="text-sm text-muted-foreground">
          {n.author.name} · {n.category} · {formatDateTime(n.createdAt)}
        </div>
        <div className="border rounded-lg p-4 min-h-[200px] text-sm leading-relaxed">
          {n.content}
        </div>
      </div>
    </ErrorBoundary>
  )
}
