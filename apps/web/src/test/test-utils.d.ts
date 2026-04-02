import { QueryClient } from '@tanstack/react-query';
import { type RenderOptions, type RenderResult } from '@testing-library/react';
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    queryClient?: QueryClient;
}
export declare function renderWithProviders(ui: React.ReactElement, { queryClient, ...options }?: CustomRenderOptions): RenderResult;
export * from '@testing-library/react';
export { renderWithProviders as render };
//# sourceMappingURL=test-utils.d.ts.map