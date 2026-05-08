import { Link, createFileRoute } from '@tanstack/react-router'
import {
  BookOpen,
  Lock,
  Scale,
  ScrollText,
  Sparkles,
  User,
} from 'lucide-react'

import { lessonService, subjectService } from '#/data/services'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { Language } from '#/types'

export const Route = createFileRoute('/subjects')({
  component: SubjectsPage,
})

const subjectIconMap: Record<
  string,
  React.ComponentType<{ className?: string; 'aria-hidden'?: boolean; strokeWidth?: number }>
> = {
  quran: BookOpen,
  hadith: ScrollText,
  fiqhi: Scale,
  tawhidi: Sparkles,
  sira: User,
  adhkar: BookOpen,
}

const pageCopy: Record<Language, {
  title: string
  subtitle: string
  awali: string
  kati: string
  endelea: string
  lessonsLabel: (n: number) => string
}> = {
  sw: {
    title: 'Hatua ya Awali — Masomo',
    subtitle: 'Chagua somo unalotaka kujifunza',
    awali: 'Hatua ya Awali',
    kati: 'Hatua ya Kati',
    endelea: 'Kuendelea',
    lessonsLabel: (n) => `Masomo ${n}`,
  },
  ar: {
    title: 'المستوى المبتدئ — المواد',
    subtitle: 'اختر المادة التي تريد تعلمها',
    awali: 'المستوى المبتدئ',
    kati: 'المستوى المتوسط',
    endelea: 'المستوى المتقدم',
    lessonsLabel: (n) => `${n} دروس`,
  },
  en: {
    title: 'Beginner Level — Subjects',
    subtitle: 'Choose a subject to start learning',
    awali: 'Beginner',
    kati: 'Intermediate',
    endelea: 'Advanced',
    lessonsLabel: (n) => `${n} lessons`,
  },
}

function SubjectsPage() {
  const { currentLang } = useLanguage()
  const isRtl = currentLang === 'ar'
  const c = pageCopy[currentLang]

  const subjects = subjectService.getAll()

  return (
    <div
      className="bg-background flex flex-col"
      lang={currentLang}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <main className="grow flex flex-col items-center py-10 px-5 md:px-10 w-full max-w-7xl mx-auto">

        {/* Page header */}
        <div className="w-full text-center mb-8">
          <h1
            className="font-display text-sidebar mb-2"
            style={{ fontSize: 32, lineHeight: 1.2 }}
          >
            {c.title}
          </h1>
          <p className="text-[16px] text-muted-foreground">{c.subtitle}</p>
        </div>

        {/* Level filter pills */}
        <div className="flex gap-2 mb-10 flex-wrap justify-center">
          <button
            type="button"
            className="bg-sidebar text-primary-foreground px-6 py-2 text-[14px] font-medium focus-visible:outline-[3px] focus-visible:outline-accent focus-visible:outline-offset-2"
            style={{ borderRadius: 0 }}
          >
            {c.awali}
          </button>
          <button
            type="button"
            disabled
            className="flex items-center gap-2 border border-border text-muted-foreground px-6 py-2 text-[14px] font-medium opacity-70 cursor-not-allowed"
            style={{ borderRadius: 0 }}
          >
            <Lock aria-hidden size={14} strokeWidth={2.5} />
            {c.kati}
          </button>
          <button
            type="button"
            disabled
            className="flex items-center gap-2 border border-border text-muted-foreground px-6 py-2 text-[14px] font-medium opacity-70 cursor-not-allowed"
            style={{ borderRadius: 0 }}
          >
            <Lock aria-hidden size={14} strokeWidth={2.5} />
            {c.endelea}
          </button>
        </div>

        {/* Subjects grid: 2-col → 3-col md → 6-col lg */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {subjects.map((subject) => {
            const SubjectIcon = subjectIconMap[subject.id] ?? BookOpen
            const lessonCount = lessonService.getBySubject(subject.id).length
            const name = subject.name[currentLang]

            return (
              <Link
                key={subject.id}
                to="/subjects/$slug"
                params={{ slug: subject.slug }}
                className={cn(
                  'group flex flex-col items-center justify-center aspect-square bg-white border border-border p-4',
                  'transition-all duration-200',
                  'hover:border-2 hover:border-sidebar hover:-translate-y-0.5',
                  'hover:shadow-[0_8px_30px_rgba(27,67,50,0.1)]',
                  'shadow-[0_4px_20px_rgba(27,67,50,0.05)]',
                  'focus-visible:outline-[3px] focus-visible:outline-accent focus-visible:outline-offset-2',
                )}
                style={{ borderRadius: 0 }}
              >
                <SubjectIcon
                  aria-hidden
                  className="text-sidebar size-16 transition-colors duration-200 group-hover:text-accent mb-3"
                  strokeWidth={1.2}
                />
                <h3
                  className="font-display text-sidebar text-center leading-tight mb-1"
                  style={{ fontSize: 18, fontWeight: 700 }}
                >
                  {name}
                </h3>
                <p
                  className="font-arabic text-accent text-center mb-2"
                  dir="rtl"
                  lang="ar"
                  style={{ fontSize: 14 }}
                >
                  {subject.name.ar}
                </p>
                <span className="text-[12px] text-muted-foreground mt-auto">
                  {c.lessonsLabel(lessonCount)}
                </span>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}