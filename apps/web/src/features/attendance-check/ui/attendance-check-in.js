import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button, Card, CardContent } from '@hub/ui';
import { useTodayAttendance } from '@entities/attendance';
import { useCheckIn, useCheckOut } from '@features/attendance-check/api/mutations';
export function AttendanceCheckIn() {
    const { data: today } = useTodayAttendance();
    const { mutate: checkIn, isPending: isCheckingIn } = useCheckIn();
    const { mutate: checkOut, isPending: isCheckingOut } = useCheckOut();
    const now = format(new Date(), 'HH:mm', { locale: ko });
    return (_jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: ["\uD604\uC7AC \uC2DC\uAC01: ", now] }), _jsxs("div", { className: "flex gap-2", children: [!today?.checkIn ? (_jsx(Button, { onClick: () => checkIn(), loading: isCheckingIn, className: "flex-1", children: "\uCD9C\uADFC" })) : (_jsxs("div", { className: "flex-1 text-sm", children: ["\uCD9C\uADFC: ", _jsx("span", { className: "font-medium", children: today.checkIn })] })), today?.checkIn && !today?.checkOut && (_jsx(Button, { variant: "outline", onClick: () => checkOut(), loading: isCheckingOut, className: "flex-1", children: "\uD1F4\uADFC" })), today?.checkOut && (_jsxs("div", { className: "flex-1 text-sm", children: ["\uD1F4\uADFC: ", _jsx("span", { className: "font-medium", children: today.checkOut })] }))] })] }) }));
}
//# sourceMappingURL=attendance-check-in.js.map