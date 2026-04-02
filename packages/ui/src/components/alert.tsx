import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const alertVariants = cva(
  'relative flex w-full items-start gap-3 rounded-md px-4 py-1.5 text-sm',
  {
    variants: {
      variant: {
        filled: '',
        outlined: 'border bg-transparent',
        standard: '',
      },
      severity: {
        error: '',
        warning: '',
        info: '',
        success: '',
      },
    },
    compoundVariants: [
      // Filled
      { variant: 'filled', severity: 'error', className: 'bg-[#d32f2f] text-white' },
      { variant: 'filled', severity: 'warning', className: 'bg-[#ef6c00] text-white' },
      { variant: 'filled', severity: 'info', className: 'bg-[#0288d1] text-white' },
      { variant: 'filled', severity: 'success', className: 'bg-[#2e7d32] text-white' },
      // Outlined
      { variant: 'outlined', severity: 'error', className: 'border-[#d32f2f] text-[#5f2120]' },
      { variant: 'outlined', severity: 'warning', className: 'border-[#ef6c00] text-[#663c00]' },
      { variant: 'outlined', severity: 'info', className: 'border-[#0288d1] text-[#014361]' },
      { variant: 'outlined', severity: 'success', className: 'border-[#2e7d32] text-[#1e4620]' },
      // Standard
      { variant: 'standard', severity: 'error', className: 'bg-[#fdeded] text-[#5f2120]' },
      { variant: 'standard', severity: 'warning', className: 'bg-[#fff4e5] text-[#663c00]' },
      { variant: 'standard', severity: 'info', className: 'bg-[#e5f6fd] text-[#014361]' },
      { variant: 'standard', severity: 'success', className: 'bg-[#edf7ed] text-[#1e4620]' },
    ],
    defaultVariants: {
      variant: 'standard',
      severity: 'info',
    },
  }
)

const iconColorMap = {
  filled: {
    error: 'text-white',
    warning: 'text-white',
    info: 'text-white',
    success: 'text-white',
  },
  outlined: {
    error: 'text-[#d32f2f]',
    warning: 'text-[#ef6c00]',
    info: 'text-[#0288d1]',
    success: 'text-[#2e7d32]',
  },
  standard: {
    error: 'text-[#d32f2f]',
    warning: 'text-[#ef6c00]',
    info: 'text-[#0288d1]',
    success: 'text-[#2e7d32]',
  },
} as const

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('size-[22px] shrink-0', className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>
  )
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('size-[22px] shrink-0', className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
    </svg>
  )
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('size-[22px] shrink-0', className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
  )
}

function SuccessIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('size-[22px] shrink-0', className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  )
}

const severityIcons = {
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
  success: SuccessIcon,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  description?: string
  action?: React.ReactNode
  onClose?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'standard',
      severity = 'info',
      title,
      description,
      action,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedVariant = (variant ?? 'standard') as 'filled' | 'outlined' | 'standard'
    const resolvedSeverity = (severity ?? 'info') as 'error' | 'warning' | 'info' | 'success'

    const Icon = severityIcons[resolvedSeverity]
    const iconColor = iconColorMap[resolvedVariant][resolvedSeverity]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, severity }), className)}
        {...props}
      >
        <div className="pt-[7px]">
          <Icon className={iconColor} />
        </div>
        <div className="flex flex-1 flex-col gap-1 py-2 text-sm">
          {title && <p className="font-medium leading-snug">{title}</p>}
          {description && <p className="leading-[1.43] opacity-90">{description}</p>}
          {children}
        </div>
        {action && (
          <div className="flex items-start pl-4 pt-1">
            {action}
          </div>
        )}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 mt-1 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = 'Alert'

export { Alert, alertVariants }
