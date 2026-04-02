import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@hub/ui'

import { PageHeader, ErrorBoundary } from '@shared/ui'
import { useAttendanceRecords, useAttendanceSummary } from '@entities/attendance'

import type { AttendanceRecord } from '@entities/attendance'

export function AttendancePage() {
  const { t } = useTranslation()
  const currentMonth = format(new Date(), 'yyyy-MM')
  const { data: records, isLoading } = useAttendanceRecords({ month: currentMonth })
  const { data: summary } = useAttendanceSummary(currentMonth)

  const s = summary as unknown as { totalWorkDays?: number; presentDays?: number; totalWorkHours?: number; totalOvertimeHours?: number }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <PageHeader title={t('attendance.title')} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card><CardHeader className="pb-1"><CardTitle className="text-sm">근무일</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{s?.totalWorkDays ?? 0}일</p></CardContent></Card>
          <Card><CardHeader className="pb-1"><CardTitle className="text-sm">출근일</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{s?.presentDays ?? 0}일</p></CardContent></Card>
          <Card><CardHeader className="pb-1"><CardTitle className="text-sm">총 근무</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{s?.totalWorkHours ?? 0}h</p></CardContent></Card>
          <Card><CardHeader className="pb-1"><CardTitle className="text-sm">초과근무</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{s?.totalOvertimeHours ?? 0}h</p></CardContent></Card>
        </div>

        {isLoading ? (
          <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
        ) : (
          <div className="space-y-2">
            {((records ?? []) as AttendanceRecord[]).map((r) => (
              <Card key={r.id}>
                <CardContent className="flex items-center justify-between p-3 text-sm">
                  <span className="font-medium">{r.date}</span>
                  <span className="text-muted-foreground">출근: {r.checkIn ?? '-'}</span>
                  <span className="text-muted-foreground">퇴근: {r.checkOut ?? '-'}</span>
                  <span>{r.workHours}h</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
