export type AttendanceStatus = 'normal' | 'late' | 'early_leave' | 'absent' | 'remote';
export interface AttendanceRecord {
    id: string;
    date: string;
    checkIn: string | null;
    checkOut: string | null;
    workHours: number;
    overtimeHours: number;
    status: AttendanceStatus;
    note?: string;
}
export interface AttendanceSummary {
    month: string;
    totalWorkDays: number;
    presentDays: number;
    absentDays: number;
    lateDays: number;
    totalWorkHours: number;
    totalOvertimeHours: number;
}
//# sourceMappingURL=types.d.ts.map