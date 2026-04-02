import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: '입력하세요' },
}

export const Error: Story = {
  args: { placeholder: '오류 상태', error: true },
}

export const Disabled: Story = {
  args: { placeholder: '비활성화', disabled: true },
}
