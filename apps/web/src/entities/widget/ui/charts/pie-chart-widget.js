import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
const DUMMY_DATA = [
    { name: '완료', value: 42 },
    { name: '진행중', value: 28 },
    { name: '대기', value: 18 },
    { name: '취소', value: 12 },
];
const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];
export function PieChartWidget() {
    return (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: DUMMY_DATA, cx: "50%", cy: "50%", innerRadius: "40%", outerRadius: "65%", paddingAngle: 3, dataKey: "value", children: DUMMY_DATA.map((_, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, index))) }), _jsx(Tooltip, { formatter: (value, name) => [value, name] })] }) }));
}
//# sourceMappingURL=pie-chart-widget.js.map