import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardHeader, CardTitle, Label, Switch } from '@hub/ui'

import { PageHeader } from '@shared/ui'
import { useUIStore, useSettingsStore } from '@shared/model'

export function SettingsPage() {
  const { t } = useTranslation()
  const { theme, setTheme } = useUIStore()
  const { locale, setLocale } = useSettingsStore()

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title={t('nav.settings')} />

      <Card>
        <CardHeader><CardTitle className="text-base">화면 설정</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">다크 모드</Label>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">언어 설정</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {(['ko', 'en', 'ja'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLocale(lang)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                locale === lang ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              {lang === 'ko' ? '한국어' : lang === 'en' ? 'English' : '日本語'}
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
