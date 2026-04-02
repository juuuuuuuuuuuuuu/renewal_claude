import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@hub/ui';
import { useAuthStore } from '@shared/model';
import { PageHeader } from '@shared/ui';
import { AttendanceCheckIn } from '@features/attendance-check';
import { usePendingApprovals } from '@entities/approval';
import { useLeaveBalance } from '@entities/leave';
export function DashboardPage() {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const { data: pendingApprovals, isLoading: isLoadingApprovals } = usePendingApprovals();
    const { data: leaveBalance, isLoading: isLoadingLeave } = useLeaveBalance(user?.id ?? '');
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(PageHeader, { title: `안녕하세요, ${user?.name ?? ''}님`, description: "\uC624\uB298\uB3C4 \uC88B\uC740 \uD558\uB8E8 \uB418\uC138\uC694" }), _jsxs("section", { children: [_jsx("h2", { className: "text-sm font-medium text-muted-foreground mb-2", children: "\uC624\uB298\uC758 \uADFC\uD0DC" }), _jsx(AttendanceCheckIn, {})] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "\uB300\uAE30 \uC911\uC778 \uACB0\uC7AC" }) }), _jsx(CardContent, { children: isLoadingApprovals ? (_jsx(Skeleton, { className: "h-8 w-16" })) : (_jsxs("p", { className: "text-2xl font-bold", children: [pendingApprovals?.length ?? 0, "\uAC74"] })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "\uC794\uC5EC \uC5F0\uCC28" }) }), _jsx(CardContent, { children: isLoadingLeave ? (_jsx(Skeleton, { className: "h-8 w-16" })) : (_jsxs("p", { className: "text-2xl font-bold", children: [leaveBalance?.remaining ?? 0, "\uC77C"] })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "\uBD80\uC11C" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-2xl font-bold truncate", children: user?.department ?? '-' }) })] })] })] }));
}
//# sourceMappingURL=dashboard-page.js.map