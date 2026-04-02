import { Component, type ErrorInfo, type ReactNode } from 'react'

import { Button } from '@hub/ui'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-xl font-semibold">오류가 발생했습니다</h2>
          <p className="mt-2 text-sm text-muted-foreground">{this.state.error?.message}</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            다시 시도
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
