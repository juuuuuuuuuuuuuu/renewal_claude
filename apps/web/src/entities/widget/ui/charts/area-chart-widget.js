import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';
const DUMMY_DATA = [
    { name: '1월', value: 20 },
    { name: '2월', value: 35 },
    { name: '3월', value: 28 },
    { name: '4월', value: 48 },
    { name: '5월', value: 55 },
    { name: '6월', value: 65 },
];
export function AreaChartWidget() {
    return (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: DUMMY_DATA, margin: { top: 8, right: 8, bottom: 0, left: -16 }, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "areaGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#6366f1", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "#6366f1", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), _jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }), _jsx(YAxis, { tick: { fontSize: 11 } }), _jsx(Tooltip, {}), _jsx(Area, { type: "monotone", dataKey: "value", stroke: "#6366f1", strokeWidth: 2, fill: "url(#areaGradient)" })] }) }));
}
//# sourceMappingURL=area-chart-widget.js.map