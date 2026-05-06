import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  FileText,
} from 'lucide-react'

import {
  courseService,
  lessonService,
  subjectService,
} from '#/data/services'
import { isLessonCompleted } from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import { Button } from '#/components/ui/button'
import type { Language } from '#/types'

export const Route = createFileRoute('/(subjects)/subjects/$slug')({
  component: SubjectDetailPage,
})

const subjectIcons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  quran: BookOpen,
  hadith: FileText,
  fiqhi: BookOpen,
  tawhidi: BookOpen,
  sira: BookOpen,
  adhkar: BookOpen,
}

const pageCopy: Record<Language, {
  breadcrumbHome: string
  breadcrumbSubjects: string
  lessonsCount: string
  continueLabel: string
  noLessons: string
  lessonLabel: string
}> = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbSubjects: 'Subjects',
    lessonsCount: 'lessons',
    continueLabel: 'Continue →',
    noLessons: 'More lessons coming soon, Insha\'Allah.',
    lessonLabel: 'Lesson',
  },
  sw: {
    breadcrumbHome: 'Nyumbani',
    breadcrumbSubjects: 'Masomo',
    lessonsCount: 'masomo',
    continueLabel: 'Endelea →',
    noLessons: 'Masomo zaidi yatakuja hivi karibuni, Insha\'Allah.',
    lessonLabel: 'Somo',
  },
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbSubjects: 'المواد',
    lessonsCount: 'دروس',
    continueLabel: 'المتابعة ←',
    noLessons: 'ستأتي دروس أخرى قريبًا، إن شاء الله.',
    lessonLabel: 'الدرس',
  },
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Calligraphic motif */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        className="mb-6 text-primary/20"
      >
        <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="1" />
        <circle cx="40" cy="40" r="25" stroke="currentColor" strokeWidth="0.5" />
        <path
          d="M40 15L45 30H55L47 40L50 55L40 47L30 55L33 40L25 30H35L40 15Z"
          fill="currentColor"
          opacity="0.3"
        />
        <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.5" />
      </svg>
      <p className="font-arabic text-xl text-muted-foreground" dir="rtl">
        {message}
      </p>
    </div>
  )
}

function CourseSection({
  course,
  lessons,
  onLessonClick,
  lessonIndexOffset,
}: {
  course: { id: string; slug: string; title: { sw: string; ar: string; en: string } }
  lessons: Array<{ id: string; slug: string; title: { sw: string; ar: string; en: string }; duration: string }>
  onLessonClick: (slug: string) => void
  lessonIndexOffset: number
}) {
  const { currentLang } = useLanguage()
  const { user } = useAuth()
  const copy = pageCopy[currentLang]
  const isRtl = currentLang === 'ar'

  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-border bg-white">
      {/* Course Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-transparent px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="size-5 text-primary" />
          </div>
          <div>
            <h3 className="font-decorative text-xl font-bold text-foreground">
              {course.title[currentLang]}
            </h3>
            {course.title.ar && (
              <span className="mt-0.5 block font-arabic text-base text-accent" dir="rtl">
                {course.title.ar}
              </span>
            )}
          </div>
          <span className="ml-auto text-sm text-muted-foreground">
            {lessons.length} {copy.lessonsCount}
          </span>
        </div>
      </div>

      {/* Lessons */}
      {lessons.length > 0 ? (
        <div className="divide-y divide-border">
          {lessons.map((lesson, index) => {
            const isCompleted = isLessonCompleted(user, lesson.slug)
            const formattedNum = String(lessonIndexOffset + index + 1).padStart(2, '0')

            return (
              <div
                key={lesson.id}
                onClick={() => onLessonClick(lesson.slug)}
                className="group flex min-h-[72px] cursor-pointer items-center gap-4 px-6 py-5 transition-colors duration-150 hover:bg-muted/30"
              >
                {/* Number/Status */}
                <div className="shrink-0">
                  {isCompleted ? (
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary">
                      <Check className="size-5 text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full border-2 border-border bg-background font-decorative text-lg font-bold text-primary">
                      {formattedNum}
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="min-w-0 flex-1">
                  <div className={cn(
                    "text-lg font-medium transition-colors sm:text-xl",
                    isCompleted ? "text-muted-foreground" : "text-foreground group-hover:text-primary"
                  )}>
                    {lesson.title[currentLang]}
                  </div>
                  {lesson.title.ar && (
                    <span className="mt-1 block font-arabic text-base text-accent/70" dir="rtl">
                      {lesson.title.ar}
                    </span>
                  )}
                </div>

                {/* Duration & Arrow */}
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {lesson.duration}
                  </span>
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-150 group-hover:bg-primary group-hover:text-white">
                    <ChevronRight className="size-5" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="px-6 py-8 text-center">
          <p className="font-arabic text-muted-foreground" dir="rtl">
            {copy.noLessons}
          </p>
        </div>
      )}
    </div>
  )
}

function SubjectDetailPage() {
  const { slug } = Route.useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { currentLang } = useLanguage()
  const copy = pageCopy[currentLang]
  const isRtl = currentLang === 'ar'

  const subject = subjectService.getBySlug(slug)
  const courses = subject ? courseService.getBySubject(subject.id) : []

  // Find first incomplete lesson for "Continue" button
  const allSubjectLessons = subject ? lessonService.getBySubject(subject.id) : []
  const nextLesson = allSubjectLessons.find(l => !isLessonCompleted(user, l.slug)) || allSubjectLessons[0]

  if (!subject) {
    return (
      <div className="container-main py-16 text-center">
        <h1 className="font-decorative text-2xl font-bold text-foreground">Somo halijapatikana</h1>
        <p className="mt-2 text-muted-foreground">Somo unalotafuta halipo.</p>
        <Link
          to="/subjects"
          className="mt-6 inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="size-4" />
          Rudi kwa Masomo
        </Link>
      </div>
    )
  }

  const Icon = subjectIcons[subject.id] || BookOpen

  return (
    <div className="bg-muted/20" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Header */}
      <header className="border-b border-border bg-white">
        <div className="container-main px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
              {copy.breadcrumbHome}
            </Link>
            <span className="text-muted-foreground/40">›</span>
            <Link to="/subjects" className="text-muted-foreground transition-colors hover:text-primary">
              {copy.breadcrumbSubjects}
            </Link>
            <span className="text-muted-foreground/40">›</span>
            <span className="font-medium text-foreground">{subject.name[currentLang]}</span>
          </nav>

          {/* Subject Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start lg:gap-8">
            {/* Icon */}
            <div className="flex size-20 shrink-0 items-center justify-center rounded-xl border-2 border-primary/20 bg-primary/5 lg:size-24">
              <Icon className="size-10 text-primary lg:size-12" strokeWidth={1.2} />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-decorative text-3xl font-bold leading-tight text-foreground lg:text-4xl">
                {subject.name[currentLang]}
              </h1>
              
              <p 
                className="mt-2 font-arabic text-2xl text-accent lg:text-3xl" 
                dir="rtl"
              >
                {subject.name.ar}
              </p>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {subject.description[currentLang]}
              </p>

              {/* Stats */}
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="size-5 text-primary" />
                  <span className="font-medium text-foreground">{allSubjectLessons.length}</span>
                  <span className="text-muted-foreground">{copy.lessonsCount}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex shrink-0 items-center gap-3 md:mt-2">
              <Button asChild variant="outline" className="px-5">
                <Link to="/subjects">
                  <ArrowLeft className="mr-2 size-4" />
                  {currentLang === 'ar' ? 'رجوع' : 'Nyuma'}
                </Link>
              </Button>
              {nextLesson && (
                <Button
                  variant="accent"
                  onClick={() => navigate({ to: '/lesson/$slug', params: { slug: nextLesson.slug } })}
                  className="px-6"
                >
                  {copy.continueLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Courses and Lessons */}
      <div className="container-main px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {courses.length > 0 ? (
          courses.map((course, courseIndex) => {
            const courseLessons = lessonService.getByCourse(course.id)
            // Calculate offset for lesson numbering across all courses
            let lessonIndexOffset = 0
            for (let i = 0; i < courseIndex; i++) {
              lessonIndexOffset += lessonService.getByCourse(courses[i].id).length
            }
            return (
              <CourseSection
                key={course.id}
                course={course}
                lessons={courseLessons}
                onLessonClick={(lessonSlug) => navigate({ to: '/lesson/$slug', params: { slug: lessonSlug } })}
                lessonIndexOffset={lessonIndexOffset}
              />
            )
          })
        ) : (
          <EmptyState message={copy.noLessons} />
        )}
      </div>
    </div>
  )
}