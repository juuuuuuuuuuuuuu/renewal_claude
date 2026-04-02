import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hub/ui';
import { env } from '@shared/config';
export function LoginForm() {
    const { t } = useTranslation();
    const handleSSOLogin = () => {
        const params = new URLSearchParams({
            client_id: env.SSO_CLIENT_ID,
            redirect_uri: `${window.location.origin}/login/callback`,
            response_type: 'code',
            scope: 'openid profile email',
        });
        window.location.href = `${env.SSO_AUTHORITY}/oauth/authorize?${params}`;
    };
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx(CardTitle, { className: "text-2xl", children: "Hub" }), _jsx(CardDescription, { children: t('auth.login_description') })] }), _jsx(CardContent, { children: _jsx(Button, { className: "w-full", onClick: handleSSOLogin, size: "lg", children: t('auth.sso_login') }) })] }) }));
}
//# sourceMappingURL=login-form.js.map