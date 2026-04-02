import { useEffect } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import { Skeleton } from '@hub/ui'

import { useAuthStore } from '@shared/model'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login', { state: { from: location.pathname }, replace: true })
    }
  }, [isAuthenticated, location.pathname, navigate])

  if (!isAuthenticated && location.pathname !== '/login') {
    return (
      <div className="flex h-screen flex-col gap-4 p-4">
        <Skeleton className="h-16 w-full" />
        <div className="flex flex-1 gap-4">
          <Skeleton className="h-full w-64" />
          <Skeleton className="h-full flex-1" />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
