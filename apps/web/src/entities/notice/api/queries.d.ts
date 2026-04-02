import type { Notice } from '@entities/notice/model/types';
export declare const noticeKeys: {
    all: readonly ["notices"];
    lists: () => readonly ["notices", "list"];
    list: (params?: Record<string, unknown>) => readonly ["notices", "list", Record<string, unknown> | undefined];
    detail: (id: string) => readonly ["notices", "detail", string];
};
export declare function useNoticeList(params?: {
    page?: number;
    size?: number;
    category?: string;
}): import("@tanstack/react-query").UseQueryResult<Notice[], Error>;
export declare function useNoticeDetail(noticeId: string): import("@tanstack/react-query").UseQueryResult<Notice, Error>;
//# sourceMappingURL=queries.d.ts.map