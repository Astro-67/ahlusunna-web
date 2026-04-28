import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

import { LessonCard } from '#/components/subjects/LessonCard'
import { ProgressBar } from '#/components/shared/ProgressBar'
import { EmptyState } from '#/components/shared/EmptyState'
import { getProgressPercentage, lessons } from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/(learner)/progress')({
  component: ProgressPage,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
  },
})

function ProgressPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { currentLang, t } = useLanguage()
  const completedLessons = lessons.filter((lesson) => user?.progress.includes(lesson.slug))
  const progress = getProgressPercentage(user)

  return (
    <div className="container-main py-12 lg:py-16">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-[28px] font-bold leading-[1.3] text-foreground lg:text-[36px]">
          {t('progress.title')}
        </h1>
        <p className="mt-3 text-base leading-[1.6] text-muted-foreground">{t('progress.summary')}</p>
      </div>

      <div className="mb-10 border border-border bg-white p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-[20px] font-semibold text-foreground">{t('progress.overall')}</h2>
          <span className="text-sm text-muted-foreground">
            {completedLessons.length}/{lessons.length}
          </span>
        </div>
        <ProgressBar progress={progress} size="lg" />
      </div>

      <h2 className="mb-4 text-[24px] font-bold text-foreground lg:text-[28px]">
        {t('progress.completed_lessons')}
      </h2>
      {completedLessons.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {completedLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={{
                id: lesson.id,
                title: lesson.title[currentLang],
                slug: lesson.slug,
                duration: lesson.duration,
                hasText: true,
                hasVideo: Boolean(lesson.videoUrl),
                hasAudio: Boolean(lesson.audioSrc),
                thumbnail: lesson.thumbnail,
              }}
              completed
              onClick={() => void navigate({ to: '/lesson/$slug', params: { slug: lesson.slug } })}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<CheckCircle aria-hidden="true" size={40} />}
          title={t('progress.completed_lessons')}
          description={t('progress.empty')}
        />
      )}
    </div>
  )
}
