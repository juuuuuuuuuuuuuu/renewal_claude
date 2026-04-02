import type { User } from '@entities/user/model/types';
export interface Post {
    id: string;
    title: string;
    content: string;
    author: Pick<User, 'id' | 'name' | 'profileImage'>;
    category: string;
    createdAt: string;
    updatedAt: string;
    commentCount: number;
    likeCount: number;
    isLiked: boolean;
    isBookmarked: boolean;
    attachments?: Attachment[];
}
export interface Comment {
    id: string;
    content: string;
    author: Pick<User, 'id' | 'name' | 'profileImage'>;
    createdAt: string;
    parentId: string | null;
    replies?: Comment[];
}
export interface Attachment {
    id: string;
    name: string;
    url: string;
    size: number;
    mimeType: string;
}
//# sourceMappingURL=types.d.ts.map