import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@shared/api'

import type { Notice } from '@entities/notice/model/types'

export const noticeKeys = {
  all: ['notices'] as const,
  lists: () => [...noticeKeys.all, 'list'] as const,
  list: (params?: Record<string, unknown>) => [...noticeKeys.lists(), params] as const,
  detail: (id: string) => [...noticeKeys.all, 'detail', id] as const,
}

export function useNoticeList(params?: { page?: number; size?: number; category?: string }) {
  return useQuery({
    queryKey: noticeKeys.list(params),
    queryFn: () => apiClient.get<Notice[]>('/notices', { params }),
  })
}

export function useNoticeDetail(noticeId: string) {
  return useQuery({
    queryKey: noticeKeys.detail(noticeId),
    queryFn: () => apiClient.get<Notice>(`/notices/${noticeId}`),
    enabled: !!noticeId,
  })
}
