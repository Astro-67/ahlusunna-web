import { Link, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { LogoNavbar } from '#/components/common/Logo'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import { mockUsers as seedUsers } from '#/data/seed'

interface LoginFormProps {
  onSuccess?: () => void
  redirect?: string
}

const forgotCopy: Record<'sw' | 'en' | 'ar', string> = {
  sw: 'Umesahau nenosiri?',
  en: 'Forgot password?',
  ar: 'نسيت كلمة المرور؟',
}

export function LoginForm({ onSuccess, redirect: _redirect }: LoginFormProps) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t, currentLang } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isRtl = currentLang === 'ar'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)
    setIsLoading(false)

    if (result.success) {
      if (onSuccess) {
        onSuccess()
      } else {
        const users = seedUsers
        const loggedInUser = users.find((u) => u.email === email.trim().toLowerCase())

        if (!loggedInUser) {
          void navigate({ to: '/' })
          return
        }

        if (loggedInUser.role === 'admin') {
          void navigate({ to: '/admin' })
        } else if (loggedInUser.role === 'moderator') {
          void navigate({ to: '/moderator' })
        } else {
          void navigate({ to: '/subjects' })
        }
      }
    } else {
      setError(t(result.error ?? 'common.error'))
    }
  }

  return (
    <div className="w-full animate-[fadeUp_500ms_ease-out_both]">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Logo — centered above the title */}
      <div className="mb-7 flex justify-center">
        <Link
          to="/"
          className="transition-opacity duration-200 hover:opacity-85"
          aria-label="Ahlusunna home"
        >
          <LogoNavbar />
        </Link>
      </div>

      {/* Heading — centered */}
      <div className="mb-8 text-center">
        <div className="mb-1.5 flex items-center justify-center gap-2">
          <span className="h-px w-5 bg-accent" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
            {currentLang === 'sw' ? 'Ingia' : currentLang === 'ar' ? 'دخول' : 'Sign in'}
          </span>
          <span className="h-px w-5 bg-accent" />
        </div>
        <h2 className="font-decorative text-[26px] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-[30px]">
          {t('auth.login_title')}
        </h2>
        <p className="mt-1.5 text-[12.5px] leading-snug text-muted-foreground sm:text-[13px]">
          {t('auth.no_account')}{' '}
          <Link
            to="/register"
            className="font-semibold text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {t('navigation.register')}
          </Link>
        </p>
      </div>

      {error && (
        <div
          className="mb-5 border-l-2 border-destructive bg-destructive/8 px-4 py-3 text-[13px] text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-foreground/80"
          >
            {t('auth.email_label')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border border-border bg-card px-4 py-3 font-sans text-[15px] text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:border-primary focus:bg-background focus:shadow-[inset_0_-2px_0_var(--color-accent)] focus:outline-none"
            dir="ltr"
            placeholder={t('auth.email_placeholder')}
            required
            autoComplete="email"
          />
        </div>

        <div>
          <div className={cn('mb-2 flex items-center justify-between', isRtl && 'flex-row-reverse')}>
            <label
              htmlFor="password"
              className="block text-[11px] font-bold uppercase tracking-[0.14em] text-foreground/80"
            >
              {t('auth.password_label')}
            </label>
            <Link
              to="/forgot-password"
              className="text-[11px] font-semibold text-muted-foreground transition-colors hover:text-accent"
            >
              {forgotCopy[currentLang]}
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-border bg-card px-4 py-3 pe-11 font-sans text-[15px] text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:border-primary focus:bg-background focus:shadow-[inset_0_-2px_0_var(--color-accent)] focus:outline-none"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              className={cn(
                'absolute top-1/2 flex size-9 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-primary',
                isRtl ? 'left-1' : 'right-1',
              )}
              aria-label={showPassword ? t('auth.hide_password') : t('auth.show_password')}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <label className="mt-1 flex cursor-pointer items-center gap-2.5 select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="size-4 shrink-0 accent-primary"
          />
          <span className="text-[13px] text-muted-foreground">{t('auth.remember_me')}</span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'group relative mt-3 flex w-full items-center justify-center gap-2 overflow-hidden bg-primary px-6 py-3.5 text-[14px] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-all duration-300',
            isLoading
              ? 'cursor-not-allowed opacity-70'
              : 'hover:bg-[var(--color-primary-dark)] hover:shadow-[0_8px_24px_rgba(27,67,50,0.18)]',
          )}
        >
          <span className="relative z-10">
            {isLoading ? t('common.loading') : t('auth.submit_login')}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
          />
        </button>
      </form>
    </div>
  )
}
