import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectField,
  MultiSelect,
} from './select'

const ITEMS = (
  <>
    <SelectItem value="10">Ten</SelectItem>
    <SelectItem value="20">Twenty</SelectItem>
    <SelectItem value="30">Thirty</SelectItem>
  </>
)

const meta: Meta<typeof SelectField> = {
  title: 'Primitives/Select',
  component: SelectField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'standard', 'filled'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SelectField>

export const Standard: Story = {
  args: {
    label: 'Label',
    placeholder: '선택하세요',
    variant: 'standard',
  },
  render: (args) => (
    <div className="w-[220px]">
      <SelectField {...args}>{ITEMS}</SelectField>
    </div>
  ),
}

export const Outlined: Story = {
  args: {
    label: 'Label',
    placeholder: '선택하세요',
    variant: 'outlined',
  },
  render: (args) => (
    <div className="w-[220px]">
      <SelectField {...args}>{ITEMS}</SelectField>
    </div>
  ),
}

export const Filled: Story = {
  args: {
    label: 'Label',
    placeholder: '선택하세요',
    variant: 'filled',
  },
  render: (args) => (
    <div className="w-[220px]">
      <SelectField {...args}>{ITEMS}</SelectField>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: '비활성화',
    variant: 'standard',
    disabled: true,
  },
  render: (args) => (
    <div className="w-[220px]">
      <SelectField {...args}>{ITEMS}</SelectField>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-8 items-end">
      <div className="w-[220px]">
        <SelectField label="Standard" placeholder="선택하세요" variant="standard">
          {ITEMS}
        </SelectField>
      </div>
      <div className="w-[220px]">
        <SelectField label="Outlined" placeholder="선택하세요" variant="outlined">
          {ITEMS}
        </SelectField>
      </div>
      <div className="w-[220px]">
        <SelectField label="Filled" placeholder="선택하세요" variant="filled">
          {ITEMS}
        </SelectField>
      </div>
    </div>
  ),
}

export const SmallSize: Story = {
  args: {
    label: 'Label',
    placeholder: '선택하세요',
    variant: 'outlined',
    size: 'small',
  },
  render: (args) => (
    <div className="w-[220px]">
      <SelectField {...args}>{ITEMS}</SelectField>
    </div>
  ),
}

export const Primitives: Story = {
  name: 'Primitives (조합형)',
  render: () => (
    <div className="w-[220px]">
      <Select>
        <SelectTrigger variant="outlined">
          <SelectValue placeholder="직접 조합" />
        </SelectTrigger>
        <SelectContent>{ITEMS}</SelectContent>
      </Select>
    </div>
  ),
}

// ─── MultiSelect Stories ────────────────────────────────────────────────────

const PEOPLE_OPTIONS = [
  { value: 'oliver', label: 'Oliver Hansen' },
  { value: 'van', label: 'Van Henry' },
  { value: 'april', label: 'April Tucker' },
  { value: 'ralph', label: 'Ralph Hubbard' },
  { value: 'omar', label: 'Omar Alexander' },
]

const MultiSelectMeta: Meta<typeof MultiSelect> = {
  title: 'Primitives/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
}

export const MultipleSelect: StoryObj<typeof MultiSelect> = {
  name: 'Multiple Select (텍스트)',
  render: () => {
    const [value, setValue] = React.useState<string[]>(['oliver', 'van'])
    return (
      <div className="w-[330px]">
        <MultiSelect
          label="Label"
          options={PEOPLE_OPTIONS}
          value={value}
          onValueChange={setValue}
          renderValue="text"
          variant="outlined"
        />
      </div>
    )
  },
}

export const MultipleSelectCheckmarks: StoryObj<typeof MultiSelect> = {
  name: 'Checkmarks',
  render: () => {
    const [value, setValue] = React.useState<string[]>(['oliver', 'van'])
    return (
      <div className="w-[330px]">
        <MultiSelect
          label="Label"
          options={PEOPLE_OPTIONS}
          value={value}
          onValueChange={setValue}
          renderValue="checkbox"
          variant="outlined"
        />
      </div>
    )
  },
}

export const MultipleSelectChip: StoryObj<typeof MultiSelect> = {
  name: 'Chip',
  render: () => {
    const [value, setValue] = React.useState<string[]>(['oliver', 'van'])
    return (
      <div className="w-[330px]">
        <MultiSelect
          label="Label"
          options={PEOPLE_OPTIONS}
          value={value}
          onValueChange={setValue}
          renderValue="chip"
          variant="outlined"
        />
      </div>
    )
  },
}

export const MultipleSelectEmpty: StoryObj<typeof MultiSelect> = {
  name: 'Multiple Select (빈 상태)',
  render: () => {
    const [value, setValue] = React.useState<string[]>([])
    return (
      <div className="w-[330px]">
        <MultiSelect
          label="Label"
          placeholder="선택하세요"
          options={PEOPLE_OPTIONS}
          value={value}
          onValueChange={setValue}
          renderValue="text"
          variant="outlined"
        />
      </div>
    )
  },
}
