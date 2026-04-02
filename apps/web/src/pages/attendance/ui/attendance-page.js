import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@hub/ui';
import { PageHeader, ErrorBoundary } from '@shared/ui';
import { useAttendanceRecords, useAttendanceSummary } from '@entities/attendance';
export function AttendancePage() {
    const { t } = useTranslation();
    const currentMonth = format(new Date(), 'yyyy-MM');
    const { data: records, isLoading } = useAttendanceRecords({ month: currentMonth });
    const { data: summary } = useAttendanceSummary(currentMonth);
    const s = summary;
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "space-y-6", children: [_jsx(PageHeader, { title: t('attendance.title') }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-1", children: _jsx(CardTitle, { className: "text-sm", children: "\uADFC\uBB34\uC77C" }) }), _jsx(CardContent, { children: _jsxs("p", { className: "text-2xl font-bold", children: [s?.totalWorkDays ?? 0, "\uC77C"] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-1", children: _jsx(CardTitle, { className: "text-sm", children: "\uCD9C\uADFC\uC77C" }) }), _jsx(CardContent, { children: _jsxs("p", { className: "text-2xl font-bold", children: [s?.presentDays ?? 0, "\uC77C"] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-1", children: _jsx(CardTitle, { className: "text-sm", children: "\uCD1D \uADFC\uBB34" }) }), _jsx(CardContent, { children: _jsxs("p", { className: "text-2xl font-bold", children: [s?.totalWorkHours ?? 0, "h"] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-1", children: _jsx(CardTitle, { className: "text-sm", children: "\uCD08\uACFC\uADFC\uBB34" }) }), _jsx(CardContent, { children: _jsxs("p", { className: "text-2xl font-bold", children: [s?.totalOvertimeHours ?? 0, "h"] }) })] })] }), isLoading ? (_jsx("div", { className: "space-y-2", children: Array.from({ length: 5 }).map((_, i) => _jsx(Skeleton, { className: "h-12" }, i)) })) : (_jsx("div", { className: "space-y-2", children: (records ?? []).map((r) => (_jsx(Card, { children: _jsxs(CardContent, { className: "flex items-center justify-between p-3 text-sm", children: [_jsx("span", { className: "font-medium", children: r.date }), _jsxs("span", { className: "text-muted-foreground", children: ["\uCD9C\uADFC: ", r.checkIn ?? '-'] }), _jsxs("span", { className: "text-muted-foreground", children: ["\uD1F4\uADFC: ", r.checkOut ?? '-'] }), _jsxs("span", { children: [r.workHours, "h"] })] }) }, r.id))) }))] }) }));
}
//# sourceMappingURL=attendance-page.js.map