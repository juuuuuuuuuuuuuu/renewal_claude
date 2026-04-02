import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert } from '@hub/ui';
function AlertActionButton() {
    return (_jsx("button", { type: "button", className: "rounded px-1.5 py-1 text-[13px] font-medium uppercase tracking-[0.46px] text-white", children: "LABEL" }));
}
function StaticSelectStandard() {
    return (_jsxs("div", { className: "relative w-[220px]", children: [_jsx("span", { className: "block text-xs font-normal tracking-[0.15px] text-[#1976d2]", children: "Label" }), _jsxs("div", { className: "relative mt-1.5 flex items-center border-b-2 border-[#1976d2] pb-0.5", children: [_jsx("span", { className: "flex-1 text-base tracking-[0.15px] text-[rgba(0,0,0,0.87)]", children: "Value" }), _jsx("svg", { className: "size-6 shrink-0 text-[rgba(0,0,0,0.54)]", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: _jsx("path", { d: "M7 14l5-5 5 5z" }) })] }), _jsx("div", { className: "absolute left-0 right-0 top-full z-10 rounded bg-white shadow-[0px_3px_14px_2px_rgba(0,0,0,0.12),0px_8px_10px_1px_rgba(0,0,0,0.14),0px_5px_5px_-3px_rgba(0,0,0,0.2)]", children: _jsx("ul", { className: "py-2", children: ['Menu Item', 'Menu Item', 'Menu Item'].map((item, i) => (_jsx("li", { className: "cursor-pointer px-4 py-1.5 text-base tracking-[0.15px] text-[rgba(0,0,0,0.87)] hover:bg-black/[0.04]", children: item }, i))) }) })] }));
}
export function FigmaPreviewPage() {
    return (_jsxs("div", { className: "relative min-h-screen bg-white", style: { minWidth: 1280 }, children: [_jsx("div", { className: "absolute left-[74px] top-[122px] w-[320px]", children: _jsx(Alert, { severity: "info", variant: "filled", title: "{Title}", description: "{Description}", action: _jsx(AlertActionButton, {}) }) }), _jsx("div", { className: "absolute left-[489px] top-[138px]", children: _jsx(StaticSelectStandard, {}) })] }));
}
//# sourceMappingURL=figma-preview-page.js.map