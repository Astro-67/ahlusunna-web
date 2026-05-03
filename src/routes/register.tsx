import { createFileRoute, redirect } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

import { useLanguage } from '#/hooks/useLanguage'
import { useAuth } from '#/hooks/useAuth'
import type { Language } from '#/types'
import { RegisterForm } from '#/components/auth/RegisterForm'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

const pageCopy: Record<Language, any> = {
  sw: {
    eyebrow: 'Karibu Ahlusunna',
    title: 'Anza safari yako ya elimu leo',
    subtitle: 'Jiunge na maelfu ya wanafunzi wanaojifunza Uislamu kwa mpangilio, kutoka msingi hadi ufahamu wa kina.',
    arabicQuote: '"وَقُل رَّبِّ زِدْنِي عِلْمًا"',
    arabicTranslation: '"Mola wangu, niongezee elimu." — Qur\'an 20:114',
    feat1: 'Fuatilia maendeleo yako',
    feat2: 'Fungua masomo ya Hatua ya Kati na Kuendelea',
    feat3: 'Pata cheti baada ya kumaliza kozi',
  },
  en: {
    eyebrow: 'Welcome to Ahlusunna',
    title: 'Start your educational journey today',
    subtitle: 'Join thousands of students learning Islam systematically, from basics to deep understanding.',
    arabicQuote: '"وَقُل رَّبِّ زِدْنِي عِلْمًا"',
    arabicTranslation: '"My Lord, increase me in knowledge." — Qur\'an 20:114',
    feat1: 'Track your progress',
    feat2: 'Unlock Intermediate and Advanced lessons',
    feat3: 'Get a certificate upon course completion',
  },
  ar: {
    eyebrow: 'مرحباً بك في أهل السنة',
    title: 'ابدأ رحلتك التعليمية اليوم',
    subtitle: 'انضم إلى آلاف الطلاب الذين يتعلمون الإسلام بمنهجية، من الأساسيات إلى الفهم العميق.',
    arabicQuote: '"وَقُل رَّبِّ زِدْنِي عِلْمًا"',
    arabicTranslation: 'سورة طه: ١١٤',
    feat1: 'تتبع تقدمك',
    feat2: 'فتح دروس المستوى المتوسط والمتقدم',
    feat3: 'احصل على شهادة عند إتمام الدورة',
  }
}

function RegisterPage() {
  const { currentLang } = useLanguage()
  const copy = pageCopy[currentLang]
  const isRtl = currentLang === 'ar'

  return (
    <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-2 bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Promo Side */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-primary px-8 py-12 lg:px-12 lg:py-14">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
            <defs>
              <pattern id="geoAuthReg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect x="20" y="20" width="40" height="40" stroke="#C9A84C" strokeWidth="0.8" fill="none" transform="rotate(45 40 40)" />
                <circle cx="40" cy="40" r="3" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
                <line x1="0" y1="40" x2="20" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="60" y1="40" x2="80" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="0" x2="40" y2="20" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="60" x2="40" y2="80" stroke="#C9A84C" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geoAuthReg)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
            {copy.eyebrow}
          </div>
          <h2 className="mb-4 text-[32px] lg:text-[36px] font-bold leading-[1.15] tracking-[-0.02em] text-[#FAF7F0]">
            {copy.title}
          </h2>
          <p className="max-w-[380px] text-[14px] leading-[1.7] text-[#FAF7F0]/65">
            {copy.subtitle}
          </p>

          <div className="mt-8 max-w-[380px] text-right font-arabic text-[22px] leading-[1.7] text-accent" dir="rtl">
            {copy.arabicQuote}
            <div className="mt-1.5 text-left font-sans text-[12px] italic text-[#FAF7F0]/50" dir="ltr">
              {copy.arabicTranslation}
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-12 space-y-0 lg:mt-auto pt-8">
          {[copy.feat1, copy.feat2, copy.feat3].map((feat: string, i: number) => (
            <div key={i} className="flex items-center gap-3 border-t border-white/10 py-3 text-[13px] text-[#FAF7F0]/70">
              <div className="flex size-[18px] shrink-0 items-center justify-center border border-accent/50 bg-accent/20">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              {feat}
            </div>
          ))}
        </div>
      </div>

      {/* Form Side */}
      <div className="flex flex-col justify-center px-8 py-12 lg:px-14">
        <div className="mx-auto w-full max-w-[420px]">
          <RegisterForm onSuccess={() => {}} />
        </div>
      </div>
      
    </div>
  )
}
