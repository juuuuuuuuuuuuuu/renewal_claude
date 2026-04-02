import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import ko from '@shared/i18n/locales/ko.json';
i18n.use(initReactI18next).init({
    resources: { ko: { translation: ko } },
    lng: 'ko',
    fallbackLng: 'ko',
    interpolation: { escapeValue: false },
});
function createTestQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: { retry: false, gcTime: 0 },
            mutations: { retry: false },
        },
    });
}
export function renderWithProviders(ui, { queryClient = createTestQueryClient(), ...options } = {}) {
    function Wrapper({ children }) {
        return (_jsx(I18nextProvider, { i18n: i18n, children: _jsx(QueryClientProvider, { client: queryClient, children: children }) }));
    }
    return render(ui, { wrapper: Wrapper, ...options });
}
export * from '@testing-library/react';
export { renderWithProviders as render };
//# sourceMappingURL=test-utils.js.map