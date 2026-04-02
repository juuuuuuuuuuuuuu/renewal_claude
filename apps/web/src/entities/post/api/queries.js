import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
export const postKeys = {
    all: ['posts'],
    lists: () => [...postKeys.all, 'list'],
    list: (params) => [...postKeys.lists(), params],
    details: () => [...postKeys.all, 'detail'],
    detail: (id) => [...postKeys.details(), id],
    comments: (postId) => [...postKeys.all, 'comments', postId],
};
export function usePostList(params) {
    return useQuery({
        queryKey: postKeys.list(params),
        queryFn: () => apiClient.get('/posts', { params }),
    });
}
export function usePostDetail(postId) {
    return useQuery({
        queryKey: postKeys.detail(postId),
        queryFn: () => apiClient.get(`/posts/${postId}`),
        enabled: !!postId,
    });
}
export function usePostComments(postId) {
    return useQuery({
        queryKey: postKeys.comments(postId),
        queryFn: () => apiClient.get(`/posts/${postId}/comments`),
        enabled: !!postId,
    });
}
//# sourceMappingURL=queries.js.map