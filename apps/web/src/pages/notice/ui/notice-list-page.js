import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pin } from 'lucide-react';
import { Badge, Card, CardContent, Skeleton } from '@hub/ui';
import { PageHeader, EmptyState, ErrorBoundary } from '@shared/ui';
import { ROUTES } from '@shared/config';
import { formatRelativeTime } from '@shared/lib';
import { useNoticeList } from '@entities/notice';
export function NoticeListPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: notices, isLoading } = useNoticeList();
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "space-y-4", children: [_jsx(PageHeader, { title: t('notice.title') }), isLoading ? (_jsx("div", { className: "space-y-2", children: Array.from({ length: 5 }).map((_, i) => _jsx(Skeleton, { className: "h-16" }, i)) })) : !notices?.length ? (_jsx(EmptyState, { title: "\uACF5\uC9C0\uC0AC\uD56D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" })) : (_jsx("div", { className: "space-y-2", children: (notices ?? []).map((notice) => (_jsx(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", onClick: () => navigate(ROUTES.NOTICE.DETAIL(notice.id)), children: _jsxs(CardContent, { className: "flex items-center gap-3 p-4", children: [notice.isPinned && _jsx(Pin, { className: "h-4 w-4 text-primary shrink-0" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "outline", className: "shrink-0", children: notice.category }), _jsx("p", { className: `font-medium truncate ${!notice.isRead ? 'font-semibold' : ''}`, children: notice.title })] }), _jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [notice.author.name, " \u00B7 ", formatRelativeTime(notice.createdAt)] })] }), !notice.isRead && _jsx("div", { className: "h-2 w-2 rounded-full bg-primary shrink-0" })] }) }, notice.id))) }))] }) }));
}
//# sourceMappingURL=notice-list-page.js.map