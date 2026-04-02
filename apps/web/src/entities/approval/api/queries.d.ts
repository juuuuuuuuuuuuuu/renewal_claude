import type { ApprovalRequest } from '@entities/approval/model/types';
export declare const approvalKeys: {
    all: readonly ["approvals"];
    lists: () => readonly ["approvals", "list"];
    list: (params?: Record<string, unknown>) => readonly ["approvals", "list", Record<string, unknown> | undefined];
    detail: (id: string) => readonly ["approvals", "detail", string];
    pending: () => readonly ["approvals", "pending"];
};
export declare function useApprovalList(params?: {
    page?: number;
    size?: number;
    status?: string;
    type?: string;
}): import("@tanstack/react-query").UseQueryResult<ApprovalRequest[], Error>;
export declare function useApprovalDetail(approvalId: string): import("@tanstack/react-query").UseQueryResult<ApprovalRequest, Error>;
export declare function usePendingApprovals(): import("@tanstack/react-query").UseQueryResult<ApprovalRequest[], Error>;
//# sourceMappingURL=queries.d.ts.map