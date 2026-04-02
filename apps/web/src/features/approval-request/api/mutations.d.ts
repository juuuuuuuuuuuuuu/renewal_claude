import type { ApprovalRequest, ApprovalType } from '@entities/approval';
interface CreateApprovalParams {
    title: string;
    content: string;
    type: ApprovalType;
    approverIds: string[];
}
export declare function useCreateApproval(): import("@tanstack/react-query").UseMutationResult<ApprovalRequest, Error, CreateApprovalParams, unknown>;
export declare function useProcessApproval(): import("@tanstack/react-query").UseMutationResult<unknown, Error, {
    approvalId: string;
    action: "approve" | "reject";
    comment?: string;
}, unknown>;
export {};
//# sourceMappingURL=mutations.d.ts.map