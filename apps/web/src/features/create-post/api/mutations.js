import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
import { postKeys } from '@entities/post';
export function useCreatePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => apiClient.post('/posts', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.lists() });
        },
    });
}
export function useUpdatePost(postId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => apiClient.put(`/posts/${postId}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
            queryClient.invalidateQueries({ queryKey: postKeys.lists() });
        },
    });
}
export function useDeletePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId) => apiClient.delete(`/posts/${postId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.lists() });
        },
    });
}
//# sourceMappingURL=mutations.js.map