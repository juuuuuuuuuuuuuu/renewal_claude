import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Skeleton } from '@hub/ui';
import { PageHeader, ErrorBoundary } from '@shared/ui';
import { formatDateTime } from '@shared/lib';
import { useApprovalDetail } from '@entities/approval';
import { useProcessApproval } from '@features/approval-request';
export function ApprovalDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: approval, isLoading } = useApprovalDetail(id ?? '');
    const { mutate: process, isPending } = useProcessApproval();
    if (isLoading)
        return _jsx(Skeleton, { className: "h-96 w-full" });
    if (!approval)
        return null;
    const a = approval;
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "max-w-2xl space-y-4", children: [_jsx(PageHeader, { title: a.title, actions: _jsx(Button, { variant: "outline", onClick: () => navigate(-1), children: "\uBAA9\uB85D" }) }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm", children: "\uC694\uCCAD \uC815\uBCF4" }) }), _jsxs(CardContent, { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "\uC694\uCCAD\uC790" }), _jsx("span", { children: a.requester.name })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "\uC720\uD615" }), _jsx("span", { children: a.type })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "\uC694\uCCAD\uC77C" }), _jsx("span", { children: formatDateTime(a.createdAt) })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "\uC0C1\uD0DC" }), _jsx(Badge, { children: a.status })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm", children: "\uB0B4\uC6A9" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm leading-relaxed", children: a.content }) })] }), a.status === 'pending' && (_jsxs("div", { className: "flex gap-2 justify-end", children: [_jsx(Button, { variant: "destructive", onClick: () => process({ approvalId: id, action: 'reject' }), loading: isPending, children: "\uBC18\uB824" }), _jsx(Button, { onClick: () => process({ approvalId: id, action: 'approve' }), loading: isPending, children: "\uC2B9\uC778" })] }))] }) }));
}
//# sourceMappingURL=approval-detail-page.js.map