import axios from 'axios';
import { useAuthStore } from '@shared/model/auth-store';
const _axios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
    timeout: 10_000,
    headers: { 'Content-Type': 'application/json' },
});
_axios.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
_axios.interceptors.response.use((response) => response.data, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        useAuthStore.getState().logout();
        window.location.href = '/login';
    }
    if (error.response?.status === 403) {
        console.warn('권한이 없습니다.');
    }
    return Promise.reject(error);
});
// 반환 타입이 T로 올바르게 추론되는 타입 안전 래퍼
export const apiClient = {
    get: (url, config) => _axios.get(url, config),
    post: (url, data, config) => _axios.post(url, data, config),
    put: (url, data, config) => _axios.put(url, data, config),
    patch: (url, data, config) => _axios.patch(url, data, config),
    delete: (url, config) => _axios.delete(url, config),
};
//# sourceMappingURL=instance.js.map