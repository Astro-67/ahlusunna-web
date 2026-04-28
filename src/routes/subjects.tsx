import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { LessonCard } from '#/components/subjects/LessonCard'
import { SubjectCard } from '#/components/subjects/SubjectCard'
import {
  getLessonsBySubject,
  getProgressPercentage,
  getSubjectBySlug,
  isLessonCompleted,
  subjects,
} from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'

interface SubjectsSearch {
  subject?: string
}

export const Route = createFileRoute('/subjects')({
  component: SubjectsPage,
  validateSearch: (search: Record<string, unknown>): SubjectsSearch => ({
    subject: typeof search.subject === 'string' ? search.subject : undefined,
  }),
})

function SubjectsPage() {
  const navigate = useNavigate()
  const search = Route.useSearch()
  const { user } = useAuth()
  const { currentLang, t } = useLanguage()
  const selectedSubject = search.subject ? getSubjectBySlug(search.subject) : undefined
  const visibleSubjects = subjects.filter((subject) => subject.levelId === 'awali')
  const visibleLessons = selectedSubject
    ? getLessonsBySubject(selectedSubject.id)
    : visibleSubjects.flatMap((subject) => getLessonsBySubject(subject.id))

  return (
    <div className="bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="container-main py-10 lg:py-14">
          <p className="mb-3 text-sm font-medium text-accent">{t('subjects.beginner_title')}</p>
          <h1 className="text-[28px] font-bold leading-[1.3] lg:text-[36px]">{t('subjects.title')}</h1>
          <p className="mt-3 max-w-2xl text-base leading-[1.6] text-primary-foreground/75">
            {t('subjects.beginner_description')}
          </p>
        </div>
      </section>

      <section className="container-main py-8 lg:py-12">
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleSubjects.map((subject) => {
            const lessonCount = getLessonsBySubject(subject.id).length
            return (
              <SubjectCard
                key={subject.id}
                subject={{
                  id: subject.id,
                  name: subject.name[currentLang],
                  slug: subject.slug,
                  description: subject.description[currentLang],
                  icon: subject.icon,
                  lessonCount,
                }}
                progress={getProgressPercentage(user, subject.id)}
                onClick={() =>
                  void navigate({
                    to: '/subjects',
                    search: { subject: subject.slug },
                  })
                }
              />
            )
          })}
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[24px] font-bold leading-[1.3] text-foreground lg:text-[28px]">
              {selectedSubject?.name[currentLang] ?? t('subjects.available_lessons')}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('subjects.lessons_count', { count: visibleLessons.length })}
            </p>
          </div>
          {selectedSubject && (
            <button
              type="button"
              onClick={() => void navigate({ to: '/subjects' })}
              className="text-start text-sm font-medium text-accent hover:underline"
            >
              {t('subjects.title')}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={{
                id: lesson.id,
                title: lesson.title[currentLang],
                slug: lesson.slug,
                duration: lesson.duration,
                hasText: Boolean(lesson.content),
                hasVideo: Boolean(lesson.videoUrl),
                hasAudio: Boolean(lesson.audioSrc),
                thumbnail: lesson.thumbnail,
              }}
              completed={isLessonCompleted(user, lesson.slug)}
              onClick={() => void navigate({ to: '/lesson/$slug', params: { slug: lesson.slug } })}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
