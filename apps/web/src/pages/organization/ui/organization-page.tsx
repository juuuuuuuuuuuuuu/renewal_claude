import { useTranslation } from 'react-i18next'

import { Card, CardContent, Skeleton } from '@hub/ui'

import { PageHeader, ErrorBoundary } from '@shared/ui'
import { useDepartmentTree } from '@entities/department'

import type { Department } from '@entities/department'

function DepartmentNode({ dept, depth = 0 }: { dept: Department; depth?: number }) {
  return (
    <div style={{ marginLeft: depth * 20 }}>
      <Card className="mb-2">
        <CardContent className="p-3 flex items-center justify-between">
          <div>
            <p className="font-medium">{dept.name}</p>
            {dept.manager && <p className="text-xs text-muted-foreground">{dept.manager.name} · {dept.manager.position}</p>}
          </div>
          <span className="text-sm text-muted-foreground">{dept.memberCount}명</span>
        </CardContent>
      </Card>
      {dept.children?.map((child) => (
        <DepartmentNode key={child.id} dept={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export function OrganizationPage() {
  const { t } = useTranslation()
  const { data: org, isLoading } = useDepartmentTree()

  const o = org as unknown as { departments?: Department[] }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <PageHeader title={t('nav.organization')} />
        {isLoading ? (
          <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : (
          <div>{(o?.departments ?? []).map((dept) => <DepartmentNode key={dept.id} dept={dept} />)}</div>
        )}
      </div>
    </ErrorBoundary>
  )
}
