import { Link } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

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
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <img
          src="/Ahlusunna-logo.png"
          alt="Ahlusunna"
          className="mx-auto mb-4 h-16 w-auto object-contain"
        />
        <h1 className="text-2xl font-bold text-foreground">
          {t('auth.login_title')}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your credentials to access your account
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t('auth.email_label')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder={t('auth.email_placeholder')}
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {t('auth.password_label')}
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 pe-12 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
              aria-label={showPassword ? t('auth.hide_password') : t('auth.show_password')}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-600">{t('auth.remember_me')}</span>
          </label>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full py-3">
          {isLoading ? t('common.loading') : t('auth.submit_login')}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        {t('auth.no_account')}{' '}
        <Link to="/register" className="font-medium text-primary hover:underline">
          {t('navigation.register')}
        </Link>
      </p>

      <div className="mt-8 rounded-lg bg-gray-50 p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Demo accounts</p>
        <div className="space-y-1 text-xs text-gray-600">
          <p><span className="font-medium">Admin:</span> admin@ahlusunna.info / admin123</p>
          <p><span className="font-medium">Student:</span> mwanafunzi@ahlusunna.info / user123</p>
        </div>
      </div>
    </div>
  )
}
