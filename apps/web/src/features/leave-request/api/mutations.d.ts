import type { Leave, LeaveType } from '@entities/leave';
interface LeaveRequestParams {
    type: LeaveType;
    startDate: string;
    endDate: string;
    reason: string;
}
export declare function useCreateLeaveRequest(): import("@tanstack/react-query").UseMutationResult<Leave, Error, LeaveRequestParams, unknown>;
export declare function useApproveLeave(): import("@tanstack/react-query").UseMutationResult<unknown, Error, string, unknown>;
export declare function useRejectLeave(): import("@tanstack/react-query").UseMutationResult<unknown, Error, {
    leaveId: string;
    reason: string;
}, unknown>;
export {};
//# sourceMappingURL=mutations.d.ts.map