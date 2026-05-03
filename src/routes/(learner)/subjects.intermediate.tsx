import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'

import { LessonCard } from '#/components/subjects/LessonCard'
import { LockOverlay } from '#/components/shared/LockOverlay'
import { BorderOrnament } from '#/components/shared/IslamicPatterns'
import { isLessonCompleted, lessons, levels } from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/(learner)/subjects/intermediate')({
  component: IntermediateSubjectsPage,
})

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-primary-foreground/70">{progress}% complete</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-primary-foreground/20">
        <div
          className="h-full rounded-full bg-linear-to-r from-accent to-[#D4AF37] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

function IntermediateSubjectsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { currentLang, t } = useLanguage()
  const level = levels.find((candidate) => String(candidate.id) === 'kati')
  const hasAccess = Boolean(user?.levelAccess.map(String).includes('kati'))
  const intermediateLessons = lessons.filter((lesson) => String(lesson.levelId) === 'kati')
  const completedCount =
    user?.progress.filter((progressSlug) =>
      intermediateLessons.some((lesson) => lesson.slug === progressSlug),
    ).length ?? 0
  const totalIntermediate = intermediateLessons.length
  const progress = totalIntermediate > 0 ? Math.round((completedCount / totalIntermediate) * 100) : 0
  const allDone = completedCount === totalIntermediate && totalIntermediate > 0

  return (
    <div className="bg-background pb-12 lg:pb-16">
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-linear-to-br from-primary via-[#1B4332] to-primary-dark" />
        <div className="absolute inset-0 opacity-10">
          <svg className="size-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <defs>
              <pattern id="inter-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <polygon points="25,5 29,20 45,20 32,29 37,45 25,35 13,45 18,29 5,20 21,20" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#inter-pattern)" />
          </svg>
        </div>

        <BorderOrnament position="bottom" variant="mosaic" className="h-1.5" />

        <div className="container-main relative z-10 py-8 lg:py-12">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
            <Link to="/subjects" className="flex items-center gap-1 transition-colors hover:text-primary-foreground">
              <ArrowLeft className="size-4" />
              {t('navigation.subjects')}
            </Link>
          </div>

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                {t('levels.intermediate')}
              </p>
              <h1 className="mb-3 font-decorative text-[28px] font-bold leading-tight lg:text-[36px]">
                {level?.name[currentLang]}
              </h1>
              <p className="text-sm leading-relaxed text-primary-foreground/70">
                {level?.description[currentLang]}
              </p>
            </div>

            {allDone ? (
              <Link
                to="/subjects/advanced"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90"
              >
                {t('levels.go_to_intermediate')}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div className="rounded-lg bg-primary-foreground/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-primary-foreground/70">
                  {completedCount}/{totalIntermediate} lessons completed
                </p>
                <ProgressBar progress={progress} />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container-main py-8 lg:py-12">
        {allDone && (
          <div className="mb-8 flex items-center gap-3 rounded-lg border border-success/20 bg-success/5 p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-success/10">
              <Star className="size-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-success">Congratulations!</p>
              <p className="text-sm text-muted-foreground">
                You have completed all intermediate lessons. The advanced level is now unlocked.
              </p>
            </div>
          </div>
        )}

        <div className="relative min-h-75">
          <div
            className={cn(
              'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
              !hasAccess && 'opacity-40',
            )}
          >
            {intermediateLessons.map((lesson) => (
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
          {!hasAccess && (
            <LockOverlay 
              title={user ? (
                currentLang === 'ar' ? 'أكمل المرحلة السابقة' : currentLang === 'sw' ? 'Kamilisha Hatua ya Awali' : 'Complete Previous Level'
              ) : undefined}
              message={user ? (
                currentLang === 'ar' 
                  ? 'يرجى إكمال ٧٠٪ من مستوى المبتدئين لفتح هذا المستوى.' 
                  : currentLang === 'sw' 
                    ? 'Tafadhali kamilisha 70% ya hatua ya awali ili kufungua hatua hii.' 
                    : 'Please complete 70% of the Beginner level to unlock this stage.'
              ) : undefined}
              ctaText={user ? (
                currentLang === 'ar' ? 'العودة للمواد' : currentLang === 'sw' ? 'Rudi kwa Masomo' : 'Back to Subjects'
              ) : undefined}
              ctaHref={user ? '/subjects' : '/register'}
            />
          )}
        </div>
      </section>
    </div>
  )
}
