import { PageHeader } from '@shared/ui'
import { LeaveRequestForm } from '@features/leave-request'

export function LeaveRequestPage() {
  return (
    <div className="max-w-lg space-y-4">
      <PageHeader title="휴가 신청" />
      <LeaveRequestForm />
    </div>
  )
}
