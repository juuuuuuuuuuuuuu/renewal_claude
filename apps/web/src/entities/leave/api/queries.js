import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
export const leaveKeys = {
    all: ['leaves'],
    lists: () => [...leaveKeys.all, 'list'],
    list: (params) => [...leaveKeys.lists(), params],
    detail: (id) => [...leaveKeys.all, 'detail', id],
    balance: (userId) => [...leaveKeys.all, 'balance', userId],
};
export function useLeaveList(params) {
    return useQuery({
        queryKey: leaveKeys.list(params),
        queryFn: () => apiClient.get('/leaves', { params }),
    });
}
export function useLeaveBalance(userId) {
    return useQuery({
        queryKey: leaveKeys.balance(userId),
        queryFn: () => apiClient.get(`/users/${userId}/leave-balance`),
        enabled: !!userId,
    });
}
//# sourceMappingURL=queries.js.map