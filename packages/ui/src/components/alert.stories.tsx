import type { Meta, StoryObj } from '@storybook/react'

import { Alert } from './alert'

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    onClose: { action: 'closed' },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    severity: 'info',
    variant: 'standard',
    title: '안내',
    description: '이것은 안내 메시지입니다.',
  },
}

export const Error: Story = {
  args: {
    severity: 'error',
    variant: 'filled',
    title: '오류 발생',
    description: '요청을 처리하는 중 문제가 발생했습니다. 다시 시도해주세요.',
  },
}

export const Warning: Story = {
  args: {
    severity: 'warning',
    variant: 'outlined',
    title: '경고',
    description: '이 작업은 되돌릴 수 없습니다.',
  },
}

export const Success: Story = {
  args: {
    severity: 'success',
    variant: 'standard',
    title: '저장 완료',
    description: '변경사항이 성공적으로 저장되었습니다.',
  },
}

export const WithClose: Story = {
  args: {
    severity: 'warning',
    variant: 'standard',
    title: '세션 만료 예정',
    description: '10분 후 자동으로 로그아웃됩니다.',
    onClose: () => {},
  },
}

export const WithAction: Story = {
  args: {
    severity: 'error',
    variant: 'outlined',
    title: '네트워크 오류',
    description: '서버에 연결할 수 없습니다.',
    action: <button className="text-xs font-semibold uppercase tracking-wide">재시도</button>,
  },
}

export const AllSeverities: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[480px]">
      <Alert severity="error" variant="filled" title="Error" description="오류 메시지입니다." />
      <Alert severity="warning" variant="filled" title="Warning" description="경고 메시지입니다." />
      <Alert severity="info" variant="filled" title="Info" description="안내 메시지입니다." />
      <Alert severity="success" variant="filled" title="Success" description="성공 메시지입니다." />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[480px]">
      <Alert severity="info" variant="filled" title="Filled" description="Filled variant 입니다." />
      <Alert severity="info" variant="outlined" title="Outlined" description="Outlined variant 입니다." />
      <Alert severity="info" variant="standard" title="Standard" description="Standard variant 입니다." />
    </div>
  ),
}

export const TitleOnly: Story = {
  args: {
    severity: 'success',
    variant: 'standard',
    title: '저장되었습니다.',
  },
}

export const DescriptionOnly: Story = {
  args: {
    severity: 'info',
    variant: 'standard',
    description: '제목 없이 설명만 있는 알림입니다.',
  },
}
