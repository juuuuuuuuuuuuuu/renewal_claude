import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'

import {
  Button, DatePicker, Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Textarea,
} from '@hub/ui'

import { ROUTES } from '@shared/config'

import { useCreateLeaveRequest } from '@features/leave-request/api/mutations'

const schema = z.object({
  type: z.enum(['annual', 'sick', 'special', 'half']),
  startDate: z.date({ required_error: '시작일을 선택해주세요' }),
  endDate: z.date({ required_error: '종료일을 선택해주세요' }),
  reason: z.string().min(1, '사유를 입력해주세요'),
})

type FormValues = z.infer<typeof schema>

export function LeaveRequestForm() {
  const navigate = useNavigate()
  const { mutate, isPending } = useCreateLeaveRequest()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (values: FormValues) => {
    mutate(
      {
        type: values.type,
        startDate: values.startDate.toISOString().split('T').at(0) ?? '',
        endDate: values.endDate.toISOString().split('T').at(0) ?? '',
        reason: values.reason,
      },
      { onSuccess: () => navigate(ROUTES.LEAVE.LIST) }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>휴가 유형</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="유형 선택" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="annual">연차</SelectItem>
                  <SelectItem value="sick">병가</SelectItem>
                  <SelectItem value="special">특별휴가</SelectItem>
                  <SelectItem value="half">반차</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>시작일</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} placeholder="시작일 선택" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>종료일</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} placeholder="종료일 선택" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사유</FormLabel>
              <FormControl>
                <Textarea placeholder="휴가 사유를 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>취소</Button>
          <Button type="submit" loading={isPending}>신청</Button>
        </div>
      </form>
    </Form>
  )
}
