import { Link, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

interface RegisterFormProps {
  onSuccess?: () => void
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { t, currentLang } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isRtl = currentLang === 'ar'

  const validate = () => {
    if (!name.trim()) return t('auth.error_name_required')
    if (name.trim().length < 2) return t('auth.error_name_length')
    if (!email.trim()) return t('auth.error_email_required')
    if (!emailRegex.test(email.trim())) return t('auth.error_email_invalid')
    if (!password) return t('auth.error_password_required')
    if (password.length < 6) return t('auth.error_password_length')
    if (password !== confirmPassword) return t('auth.error_password_match')
    return ''
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setIsLoading(true)
    const result = await register(name, email, password)
    setIsLoading(false)

    if (result.success) {
      if (onSuccess) {
        onSuccess()
      } else {
        void navigate({ to: '/' })
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
          {t('auth.register_title')}
        </h2>
        <p className="text-[13px] text-muted-foreground">
          {t('auth.has_account')}{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            {t('navigation.login')}
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
          <label htmlFor="name" className="mb-1.5 block text-[12px] font-semibold tracking-[0.02em] text-foreground">
            {t('auth.name_label')}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full bg-background border border-border p-[11px_14px] font-sans text-[14px] text-foreground transition-colors focus:border-primary focus:bg-surface focus:outline-none"
            placeholder={t('auth.name_placeholder')}
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label htmlFor="register-email" className="mb-1.5 block text-[12px] font-semibold tracking-[0.02em] text-foreground">
            {t('auth.email_label')}
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-background border border-border p-[11px_14px] font-sans text-[14px] text-foreground transition-colors focus:border-primary focus:bg-surface focus:outline-none text-left"
            dir="ltr"
            placeholder={t('auth.email_placeholder')}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="register-password" className="mb-1.5 block text-[12px] font-semibold tracking-[0.02em] text-foreground">
            {t('auth.password_label')}
          </label>
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-background border border-border p-[11px_14px] font-sans text-[14px] text-foreground transition-colors focus:border-primary focus:bg-surface focus:outline-none"
              placeholder="••••••••"
              autoComplete="new-password"
              required
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

        <div>
          <label htmlFor="confirm-password" className="mb-1.5 block text-[12px] font-semibold tracking-[0.02em] text-foreground">
            {t('auth.confirm_password_label')}
          </label>
          <input
            id="confirm-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="w-full bg-background border border-border p-[11px_14px] font-sans text-[14px] text-foreground transition-colors focus:border-primary focus:bg-surface focus:outline-none"
            placeholder="••••••••"
            autoComplete="new-password"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading} 
          className={cn(
            "mt-2 w-full p-[13px] bg-primary text-white border-none font-sans text-[14px] font-semibold cursor-pointer transition-colors letter-spacing-[0.01em]",
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-dark"
          )}
        >
          {isLoading ? t('common.loading') : t('auth.submit_register')}
        </button>
      </form>
    </div>
  )
}
