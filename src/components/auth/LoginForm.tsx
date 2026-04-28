import { Link } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState  } from 'react'
import type {FormEvent} from 'react';

import { Button } from '#/components/ui/button'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'

interface LoginFormProps {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useAuth()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)
    setIsLoading(false)

    if (result.success) {
      onSuccess()
    } else {
      setError(t(result.error ?? 'common.error'))
    }
  }

  return (
    <div className="w-full max-w-md border border-border bg-white p-8">
      <h1 className="mb-6 text-[24px] font-bold text-foreground lg:text-[28px]">
        {t('auth.login_title')}
      </h1>

      {error && (
        <div className="mb-4 border border-destructive bg-destructive/10 p-3 text-sm text-destructive" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            {t('auth.email_label')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full border border-border bg-background px-3 text-foreground transition-colors focus:border-2 focus:border-accent focus:outline-none"
            placeholder={t('auth.email_placeholder')}
            required
            autoComplete="email"
          />
        </div>

        <div className="relative flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            {t('auth.password_label')}
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full border border-border bg-background px-3 pe-10 text-foreground transition-colors focus:border-2 focus:border-accent focus:outline-none"
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((shown) => !shown)}
            className="absolute end-3 top-8 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? t('auth.hide_password') : t('auth.show_password')}
          >
            {showPassword ? <EyeOff aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="size-4 rounded-sm border border-border accent-primary"
          />
          <label htmlFor="remember" className="text-sm text-muted-foreground">
            {t('auth.remember_me')}
          </label>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? t('common.loading') : t('auth.submit_login')}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        {t('auth.no_account')}{' '}
        <Link to="/register" className="text-accent hover:underline">
          {t('navigation.register')}
        </Link>
      </p>

      <div className="mt-6 border border-border bg-background p-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">{t('auth.demo_accounts')}:</p>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <p>admin@ahlusunna.info / admin123</p>
          <p>mwanafunzi@ahlusunna.info / user123</p>
          <p>mwanajumuia@ahlusunna.info / user123</p>
        </div>
      </div>
    </div>
  )
}
