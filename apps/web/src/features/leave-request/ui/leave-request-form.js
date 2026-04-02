import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Textarea, } from '@hub/ui';
import { ROUTES } from '@shared/config';
import { useCreateLeaveRequest } from '@features/leave-request/api/mutations';
const schema = z.object({
    type: z.enum(['annual', 'sick', 'special', 'half']),
    startDate: z.date({ required_error: '시작일을 선택해주세요' }),
    endDate: z.date({ required_error: '종료일을 선택해주세요' }),
    reason: z.string().min(1, '사유를 입력해주세요'),
});
export function LeaveRequestForm() {
    const navigate = useNavigate();
    const { mutate, isPending } = useCreateLeaveRequest();
    const form = useForm({
        resolver: zodResolver(schema),
    });
    const onSubmit = (values) => {
        mutate({
            type: values.type,
            startDate: values.startDate.toISOString().split('T').at(0) ?? '',
            endDate: values.endDate.toISOString().split('T').at(0) ?? '',
            reason: values.reason,
        }, { onSuccess: () => navigate(ROUTES.LEAVE.LIST) });
    };
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "type", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uD734\uAC00 \uC720\uD615" }), _jsxs(Select, { onValueChange: field.onChange, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "\uC720\uD615 \uC120\uD0DD" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "annual", children: "\uC5F0\uCC28" }), _jsx(SelectItem, { value: "sick", children: "\uBCD1\uAC00" }), _jsx(SelectItem, { value: "special", children: "\uD2B9\uBCC4\uD734\uAC00" }), _jsx(SelectItem, { value: "half", children: "\uBC18\uCC28" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "startDate", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uC2DC\uC791\uC77C" }), _jsx(FormControl, { children: _jsx(DatePicker, { value: field.value, onChange: field.onChange, placeholder: "\uC2DC\uC791\uC77C \uC120\uD0DD" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "endDate", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uC885\uB8CC\uC77C" }), _jsx(FormControl, { children: _jsx(DatePicker, { value: field.value, onChange: field.onChange, placeholder: "\uC885\uB8CC\uC77C \uC120\uD0DD" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "reason", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uC0AC\uC720" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "\uD734\uAC00 \uC0AC\uC720\uB97C \uC785\uB825\uD558\uC138\uC694", ...field }) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => navigate(-1), children: "\uCDE8\uC18C" }), _jsx(Button, { type: "submit", loading: isPending, children: "\uC2E0\uCCAD" })] })] }) }));
}
//# sourceMappingURL=leave-request-form.js.map