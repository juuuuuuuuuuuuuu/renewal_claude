import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PageHeader({ title, description, actions }) {
    return (_jsxs("div", { className: "flex items-center justify-between pb-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: title }), description && _jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: description })] }), actions && _jsx("div", { className: "flex items-center gap-2", children: actions })] }));
}
//# sourceMappingURL=page-header.js.map