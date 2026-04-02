import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Pin } from 'lucide-react'

import { Badge, Card, CardContent, Skeleton } from '@hub/ui'

import { PageHeader, EmptyState, ErrorBoundary } from '@shared/ui'
import { ROUTES } from '@shared/config'
import { formatRelativeTime } from '@shared/lib'
import { useNoticeList } from '@entities/notice'

import type { Notice } from '@entities/notice'

export function NoticeListPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: notices, isLoading } = useNoticeList()

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <PageHeader title={t('notice.title')} />

        {isLoading ? (
          <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : !notices?.length ? (
          <EmptyState title="공지사항이 없습니다" />
        ) : (
          <div className="space-y-2">
            {((notices ?? []) as Notice[]).map((notice) => (
              <Card
                key={notice.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(ROUTES.NOTICE.DETAIL(notice.id))}
              >
                <CardContent className="flex items-center gap-3 p-4">
                  {notice.isPinned && <Pin className="h-4 w-4 text-primary shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="shrink-0">{notice.category}</Badge>
                      <p className={`font-medium truncate ${!notice.isRead ? 'font-semibold' : ''}`}>{notice.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notice.author.name} · {formatRelativeTime(notice.createdAt)}</p>
                  </div>
                  {!notice.isRead && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
