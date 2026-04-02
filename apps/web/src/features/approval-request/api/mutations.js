import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
import { approvalKeys } from '@entities/approval';
export function useCreateApproval() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => apiClient.post('/approvals', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: approvalKeys.lists() });
        },
    });
}
export function useProcessApproval() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ approvalId, action, comment, }) => apiClient.post(`/approvals/${approvalId}/${action}`, { comment }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: approvalKeys.all });
        },
    });
}
//# sourceMappingURL=mutations.js.map