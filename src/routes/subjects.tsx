import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronRight, Play, CheckCircle2, Lock, ShieldCheck, Zap } from 'lucide-react'

import { SubjectCard } from '#/components/subjects/SubjectCard'
import { lessons, subjects } from '#/data/seed'
import { useLanguage } from '#/hooks/useLanguage'
import { useAuth } from '#/hooks/useAuth'
import type { Language } from '#/types'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/subjects')({ component: SubjectsPage })

const pageCopy: Record<
  Language,
  {
    breadcrumbHome: string
    breadcrumbLevel: string
    levelEyebrow: string
    title: string
    subtitle: string
    subjectsLabel: string
    statsLessons: string
    statsFree: string
    statsStart: string
    registerTitle: string
    registerDesc: string
    registerBtn: string
  }
> = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbLevel: 'Subjects',
    levelEyebrow: 'Learning Level',
    title: 'Beginner — Subjects',
    subtitle: 'Choose any subject to begin your learning journey. All Beginner subjects are available without an account.',
    subjectsLabel: '6 Subjects available — Beginner',
    statsLessons: '6 Subjects',
    statsFree: 'Free forever',
    statsStart: 'Start right now',
    registerTitle: 'Track your progress',
    registerDesc: 'Join for free to save your progress and unlock Intermediate lessons.',
    registerBtn: 'Join for Free →',
  },
  sw: {
    breadcrumbHome: 'Nyumbani',
    breadcrumbLevel: 'Masomo',
    levelEyebrow: 'Hatua ya Kujifunza',
    title: 'Hatua ya Awali — Masomo',
    subtitle: 'Chagua somo lolote kuanza safari yako ya kujifunza. Masomo yote ya Hatua ya Awali yanapatikana bila akaunti.',
    subjectsLabel: 'Masomo 6 yanapatikana — Hatua ya Awali',
    statsLessons: 'Masomo 6',
    statsFree: 'Bure milele',
    statsStart: 'Anza sasa hivi',
    registerTitle: 'Fuatilia maendeleo yako',
    registerDesc: 'Jiunge bure ili uhifadhi mahali ulipofika na upate masomo ya Hatua ya Kati.',
    registerBtn: 'Jiunge Bure →',
  },
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbLevel: 'المواد',
    levelEyebrow: 'مرحلة التعلم',
    title: 'المستوى المبتدئ — المواد',
    subtitle: 'اختر أي مادة لبدء رحلة التعلم. جميع مواد المستوى المبتدئ متاحة بدون حساب.',
    subjectsLabel: '6 مواد متاحة — مبتدئ',
    statsLessons: '6 مواد',
    statsFree: 'مجاني دائماً',
    statsStart: 'ابدأ الآن',
    registerTitle: 'تتبع تقدمك',
    registerDesc: 'انضم مجانًا لحفظ تقدمك وفتح دروس المستوى المتوسط.',
    registerBtn: 'انضم مجاناً ←',
  },
}

function SubjectsPage() {
  const { currentLang } = useLanguage()
  const { isAuthenticated } = useAuth()
  const copy = pageCopy[currentLang]

  const beginnerSubjects = subjects.filter((s) => (s.levelId as string) === 'awali')

  return (
    <div className="bg-background flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-6 py-10 lg:px-12 lg:py-12">
        {/* Geometric Background */}
        <div className="absolute inset-y-0 right-0 w-[400px] opacity-[0.06] pointer-events-none hidden md:block">
          <svg viewBox="0 0 400 500" fill="none" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
            <defs>
              <pattern id="geo1" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect x="20" y="20" width="40" height="40" stroke="#C9A84C" strokeWidth="0.8" fill="none" transform="rotate(45 40 40)" />
                <circle cx="40" cy="40" r="3" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
                <line x1="0" y1="40" x2="20" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="60" y1="40" x2="80" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="0" x2="40" y2="20" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="60" x2="40" y2="80" stroke="#C9A84C" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="400" height="500" fill="url(#geo1)" />
          </svg>
        </div>

        <div className="container-main relative z-10">
          <div className="mb-4 flex items-center gap-1.5 text-xs text-[#FAF7F0]/55 font-medium">
            <Link to="/" className="flex items-center gap-1 transition-colors hover:text-[#FAF7F0]/90">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              {copy.breadcrumbHome}
            </Link>
            <span className="text-[10px] text-[#FAF7F0]/25">›</span>
            <span className="text-[#FAF7F0]/85 font-semibold">{copy.breadcrumbLevel}</span>
          </div>

          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-accent">
            <span className="h-px w-5 bg-accent" />
            {copy.levelEyebrow}
          </div>

          <h1 className="mb-3 text-[30px] lg:text-[38px] font-bold leading-[1.15] tracking-[-0.02em] text-[#FAF7F0]">
            {copy.title}
          </h1>

          <p className="mb-8 max-w-[500px] text-[14px] lg:text-[15px] leading-[1.65] text-[#FAF7F0]/65">
            {copy.subtitle}
          </p>

          <div className="flex flex-wrap gap-2">
            <button className="bg-accent px-5 py-2 text-[13px] font-semibold text-foreground transition-all duration-150">
              Hatua ya Awali
            </button>
            <Link to="/subjects/intermediate" className="flex items-center gap-2 border border-white/12 bg-white/5 px-5 py-2 text-[13px] font-semibold text-[#FAF7F0]/45 transition-all duration-150 hover:bg-white/10 hover:text-[#FAF7F0]">
              <Lock className="size-3.5" strokeWidth={2.5} />
              Hatua ya Kati
            </Link>
            <Link to="/subjects/advanced" className="flex items-center gap-2 border border-white/12 bg-white/5 px-5 py-2 text-[13px] font-semibold text-[#FAF7F0]/45 transition-all duration-150 hover:bg-white/10 hover:text-[#FAF7F0]">
              <Lock className="size-3.5" strokeWidth={2.5} />
              Kuendelea
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="border-b border-border bg-white px-6 py-3.5 lg:px-12">
        <div className="container-main flex flex-wrap items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <ShieldCheck className="size-[15px] text-primary" strokeWidth={2} />
            <span><strong className="font-semibold text-foreground">{beginnerSubjects.length}</strong> {copy.statsLessons.split(' ')[1]}</span>
          </div>
          <div className="h-[18px] w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <CheckCircle2 className="size-[15px] text-primary" strokeWidth={2} />
            <span>{copy.statsFree}</span>
          </div>
          <div className="h-[18px] w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Zap className="size-[15px] text-primary" strokeWidth={2} />
            <span>{copy.statsStart}</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="container-main flex-1 px-6 py-10 lg:px-12 lg:py-12">
        <div className="mb-6 text-[12px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
          {copy.subjectsLabel}
        </div>

        <div className="grid grid-cols-1 gap-[1px] border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {beginnerSubjects.map((subject, index) => {
            const lessonCount = lessons.filter((l) => l.subjectId === subject.id).length
            // Mocking featured status for the first item like in design
            const isFeatured = index === 0

            return (
              <Link
                key={subject.id}
                to="/subjects/$slug"
                params={{ slug: subject.slug }}
                className="block outline-none"
              >
                <SubjectCard
                  subject={{
                    id: subject.id,
                    name: subject.name[currentLang],
                    nameAr: subject.name.ar,
                    slug: subject.slug,
                    description: subject.description[currentLang],
                    icon: subject.icon,
                    lessonCount,
                  }}
                  featured={isFeatured}
                  index={index}
                />
              </Link>
            )
          })}
        </div>

        {/* Register Nudge */}
        {!isAuthenticated && (
          <div className="mt-8 flex flex-col items-start justify-between gap-6 bg-primary p-6 px-8 md:flex-row md:items-center">
            <div>
              <h4 className="mb-1 text-[15px] font-semibold text-[#FAF7F0]">{copy.registerTitle}</h4>
              <p className="text-[13px] text-[#FAF7F0]/60">{copy.registerDesc}</p>
            </div>
            <Button asChild variant="accent" className="shrink-0 whitespace-nowrap px-7 py-3 text-[14px]">
              <Link to="/register">{copy.registerBtn}</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
