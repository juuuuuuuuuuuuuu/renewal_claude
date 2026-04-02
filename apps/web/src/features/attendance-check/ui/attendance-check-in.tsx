import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

import { Button, Card, CardContent } from '@hub/ui'

import { useTodayAttendance } from '@entities/attendance'

import { useCheckIn, useCheckOut } from '@features/attendance-check/api/mutations'

export function AttendanceCheckIn() {
  const { data: today } = useTodayAttendance()
  const { mutate: checkIn, isPending: isCheckingIn } = useCheckIn()
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckOut()

  const now = format(new Date(), 'HH:mm', { locale: ko })

  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-2">현재 시각: {now}</p>
        <div className="flex gap-2">
          {!today?.checkIn ? (
            <Button onClick={() => checkIn()} loading={isCheckingIn} className="flex-1">
              출근
            </Button>
          ) : (
            <div className="flex-1 text-sm">
              출근: <span className="font-medium">{today.checkIn}</span>
            </div>
          )}
          {today?.checkIn && !today?.checkOut && (
            <Button variant="outline" onClick={() => checkOut()} loading={isCheckingOut} className="flex-1">
              퇴근
            </Button>
          )}
          {today?.checkOut && (
            <div className="flex-1 text-sm">
              퇴근: <span className="font-medium">{today.checkOut}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
