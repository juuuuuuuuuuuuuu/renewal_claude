import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'

import {
  Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
  Input, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@hub/ui'

import { ROUTES } from '@shared/config'

import { useCreateApproval } from '@features/approval-request/api/mutations'

const schema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  type: z.enum(['leave', 'expense', 'document', 'overtime']),
  content: z.string().min(1, '내용을 입력해주세요'),
})

type FormValues = z.infer<typeof schema>

export function ApprovalRequestForm() {
  const navigate = useNavigate()
  const { mutate, isPending } = useCreateApproval()

  const form = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = (values: FormValues) => {
    mutate(
      { ...values, approverIds: [] },
      { onSuccess: () => navigate(ROUTES.APPROVAL.LIST) }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="type" render={({ field }) => (
          <FormItem>
            <FormLabel>결재 유형</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl><SelectTrigger><SelectValue placeholder="유형 선택" /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="leave">휴가</SelectItem>
                <SelectItem value="expense">지출</SelectItem>
                <SelectItem value="document">문서</SelectItem>
                <SelectItem value="overtime">초과근무</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>제목</FormLabel>
            <FormControl><Input placeholder="제목 입력" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="content" render={({ field }) => (
          <FormItem>
            <FormLabel>내용</FormLabel>
            <FormControl><Textarea placeholder="내용 입력" className="min-h-[200px]" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>취소</Button>
          <Button type="submit" loading={isPending}>결재 요청</Button>
        </div>
      </form>
    </Form>
  )
}
