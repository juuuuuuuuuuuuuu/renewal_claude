import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Card, CardContent, Skeleton } from '@hub/ui';
import { PageHeader, EmptyState, ErrorBoundary } from '@shared/ui';
import { ROUTES } from '@shared/config';
import { formatRelativeTime } from '@shared/lib';
import { useApprovalList } from '@entities/approval';
const STATUS_MAP = {
    pending: { label: '대기', variant: 'secondary' },
    approved: { label: '승인', variant: 'default' },
    rejected: { label: '반려', variant: 'destructive' },
    cancelled: { label: '취소', variant: 'outline' },
};
export function ApprovalListPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: approvals, isLoading } = useApprovalList();
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "space-y-4", children: [_jsx(PageHeader, { title: t('approval.title'), actions: _jsx(Button, { onClick: () => navigate(ROUTES.APPROVAL.REQUEST), children: "\uACB0\uC7AC \uC694\uCCAD" }) }), isLoading ? (_jsx("div", { className: "space-y-2", children: Array.from({ length: 5 }).map((_, i) => _jsx(Skeleton, { className: "h-16" }, i)) })) : !approvals?.length ? (_jsx(EmptyState, { title: "\uACB0\uC7AC \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" })) : (_jsx("div", { className: "space-y-2", children: (approvals ?? []).map((a) => (_jsx(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", onClick: () => navigate(ROUTES.APPROVAL.DETAIL(a.id)), children: _jsxs(CardContent, { className: "flex items-center justify-between p-4", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "font-medium truncate", children: a.title }), _jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [a.requester.name, " \u00B7 ", formatRelativeTime(a.createdAt)] })] }), _jsx(Badge, { variant: STATUS_MAP[a.status]?.variant ?? 'outline', children: STATUS_MAP[a.status]?.label ?? a.status })] }) }, a.id))) }))] }) }));
}
//# sourceMappingURL=approval-list-page.js.map