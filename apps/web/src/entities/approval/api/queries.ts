import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@shared/api'

import type { ApprovalRequest } from '@entities/approval/model/types'

export const approvalKeys = {
  all: ['approvals'] as const,
  lists: () => [...approvalKeys.all, 'list'] as const,
  list: (params?: Record<string, unknown>) => [...approvalKeys.lists(), params] as const,
  detail: (id: string) => [...approvalKeys.all, 'detail', id] as const,
  pending: () => [...approvalKeys.all, 'pending'] as const,
}

export function useApprovalList(params?: { page?: number; size?: number; status?: string; type?: string }) {
  return useQuery({
    queryKey: approvalKeys.list(params),
    queryFn: () => apiClient.get<ApprovalRequest[]>('/approvals', { params }),
  })
}

export function useApprovalDetail(approvalId: string) {
  return useQuery({
    queryKey: approvalKeys.detail(approvalId),
    queryFn: () => apiClient.get<ApprovalRequest>(`/approvals/${approvalId}`),
    enabled: !!approvalId,
  })
}

export function usePendingApprovals() {
  return useQuery({
    queryKey: approvalKeys.pending(),
    queryFn: () => apiClient.get<ApprovalRequest[]>('/approvals/pending'),
  })
}
