import type { User } from '@entities/user/model/types'

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'cancelled'
export type ApprovalType = 'leave' | 'expense' | 'document' | 'overtime'

export interface ApprovalLine {
  order: number
  approver: Pick<User, 'id' | 'name' | 'position'>
  status: ApprovalStatus
  comment?: string
  processedAt?: string
}

export interface ApprovalRequest {
  id: string
  title: string
  content: string
  type: ApprovalType
  status: ApprovalStatus
  requester: Pick<User, 'id' | 'name' | 'department'>
  approvalLine: ApprovalLine[]
  createdAt: string
  updatedAt: string
  attachments?: Array<{ id: string; name: string; url: string }>
}
