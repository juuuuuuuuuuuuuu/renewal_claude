import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@shared/api'
import { attendanceKeys } from '@entities/attendance'

import type { AttendanceRecord } from '@entities/attendance'

export function useCheckIn() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => apiClient.post<AttendanceRecord>('/attendance/check-in'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.today() })
    },
  })
}

export function useCheckOut() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => apiClient.post<AttendanceRecord>('/attendance/check-out'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.today() })
    },
  })
}
