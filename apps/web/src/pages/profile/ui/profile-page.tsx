import { useTranslation } from 'react-i18next'

import { Avatar, AvatarFallback, AvatarImage, Badge, Card, CardContent, CardHeader, CardTitle, Skeleton } from '@hub/ui'

import { PageHeader, ErrorBoundary } from '@shared/ui'
import { useAuthStore } from '@shared/model'
import { useUserProfile } from '@entities/user'

export function ProfilePage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const { data: profile, isLoading } = useUserProfile(user?.id ?? '')

  const p = profile as unknown as { name?: string; position?: string; department?: string; email?: string; phone?: string; profileImage?: string; role?: string }

  return (
    <ErrorBoundary>
      <div className="max-w-2xl space-y-6">
        <PageHeader title={t('nav.profile')} />

        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={p?.profileImage} />
                  <AvatarFallback className="text-2xl">{p?.name?.slice(0, 2) ?? 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{p?.name}</h2>
                    {p?.role === 'admin' && <Badge variant="secondary">관리자</Badge>}
                  </div>
                  <p className="text-muted-foreground">{p?.position} · {p?.department}</p>
                  <div className="text-sm space-y-1">
                    <p>{p?.email}</p>
                    {p?.phone && <p>{p.phone}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ErrorBoundary>
  )
}
