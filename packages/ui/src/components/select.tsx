import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cva, type VariantProps } from 'class-variance-authority'
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react'

import { cn } from '../lib/utils'

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const selectTriggerVariants = cva(
  'flex w-full items-center justify-between ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
  {
    variants: {
      variant: {
        outlined:
          'rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-ring focus:ring-offset-2',
        standard:
          'border-b border-input bg-transparent px-0 text-sm focus:border-primary focus:ring-0',
        filled:
          'rounded-t-md border-b border-input bg-muted px-3 text-sm focus:border-primary focus:ring-0',
      },
      size: {
        medium: 'h-10 py-2',
        small: 'h-8 py-1',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'medium',
    },
  }
)

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, variant, size, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export interface SelectFieldProps {
  label?: string
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: 'outlined' | 'standard' | 'filled'
  size?: 'medium' | 'small'
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

const SelectField = ({
  label,
  placeholder,
  value,
  onValueChange,
  variant = 'standard',
  size = 'medium',
  disabled,
  className,
  children,
}: SelectFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <span className="text-xs tracking-wide text-muted-foreground">{label}</span>
      )}
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger variant={variant} size={size}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  )
}
SelectField.displayName = 'SelectField'

// ─── MultiSelect ────────────────────────────────────────────────────────────

export interface MultiSelectOption {
  value: string
  label: string
}

export type MultiSelectRenderValue = 'text' | 'chip' | 'checkbox'

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  label?: string
  placeholder?: string
  renderValue?: MultiSelectRenderValue
  variant?: 'outlined' | 'standard' | 'filled'
  size?: 'medium' | 'small'
  disabled?: boolean
  className?: string
}

const MultiSelect = ({
  options,
  value = [],
  onValueChange,
  label,
  placeholder = '선택하세요',
  renderValue = 'text',
  variant = 'outlined',
  size = 'medium',
  disabled,
  className,
}: MultiSelectProps) => {
  const [open, setOpen] = React.useState(false)

  const toggle = (optionValue: string) => {
    const next = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue]
    onValueChange?.(next)
  }

  const removeChip = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onValueChange?.(value.filter((v) => v !== optionValue))
  }

  const selectedLabels = options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label)

  const triggerClass = cn(
    selectTriggerVariants({ variant, size }),
    'cursor-pointer',
    className
  )

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
      <div className="flex flex-col gap-1.5">
        {label && (
          <span className="text-xs tracking-wide text-muted-foreground">{label}</span>
        )}
        <PopoverPrimitive.Trigger asChild disabled={disabled}>
          <button type="button" className={triggerClass}>
            <span className="flex flex-1 flex-wrap gap-1 overflow-hidden">
              {value.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : renderValue === 'chip' ? (
                selectedLabels.map((lbl, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs"
                  >
                    {lbl}
                    <button
                      type="button"
                      onClick={(e) => {
                        const idx = value.findIndex((v) => options.find((o) => o.value === v && o.label === lbl))
                        if (idx !== -1) removeChip(value[idx]!, e)
                      }}
                      className="ml-0.5 rounded-full hover:bg-muted-foreground/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="truncate">{selectedLabels.join(', ')}</span>
              )}
            </span>
            <ChevronDown className={cn('h-4 w-4 shrink-0 opacity-50 transition-transform', open && 'rotate-180')} />
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            className="z-50 min-w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-md border bg-popover p-0 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            style={{ width: 'var(--radix-popover-trigger-width)' }}
          >
            <ul className="max-h-60 overflow-auto py-1">
              {options.map((option) => {
                const checked = value.includes(option.value)
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => toggle(option.value)}
                      className={cn(
                        'flex w-full items-center gap-2 px-4 py-1.5 text-sm transition-colors hover:bg-accent',
                        checked && renderValue !== 'checkbox' && 'font-medium'
                      )}
                    >
                      {renderValue === 'checkbox' && (
                        <span
                          className={cn(
                            'flex h-4 w-4 shrink-0 items-center justify-center rounded border border-primary',
                            checked && 'bg-primary text-primary-foreground'
                          )}
                        >
                          {checked && <Check className="h-3 w-3" />}
                        </span>
                      )}
                      {option.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </div>
    </PopoverPrimitive.Root>
  )
}
MultiSelect.displayName = 'MultiSelect'

export {
  Select, SelectGroup, SelectValue, SelectTrigger, selectTriggerVariants, SelectContent,
  SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton,
  SelectField,
  MultiSelect,
}
