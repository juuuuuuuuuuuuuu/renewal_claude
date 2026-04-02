import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
import { leaveKeys } from '@entities/leave';
export function useCreateLeaveRequest() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => apiClient.post('/leaves', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: leaveKeys.lists() });
        },
    });
}
export function useApproveLeave() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (leaveId) => apiClient.post(`/leaves/${leaveId}/approve`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: leaveKeys.all });
        },
    });
}
export function useRejectLeave() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ leaveId, reason }) => apiClient.post(`/leaves/${leaveId}/reject`, { reason }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: leaveKeys.all });
        },
    });
}
//# sourceMappingURL=mutations.js.map