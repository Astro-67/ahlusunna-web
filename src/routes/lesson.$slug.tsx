import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
} from 'lucide-react'

import { Button } from '#/components/ui/button'
import { EmptyState } from '#/components/shared/EmptyState'
import { lessonService, courseService, subjectService } from '#/data/services'
import { isLessonCompleted, checkLessonAccess } from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { Language } from '#/types'

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

const pageCopy: Record<Language, {
  breadcrumbHome: string
  breadcrumbSubjects: string
  markComplete: string
  completed: string
  previousLesson: string
  nextLesson: string
  relatedLessons: string
  noPrevLesson: string
  noNextLesson: string
  lessonOf: string
  readTime: string
  minutes: string
}> = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbSubjects: 'Subjects',
    markComplete: 'Mark as Complete',
    completed: 'Completed',
    previousLesson: 'Previous Lesson',
    nextLesson: 'Next Lesson',
    relatedLessons: 'In This Subject',
    noPrevLesson: 'No previous lesson',
    noNextLesson: 'No next lesson',
    lessonOf: 'Lesson from',
    readTime: 'Read time',
    minutes: 'min',
  },
  sw: {
    breadcrumbHome: 'Nyumbani',
    breadcrumbSubjects: 'Masomo',
    markComplete: 'Tia Alama Imekamilika',
    completed: 'Imekamilika',
    previousLesson: 'Somo Lililotangulia',
    nextLesson: 'Somo Lifuatalo',
    relatedLessons: 'Masomo Katika Somo Hili',
    noPrevLesson: 'Hakuna somo la awali',
    noNextLesson: 'Hakuna somo lifuatalo',
    lessonOf: 'Somo kutoka',
    readTime: 'Muda wa kusoma',
    minutes: 'dakika',
  },
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbSubjects: 'المواد',
    markComplete: 'وضع علامة مكتمل',
    completed: 'مكتمل',
    previousLesson: 'الدرس السابق',
    nextLesson: 'الدرس التالي',
    relatedLessons: 'دروس هذا الموضوع',
    noPrevLesson: 'لا يوجد درس سابق',
    noNextLesson: 'لا يوجد درس تالٍ',
    lessonOf: 'درس من',
    readTime: 'وقت القراءة',
    minutes: 'دقيقة',
  },
}

// Convert Tiptap JSON to text blocks for display
function parseLessonContent(doc: unknown): { heading: string; body: string; quote: string } | null {
  if (!doc || typeof doc !== 'object') return null
  const d = doc as { content?: Array<{ type?: string; content?: Array<{ type?: string; text?: string; content?: Array<{ text?: string }> }> }> }
  if (!d.content) return null

  let heading = ''
  let body = ''
  let quote = ''

  for (const block of d.content) {
    if (block.type === 'heading' && block.content) {
      heading = block.content.map((c) => c.text ?? '').join('')
    } else if (block.type === 'paragraph' && block.content) {
      const text = block.content.map((c) => c.text ?? '').join('')
      body += (body ? '\n\n' : '') + text
    } else if (block.type === 'blockquote' && block.content) {
      for (const qBlock of block.content) {
        if (qBlock.content) {
          quote = qBlock.content.map((c) => c.text ?? '').join('')
        }
      }
    }
  }

  return { heading, body, quote }
}

// Check if text is Arabic
function isArabicText(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text)
}

function LessonPage() {
  const { slug } = Route.useParams()
  const { user, updateProgress } = useAuth()
  const { currentLang } = useLanguage()
  const copy = pageCopy[currentLang]
  const isRtl = currentLang === 'ar'

  const lesson = lessonService.getBySlug(slug)
  const isCompleted = isLessonCompleted(user, slug)

  const subject = lesson ? subjectService.getById(lesson.subjectId) : null
  const course = lesson ? courseService.getById(lesson.courseId) : null
  const siblingLessons = lesson ? lessonService.getByCourse(lesson.courseId) : []
  
  const currentIndex = siblingLessons.findIndex(l => l.slug === slug)
  const prevLesson = currentIndex > 0 ? siblingLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < siblingLessons.length - 1 ? siblingLessons[currentIndex + 1] : null

  if (!lesson) {
    return (
      <div className="container-main py-16">
        <EmptyState
          title="Somo halijapatikana"
          description="Somo unalotafuta halipo." icon={undefined}        />
        <div className="mt-6 text-center">
          <Link to="/subjects" className="text-primary hover:underline">
            ← Rudi kwa Masomo
          </Link>
        </div>
      </div>
    )
  }

  const handleMarkComplete = () => {
    if (!isCompleted) {
      updateProgress(slug)
    }
  }

  const content = parseLessonContent(lesson.content[currentLang])
  const readMinutes = parseInt(lesson.duration.split(':')[0]) || 10

  return (
    <div className="bg-muted/20" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Main Container - Extra Wide for Better Readability */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
          <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
            {copy.breadcrumbHome}
          </Link>
          <span className="text-muted-foreground/40">›</span>
          <Link to="/subjects" className="text-muted-foreground transition-colors hover:text-primary">
            {copy.breadcrumbSubjects}
          </Link>
          {subject && (
            <>
              <span className="text-muted-foreground/40">›</span>
              <Link
                to="/subjects/$slug"
                params={{ slug: subject.slug }}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {subject.name[currentLang]}
              </Link>
            </>
          )}
        </nav>

        {/* Main Lesson Card */}
        <article className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
          
          {/* Header */}
          <header className="border-b border-border bg-linear-to-r from-primary/5 to-transparent px-6 py-8 sm:px-10 sm:py-12">
            {/* Subject & Course Label */}
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="size-4" />
              <span>{course?.title[currentLang]}</span>
              <span className="text-primary/40">•</span>
              <span>{copy.readTime}: {readMinutes} {copy.minutes}</span>
            </div>

            {/* Title - Large and Clear */}
            <h1 className="font-decorative text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {lesson.title[currentLang]}
            </h1>
            
            {/* Arabic Title */}
            {lesson.title.ar && (
              <p 
                className="mt-3 font-arabic text-2xl text-accent sm:text-3xl" 
                dir="rtl" 
                lang="ar"
              >
                {lesson.title.ar}
              </p>
            )}

            {/* English Title (if not current lang) */}
            {currentLang !== 'en' && lesson.title.en && (
              <p 
                className="mt-2 text-lg text-muted-foreground" 
                lang="en"
              >
                {lesson.title.en}
              </p>
            )}
          </header>

          {/* Content - Large Readable Text */}
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            
            {/* Main Content Body */}
            {content && (
              <>
                {/* Lesson Body - Extra large font for readability */}
                <div 
                  className={cn(
                    "text-xl leading-relaxed text-foreground sm:text-2xl",
                    isRtl && "text-right font-arabic leading-loose"
                  )}
                  style={{ fontSize: 'clamp(20px, 2.8vw, 26px)', lineHeight: '2' }}
                >
                  {/* Handle different content types */}
                  {content.body.split('\n\n').map((paragraph, i) => {
                    const isArabic = isArabicText(paragraph)
                    
                    // Check if this is a Quranic verse (starts with special markers)
                    const isVerse = paragraph.startsWith('بِسْمِ') || 
                                   paragraph.startsWith('قُلْ') ||
                                   paragraph.startsWith('يَا أَيُّهَا') ||
                                   paragraph.startsWith('إِنَّ') ||
                                   paragraph.includes('ﷺ') ||
                                   paragraph.includes(' BK')

                    if (isVerse || isArabic) {
                      return (
                        <p 
                          key={i} 
                          className={cn(
                            "mb-8 font-arabic text-center text-2xl text-primary sm:text-3xl",
                            !isArabic && "font-arabic"
                          )}
                          dir="rtl" 
                          lang="ar"
                        >
                          {paragraph}
                        </p>
                      )
                    }

                    return (
                      <p 
                        key={i} 
                        className="mb-8"
                        lang={currentLang === 'ar' ? 'ar' : currentLang === 'en' ? 'en' : 'sw'}
                      >
                        {paragraph}
                      </p>
                    )
                  })}
                </div>

                {/* Quranic Quote/Verse Block */}
                {content.quote && (
                  <div className="mt-12 overflow-hidden rounded-xl border-2 border-accent/30 bg-linear-to-r from-accent/5 to-accent/10">
                    <div className="flex items-center gap-3 border-b-2 border-accent/20 bg-accent/10 px-8 py-4">
                      <BookOpen className="size-6 text-accent" />
                      <span className="font-arabic text-base font-medium text-accent" dir="rtl">
                        {currentLang === 'ar' ? 'آية' : currentLang === 'sw' ? 'Aya' : 'Verse'}
                      </span>
                    </div>
                    <blockquote 
                      className="px-8 py-10 text-center font-arabic text-3xl leading-loose text-primary sm:text-4xl lg:text-5xl"
                      dir="rtl"
                      lang="ar"
                    >
                      {content.quote}
                    </blockquote>
                  </div>
                )}
              </>
            )}

            {/* Fallback if no content */}
            {!content && (
              <div className="text-center text-muted-foreground">
                <BookOpen className="mx-auto mb-4 size-12 text-primary/30" />
                <p>Maudhui yatakuja hivi karibuni.</p>
              </div>
            )}
          </div>

          {/* Mark Complete Button */}
          {user && (
            <div className="border-t-2 border-border px-6 py-8 sm:px-10">
              <Button
                onClick={handleMarkComplete}
                variant={isCompleted ? 'default' : 'outline'}
                className={cn(
                  "w-full py-8 text-xl font-semibold tracking-wide sm:text-2xl",
                  isCompleted && "bg-primary"
                )}
                disabled={isCompleted}
              >
                {isCompleted ? (
                  <>
                    <Check className="mr-4 size-7" />
                    {copy.completed}
                  </>
                ) : (
                  <>
                    <Check className="mr-4 size-7" />
                    {copy.markComplete}
                  </>
                )}
              </Button>
            </div>
          )}
        </article>

        {/* Prev/Next Navigation */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {prevLesson ? (
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-start py-4 text-start sm:items-center"
            >
              <Link to="/lesson/$slug" params={{ slug: prevLesson.slug }}>
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <ArrowLeft className="size-4" />
                  {copy.previousLesson}
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="size-5 text-primary" />
                  <span className="font-medium">{prevLesson.title[currentLang]}</span>
                </div>
              </Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-white/50 px-4 py-4 text-sm text-muted-foreground sm:col-span-2">
              <ArrowLeft className="size-4" />
              {copy.noPrevLesson}
            </div>
          )}

          {nextLesson ? (
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col items-end py-4 text-end sm:col-start-2 sm:items-center"
            >
              <Link to="/lesson/$slug" params={{ slug: nextLesson.slug }}>
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  {copy.nextLesson}
                  <ArrowRight className="size-4" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{nextLesson.title[currentLang]}</span>
                  <ChevronRight className="size-5 text-primary" />
                </div>
              </Link>
            </Button>
          ) : (
            <div className="flex items-center justify-end gap-2 rounded-lg border border-border bg-white/50 px-4 py-4 text-sm text-muted-foreground sm:col-span-2 sm:col-start-1 sm:justify-start">
              {copy.noNextLesson}
              <ArrowRight className="size-4" />
            </div>
          )}
        </div>

        {/* Sibling Lessons */}
        {siblingLessons.length > 1 && (
          <div className="mt-10">
            <h3 className="mb-4 font-decorative text-lg font-bold text-foreground">
              {copy.relatedLessons}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {siblingLessons.map((sibling, index) => {
                const isCurrent = sibling.slug === slug
                return (
                  <Link
                    key={sibling.id}
                    to="/lesson/$slug"
                    params={{ slug: sibling.slug }}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg border px-4 py-4 transition-all hover:border-primary/50",
                      isCurrent
                        ? "border-primary bg-primary/5"
                        : "border-border bg-white hover:bg-muted/30"
                    )}
                  >
                    <span className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      isCurrent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {index + 1}
                    </span>
                    <span className={cn(
                      "flex-1 text-sm transition-colors",
                      isCurrent ? "font-medium text-primary" : "text-foreground group-hover:text-primary"
                    )}>
                      {sibling.title[currentLang]}
                    </span>
                    {isLessonCompleted(user, sibling.slug) && (
                      <Check className="size-4 text-accent" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link to="/subjects" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            ← {currentLang === 'ar' ? 'العودة للمواد' : currentLang === 'sw' ? 'Rudi kwa Masomo' : 'Back to Subjects'}
          </Link>
        </div>
      </div>
    </div>
  )
}