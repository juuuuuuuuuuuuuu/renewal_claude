import type { DashboardState } from './types';
export declare const useDashboardStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<DashboardState>, "setState" | "persist"> & {
    setState(partial: DashboardState | Partial<DashboardState> | ((state: DashboardState) => DashboardState | Partial<DashboardState>), replace?: false | undefined): unknown;
    setState(state: DashboardState | ((state: DashboardState) => DashboardState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<DashboardState, DashboardState, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: DashboardState) => void) => () => void;
        onFinishHydration: (fn: (state: DashboardState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<DashboardState, DashboardState, unknown>>;
    };
}>;
//# sourceMappingURL=layout-store.d.ts.map