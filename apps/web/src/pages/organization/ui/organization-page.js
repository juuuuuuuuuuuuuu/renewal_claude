import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Skeleton } from '@hub/ui';
import { PageHeader, ErrorBoundary } from '@shared/ui';
import { useDepartmentTree } from '@entities/department';
function DepartmentNode({ dept, depth = 0 }) {
    return (_jsxs("div", { style: { marginLeft: depth * 20 }, children: [_jsx(Card, { className: "mb-2", children: _jsxs(CardContent, { className: "p-3 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: dept.name }), dept.manager && _jsxs("p", { className: "text-xs text-muted-foreground", children: [dept.manager.name, " \u00B7 ", dept.manager.position] })] }), _jsxs("span", { className: "text-sm text-muted-foreground", children: [dept.memberCount, "\uBA85"] })] }) }), dept.children?.map((child) => (_jsx(DepartmentNode, { dept: child, depth: depth + 1 }, child.id)))] }));
}
export function OrganizationPage() {
    const { t } = useTranslation();
    const { data: org, isLoading } = useDepartmentTree();
    const o = org;
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "space-y-4", children: [_jsx(PageHeader, { title: t('nav.organization') }), isLoading ? (_jsx("div", { className: "space-y-2", children: Array.from({ length: 4 }).map((_, i) => _jsx(Skeleton, { className: "h-16" }, i)) })) : (_jsx("div", { children: (o?.departments ?? []).map((dept) => _jsx(DepartmentNode, { dept: dept }, dept.id)) }))] }) }));
}
//# sourceMappingURL=organization-page.js.map