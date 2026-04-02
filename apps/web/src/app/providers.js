import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Toaster, TooltipProvider } from '@hub/ui';
import ko from '@shared/i18n/locales/ko.json';
import en from '@shared/i18n/locales/en.json';
import ja from '@shared/i18n/locales/ja.json';
i18n.use(initReactI18next).init({
    resources: {
        ko: { translation: ko },
        en: { translation: en },
        ja: { translation: ja },
    },
    lng: 'ko',
    fallbackLng: 'ko',
    interpolation: { escapeValue: false },
});
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
export function Providers({ children }) {
    return (_jsx(I18nextProvider, { i18n: i18n, children: _jsxs(QueryClientProvider, { client: queryClient, children: [_jsxs(TooltipProvider, { delayDuration: 300, children: [children, _jsx(Toaster, {})] }), import.meta.env.DEV && _jsx(ReactQueryDevtools, { initialIsOpen: false })] }) }));
}
//# sourceMappingURL=providers.js.map