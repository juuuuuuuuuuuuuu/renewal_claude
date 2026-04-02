import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';
const DUMMY_DATA = [
    { name: '1월', value: 40 },
    { name: '2월', value: 55 },
    { name: '3월', value: 47 },
    { name: '4월', value: 62 },
    { name: '5월', value: 58 },
    { name: '6월', value: 71 },
];
export function BarChartWidget() {
    return (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: DUMMY_DATA, margin: { top: 8, right: 8, bottom: 0, left: -16 }, children: [_jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }), _jsx(YAxis, { tick: { fontSize: 11 } }), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "value", fill: "#6366f1", radius: [3, 3, 0, 0] })] }) }));
}
//# sourceMappingURL=bar-chart-widget.js.map