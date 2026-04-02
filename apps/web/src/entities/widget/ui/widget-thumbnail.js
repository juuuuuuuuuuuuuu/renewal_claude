import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart2, LineChart, PieChart, TrendingUp, Activity } from 'lucide-react';
const ICON_MAP = {
    'bar-chart': BarChart2,
    'line-chart': LineChart,
    'area-chart': Activity,
    'pie-chart': PieChart,
    'stat-card': TrendingUp,
};
export function WidgetThumbnail({ definition, onClick }) {
    const Icon = ICON_MAP[definition.id] ?? BarChart2;
    return (_jsxs("button", { onClick: onClick, className: "flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent transition-colors text-left w-full", children: [_jsx("div", { className: "w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center", children: _jsx(Icon, { className: "w-5 h-5 text-primary" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-center", children: definition.name }), _jsx("p", { className: "text-xs text-muted-foreground text-center mt-0.5", children: definition.description })] })] }));
}
//# sourceMappingURL=widget-thumbnail.js.map