import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
export const attendanceKeys = {
    all: ['attendance'],
    records: (params) => [...attendanceKeys.all, 'records', params],
    today: () => [...attendanceKeys.all, 'today'],
    summary: (month) => [...attendanceKeys.all, 'summary', month],
};
export function useAttendanceRecords(params) {
    return useQuery({
        queryKey: attendanceKeys.records(params),
        queryFn: () => apiClient.get('/attendance', { params }),
    });
}
export function useTodayAttendance() {
    return useQuery({
        queryKey: attendanceKeys.today(),
        queryFn: () => apiClient.get('/attendance/today'),
    });
}
export function useAttendanceSummary(month) {
    return useQuery({
        queryKey: attendanceKeys.summary(month),
        queryFn: () => apiClient.get(`/attendance/summary?month=${month}`),
        enabled: !!month,
    });
}
//# sourceMappingURL=queries.js.map