import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';
const DUMMY_DATA = [
    { name: '1월', value: 30 },
    { name: '2월', value: 45 },
    { name: '3월', value: 38 },
    { name: '4월', value: 52 },
    { name: '5월', value: 61 },
    { name: '6월', value: 55 },
];
export function LineChartWidget() {
    return (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: DUMMY_DATA, margin: { top: 8, right: 8, bottom: 0, left: -16 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), _jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }), _jsx(YAxis, { tick: { fontSize: 11 } }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "value", stroke: "#6366f1", strokeWidth: 2, dot: { r: 3 } })] }) }));
}
//# sourceMappingURL=line-chart-widget.js.map