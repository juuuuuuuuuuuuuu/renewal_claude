import type { User } from '@entities/user/model/types';
export type LeaveType = 'annual' | 'sick' | 'special' | 'half';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export interface Leave {
    id: string;
    type: LeaveType;
    startDate: string;
    endDate: string;
    days: number;
    status: LeaveStatus;
    reason: string;
    requester: Pick<User, 'id' | 'name'>;
    approver?: Pick<User, 'id' | 'name'>;
    createdAt: string;
    rejectionReason?: string;
}
export interface LeaveBalance {
    annual: number;
    sick: number;
    special: number;
    used: number;
    remaining: number;
}
//# sourceMappingURL=types.d.ts.map