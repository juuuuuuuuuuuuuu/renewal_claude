import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@shared/api'
import { leaveKeys } from '@entities/leave'

import type { Leave, LeaveType } from '@entities/leave'

interface LeaveRequestParams {
  type: LeaveType
  startDate: string
  endDate: string
  reason: string
}

export function useCreateLeaveRequest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: LeaveRequestParams) => apiClient.post<Leave>('/leaves', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveKeys.lists() })
    },
  })
}

export function useApproveLeave() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (leaveId: string) => apiClient.post(`/leaves/${leaveId}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveKeys.all })
    },
  })
}

export function useRejectLeave() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ leaveId, reason }: { leaveId: string; reason: string }) =>
      apiClient.post(`/leaves/${leaveId}/reject`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveKeys.all })
    },
  })
}
