import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { LessonCard } from '#/components/subjects/LessonCard'
import { SubjectCard } from '#/components/subjects/SubjectCard'
import { BorderOrnament, IslamicDivider } from '#/components/shared/IslamicPatterns'
import {
  getLessonsBySubject,
  getProgressPercentage,
  getSubjectBySlug,
  isLessonCompleted,
  subjects,
} from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { ArrowLeft } from 'lucide-react'

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
    ? getLessonsBySubject(selectedSubject.id).filter((lesson) => lesson.levelId === 'awali')
    : visibleSubjects
        .flatMap((subject) => getLessonsBySubject(subject.id))
        .filter((lesson) => lesson.levelId === 'awali')

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1B4332] to-[#143828]" />
        <div className="absolute inset-0 opacity-10">
          <svg className="size-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <defs>
              <pattern id="subjects-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 5L35 25L55 30L35 35L30 55L25 35L5 30L25 25Z" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#subjects-pattern)" />
          </svg>
        </div>

        <BorderOrnament position="bottom" variant="mosaic" className="h-1.5" />

        <div className="container-main relative z-10 py-10 lg:py-16">
          {selectedSubject && (
            <button
              type="button"
              onClick={() => void navigate({ to: '/subjects' })}
              className="mb-6 flex items-center gap-2 text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft className="size-4" />
              {t('subjects.title')}
            </button>
          )}

          <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            {t('subjects.beginner_title')}
          </p>

          <h1 className="mb-4 font-decorative text-[28px] font-bold leading-tight lg:text-[36px]">
            {selectedSubject?.name[currentLang] ?? t('subjects.title')}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-primary-foreground/75">
            {selectedSubject?.description[currentLang] ?? t('subjects.beginner_description')}
          </p>
        </div>
      </section>

      <section className="container-main py-8 lg:py-12">
        {!selectedSubject && (
          <>
            <div className="mb-8">
              <h2 className="mb-2 font-decorative text-[22px] font-bold text-foreground lg:text-[26px]">
                {t('subjects.subject_label')}s
              </h2>
              <IslamicDivider variant="simple" className="max-w-[80px]" />
            </div>

            <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          </>
        )}

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-decorative text-[22px] font-bold text-foreground lg:text-[26px]">
              {t('subjects.available_lessons')}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('subjects.lessons_count', { count: visibleLessons.length })}
            </p>
          </div>
        </div>

        <IslamicDivider variant="geometric" className="mb-8" />

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
