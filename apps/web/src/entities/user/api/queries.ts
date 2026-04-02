import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@shared/api'

import type { User, UserProfile } from '@entities/user/model/types'

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params?: Record<string, unknown>) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  profile: (id: string) => [...userKeys.all, 'profile', id] as const,
}

export function useUserList(params?: { page?: number; size?: number; keyword?: string }) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => apiClient.get<User[]>('/users', { params }),
  })
}

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: userKeys.profile(userId),
    queryFn: () => apiClient.get<UserProfile>(`/users/${userId}/profile`),
    enabled: !!userId,
  })
}
