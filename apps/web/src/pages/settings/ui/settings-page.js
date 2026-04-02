import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, Label, Switch } from '@hub/ui';
import { PageHeader } from '@shared/ui';
import { useUIStore, useSettingsStore } from '@shared/model';
export function SettingsPage() {
    const { t } = useTranslation();
    const { theme, setTheme } = useUIStore();
    const { locale, setLocale } = useSettingsStore();
    return (_jsxs("div", { className: "max-w-2xl space-y-6", children: [_jsx(PageHeader, { title: t('nav.settings') }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-base", children: "\uD654\uBA74 \uC124\uC815" }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "dark-mode", children: "\uB2E4\uD06C \uBAA8\uB4DC" }), _jsx(Switch, { id: "dark-mode", checked: theme === 'dark', onCheckedChange: (checked) => setTheme(checked ? 'dark' : 'light') })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-base", children: "\uC5B8\uC5B4 \uC124\uC815" }) }), _jsx(CardContent, { className: "space-y-2", children: ['ko', 'en', 'ja'].map((lang) => (_jsx("button", { onClick: () => setLocale(lang), className: `w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${locale === lang ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`, children: lang === 'ko' ? '한국어' : lang === 'en' ? 'English' : '日本語' }, lang))) })] })] }));
}
//# sourceMappingURL=settings-page.js.map