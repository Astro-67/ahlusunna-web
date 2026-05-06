import { Link, createFileRoute } from '@tanstack/react-router'
import {
  BookOpen,
  CheckCircle2,
  FileText,
  Lock,
  ShieldCheck,
  Zap,
} from 'lucide-react'

import { Button } from '#/components/ui/button'
import { levelService, subjectService, lessonService } from '#/data/services'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { Language } from '#/types'

export const Route = createFileRoute('/subjects')({
  component: SubjectsPage,
})

const subjectIcons: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean; strokeWidth?: number }>> = {
  quran: BookOpen,
  hadith: FileText,
  fiqhi: BookOpen,
  tawhidi: CheckCircle2,
  sira: BookOpen,
  adhkar: CheckCircle2,
}

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
    allLevels: string
    levelName: string
  }
> = {
  en: {
    breadcrumbHome: 'Nyumbani',
    breadcrumbLevel: 'Masomo',
    levelEyebrow: 'Hatua ya Kujifunza',
    title: 'Masomo ya Hatua ya Awali',
    subtitle: 'Chagua somo lolote kuanza safari yako ya kujifunza. Masomo yote ya Hatua ya Awali yanapatikana bila akaunti.',
    subjectsLabel: 'Masomo 6 yanapatikana — Hatua ya Awali',
    statsLessons: 'Masomo 6',
    statsFree: 'Bure milele',
    statsStart: 'Anza sasa hivi',
    registerTitle: 'Fuatilia maendeleo yako',
    registerDesc: 'Jiunge bure ili uhifadhi mahali ulipofika na upate masomo ya Hatua ya Kati.',
    registerBtn: 'Jiunge Bure →',
    allLevels: 'Hatua Zote',
    levelName: 'Hatua ya Awali',
  },
  sw: {
    breadcrumbHome: 'Nyumbani',
    breadcrumbLevel: 'Masomo',
    levelEyebrow: 'Hatua ya Kujifunza',
    title: 'Masomo ya Hatua ya Awali',
    subtitle: 'Chagua somo lolote kuanza safari yako ya kujifunza. Masomo yote ya Hatua ya Awali yanapatikana bila akaunti.',
    subjectsLabel: 'Masomo 6 yanapatikana — Hatua ya Awali',
    statsLessons: 'Masomo 6',
    statsFree: 'Bure milele',
    statsStart: 'Anza sasa hivi',
    registerTitle: 'Fuatilia maendeleo yako',
    registerDesc: 'Jiunge bure ili uhifadhi mahali ulipofika na upate masomo ya Hatua ya Kati.',
    registerBtn: 'Jiunge Bure →',
    allLevels: 'Hatua Zote',
    levelName: 'Hatua ya Awali',
  },
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbLevel: 'المواد',
    levelEyebrow: 'مرحلة التعلم',
    title: 'مستوى المبتدئ — المواد',
    subtitle: 'اختر أي مادة لبدء رحلتك التعليمية. جميع مواد المستوى المبتدئ متاحة بدون حساب.',
    subjectsLabel: '٦ مواد متاحة — المستوى المبتدئ',
    statsLessons: '٦ مواد',
    statsFree: 'مجاني دائمًا',
    statsStart: 'ابدأ الآن',
    registerTitle: 'تتبع تقدمك',
    registerDesc: 'انضم مجانًا لحفظ تقدمك وفتح دروس المستوى المتوسط.',
    registerBtn: 'انضم مجاناً ←',
    allLevels: 'جميع المستويات',
    levelName: 'المستوى المبتدئ',
  },
}

function SubjectsPage() {
  const { currentLang } = useLanguage()
  const { isAuthenticated } = useAuth()
  const copy = pageCopy[currentLang]
  const isRtl = currentLang === 'ar'

  const allLevels = levelService.getAll()
  const subjects = subjectService.getByLevel('awali')

  return (
    <div className="bg-background flex min-h-[calc(100vh-64px)] flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-6 py-10 lg:px-12 lg:py-12">
        {/* Geometric Background */}
        <div className="absolute inset-y-0 right-0 w-100 opacity-[0.06] pointer-events-none hidden md:block">
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

          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-accent">
            <span className="h-px w-5 bg-accent" />
            {copy.levelEyebrow}
          </div>

          <h1 className="mb-3 text-[30px] lg:text-[38px] font-bold leading-[1.15] tracking-[-0.02em] text-[#FAF7F0]">
            {copy.title}
          </h1>

          <p className="mb-8 max-w-125 text-[14px] lg:text-[15px] leading-[1.65] text-[#FAF7F0]/65">
            {copy.subtitle}
          </p>

          <div className="flex flex-wrap gap-2" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Awali - Active */}
            <Link
              to="/subjects"
              className="flex items-center gap-2 bg-accent px-5 py-2.5 text-[13px] font-semibold text-accent-foreground"
            >
              Hatua ya Awali
            </Link>
            {/* Kati - Locked */}
            <Link
              to="/subjects/intermediate"
              className="flex items-center gap-2 border border-white/12 bg-white/5 px-5 py-2.5 text-[13px] font-semibold text-[#FAF7F0]/45 transition-all duration-150 hover:bg-white/10 hover:text-[#FAF7F0]"
            >
              <Lock className="size-3.5" strokeWidth={2.5} />
              Hatua ya Kati
            </Link>
            {/* Endelea - Locked */}
            <Link
              to="/subjects/advanced"
              className="flex items-center gap-2 border border-white/12 bg-white/5 px-5 py-2.5 text-[13px] font-semibold text-[#FAF7F0]/45 transition-all duration-150 hover:bg-white/10 hover:text-[#FAF7F0]"
            >
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
            <ShieldCheck className="size-3.75 text-primary" strokeWidth={2} />
            <span><strong className="font-semibold text-foreground">{subjects.length}</strong> {copy.statsLessons.split(' ')[1]}</span>
          </div>
          <div className="h-4.5 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <CheckCircle2 className="size-3.75 text-primary" strokeWidth={2} />
            <span>{copy.statsFree}</span>
          </div>
          <div className="h-4.5 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Zap className="size-3.75 text-primary" strokeWidth={2} />
            <span>{copy.statsStart}</span>
          </div>
        </div>
      </div>

      {/* Subject Grid */}
      <section className="container-main flex-1 px-6 py-10 lg:px-12 lg:py-12">
        <div className="mb-6 text-[12px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
          {copy.subjectsLabel}
        </div>

        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject, index) => {
            const Icon = subjectIcons[subject.id] || BookOpen
            const lessonCount = lessonService.getBySubject(subject.id).length
            const formattedNum = String(index + 1).padStart(2, '0')

            return (
              <Link
                key={subject.id}
                to="/subjects/$slug"
                params={{ slug: subject.slug }}
                className="group flex min-h-48 flex-col bg-white p-7 transition-colors duration-200 hover:bg-[#FDFCF8]"
              >
                {/* Number */}
                <span className="mb-4 font-decorative text-xl font-bold text-primary/20">
                  {formattedNum}
                </span>

                {/* Icon */}
                <div className="mb-5 flex size-16 items-center justify-center bg-[#1B4332]/5 transition-colors duration-200 group-hover:bg-[#1B4332]/10">
                  <Icon className="size-8 text-[#1B4332] transition-colors duration-200 group-hover:text-accent" strokeWidth={1.4} />
                </div>

                {/* Titles */}
                <div className="mb-1 flex-1 text-[20px] font-bold tracking-tight text-foreground">
                  {subject.name[currentLang]}
                </div>

                <div className="mb-3 font-arabic text-[17px] leading-[1.6] text-accent" dir="rtl">
                  {subject.name.ar}
                </div>

                {/* Description */}
                <p className="mb-5 text-[13px] leading-[1.6] text-muted-foreground">
                  {subject.description[currentLang]}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="flex items-center gap-1 border border-[#1B4332]/10 bg-[#1B4332]/5 px-2 py-1 text-[11px] font-medium text-primary">
                      <FileText className="size-3" strokeWidth={2.5} />
                      {lessonCount} masomo
                    </span>
                  </div>

                  <div className="flex size-7 items-center justify-center bg-[#1B4332]/5 text-primary transition-transform duration-200 group-hover:translate-x-[3px]">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className={isRtl ? 'rotate-180' : ''}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
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