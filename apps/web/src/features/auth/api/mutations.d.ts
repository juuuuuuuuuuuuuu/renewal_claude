import type { AuthUser } from '@shared/model/auth-store';
interface SSOCallbackParams {
    code: string;
    state?: string;
}
interface AuthResponse {
    token: string;
    user: AuthUser;
}
export declare function useSSOLogin(): import("@tanstack/react-query").UseMutationResult<AuthResponse, Error, SSOCallbackParams, unknown>;
export declare function useLogout(): import("@tanstack/react-query").UseMutationResult<unknown, Error, void, unknown>;
export {};
//# sourceMappingURL=mutations.d.ts.map