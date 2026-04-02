import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useAuthStore = create()(persist((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: true }),
    setToken: (token) => set({ token }),
    logout: () => set({ user: null, token: null, isAuthenticated: false }),
}), {
    name: 'hub-auth',
    partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
}));
//# sourceMappingURL=auth-store.js.map