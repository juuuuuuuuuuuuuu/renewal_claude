import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Skeleton } from '@hub/ui';
import { PageHeader, ErrorBoundary } from '@shared/ui';
import { formatDateTime } from '@shared/lib';
import { usePostDetail } from '@entities/post';
export function CommunityDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: post, isLoading } = usePostDetail(id ?? '');
    if (isLoading)
        return _jsx(Skeleton, { className: "h-96 w-full" });
    if (!post)
        return null;
    const p = post;
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "space-y-4 max-w-3xl", children: [_jsx(PageHeader, { title: p.title, actions: _jsx(Button, { variant: "outline", onClick: () => navigate(-1), children: "\uBAA9\uB85D" }) }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [p.author.name, " \u00B7 ", p.author.department, " \u00B7 ", formatDateTime(p.createdAt)] }), _jsx("div", { className: "prose prose-sm max-w-none border rounded-lg p-4 min-h-[200px]", children: p.content })] }) }));
}
//# sourceMappingURL=community-detail-page.js.map