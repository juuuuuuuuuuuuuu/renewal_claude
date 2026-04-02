import { useParams, useNavigate } from 'react-router-dom'

import { Button, Skeleton } from '@hub/ui'

import { PageHeader, ErrorBoundary } from '@shared/ui'
import { formatDateTime } from '@shared/lib'
import { usePostDetail } from '@entities/post'

export function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: post, isLoading } = usePostDetail(id ?? '')

  if (isLoading) return <Skeleton className="h-96 w-full" />
  if (!post) return null

  const p = post as unknown as { title: string; author: { name: string; department: string }; createdAt: string; content: string }

  return (
    <ErrorBoundary>
      <div className="space-y-4 max-w-3xl">
        <PageHeader
          title={p.title}
          actions={
            <Button variant="outline" onClick={() => navigate(-1)}>목록</Button>
          }
        />
        <div className="text-sm text-muted-foreground">
          {p.author.name} · {p.author.department} · {formatDateTime(p.createdAt)}
        </div>
        <div className="prose prose-sm max-w-none border rounded-lg p-4 min-h-[200px]">
          {p.content}
        </div>
      </div>
    </ErrorBoundary>
  )
}
