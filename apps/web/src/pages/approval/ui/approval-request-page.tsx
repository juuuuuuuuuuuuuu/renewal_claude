import { PageHeader } from '@shared/ui'
import { ApprovalRequestForm } from '@features/approval-request'

export function ApprovalRequestPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <PageHeader title="결재 요청" />
      <ApprovalRequestForm />
    </div>
  )
}
