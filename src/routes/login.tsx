import { Link, createFileRoute, redirect } from '@tanstack/react-router'

import { useLanguage } from '#/hooks/useLanguage'
import type { Language } from '#/types'
import { LoginForm } from '#/components/auth/LoginForm'

interface LoginSearch {
  redirect?: string
}

export const Route = createFileRoute('/login')({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

const pageCopy: Record<Language, any> = {
  sw: {
    eyebrow: 'Karibu Tena',
    title: 'Endelea safari yako ya kujifunza Uislamu',
    subtitle:
      'Ingia ili kuona masomo yako, kuhifadhi maendeleo, na kupata masomo mapya yanayotolewa kila wiki.',
    arabicQuote: '"وَقُل رَّبِّ زِدْنِي عِلْمًا"',
    arabicTranslation: '"Mola wangu, niongezee elimu." — Qur\'an 20:114',
    feat1: 'Hifadhi maendeleo katika vifaa vyote',
    feat2: 'Vyeti vya kumaliza masomo',
    feat3: 'Komentari na maswali kwa masheikh',
    backHome: 'Rudi Nyumbani',
  },
  en: {
    eyebrow: 'Welcome Back',
    title: 'Continue your journey of learning Islam',
    subtitle:
      'Log in to view your lessons, save progress, and access new lessons published every week.',
    arabicQuote: '"وَقُل رَّبِّ زِدْنِي عِلْمًا"',
    arabicTranslation: '"My Lord, increase me in knowledge." — Qur\'an 20:114',
    feat1: 'Save progress across all devices',
    feat2: 'Course completion certificates',
    feat3: 'Comments and questions to scholars',
    backHome: 'Back to Home',
  },
  ar: {
    eyebrow: 'مرحباً بعودتك',
    title: 'واصل رحلتك في تعلم الإسلام',
    subtitle:
      'سجل الدخول لعرض دروسك، وحفظ تقدمك، والوصول إلى الدروس الجديدة التي تنشر كل أسبوع.',
    arabicQuote: '"وَقُل رَّبِّ زِدْنِي عِلْمًا"',
    arabicTranslation: 'سورة طه: ١١٤',
    feat1: 'حفظ التقدم عبر جميع الأجهزة',
    feat2: 'شهادات إتمام الدورات',
    feat3: 'تعليقات وأسئلة للعلماء',
    backHome: 'العودة إلى الصفحة الرئيسية',
  },
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M0 1 H50" stroke="currentColor" strokeWidth="1" />
      <path d="M1 0 V50" stroke="currentColor" strokeWidth="1" />
      <path d="M0 8 H32" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <path d="M8 0 V32" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <circle cx="14" cy="14" r="2" stroke="currentColor" strokeWidth="0.8" />
      <path
        d="M14 6 L18 14 L14 22 L10 14 Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.6"
      />
    </svg>
  )
}

function LoginPage() {
  const search = Route.useSearch()
  const { currentLang } = useLanguage()
  const copy = pageCopy[currentLang]
  const isRtl = currentLang === 'ar'

  return (
    <div
      className="grid min-h-[calc(100svh-5rem)] grid-cols-1 bg-background lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.1fr_1fr]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Promo Side */}
      <aside className="relative isolate flex flex-col overflow-hidden bg-primary px-8 py-12 text-primary-foreground lg:px-14 lg:py-16">
        {/* Geometric pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true">
          <svg
            viewBox="0 0 400 600"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full"
          >
            <defs>
              <pattern
                id="geoAuth"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="20"
                  y="20"
                  width="40"
                  height="40"
                  stroke="#C9A84C"
                  strokeWidth="0.8"
                  fill="none"
                  transform="rotate(45 40 40)"
                />
                <circle cx="40" cy="40" r="3" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
                <line x1="0" y1="40" x2="20" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="60" y1="40" x2="80" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="0" x2="40" y2="20" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="60" x2="40" y2="80" stroke="#C9A84C" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geoAuth)" />
          </svg>
        </div>

        {/* Subtle radial vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.18),transparent_55%)]"
        />

        {/* Gold corner ornaments */}
        <CornerOrnament className="absolute left-6 top-6 size-14 text-accent/50 lg:left-10 lg:top-10 lg:size-20" />
        <CornerOrnament className="absolute bottom-6 right-6 size-14 rotate-180 text-accent/50 lg:bottom-10 lg:right-10 lg:size-20" />

        {/* Headline block */}
        <div className="relative z-10 mt-10 lg:mt-14 max-w-xl">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              {copy.eyebrow}
            </span>
          </div>

          <h2 className="font-decorative text-[34px] font-semibold leading-[1.12] tracking-tight text-[#FAF7F0] sm:text-[42px] lg:text-[48px]">
            {copy.title}
          </h2>

          <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-[#FAF7F0]/70">
            {copy.subtitle}
          </p>

          {/* Quranic verse */}
          <figure className="mt-10 max-w-md border-s-2 border-accent/60 ps-5">
            <p
              className="font-arabic text-[24px] leading-[1.85] text-accent lg:text-[28px]"
              dir="rtl"
            >
              {copy.arabicQuote}
            </p>
            <figcaption
              className="mt-2 font-sans text-[12px] italic text-[#FAF7F0]/55"
              dir="ltr"
            >
              {copy.arabicTranslation}
            </figcaption>
          </figure>
        </div>

        {/* Spacer pushing features down */}
        <div className="flex-1" />

        {/* Features */}
        <ul className="relative z-10 mt-12 space-y-0 lg:mt-16">
          {[copy.feat1, copy.feat2, copy.feat3].map((feat: string, i: number) => (
            <li
              key={i}
              className="group flex items-center gap-4 border-t border-white/10 py-3.5 text-[13.5px] text-[#FAF7F0]/75 transition-colors duration-200 last:border-b last:border-white/10 hover:text-[#FAF7F0]"
            >
              <span className="flex size-5 shrink-0 items-center justify-center border border-accent/60 bg-accent/15 transition-colors duration-200 group-hover:bg-accent/30">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="3.2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="leading-snug">{feat}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Form Side */}
      <section className="relative flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
        {/* Hairline ornaments framing the form column */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-12 inset-s-0 hidden w-px bg-linear-to-b from-transparent via-accent/25 to-transparent lg:block"
        />

        <div className="mx-auto w-full max-w-110">
          <LoginForm redirect={search.redirect} />

          {/* Back home link */}
          <div className="mt-10 flex items-center gap-3 text-[12px] text-muted-foreground">
            <span className="h-px w-6 bg-border" />
            <Link
              to="/"
              className="font-medium uppercase tracking-[0.16em] transition-colors hover:text-accent"
            >
              ← {copy.backHome}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
