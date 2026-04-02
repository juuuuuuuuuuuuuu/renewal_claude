type Locale = 'ko' | 'en' | 'ja';
interface SettingsStore {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}
export declare const useSettingsStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<SettingsStore>, "setState" | "persist"> & {
    setState(partial: SettingsStore | Partial<SettingsStore> | ((state: SettingsStore) => SettingsStore | Partial<SettingsStore>), replace?: false | undefined): unknown;
    setState(state: SettingsStore | ((state: SettingsStore) => SettingsStore), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<SettingsStore, SettingsStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: SettingsStore) => void) => () => void;
        onFinishHydration: (fn: (state: SettingsStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<SettingsStore, SettingsStore, unknown>>;
    };
}>;
export {};
//# sourceMappingURL=settings-store.d.ts.map