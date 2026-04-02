import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@shared/api'

import type { Post, Comment } from '@entities/post/model/types'

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params?: Record<string, unknown>) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
  comments: (postId: string) => [...postKeys.all, 'comments', postId] as const,
}

export function usePostList(params?: { page?: number; size?: number; category?: string; keyword?: string }) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => apiClient.get<Post[]>('/posts', { params }),
  })
}

export function usePostDetail(postId: string) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => apiClient.get<Post>(`/posts/${postId}`),
    enabled: !!postId,
  })
}

export function usePostComments(postId: string) {
  return useQuery({
    queryKey: postKeys.comments(postId),
    queryFn: () => apiClient.get<Comment[]>(`/posts/${postId}/comments`),
    enabled: !!postId,
  })
}
