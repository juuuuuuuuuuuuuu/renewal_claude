import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingDown, TrendingUp } from 'lucide-react';
const DUMMY_DATA = {
    label: '이번 달 완료',
    value: '127',
    unit: '건',
    trend: 12,
};
export function StatCardWidget() {
    const isPositive = DUMMY_DATA.trend >= 0;
    return (_jsxs("div", { className: "flex flex-col justify-center h-full px-2", children: [_jsx("p", { className: "text-xs text-muted-foreground truncate", children: DUMMY_DATA.label }), _jsxs("p", { className: "text-3xl font-bold mt-1", children: [DUMMY_DATA.value, _jsx("span", { className: "text-sm font-normal text-muted-foreground ml-1", children: DUMMY_DATA.unit })] }), _jsxs("div", { className: `flex items-center gap-1 mt-1 text-xs ${isPositive ? 'text-emerald-600' : 'text-red-500'}`, children: [isPositive ? _jsx(TrendingUp, { className: "w-3 h-3" }) : _jsx(TrendingDown, { className: "w-3 h-3" }), _jsxs("span", { children: [isPositive ? '+' : '', DUMMY_DATA.trend, "% \uC804\uC6D4 \uB300\uBE44"] })] })] }));
}
//# sourceMappingURL=stat-card-widget.js.map