import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PenSquare } from 'lucide-react';
import { Badge, Button, Card, CardContent, Skeleton } from '@hub/ui';
import { PageHeader, EmptyState, ErrorBoundary } from '@shared/ui';
import { ROUTES } from '@shared/config';
import { formatRelativeTime } from '@shared/lib';
import { usePostList } from '@entities/post';
export function CommunityListPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: posts, isLoading } = usePostList({ page: 1, size: 20 });
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "space-y-4", children: [_jsx(PageHeader, { title: t('community.title'), actions: _jsxs(Button, { onClick: () => navigate(ROUTES.COMMUNITY.WRITE), children: [_jsx(PenSquare, { className: "h-4 w-4 mr-2" }), t('community.write')] }) }), isLoading ? (_jsx("div", { className: "space-y-3", children: Array.from({ length: 5 }).map((_, i) => (_jsx(Skeleton, { className: "h-24 w-full" }, i))) })) : !posts?.length ? (_jsx(EmptyState, { title: t('community.no_posts') })) : (_jsx("div", { className: "space-y-3", children: posts.map((post) => (_jsx(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", onClick: () => navigate(ROUTES.COMMUNITY.DETAIL(post.id)), children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-start gap-2", children: [_jsx(Badge, { variant: "outline", className: "shrink-0", children: post.category }), _jsx("h3", { className: "font-medium line-clamp-1", children: post.title })] }), _jsxs("div", { className: "flex items-center gap-2 mt-2 text-xs text-muted-foreground", children: [_jsx("span", { children: post.author.name }), _jsx("span", { children: "\u00B7" }), _jsxs("span", { children: ["\uB313\uAE00 ", post.commentCount] }), _jsx("span", { children: "\u00B7" }), _jsxs("span", { children: ["\uC88B\uC544\uC694 ", post.likeCount] }), _jsx("span", { className: "ml-auto", children: formatRelativeTime(post.createdAt) })] })] }) }, post.id))) }))] }) }));
}
//# sourceMappingURL=community-list-page.js.map