import { createFileRoute, redirect, Link  } from '@tanstack/react-router'
import { useState } from 'react'

import { useLanguage } from '#/hooks/useLanguage'
import type { Language } from '#/types'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPasswordPage,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

const pageCopy: Record<Language, any> = {
  sw: {
    eyebrow: 'Usijali',
    title: 'Rudisha Nenosiri Lako',
    subtitle: 'Ingiza barua pepe yako na tutakutumia maelekezo ya jinsi ya kurudisha nenosiri lako haraka.',
    labelEmail: 'Barua pepe',
    placeholderEmail: 'jina@email.com',
    btnSubmit: 'Tuma Maelekezo',
    btnSending: 'Inatuma...',
    successMsg: 'Maelekezo yametumwa! Angalia barua pepe yako.',
    backToLogin: 'Rudi kuingia'
  },
  en: {
    eyebrow: 'Do not worry',
    title: 'Reset Your Password',
    subtitle: 'Enter your email and we will send you instructions on how to reset your password quickly.',
    labelEmail: 'Email',
    placeholderEmail: 'name@email.com',
    btnSubmit: 'Send Instructions',
    btnSending: 'Sending...',
    successMsg: 'Instructions sent! Please check your email.',
    backToLogin: 'Back to login'
  },
  ar: {
    eyebrow: 'لا تقلق',
    title: 'إعادة تعيين كلمة المرور',
    subtitle: 'أدخل بريدك الإلكتروني وسنرسل لك تعليمات حول كيفية إعادة تعيين كلمة المرور الخاصة بك بسرعة.',
    labelEmail: 'البريد الإلكتروني',
    placeholderEmail: 'name@email.com',
    btnSubmit: 'إرسال التعليمات',
    btnSending: 'جارٍ الإرسال...',
    successMsg: 'تم إرسال التعليمات! يرجى التحقق من بريدك الإلكتروني.',
    backToLogin: 'العودة لتسجيل الدخول'
  }
}

function ForgotPasswordPage() {
  const { currentLang } = useLanguage()
  const copy = pageCopy[currentLang]
  const isRtl = currentLang === 'ar'

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1000)
  }

  return (
    <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-2 bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Promo Side */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-primary px-8 py-12 lg:px-12 lg:py-14">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
            <defs>
              <pattern id="geoAuthForg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect x="20" y="20" width="40" height="40" stroke="#C9A84C" strokeWidth="0.8" fill="none" transform="rotate(45 40 40)" />
                <circle cx="40" cy="40" r="3" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
                <line x1="0" y1="40" x2="20" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="60" y1="40" x2="80" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="0" x2="40" y2="20" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="60" x2="40" y2="80" stroke="#C9A84C" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geoAuthForg)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
            {copy.eyebrow}
          </div>
          <h2 className="mb-4 text-[32px] lg:text-[36px] font-bold leading-[1.15] tracking-[-0.02em] text-[#FAF7F0]">
            {copy.title}
          </h2>
          <p className="max-w-95 text-[14px] leading-[1.7] text-[#FAF7F0]/65">
            {copy.subtitle}
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex flex-col justify-center px-8 py-12 lg:px-14">
        <div className="mx-auto w-full max-w-105">
          <div className="mb-8">
            <Link to="/" className="inline-block mb-3">
              <img
                src="/Ahlusunna-logo.png"
                alt="Ahlusunna"
                className="h-24 w-auto"
              />
            </Link>
            <h2 className="mb-2 text-[24px] font-bold text-foreground">
              {copy.title}
            </h2>
            <p className="text-[13px] text-muted-foreground">
              {copy.backToLogin}{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Ingia
              </Link>
            </p>
          </div>

          {isSuccess ? (
            <div className="mb-5 border border-primary bg-[#1B4332]/5 p-4 text-[13px] text-primary" role="alert">
              {copy.successMsg}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[12px] font-semibold tracking-[0.02em] text-foreground">
                  {copy.labelEmail}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-background border border-border p-[11px_14px] font-sans text-[14px] text-foreground transition-colors focus:border-primary focus:bg-surface focus:outline-none text-left"
                  dir="ltr"
                  placeholder={copy.placeholderEmail}
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                className={cn(
                  "mt-2 w-full p-3.25 bg-primary text-white border-none font-sans text-[14px] font-semibold cursor-pointer transition-colors letter-spacing-[0.01em]",
                  isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-dark"
                )}
              >
                {isLoading ? copy.btnSending : copy.btnSubmit}
              </button>
            </form>
          )}
        </div>
      </div>
      
    </div>
  )
}
