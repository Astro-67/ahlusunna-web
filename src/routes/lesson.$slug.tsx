import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Headphones,
  PlayCircle,
} from 'lucide-react'

import { InPageAudioBar } from '#/components/lesson-reader/InPageAudioBar'
import { LessonBody } from '#/components/lesson-reader/LessonBody'
import { RightRailTOC } from '#/components/lesson-reader/RightRailTOC'
import { parseLessonBody } from '#/components/lesson-reader/parseLessonBody'
import { lessonService, courseService, subjectService } from '#/data/services'
import { checkLessonAccess } from '#/data/seed'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { Language, TiptapDocument, TiptapNode } from '#/types'

export const Route = createFileRoute('/lesson/$slug')({
  component: LessonPage,
  beforeLoad: ({ context, params }) => {
    const lesson = lessonService.getBySlug(params.slug)
    if (!lesson) return
    const access = checkLessonAccess(lesson, context.auth.user)
    if (!access.allowed && access.redirectTo === '/login') {
      throw new Error('Redirect to login')
    }
  },
})

function extractNodeText(node: TiptapNode): string {
  if (node.text) return node.text
  if (!node.content) return ''
  return node.content.map(extractNodeText).join('')
}

function tiptapDocToText(doc: TiptapDocument): string {
  const parts: string[] = []
  for (const node of doc.content) {
    if (node.type === 'heading') {
      const text = extractNodeText(node)
      if (text) parts.push(text.toUpperCase() + ':')
    } else if (node.type === 'paragraph') {
      const text = extractNodeText(node)
      if (text) parts.push(text)
    } else if (node.type === 'blockquote') {
      for (const child of node.content ?? []) {
        const text = extractNodeText(child)
        if (text) parts.push(text)
      }
    }
  }
  return parts.join('\n\n')
}

const copy: Record<Language, {
  level: string
  prevLesson: string
  nextLesson: string
  moreIn: string
  readMinutes: (n: number) => string
  published: string
  text: string
}> = {
  sw: {
    level: 'Hatua ya Awali',
    prevLesson: 'Somo Lililotangulia',
    nextLesson: 'Somo Lifuatalo',
    moreIn: 'Masomo Mengine',
    readMinutes: (n) => `Dakika ${n} za Kusoma`,
    published: 'Imechapishwa',
    text: 'Maandishi',
  },
  ar: {
    level: 'المستوى المبتدئ',
    prevLesson: 'الدرس السابق',
    nextLesson: 'الدرس التالي',
    moreIn: 'دروس أخرى',
    readMinutes: (n) => `${n} دقائق للقراءة`,
    published: 'منشور',
    text: 'نص',
  },
  en: {
    level: 'Beginner Level',
    prevLesson: 'Previous Lesson',
    nextLesson: 'Next Lesson',
    moreIn: 'More Lessons',
    readMinutes: (n) => `${n} min read`,
    published: 'Published',
    text: 'Text',
  },
}

function LessonPage() {
  const { slug } = Route.useParams()
  const { currentLang } = useLanguage()
  const isRtl = currentLang === 'ar'
  const c = copy[currentLang]

  const lesson = lessonService.getBySlug(slug)
  const subject = lesson ? subjectService.getById(lesson.subjectId) : null
  const course = lesson ? courseService.getById(lesson.courseId) : null

  const allSubjectCourses = lesson
    ? courseService.getBySubject(lesson.subjectId).sort((a, b) => a.order - b.order)
    : []
  const allSubjectLessons = allSubjectCourses.flatMap((co) =>
    lessonService.getByCourse(co.id).sort((a, b) => a.order - b.order),
  )

  const currentIndex = allSubjectLessons.findIndex((l) => l.slug === slug)
  const prevLesson = currentIndex > 0 ? allSubjectLessons[currentIndex - 1] : null
  const nextLesson =
    currentIndex < allSubjectLessons.length - 1
      ? allSubjectLessons[currentIndex + 1]
      : null
  const siblings = allSubjectLessons.filter((l) => l.slug !== slug)

  const activeDoc =
    lesson?.content[currentLang] ?? lesson?.content.sw ?? null
  const bodyText = useMemo(
    () => (activeDoc ? tiptapDocToText(activeDoc) : ''),
    [activeDoc],
  )
  const parsed = useMemo(() => parseLessonBody(bodyText), [bodyText])

  if (!lesson) {
    return (
      <div className="mx-auto max-w-280 px-6 py-16 text-center">
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

  const readMinutes = parseInt(lesson.duration.split(':')[0]) || 5
  const lessonTitle = lesson.title[currentLang]
  const arabicTitle = currentLang !== 'ar' ? lesson.title.ar : null
  const courseTitle = course?.title[currentLang] ?? ''
  const subjectName = subject?.name[currentLang] ?? ''

  return (
    <div className="bg-background" lang={currentLang} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-280 px-6 pt-10 pb-24">

        {/* Breadcrumb */}
        <nav
          className="mb-8 flex flex-wrap items-center gap-2 text-[14px] font-medium text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <span>{c.level}</span>
          <span className="text-accent">•</span>
          {subject && (
            <>
              <Link
                to="/subjects/$slug"
                params={{ slug: subject.slug }}
                className="transition-colors hover:text-accent focus-visible:outline-[3px] focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {subjectName}
              </Link>
              <span className="text-accent">•</span>
            </>
          )}
          <span>{courseTitle}</span>
          <span className="text-accent">•</span>
          <span className="font-semibold text-foreground">{lessonTitle}</span>
        </nav>

        {/* Lesson Header */}
        <header className="mb-10 text-center">
          <h1 className="font-display text-[44px] leading-[1.1] text-primary mb-4">
            {lessonTitle}
          </h1>

          {arabicTitle && (
            <p
              className="font-arabic text-[28px] text-accent mb-6"
              dir="rtl"
              lang="ar"
            >
              {arabicTitle}
            </p>
          )}

          {/* Metadata badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[12px] text-muted-foreground">
              <FileText aria-hidden size={13} strokeWidth={2} />
              {c.text}
            </span>
            <span className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[12px] text-muted-foreground">
              <Clock aria-hidden size={13} strokeWidth={2} />
              {c.readMinutes(readMinutes)}
            </span>
            {lesson.status === 'published' && (
              <span className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[12px] text-muted-foreground">
                {c.published}
              </span>
            )}
          </div>

          {/* Gold rule */}
          <div className="mx-auto h-0.5 w-30 bg-accent" />
        </header>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-10">

          {/* Reading Column */}
          <article className="flex-1 min-w-0 max-w-180 mx-auto lg:mx-0">

            {/* Video */}
            {lesson.videoUrl && (
              <div
                className="mb-8 w-full"
                style={{ border: '1px solid #E5E0D8', borderRadius: 0 }}
              >
                <div className="relative aspect-video w-full">
                  <iframe
                    src={lesson.videoUrl}
                    title={lessonTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            )}

            {/* In-page audio bar (fixed on mobile, inline on desktop lg+) */}
            {lesson.audioSrc && (
              <div className="mb-8">
                <InPageAudioBar src={lesson.audioSrc} title={lessonTitle} />
              </div>
            )}

            {/* Lesson body */}
            <LessonBody body={bodyText} />

            {/* Prev / Next navigation */}
            <nav
              aria-label="Lesson navigation"
              className="mt-16 border-t border-border pt-8 flex flex-col sm:flex-row gap-3"
            >
              {prevLesson ? (
                <Link
                  to="/lesson/$slug"
                  params={{ slug: prevLesson.slug }}
                  className="group flex flex-1 items-center gap-3 h-12 px-5 bg-sidebar text-primary-foreground transition-colors hover:bg-primary-dark focus-visible:outline-[3px] focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  <ChevronLeft
                    aria-hidden
                    size={20}
                    strokeWidth={2}
                    className={cn(isRtl && 'rotate-180')}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                      {c.prevLesson}
                    </div>
                    <div className="text-[13px] font-medium line-clamp-1">
                      {prevLesson.title[currentLang]}
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  className="flex flex-1 items-center h-12 px-5 bg-sidebar text-primary-foreground"
                  style={{ opacity: 0.4 }}
                >
                  <span className="text-[13px]">{c.prevLesson}</span>
                </div>
              )}

              {nextLesson ? (
                <Link
                  to="/lesson/$slug"
                  params={{ slug: nextLesson.slug }}
                  className={cn(
                    'group flex flex-1 items-center justify-end gap-3 h-12 px-5 bg-sidebar text-primary-foreground transition-colors hover:bg-primary-dark focus-visible:outline-[3px] focus-visible:outline-accent focus-visible:outline-offset-2',
                  )}
                >
                  <div className="min-w-0 flex-1 text-end">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                      {c.nextLesson}
                    </div>
                    <div className="text-[13px] font-medium line-clamp-1">
                      {nextLesson.title[currentLang]}
                    </div>
                  </div>
                  <ChevronRight
                    aria-hidden
                    size={20}
                    strokeWidth={2}
                    className={cn(isRtl && 'rotate-180')}
                  />
                </Link>
              ) : (
                <div
                  className="flex flex-1 items-center justify-end h-12 px-5 bg-sidebar text-primary-foreground"
                  style={{ opacity: 0.4 }}
                >
                  <span className="text-[13px]">{c.nextLesson}</span>
                </div>
              )}
            </nav>

            {/* Siblings strip */}
            {siblings.length > 0 && (
              <section className="mt-16 border-t border-border pt-8">
                <h3 className="font-display text-[24px] text-sidebar mb-6">
                  {c.moreIn} — {courseTitle}
                </h3>

                {/* Mobile: horizontal scroll snap; Desktop: 2-col grid */}
                <div className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-none lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
                  {siblings.map((s) => {
                    const sibCourse = courseService.getById(s.courseId)
                    const sibCourseTitle =
                      sibCourse?.title[currentLang] ?? sibCourse?.title.sw ?? ''
                    return (
                      <Link
                        key={s.id}
                        to="/lesson/$slug"
                        params={{ slug: s.slug }}
                        className="group shrink-0 w-65 lg:w-auto flex flex-col gap-2 border border-border bg-card p-5 snap-start transition-all duration-200 hover:border-accent hover:-translate-y-0.5 focus-visible:outline-[3px] focus-visible:outline-accent focus-visible:outline-offset-2"
                        style={{ borderRadius: '4px' }}
                      >
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                          <FileText aria-hidden size={11} strokeWidth={2} className="text-primary" />
                          {s.audioSrc && (
                            <Headphones aria-hidden size={11} strokeWidth={2} className="text-accent" />
                          )}
                          {s.videoUrl && (
                            <PlayCircle aria-hidden size={11} strokeWidth={2} className="text-accent" />
                          )}
                          <span className="ml-auto font-medium">{s.duration}</span>
                        </div>
                        <h4 className="font-display text-[18px] leading-[1.3] text-sidebar line-clamp-2 transition-colors group-hover:text-accent-dark">
                          {s.title[currentLang]}
                        </h4>
                        <p className="text-[12px] text-muted-foreground">{sibCourseTitle}</p>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}
          </article>

          {/* Right rail TOC — desktop only */}
          <RightRailTOC headings={parsed.headings} />
        </div>
      </div>
    </div>
  )
}
