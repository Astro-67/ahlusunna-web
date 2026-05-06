import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { LessonReader } from '#/components/lesson-reader'
import { Button } from '#/components/ui/button'
import {
  checkLessonAccess,
  getLessonBySlug,
  isLessonCompleted,
  lessons as allSeedLessons,
  levels,
  subjects,
} from '#/data/seed'
import { useAudioPlayer } from '#/hooks/useAudioPlayer'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import type { LessonReaderModel, MediaModel } from '#/components/lesson-reader/types'

// Transform seed Lesson to LessonReaderModel
function transformLesson(lesson: NonNullable<ReturnType<typeof getLessonBySlug>>): LessonReaderModel {
  // Convert TiptapDocument content to multilingual text string
  const tiptapToText = (doc: { content?: Array<{ content?: Array<{ text?: string }> }> } | undefined): string => {
    if (!doc?.content) return ''
    return doc.content
      .map((block) => block.content?.map((c) => c.text ?? '').join('') ?? '')
      .join('\n')
  }

  const media: MediaModel[] = []
  if (lesson.videoUrl) {
    media.push({
      id: `video-${lesson.id}`,
      type: 'VIDEO_EMBED',
      url: lesson.videoUrl,
    })
  }
  if (lesson.audioSrc) {
    media.push({
      id: `audio-${lesson.id}`,
      type: 'AUDIO',
      url: lesson.audioSrc,
      source: lesson.audioType,
    })
  }

  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    body: {
      sw: tiptapToText(lesson.content.sw),
      ar: tiptapToText(lesson.content.ar),
      en: tiptapToText(lesson.content.en),
    },
    media,
    estimatedReadMinutes: parseInt(lesson.duration.split(':')[0]) || 15,
    status: lesson.status,
    levelId: lesson.levelId,
    source: 'seed',
  }
}

export const Route = createFileRoute('/lesson/$slug')({
  component: LessonPage,
  beforeLoad: ({ context, params, location }) => {
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
  const { t, currentLang } = useLanguage()
  const { closePlayer } = useAudioPlayer()
  const [showUnlockToast, setShowUnlockToast] = useState(false)

  useEffect(() => {
    closePlayer()
  }, [closePlayer, slug])

  const lesson = getLessonBySlug(slug)
  const completed = isLessonCompleted(user, slug)

  useEffect(() => {
    if (!showUnlockToast) return
    const timeout = window.setTimeout(() => setShowUnlockToast(false), 5000)
    return () => window.clearTimeout(timeout)
  }, [showUnlockToast])

  if (!lesson) {
    return (
      <div className="container-main py-16">
        <h1 className="font-display text-[28px] font-semibold text-foreground">
          {t('lesson.not_found')}
        </h1>
      </div>
    )
  }

  const langKey = currentLang as 'sw' | 'ar' | 'en'
  const model = transformLesson(lesson)

  // Build breadcrumb model
  const level = levels.find((l) => l.id === lesson.levelId)
  const subject = subjects.find((s) => s.id === lesson.subjectId)
  const breadcrumb = {
    crumbs: [
      { label: level?.name ?? { sw: '', ar: '', en: '' }, to: '/subjects' },
      { label: subject?.name ?? { sw: '', ar: '', en: '' }, to: `/subjects/${subject?.slug}` },
      { label: lesson.title },
    ],
  }

  // Get siblings (other lessons in same subject)
  const siblings = allSeedLessons
    .filter((l) => l.subjectId === lesson.subjectId && l.status === 'published')
    .sort((a, b) => a.order - b.order)
    .map((l) => ({
      id: l.id,
      slug: l.slug,
      title: l.title,
      estimatedReadMinutes: parseInt(l.duration.split(':')[0]) || 15,
      mediaKinds: [] as ('AUDIO' | 'VIDEO_EMBED')[],
    }))

  // Build prev/next model
  const currentIndex = siblings.findIndex((l) => l.slug === slug)
  const prevNext = {
    prev: currentIndex > 0 ? { slug: siblings[currentIndex - 1].slug, title: siblings[currentIndex - 1].title } : null,
    next: currentIndex < siblings.length - 1 ? { slug: siblings[currentIndex + 1].slug, title: siblings[currentIndex + 1].title } : null,
  }

  const handleComplete = () => {
    if (completed) return
    const hadAdvancedBefore = Boolean(
      (user?.levelAccess as readonly string[] | undefined)?.includes('endelea'),
    )
    updateProgress(slug)
    const intermediate = allSeedLessons.filter((l) => (l.levelId as string) === 'kati')
    const completedAfter = intermediate.filter((l) =>
      l.slug === slug ? true : Boolean(user?.progress.includes(l.slug)),
    ).length
    if (!hadAdvancedBefore && intermediate.length > 0 && completedAfter === intermediate.length) {
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
          <p className="text-[14px] font-semibold">{t('lesson.advanced_unlocked')}</p>
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