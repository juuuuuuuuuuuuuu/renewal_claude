import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@shared/api'

import type { Leave, LeaveBalance } from '@entities/leave/model/types'

export const leaveKeys = {
  all: ['leaves'] as const,
  lists: () => [...leaveKeys.all, 'list'] as const,
  list: (params?: Record<string, unknown>) => [...leaveKeys.lists(), params] as const,
  detail: (id: string) => [...leaveKeys.all, 'detail', id] as const,
  balance: (userId: string) => [...leaveKeys.all, 'balance', userId] as const,
}

export function useLeaveList(params?: { page?: number; size?: number; status?: string }) {
  return useQuery({
    queryKey: leaveKeys.list(params),
    queryFn: () => apiClient.get<Leave[]>('/leaves', { params }),
  })
}

export function useLeaveBalance(userId: string) {
  return useQuery({
    queryKey: leaveKeys.balance(userId),
    queryFn: () => apiClient.get<LeaveBalance>(`/users/${userId}/leave-balance`),
    enabled: !!userId,
  })
}
