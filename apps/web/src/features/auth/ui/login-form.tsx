import { useTranslation } from 'react-i18next'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hub/ui'

import { env } from '@shared/config'

export function LoginForm() {
  const { t } = useTranslation()

  const handleSSOLogin = () => {
    const params = new URLSearchParams({
      client_id: env.SSO_CLIENT_ID,
      redirect_uri: `${window.location.origin}/login/callback`,
      response_type: 'code',
      scope: 'openid profile email',
    })
    window.location.href = `${env.SSO_AUTHORITY}/oauth/authorize?${params}`
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Hub</CardTitle>
          <CardDescription>{t('auth.login_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleSSOLogin} size="lg">
            {t('auth.sso_login')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
