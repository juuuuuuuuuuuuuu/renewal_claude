import type { User } from '@entities/user/model/types';
export interface Notice {
    id: string;
    title: string;
    content: string;
    author: Pick<User, 'id' | 'name'>;
    category: string;
    isPinned: boolean;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
    attachments?: Array<{
        id: string;
        name: string;
        url: string;
    }>;
}
//# sourceMappingURL=types.d.ts.map