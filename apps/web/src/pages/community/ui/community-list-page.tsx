import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PenSquare } from 'lucide-react'

import { Badge, Button, Card, CardContent, Skeleton } from '@hub/ui'

import { PageHeader, EmptyState, ErrorBoundary } from '@shared/ui'
import { ROUTES } from '@shared/config'
import { formatRelativeTime } from '@shared/lib'
import { usePostList } from '@entities/post'

export function CommunityListPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: posts, isLoading } = usePostList({ page: 1, size: 20 })

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <PageHeader
          title={t('community.title')}
          actions={
            <Button onClick={() => navigate(ROUTES.COMMUNITY.WRITE)}>
              <PenSquare className="h-4 w-4 mr-2" />
              {t('community.write')}
            </Button>
          }
        />

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : !posts?.length ? (
          <EmptyState title={t('community.no_posts')} />
        ) : (
          <div className="space-y-3">
            {(posts as unknown as Array<{id: string; category: string; title: string; author: {name: string}; commentCount: number; likeCount: number; createdAt: string}>).map((post) => (
              <Card
                key={post.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(ROUTES.COMMUNITY.DETAIL(post.id))}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="shrink-0">{post.category}</Badge>
                    <h3 className="font-medium line-clamp-1">{post.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{post.author.name}</span>
                    <span>·</span>
                    <span>댓글 {post.commentCount}</span>
                    <span>·</span>
                    <span>좋아요 {post.likeCount}</span>
                    <span className="ml-auto">{formatRelativeTime(post.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
