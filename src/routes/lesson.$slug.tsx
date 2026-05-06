import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

import { LessonReader } from '#/components/lesson-reader'
import { Button } from '#/components/ui/button'
import { isFiqhiSlug } from '#/data/fiqhiAdapter'
import {
  getLessonBreadcrumb,
  getLessonModelBySlug,
  getLessonPrevNext,
  getLessonSiblings,
} from '#/data/lessonModel'
import {
  checkLessonAccess,
  getLessonBySlug,
  isLessonCompleted,
  lessons as allSeedLessons,
} from '#/data/seed'
import { useAudioPlayer } from '#/hooks/useAudioPlayer'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'

export const Route = createFileRoute('/lesson/$slug')({
  component: LessonPage,
  beforeLoad: ({ context, params, location }) => {
    if (isFiqhiSlug(params.slug)) return
    const lesson = getLessonBySlug(params.slug)
    if (!lesson) return
    const access = checkLessonAccess(lesson, context.auth.user)
    if (!access.allowed && access.redirectTo === '/login') {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
    if (!access.allowed) {
      throw redirect({ to: '/subjects' })
    }
  },
})

function LessonPage() {
  const { slug } = Route.useParams()
  const { user, updateProgress } = useAuth()
  const { t } = useLanguage()
  const { closePlayer } = useAudioPlayer()
  const [showUnlockToast, setShowUnlockToast] = useState(false)

  useEffect(() => {
    closePlayer()
  }, [closePlayer, slug])

  const model = useMemo(() => getLessonModelBySlug(slug), [slug])
  const breadcrumb = useMemo(() => getLessonBreadcrumb(slug), [slug])
  const prevNext = useMemo(() => getLessonPrevNext(slug), [slug])
  const siblings = useMemo(() => getLessonSiblings(slug), [slug])

  const completed = isLessonCompleted(user, slug)

  useEffect(() => {
    if (!showUnlockToast) return
    const timeout = window.setTimeout(() => setShowUnlockToast(false), 5000)
    return () => window.clearTimeout(timeout)
  }, [showUnlockToast])

  if (!model) {
    return (
      <div className="container-main py-16">
        <h1 className="font-display text-[28px] font-semibold text-foreground">
          {t('lesson.not_found')}
        </h1>
      </div>
    )
  }

  const handleComplete = () => {
    if (completed) return
    const hadAdvancedBefore = Boolean(
      (user?.levelAccess as readonly string[] | undefined)?.includes('endelea'),
    )
    updateProgress(slug)
    const intermediate = allSeedLessons.filter(
      (l) => (l.levelId as string) === 'kati',
    )
    const completedAfter = intermediate.filter((l) =>
      l.slug === slug ? true : Boolean(user?.progress.includes(l.slug)),
    ).length
    if (
      !hadAdvancedBefore &&
      intermediate.length > 0 &&
      completedAfter === intermediate.length
    ) {
      setShowUnlockToast(true)
    }
  }

  const markLabel = t('lesson.mark_complete')
  const doneLabel = t('lesson.completed')

  const completionSlot = user ? (
    <Button
      onClick={handleComplete}
      variant={completed ? 'default' : 'outline'}
      aria-label={completed ? doneLabel : markLabel}
      className="w-full min-h-[48px]"
    >
      {completed ? `${doneLabel} ✓` : markLabel}
    </Button>
  ) : null

  return (
    <>
      {showUnlockToast && (
        <div
          role="status"
          className="fixed left-1/2 top-6 z-50 -translate-x-1/2 border border-accent bg-success px-6 py-3 text-background shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        >
          <p className="text-[14px] font-semibold">
            {t('lesson.advanced_unlocked')}
          </p>
        </div>
      )}

      <LessonReader
        lesson={model}
        breadcrumb={breadcrumb}
        prevNext={prevNext}
        siblings={siblings}
        completionSlot={completionSlot}
      />
    </>
  )
}
