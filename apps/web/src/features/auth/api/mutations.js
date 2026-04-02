import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
import { useAuthStore } from '@shared/model';
export function useSSOLogin() {
    const { setToken, setUser } = useAuthStore();
    return useMutation({
        mutationFn: (params) => apiClient.post('/auth/sso/callback', params),
        onSuccess: (data) => {
            setToken(data.token);
            setUser(data.user);
        },
    });
}
export function useLogout() {
    const { logout } = useAuthStore();
    return useMutation({
        mutationFn: () => apiClient.post('/auth/logout'),
        onSettled: () => {
            logout();
            window.location.href = '/login';
        },
    });
}
//# sourceMappingURL=mutations.js.map