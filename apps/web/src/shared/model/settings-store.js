import i18n from 'i18next';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useSettingsStore = create()(persist((set) => ({
    locale: 'ko',
    setLocale: (locale) => {
        i18n.changeLanguage(locale);
        set({ locale });
    },
}), { name: 'hub-settings' }));
//# sourceMappingURL=settings-store.js.map