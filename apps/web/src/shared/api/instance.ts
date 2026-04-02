import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'

import { useAuthStore } from '@shared/model/auth-store'

const _axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

_axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

_axios.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }

    if (error.response?.status === 403) {
      console.warn('권한이 없습니다.')
    }

    return Promise.reject(error)
  }
)

// 반환 타입이 T로 올바르게 추론되는 타입 안전 래퍼
export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    _axios.get<T, T>(url, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    _axios.post<T, T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    _axios.put<T, T>(url, data, config),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    _axios.patch<T, T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    _axios.delete<T, T>(url, config),
}
