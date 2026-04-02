import type { Post, Comment } from '@entities/post/model/types';
export declare const postKeys: {
    all: readonly ["posts"];
    lists: () => readonly ["posts", "list"];
    list: (params?: Record<string, unknown>) => readonly ["posts", "list", Record<string, unknown> | undefined];
    details: () => readonly ["posts", "detail"];
    detail: (id: string) => readonly ["posts", "detail", string];
    comments: (postId: string) => readonly ["posts", "comments", string];
};
export declare function usePostList(params?: {
    page?: number;
    size?: number;
    category?: string;
    keyword?: string;
}): import("@tanstack/react-query").UseQueryResult<Post[], Error>;
export declare function usePostDetail(postId: string): import("@tanstack/react-query").UseQueryResult<Post, Error>;
export declare function usePostComments(postId: string): import("@tanstack/react-query").UseQueryResult<Comment[], Error>;
//# sourceMappingURL=queries.d.ts.map