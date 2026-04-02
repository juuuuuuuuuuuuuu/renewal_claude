import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage, Badge, Card, CardContent, Skeleton } from '@hub/ui';
import { PageHeader, ErrorBoundary } from '@shared/ui';
import { useAuthStore } from '@shared/model';
import { useUserProfile } from '@entities/user';
export function ProfilePage() {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const { data: profile, isLoading } = useUserProfile(user?.id ?? '');
    const p = profile;
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "max-w-2xl space-y-6", children: [_jsx(PageHeader, { title: t('nav.profile') }), isLoading ? (_jsx(Skeleton, { className: "h-48 w-full" })) : (_jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsxs(Avatar, { className: "h-20 w-20", children: [_jsx(AvatarImage, { src: p?.profileImage }), _jsx(AvatarFallback, { className: "text-2xl", children: p?.name?.slice(0, 2) ?? 'U' })] }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h2", { className: "text-xl font-bold", children: p?.name }), p?.role === 'admin' && _jsx(Badge, { variant: "secondary", children: "\uAD00\uB9AC\uC790" })] }), _jsxs("p", { className: "text-muted-foreground", children: [p?.position, " \u00B7 ", p?.department] }), _jsxs("div", { className: "text-sm space-y-1", children: [_jsx("p", { children: p?.email }), p?.phone && _jsx("p", { children: p.phone })] })] })] }) }) }))] }) }));
}
//# sourceMappingURL=profile-page.js.map