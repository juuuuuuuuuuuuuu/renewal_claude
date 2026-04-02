import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function EmptyState({ title, description, action, icon }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [icon && _jsx("div", { className: "mb-4 text-muted-foreground", children: icon }), _jsx("h3", { className: "text-lg font-semibold", children: title }), description && _jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: description }), action && _jsx("div", { className: "mt-4", children: action })] }));
}
//# sourceMappingURL=empty-state.js.map