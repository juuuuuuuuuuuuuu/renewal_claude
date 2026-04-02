import i18n from 'i18next'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Locale = 'ko' | 'en' | 'ja'

interface SettingsStore {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      locale: 'ko',
      setLocale: (locale) => {
        i18n.changeLanguage(locale)
        set({ locale })
      },
    }),
    { name: 'hub-settings' }
  )
)
