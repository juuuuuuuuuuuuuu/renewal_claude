import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@shared/api'
import { approvalKeys } from '@entities/approval'

import type { ApprovalRequest, ApprovalType } from '@entities/approval'

interface CreateApprovalParams {
  title: string
  content: string
  type: ApprovalType
  approverIds: string[]
}

export function useCreateApproval() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateApprovalParams) => apiClient.post<ApprovalRequest>('/approvals', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: approvalKeys.lists() })
    },
  })
}

export function useProcessApproval() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      approvalId,
      action,
      comment,
    }: {
      approvalId: string
      action: 'approve' | 'reject'
      comment?: string
    }) => apiClient.post(`/approvals/${approvalId}/${action}`, { comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: approvalKeys.all })
    },
  })
}
