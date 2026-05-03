import { Link, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import { mockUsers as seedUsers } from '#/data/seed'

interface LoginFormProps {
  onSuccess?: () => void
  redirect?: string
}

export function LoginForm({ onSuccess, redirect }: LoginFormProps) {
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
        // Centralized redirection logic
        const users = seedUsers // we need to get the user object to check role
        const loggedInUser = users.find(u => u.email === email.trim().toLowerCase())
        
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
    <div className="w-full">
      <div className="mb-8">
        <Link to="/" className="inline-block mb-3">
          <img
            src="/Ahlusunna-logo.png"
            alt="Ahlusunna"
            className="h-24 w-auto"
          />
        </Link>
        <h2 className="mb-2 text-[24px] font-bold text-foreground">
          {t('auth.login_title')}
        </h2>
        <p className="text-[13px] text-muted-foreground">
          {t('auth.no_account')}{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            {t('navigation.register')}
          </Link>
        </p>
      </div>

      {error && (
        <div className="mb-5 border border-destructive bg-destructive/10 p-3 text-[13px] text-destructive" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[12px] font-semibold tracking-[0.02em] text-foreground">
            {t('auth.email_label')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-background border border-border p-[11px_14px] font-sans text-[14px] text-foreground transition-colors focus:border-primary focus:bg-surface focus:outline-none text-left"
            dir="ltr"
            placeholder={t('auth.email_placeholder')}
            required
            autoComplete="email"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="block text-[12px] font-semibold tracking-[0.02em] text-foreground">
              {t('auth.password_label')}
            </label>
            <Link to="/forgot-password" className="text-[11px] font-semibold text-muted-foreground hover:text-primary hover:underline">
              Umesahau nenosiri?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-background border border-border p-[11px_14px] font-sans text-[14px] text-foreground transition-colors focus:border-primary focus:bg-surface focus:outline-none"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground", isRtl ? "left-4" : "right-4")}
              aria-label={showPassword ? t('auth.hide_password') : t('auth.show_password')}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="mt-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="size-4 shrink-0 accent-primary"
            />
            <span className="text-[13px] text-muted-foreground">{t('auth.remember_me')}</span>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading} 
          className={cn(
            "mt-2 w-full p-[13px] bg-primary text-white border-none font-sans text-[14px] font-semibold cursor-pointer transition-colors letter-spacing-[0.01em]",
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-dark"
          )}
        >
          {isLoading ? t('common.loading') : t('auth.submit_login')}
        </button>
      </form>

      <div className="mt-8 border-t border-border pt-6">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Demo Accounts</div>
        <div className="space-y-1.5 text-[12px] text-muted-foreground">
          <p><strong className="font-semibold text-foreground">Admin:</strong> admin@ahlusunna.info / admin123</p>
          <p><strong className="font-semibold text-foreground">Moderator:</strong> moderator@ahlusunna.info / mod123</p>
          <p><strong className="font-semibold text-foreground">Mwanafunzi:</strong> mwanafunzi@ahlusunna.info / user123</p>
        </div>
      </div>
    </div>
  )
}
