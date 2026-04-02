import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@shared/api'

import type { AttendanceRecord, AttendanceSummary } from '@entities/attendance/model/types'

export const attendanceKeys = {
  all: ['attendance'] as const,
  records: (params?: Record<string, unknown>) => [...attendanceKeys.all, 'records', params] as const,
  today: () => [...attendanceKeys.all, 'today'] as const,
  summary: (month: string) => [...attendanceKeys.all, 'summary', month] as const,
}

export function useAttendanceRecords(params?: { month?: string; page?: number; size?: number }) {
  return useQuery({
    queryKey: attendanceKeys.records(params),
    queryFn: () => apiClient.get<AttendanceRecord[]>('/attendance', { params }),
  })
}

export function useTodayAttendance() {
  return useQuery({
    queryKey: attendanceKeys.today(),
    queryFn: () => apiClient.get<AttendanceRecord>('/attendance/today'),
  })
}

export function useAttendanceSummary(month: string) {
  return useQuery({
    queryKey: attendanceKeys.summary(month),
    queryFn: () => apiClient.get<AttendanceSummary>(`/attendance/summary?month=${month}`),
    enabled: !!month,
  })
}
