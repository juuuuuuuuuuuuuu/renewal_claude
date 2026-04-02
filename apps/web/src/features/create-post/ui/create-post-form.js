import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from '@hub/ui';
import { ROUTES } from '@shared/config';
import { useCreatePost } from '@features/create-post/api/mutations';
const schema = z.object({
    title: z.string().min(1, '제목을 입력해주세요').max(200),
    content: z.string().min(1, '내용을 입력해주세요'),
    category: z.string().min(1, '카테고리를 선택해주세요'),
});
const CATEGORIES = ['일반', '공지', 'Q&A', '자유'];
export function CreatePostForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { mutate: createPost, isPending } = useCreatePost();
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { title: '', content: '', category: '' },
    });
    const onSubmit = (values) => {
        createPost(values, {
            onSuccess: () => navigate(ROUTES.COMMUNITY.LIST),
        });
    };
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "category", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uCE74\uD14C\uACE0\uB9AC" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "\uCE74\uD14C\uACE0\uB9AC \uC120\uD0DD" }) }) }), _jsx(SelectContent, { children: CATEGORIES.map((cat) => (_jsx(SelectItem, { value: cat, children: cat }, cat))) })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "title", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uC81C\uBAA9" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "content", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uB0B4\uC6A9" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694", className: "min-h-[300px]", ...field }) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => navigate(-1), children: t('common.cancel') }), _jsx(Button, { type: "submit", loading: isPending, children: t('common.create') })] })] }) }));
}
//# sourceMappingURL=create-post-form.js.map