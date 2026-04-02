type Theme = 'light' | 'dark' | 'system';
interface UIStore {
    sidebarOpen: boolean;
    theme: Theme;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setTheme: (theme: Theme) => void;
}
export declare const useUIStore: import("zustand").UseBoundStore<import("zustand").StoreApi<UIStore>>;
export {};
//# sourceMappingURL=ui-store.d.ts.map