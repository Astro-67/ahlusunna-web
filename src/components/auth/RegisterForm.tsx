import { Link } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState  } from 'react'
import type {FormEvent} from 'react';

import { Button } from '#/components/ui/button'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'

interface RegisterFormProps {
  onSuccess: () => void
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register } = useAuth()
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
      onSuccess()
    } else {
      setError(t(result.error ?? 'common.error'))
    }
  }

  return (
    <div className="w-full max-w-md border border-border bg-white p-8">
      <h1 className="mb-6 text-[24px] font-bold text-foreground lg:text-[28px]">
        {t('auth.register_title')}
      </h1>

      {error && (
        <div className="mb-4 border border-destructive bg-destructive/10 p-3 text-sm text-destructive" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            {t('auth.name_label')}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-12 w-full border border-border bg-background px-3 text-foreground transition-colors focus:border-2 focus:border-accent focus:outline-none"
            placeholder={t('auth.name_placeholder')}
            autoComplete="name"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="register-email" className="text-sm font-medium text-foreground">
            {t('auth.email_label')}
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full border border-border bg-background px-3 text-foreground transition-colors focus:border-2 focus:border-accent focus:outline-none"
            placeholder={t('auth.email_placeholder')}
            autoComplete="email"
            required
          />
        </div>

        <div className="relative flex flex-col gap-1">
          <label htmlFor="register-password" className="text-sm font-medium text-foreground">
            {t('auth.password_label')}
          </label>
          <input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full border border-border bg-background px-3 pe-10 text-foreground transition-colors focus:border-2 focus:border-accent focus:outline-none"
            placeholder="••••••••"
            autoComplete="new-password"
            required
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

        <div className="flex flex-col gap-1">
          <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
            {t('auth.confirm_password_label')}
          </label>
          <input
            id="confirm-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="h-12 w-full border border-border bg-background px-3 text-foreground transition-colors focus:border-2 focus:border-accent focus:outline-none"
            placeholder="••••••••"
            autoComplete="new-password"
            required
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? t('common.loading') : t('auth.submit_register')}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        {t('auth.has_account')}{' '}
        <Link to="/login" className="text-accent hover:underline">
          {t('navigation.login')}
        </Link>
      </p>
    </div>
  )
}
