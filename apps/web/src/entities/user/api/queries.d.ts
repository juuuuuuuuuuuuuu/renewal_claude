import type { User, UserProfile } from '@entities/user/model/types';
export declare const userKeys: {
    all: readonly ["users"];
    lists: () => readonly ["users", "list"];
    list: (params?: Record<string, unknown>) => readonly ["users", "list", Record<string, unknown> | undefined];
    details: () => readonly ["users", "detail"];
    detail: (id: string) => readonly ["users", "detail", string];
    profile: (id: string) => readonly ["users", "profile", string];
};
export declare function useUserList(params?: {
    page?: number;
    size?: number;
    keyword?: string;
}): import("@tanstack/react-query").UseQueryResult<User[], Error>;
export declare function useUserProfile(userId: string): import("@tanstack/react-query").UseQueryResult<UserProfile, Error>;
//# sourceMappingURL=queries.d.ts.map