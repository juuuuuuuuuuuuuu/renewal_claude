import { PageHeader } from '@shared/ui'
import { CreatePostForm } from '@features/create-post'

export function CommunityWritePage() {
  return (
    <div className="max-w-3xl space-y-4">
      <PageHeader title="글쓰기" />
      <CreatePostForm />
    </div>
  )
}
