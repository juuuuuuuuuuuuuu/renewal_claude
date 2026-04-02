import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
export const noticeKeys = {
    all: ['notices'],
    lists: () => [...noticeKeys.all, 'list'],
    list: (params) => [...noticeKeys.lists(), params],
    detail: (id) => [...noticeKeys.all, 'detail', id],
};
export function useNoticeList(params) {
    return useQuery({
        queryKey: noticeKeys.list(params),
        queryFn: () => apiClient.get('/notices', { params }),
    });
}
export function useNoticeDetail(noticeId) {
    return useQuery({
        queryKey: noticeKeys.detail(noticeId),
        queryFn: () => apiClient.get(`/notices/${noticeId}`),
        enabled: !!noticeId,
    });
}
//# sourceMappingURL=queries.js.map