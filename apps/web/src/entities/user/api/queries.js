import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
export const userKeys = {
    all: ['users'],
    lists: () => [...userKeys.all, 'list'],
    list: (params) => [...userKeys.lists(), params],
    details: () => [...userKeys.all, 'detail'],
    detail: (id) => [...userKeys.details(), id],
    profile: (id) => [...userKeys.all, 'profile', id],
};
export function useUserList(params) {
    return useQuery({
        queryKey: userKeys.list(params),
        queryFn: () => apiClient.get('/users', { params }),
    });
}
export function useUserProfile(userId) {
    return useQuery({
        queryKey: userKeys.profile(userId),
        queryFn: () => apiClient.get(`/users/${userId}/profile`),
        enabled: !!userId,
    });
}
//# sourceMappingURL=queries.js.map