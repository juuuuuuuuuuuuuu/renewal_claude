import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Skeleton } from '@hub/ui';
import { PageHeader, ErrorBoundary } from '@shared/ui';
import { ROUTES } from '@shared/config';
import { useAuthStore } from '@shared/model';
import { useLeaveList, useLeaveBalance } from '@entities/leave';
const STATUS_VARIANT = {
    pending: 'secondary',
    approved: 'default',
    rejected: 'destructive',
    cancelled: 'outline',
};
const STATUS_LABEL = {
    pending: '대기',
    approved: '승인',
    rejected: '반려',
    cancelled: '취소',
};
export function LeaveManagementPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { data: leaves, isLoading } = useLeaveList();
    const { data: balance, isLoading: isLoadingBalance } = useLeaveBalance(user?.id ?? '');
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "space-y-6", children: [_jsx(PageHeader, { title: t('leave.title'), actions: _jsx(Button, { onClick: () => navigate(ROUTES.LEAVE.REQUEST), children: t('leave.request') }) }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: isLoadingBalance ? (Array.from({ length: 4 }).map((_, i) => _jsx(Skeleton, { className: "h-20" }, i))) : (_jsxs(_Fragment, { children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-1", children: _jsx(CardTitle, { className: "text-sm", children: "\uC5F0\uCC28" }) }), _jsx(CardContent, { children: _jsxs("p", { className: "text-2xl font-bold", children: [balance?.annual ?? 0, "\uC77C"] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-1", children: _jsx(CardTitle, { className: "text-sm", children: "\uC0AC\uC6A9" }) }), _jsx(CardContent, { children: _jsxs("p", { className: "text-2xl font-bold", children: [balance?.used ?? 0, "\uC77C"] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-1", children: _jsx(CardTitle, { className: "text-sm", children: "\uC794\uC5EC" }) }), _jsx(CardContent, { children: _jsxs("p", { className: "text-2xl font-bold text-primary", children: [balance?.remaining ?? 0, "\uC77C"] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-1", children: _jsx(CardTitle, { className: "text-sm", children: "\uBCD1\uAC00" }) }), _jsx(CardContent, { children: _jsxs("p", { className: "text-2xl font-bold", children: [balance?.sick ?? 0, "\uC77C"] }) })] })] })) }), isLoading ? (_jsx("div", { className: "space-y-2", children: Array.from({ length: 3 }).map((_, i) => _jsx(Skeleton, { className: "h-16" }, i)) })) : (_jsx("div", { className: "space-y-2", children: (leaves ?? []).map((leave) => (_jsx(Card, { children: _jsxs(CardContent, { className: "flex items-center justify-between p-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: leave.type === 'annual' ? '연차' : leave.type === 'sick' ? '병가' : '특별휴가' }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [leave.startDate, " ~ ", leave.endDate, " (", leave.days, "\uC77C)"] })] }), _jsx(Badge, { variant: STATUS_VARIANT[leave.status], children: STATUS_LABEL[leave.status] })] }) }, leave.id))) }))] }) }));
}
//# sourceMappingURL=leave-management-page.js.map