import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { CheckCircle, ChevronRight } from 'lucide-react'

import { LessonCard } from '#/components/subjects/LessonCard'
import { ProgressBar } from '#/components/shared/ProgressBar'
import { EmptyState } from '#/components/shared/EmptyState'
import { lessonService, subjectService } from '#/data/services'
import { isLessonCompleted } from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/(learner)/progress')({
  component: ProgressPage,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw new Error('Redirect to login')
    }
  },
})

const pageCopy = {
  en: {
    title: 'Maendeleo Yangu',
    summary: 'Muhtasari wa masomo uliyokamilisha.',
    completedLessons: 'Masomo yaliyokamilika',
    overall: 'Jumla',
    empty: 'Bado hujakamilisha somo.',
    emptyCta: 'Anza Kujifunza →',
    completed: 'Imekamilika',
  },
  sw: {
    title: 'Maendeleo Yangu',
    summary: 'Muhtasari wa masomo uliyokamilisha.',
    completedLessons: 'Masomo yaliyokamilika',
    overall: 'Jumla',
    empty: 'Bado hujakamilisha somo.',
    emptyCta: 'Anza Kujifunza →',
    completed: 'Imekamilika',
  },
  ar: {
    title: 'تقدمي',
    summary: 'ملخص الدروس التي أكملتها.',
    completedLessons: 'الدروس المكتملة',
    overall: 'الإجمالي',
    empty: 'لم تكمل أي درس بعد.',
    emptyCta: 'ابدأ التعلم ←',
    completed: 'مكتمل',
  },
}

function ProgressPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { currentLang, t } = useLanguage()
  const copy = pageCopy[currentLang]

  const allLessons = lessonService.getAll()
  const completedLessons = allLessons.filter((lesson) => isLessonCompleted(user, lesson.slug))
  
  const progressPercent = allLessons.length > 0 
    ? Math.round((completedLessons.length / allLessons.length) * 100) 
    : 0

  if (completedLessons.length === 0) {
    return (
      <div className="container-main py-16">
        <div className="mb-8 max-w-2xl">
          <h1 className="font-decorative text-[28px] font-bold leading-[1.3] text-foreground lg:text-[36px]">
            {copy.title}
          </h1>
          <p className="mt-3 text-base leading-[1.6] text-muted-foreground">{copy.summary}</p>
        </div>

        {/* Overall Progress */}
        <div className="mb-10 border border-border bg-white p-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="font-decorative text-[20px] font-semibold text-foreground">{copy.overall}</h2>
            <span className="text-sm text-muted-foreground">
              {completedLessons.length}/{allLessons.length}
            </span>
          </div>
          <ProgressBar progress={progressPercent} size="lg" />
        </div>

        <EmptyState
          icon={<CheckCircle aria-hidden="true" size={48} className="text-primary/30" />}
          title={copy.completedLessons}
          description={copy.empty}
          action={{
            label: copy.emptyCta,
            onClick: () => void navigate({ to: '/subjects' }),
          }}
        />

        <div className="mt-6 text-center">
          <Link to="/subjects" className="text-primary hover:underline">
            ← Rudi kwa Masomo
          </Link>
        </div>
      </div>
    )
  }

  // Group completed lessons by subject
  const subjectMap = new Map<string, typeof completedLessons>()
  completedLessons.forEach((lesson) => {
    const existing = subjectMap.get(lesson.subjectId) || []
    existing.push(lesson)
    subjectMap.set(lesson.subjectId, existing)
  })

  return (
    <div className="container-main py-12 lg:py-16">
      <div className="mb-8 max-w-2xl">
        <h1 className="font-decorative text-[28px] font-bold leading-[1.3] text-foreground lg:text-[36px]">
          {copy.title}
        </h1>
        <p className="mt-3 text-base leading-[1.6] text-muted-foreground">{copy.summary}</p>
      </div>

      {/* Overall Progress */}
      <div className="mb-10 border border-border bg-white p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="font-decorative text-[20px] font-semibold text-foreground">{copy.overall}</h2>
          <span className="text-sm text-muted-foreground">
            {completedLessons.length}/{allLessons.length}
          </span>
        </div>
        <ProgressBar progress={progressPercent} size="lg" />
      </div>

      {/* Completed Lessons by Subject */}
      {Array.from(subjectMap.entries()).map(([subjectId, lessons]) => {
        const subject = subjectService.getById(subjectId as any)
        return (
          <div key={subjectId} className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="font-decorative text-[20px] font-bold text-foreground">
                {subject?.name[currentLang] || subjectId}
              </h2>
              {subject?.name.ar && (
                <span className="font-arabic text-base text-accent" dir="rtl">
                  {subject.name.ar}
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                ({lessons.length} {copy.completed.toLowerCase()})
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => void navigate({ to: '/lesson/$slug', params: { slug: lesson.slug } })}
                  className="group flex min-h-32 flex-col rounded border border-border bg-white p-6 text-start transition-colors hover:border-primary/50 hover:bg-[#FDFCF8]"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckCircle className="size-4" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                  </div>
                  <h3 className="font-decorative text-lg font-bold text-foreground group-hover:text-primary">
                    {lesson.title[currentLang]}
                  </h3>
                  {lesson.title.ar && (
                    <span className="mt-1 block font-arabic text-sm text-accent" dir="rtl">
                      {lesson.title.ar}
                    </span>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="text-xs text-muted-foreground">
                      {copy.completed}
                    </span>
                    <ChevronRight className="size-4 text-primary transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      })}

      {/* Continue Learning CTA */}
      <div className="mt-8 border-t border-border pt-8">
        <Link
          to="/subjects"
          className="inline-flex items-center gap-2 text-primary hover:text-accent"
        >
          ← Rudi kwa Masomo
        </Link>
      </div>
    </div>
  )
}