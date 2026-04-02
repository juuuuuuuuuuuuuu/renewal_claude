import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@shared/api'
import { useAuthStore } from '@shared/model'

import type { AuthUser } from '@shared/model/auth-store'

interface SSOCallbackParams {
  code: string
  state?: string
}

interface AuthResponse {
  token: string
  user: AuthUser
}

export function useSSOLogin() {
  const { setToken, setUser } = useAuthStore()
  return useMutation({
    mutationFn: (params: SSOCallbackParams) =>
      apiClient.post<AuthResponse>('/auth/sso/callback', params),
    onSuccess: (data) => {
      setToken((data as unknown as AuthResponse).token)
      setUser((data as unknown as AuthResponse).user)
    },
  })
}

export function useLogout() {
  const { logout } = useAuthStore()
  return useMutation({
    mutationFn: () => apiClient.post('/auth/logout'),
    onSettled: () => {
      logout()
      window.location.href = '/login'
    },
  })
}
