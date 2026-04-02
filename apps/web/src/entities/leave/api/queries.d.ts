import type { Leave, LeaveBalance } from '@entities/leave/model/types';
export declare const leaveKeys: {
    all: readonly ["leaves"];
    lists: () => readonly ["leaves", "list"];
    list: (params?: Record<string, unknown>) => readonly ["leaves", "list", Record<string, unknown> | undefined];
    detail: (id: string) => readonly ["leaves", "detail", string];
    balance: (userId: string) => readonly ["leaves", "balance", string];
};
export declare function useLeaveList(params?: {
    page?: number;
    size?: number;
    status?: string;
}): import("@tanstack/react-query").UseQueryResult<Leave[], Error>;
export declare function useLeaveBalance(userId: string): import("@tanstack/react-query").UseQueryResult<LeaveBalance, Error>;
//# sourceMappingURL=queries.d.ts.map