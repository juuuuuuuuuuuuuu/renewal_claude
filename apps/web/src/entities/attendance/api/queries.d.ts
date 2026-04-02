import type { AttendanceRecord, AttendanceSummary } from '@entities/attendance/model/types';
export declare const attendanceKeys: {
    all: readonly ["attendance"];
    records: (params?: Record<string, unknown>) => readonly ["attendance", "records", Record<string, unknown> | undefined];
    today: () => readonly ["attendance", "today"];
    summary: (month: string) => readonly ["attendance", "summary", string];
};
export declare function useAttendanceRecords(params?: {
    month?: string;
    page?: number;
    size?: number;
}): import("@tanstack/react-query").UseQueryResult<AttendanceRecord[], Error>;
export declare function useTodayAttendance(): import("@tanstack/react-query").UseQueryResult<AttendanceRecord, Error>;
export declare function useAttendanceSummary(month: string): import("@tanstack/react-query").UseQueryResult<AttendanceSummary, Error>;
//# sourceMappingURL=queries.d.ts.map