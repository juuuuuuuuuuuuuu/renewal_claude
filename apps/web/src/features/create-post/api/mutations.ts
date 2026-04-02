import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@shared/api'
import { postKeys } from '@entities/post'

import type { Post } from '@entities/post'

interface CreatePostParams {
  title: string
  content: string
  category: string
  attachmentIds?: string[]
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePostParams) => apiClient.post<Post>('/posts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}

export function useUpdatePost(postId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<CreatePostParams>) => apiClient.put<Post>(`/posts/${postId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: string) => apiClient.delete(`/posts/${postId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}
