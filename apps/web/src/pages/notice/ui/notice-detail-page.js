import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Skeleton } from '@hub/ui';
import { PageHeader, ErrorBoundary } from '@shared/ui';
import { formatDateTime } from '@shared/lib';
import { useNoticeDetail } from '@entities/notice';
export function NoticeDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: notice, isLoading } = useNoticeDetail(id ?? '');
    if (isLoading)
        return _jsx(Skeleton, { className: "h-96 w-full" });
    if (!notice)
        return null;
    const n = notice;
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "max-w-3xl space-y-4", children: [_jsx(PageHeader, { title: n.title, actions: _jsx(Button, { variant: "outline", onClick: () => navigate(-1), children: "\uBAA9\uB85D" }) }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [n.author.name, " \u00B7 ", n.category, " \u00B7 ", formatDateTime(n.createdAt)] }), _jsx("div", { className: "border rounded-lg p-4 min-h-[200px] text-sm leading-relaxed", children: n.content })] }) }));
}
//# sourceMappingURL=notice-detail-page.js.map