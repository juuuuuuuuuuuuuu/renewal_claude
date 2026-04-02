import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from '@hub/ui';
import { ROUTES } from '@shared/config';
import { useCreateApproval } from '@features/approval-request/api/mutations';
const schema = z.object({
    title: z.string().min(1, '제목을 입력해주세요'),
    type: z.enum(['leave', 'expense', 'document', 'overtime']),
    content: z.string().min(1, '내용을 입력해주세요'),
});
export function ApprovalRequestForm() {
    const navigate = useNavigate();
    const { mutate, isPending } = useCreateApproval();
    const form = useForm({ resolver: zodResolver(schema) });
    const onSubmit = (values) => {
        mutate({ ...values, approverIds: [] }, { onSuccess: () => navigate(ROUTES.APPROVAL.LIST) });
    };
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "type", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uACB0\uC7AC \uC720\uD615" }), _jsxs(Select, { onValueChange: field.onChange, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "\uC720\uD615 \uC120\uD0DD" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "leave", children: "\uD734\uAC00" }), _jsx(SelectItem, { value: "expense", children: "\uC9C0\uCD9C" }), _jsx(SelectItem, { value: "document", children: "\uBB38\uC11C" }), _jsx(SelectItem, { value: "overtime", children: "\uCD08\uACFC\uADFC\uBB34" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "title", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uC81C\uBAA9" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "\uC81C\uBAA9 \uC785\uB825", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "content", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uB0B4\uC6A9" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "\uB0B4\uC6A9 \uC785\uB825", className: "min-h-[200px]", ...field }) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => navigate(-1), children: "\uCDE8\uC18C" }), _jsx(Button, { type: "submit", loading: isPending, children: "\uACB0\uC7AC \uC694\uCCAD" })] })] }) }));
}
//# sourceMappingURL=approval-request-form.js.map