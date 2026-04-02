export interface AuthUser {
    id: string;
    name: string;
    email: string;
    department: string;
    position: string;
    profileImage?: string;
    role: 'admin' | 'manager' | 'employee';
}
interface AuthStore {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (user: AuthUser) => void;
    setToken: (token: string) => void;
    logout: () => void;
}
export declare const useAuthStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AuthStore>, "setState" | "persist"> & {
    setState(partial: AuthStore | Partial<AuthStore> | ((state: AuthStore) => AuthStore | Partial<AuthStore>), replace?: false | undefined): unknown;
    setState(state: AuthStore | ((state: AuthStore) => AuthStore), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AuthStore, {
            token: string | null;
            isAuthenticated: boolean;
        }, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AuthStore) => void) => () => void;
        onFinishHydration: (fn: (state: AuthStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AuthStore, {
            token: string | null;
            isAuthenticated: boolean;
        }, unknown>>;
    };
}>;
export {};
//# sourceMappingURL=auth-store.d.ts.map