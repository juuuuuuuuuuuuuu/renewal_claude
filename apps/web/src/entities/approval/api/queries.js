import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
export const approvalKeys = {
    all: ['approvals'],
    lists: () => [...approvalKeys.all, 'list'],
    list: (params) => [...approvalKeys.lists(), params],
    detail: (id) => [...approvalKeys.all, 'detail', id],
    pending: () => [...approvalKeys.all, 'pending'],
};
export function useApprovalList(params) {
    return useQuery({
        queryKey: approvalKeys.list(params),
        queryFn: () => apiClient.get('/approvals', { params }),
    });
}
export function useApprovalDetail(approvalId) {
    return useQuery({
        queryKey: approvalKeys.detail(approvalId),
        queryFn: () => apiClient.get(`/approvals/${approvalId}`),
        enabled: !!approvalId,
    });
}
export function usePendingApprovals() {
    return useQuery({
        queryKey: approvalKeys.pending(),
        queryFn: () => apiClient.get('/approvals/pending'),
    });
}
//# sourceMappingURL=queries.js.map