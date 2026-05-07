import { Link, createFileRoute } from '@tanstack/react-router'
import {
  BookOpen,
  ChevronRight,
  FileText,
  Headphones,
  PlayCircle,
  Scale,
  ScrollText,
  Sparkles,
  User,
} from 'lucide-react'

import { courseService, lessonService, subjectService } from '#/data/services'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { Language } from '#/types'

export const Route = createFileRoute('/(subjects)/subjects/$slug')({
  component: SubjectDetailPage,
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
  level: string
  subjects: string
  lessonWord: string
  noLessons: string
}> = {
  sw: {
    level: 'Hatua ya Awali',
    subjects: 'Masomo',
    lessonWord: 'masomo',
    noLessons: 'Masomo zaidi yatakuja hivi karibuni, Insha\'Allah.',
  },
  ar: {
    level: 'المستوى المبتدئ',
    subjects: 'المواد',
    lessonWord: 'دروس',
    noLessons: 'ستأتي دروس أخرى قريبًا، إن شاء الله.',
  },
  en: {
    level: 'Beginner Level',
    subjects: 'Subjects',
    lessonWord: 'lessons',
    noLessons: 'More lessons coming soon, Insha\'Allah.',
  },
}

function SubjectDetailPage() {
  const { slug } = Route.useParams()
  const { currentLang } = useLanguage()
  const isRtl = currentLang === 'ar'
  const c = pageCopy[currentLang]

  const subject = subjectService.getBySlug(slug)
  const courses = subject
    ? courseService.getBySubject(subject.id).sort((a, b) => a.order - b.order)
    : []

  if (!subject) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-16 text-center">
        <p className="text-muted-foreground">Somo halijapatikana.</p>
        <Link
          to="/subjects"
          className="mt-4 inline-block text-primary hover:underline"
        >
          ← Rudi kwa Masomo
        </Link>
      </div>
    )
  }

  const SubjectIcon = subjectIconMap[subject.id] ?? BookOpen
  const subjectName = subject.name[currentLang] ?? subject.name.sw
  const subjectDesc = subject.description[currentLang] ?? subject.description.sw

  // Total lesson count for this subject
  const allLessons = lessonService.getBySubject(subject.id)

  return (
    <div
      className="bg-background"
      lang={currentLang}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Breadcrumb */}
      <div className="mx-auto max-w-4xl px-5 pt-6 pb-2">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[13px] text-muted-foreground"
        >
          <Link
            to="/subjects"
            className="transition-colors hover:text-accent focus-visible:outline-[3px] focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            {c.level}
          </Link>
          <ChevronRight
            aria-hidden
            size={14}
            strokeWidth={2}
            className={cn('text-border', isRtl && 'rotate-180')}
          />
          <span className="font-semibold text-foreground">{subjectName}</span>
        </nav>
      </div>

      {/* Subject header band */}
      <div className="w-full bg-white border-b border-border py-8 mb-12 shadow-sm">
        <div className="mx-auto max-w-4xl px-5 flex items-center gap-8">
          {/* Icon circle */}
          <div
            className="shrink-0 flex items-center justify-center rounded-full border border-border bg-muted"
            style={{ width: 96, height: 96 }}
          >
            <SubjectIcon
              aria-hidden
              className="text-sidebar size-16"
              strokeWidth={1.2}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-baseline gap-4 mb-2">
              <h1
                className="font-display leading-tight text-sidebar"
                style={{ fontSize: 36, lineHeight: 1.1 }}
              >
                {subjectName}
              </h1>
              <span
                className="font-arabic text-accent"
                dir="rtl"
                lang="ar"
                style={{ fontSize: 24, lineHeight: 1.4 }}
              >
                {subject.name.ar}
              </span>
            </div>
            <p className="text-[16px] text-muted-foreground max-w-[65ch]">
              {subjectDesc}
            </p>
            <p className="mt-2 text-[13px] text-muted-foreground">
              {allLessons.length} {c.lessonWord}
            </p>
          </div>
        </div>
      </div>

      {/* Courses and lesson cards */}
      <div className="mx-auto max-w-4xl px-5 pb-20 space-y-10">
        {courses.length === 0 && (
          <p className="text-muted-foreground text-center py-16">
            {c.noLessons}
          </p>
        )}

        {courses.map((course) => {
          const courseLessons = lessonService
            .getByCourse(course.id)
            .sort((a, b) => a.order - b.order)
          const courseTitle = course.title[currentLang] ?? course.title.sw
          const courseAr = course.title.ar

          return (
            <section key={course.id}>
              {/* Course section header with gold underline accent */}
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-block pb-2 border-b-2 border-accent">
                  <h2 className="font-display text-[24px] text-sidebar flex items-center gap-2">
                    {courseTitle}
                    {courseAr && (
                      <span
                        className="font-arabic text-[20px] text-accent"
                        dir="rtl"
                        lang="ar"
                      >
                        — {courseAr}
                      </span>
                    )}
                  </h2>
                </div>
                <div className="flex-grow h-px bg-border relative">
                  <div className="absolute top-1/2 left-0 w-16 h-0.5 bg-accent -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-3">
                {courseLessons.map((lesson, idx) => {
                  const lessonTitle = lesson.title[currentLang] ?? lesson.title.sw
                  const lessonDesc =
                    typeof lesson.content[currentLang]?.content?.[1]?.content?.[0]?.text === 'string'
                      ? (lesson.content[currentLang].content[1].content![0].text as string).slice(0, 120) + '…'
                      : ''

                  return (
                    <Link
                      key={lesson.id}
                      to="/lesson/$slug"
                      params={{ slug: lesson.slug }}
                      className="group block bg-white border border-border p-5 transition-all duration-200 hover:bg-[#FDFCF8] hover:border-l-4 hover:border-l-sidebar hover:border-t-border hover:border-r-border hover:border-b-border relative focus-visible:outline-[3px] focus-visible:outline-accent focus-visible:outline-offset-2"
                    >
                      <div className="flex items-start gap-4">
                        {/* Number badge */}
                        <div
                          className="shrink-0 flex items-center justify-center rounded-full font-bold text-[13px] text-primary border border-accent"
                          style={{
                            width: 32,
                            height: 32,
                            background: 'rgba(201,168,76,0.15)',
                          }}
                        >
                          {idx + 1}
                        </div>

                        <div className="flex-grow min-w-0 pr-8">
                          <h3 className="text-[18px] font-bold text-foreground mb-1 group-hover:text-sidebar transition-colors line-clamp-2">
                            {lessonTitle}
                          </h3>

                          {lessonDesc && (
                            <p className="text-[14px] text-muted-foreground mb-3 line-clamp-2">
                              {lessonDesc}
                            </p>
                          )}

                          {/* Media badges */}
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-[11px] text-muted-foreground border border-border">
                              <FileText aria-hidden size={12} strokeWidth={2} />
                              Maandishi
                            </span>
                            {lesson.audioSrc && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-[11px] text-muted-foreground border border-border">
                                <Headphones aria-hidden size={12} strokeWidth={2} />
                                {lesson.duration}
                              </span>
                            )}
                            {lesson.videoUrl && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-[11px] text-muted-foreground border border-border">
                                <PlayCircle aria-hidden size={12} strokeWidth={2} />
                                Video
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Chevron */}
                        <ChevronRight
                          aria-hidden
                          size={20}
                          strokeWidth={2}
                          className={cn(
                            'absolute right-5 top-1/2 -translate-y-1/2 text-border transition-colors group-hover:text-accent group-hover:translate-x-1',
                            isRtl && 'right-auto left-5 rotate-180',
                          )}
                        />
                      </div>
                    </Link>
                  )
                })}

                {courseLessons.length === 0 && (
                  <p className="py-6 text-center text-[14px] text-muted-foreground">
                    {c.noLessons}
                  </p>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
