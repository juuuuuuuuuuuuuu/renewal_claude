import type { Post } from '@entities/post';
interface CreatePostParams {
    title: string;
    content: string;
    category: string;
    attachmentIds?: string[];
}
export declare function useCreatePost(): import("@tanstack/react-query").UseMutationResult<Post, Error, CreatePostParams, unknown>;
export declare function useUpdatePost(postId: string): import("@tanstack/react-query").UseMutationResult<Post, Error, Partial<CreatePostParams>, unknown>;
export declare function useDeletePost(): import("@tanstack/react-query").UseMutationResult<unknown, Error, string, unknown>;
export {};
//# sourceMappingURL=mutations.d.ts.map