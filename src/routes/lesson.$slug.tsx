import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { AudioTrigger } from '#/components/lesson/AudioTrigger'
import { ContentTabs } from '#/components/lesson/ContentTabs'
import { LessonHeader } from '#/components/lesson/LessonHeader'
import { VideoEmbed } from '#/components/lesson/VideoEmbed'
import { WrittenContent } from '#/components/lesson/WrittenContent'
import { Button } from '#/components/ui/button'
import {
  checkLessonAccess,
  getLessonBySlug,
  getSubjectById,
  isLessonCompleted,
  lessons,
} from '#/data/seed'
import { useAudioPlayer } from '#/hooks/useAudioPlayer'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import type { LessonTab } from '#/types'

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
  const { currentLang, t } = useLanguage()
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudioPlayer()
  const [activeTab, setActiveTab] = useState<LessonTab>('text')
  const [showUnlockToast, setShowUnlockToast] = useState(false)
  const lesson = getLessonBySlug(slug)

  useEffect(() => {
    if (!showUnlockToast) return

    const timeout = window.setTimeout(() => setShowUnlockToast(false), 5000)
    return () => window.clearTimeout(timeout)
  }, [showUnlockToast])

  if (!lesson) {
    return (
      <div className="container-main py-16">
        <h1 className="text-[28px] font-bold text-foreground">{t('lesson.not_found')}</h1>
      </div>
    )
  }

  const subject = getSubjectById(lesson.subjectId)
  const completed = isLessonCompleted(user, lesson.slug)
  const handleToggleComplete = () => {
    const hadAdvancedBefore = Boolean(user?.levelAccess.includes('endelea'))
    const isCompletingLesson = !completed
    const intermediateLessons = lessons.filter((candidate) => candidate.levelId === 'kati')
    const completedIntermediateAfter = intermediateLessons.filter((candidate) =>
      candidate.slug === lesson.slug
        ? isCompletingLesson
        : Boolean(user?.progress.includes(candidate.slug)),
    ).length
    const unlocksAdvanced =
      !hadAdvancedBefore &&
      isCompletingLesson &&
      intermediateLessons.length > 0 &&
      completedIntermediateAfter === intermediateLessons.length

    updateProgress(lesson.slug)

    if (unlocksAdvanced) {
      setShowUnlockToast(true)
    }
  }
  const track = lesson.audioSrc
    ? {
        id: lesson.id,
        title: lesson.title[currentLang],
        subject: subject?.name[currentLang] ?? '',
        src: lesson.audioSrc,
        type: lesson.audioType ?? 'lecture',
        duration: 0,
      }
    : null
  const isCurrentTrackPlaying = Boolean(track && currentTrack?.id === track.id && isPlaying)

  return (
    <div className="bg-background pb-20">
      {showUnlockToast && (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 bg-[#2D6A4F] px-6 py-3 text-[#FAF7F0] shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
          <p className="text-sm font-medium">
            Hongera! Umeufungua kiwango cha Kuendelea (Advanced).
          </p>
        </div>
      )}

      <LessonHeader
        lesson={{
          title: lesson.title[currentLang],
          slug: lesson.slug,
          subjectId: lesson.subjectId,
          levelId: lesson.levelId,
        }}
        subjectName={subject?.name[currentLang] ?? ''}
        completed={completed}
        onToggleComplete={handleToggleComplete}
      />

      <ContentTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasText={Boolean(lesson.content)}
        hasVideo={Boolean(lesson.videoUrl)}
        hasAudio={Boolean(lesson.audioSrc)}
      />

      <section className="container-main">
        {activeTab === 'text' && <WrittenContent content={lesson.content[currentLang]} language={currentLang} />}
        {activeTab === 'video' &&
          (lesson.videoUrl ? (
            <VideoEmbed videoUrl={lesson.videoUrl} />
          ) : (
            <p className="py-8 text-muted-foreground">{t('lesson.not_available')}</p>
          ))}
        {activeTab === 'audio' && (
          <div className="mx-auto max-w-3xl py-8 lg:py-12">
            <div className="border border-border bg-white p-6">
              <h2 className="mb-2 text-[24px] font-bold text-foreground lg:text-[28px]">
                {lesson.title[currentLang]}
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">{t('lesson.audio_intro')}</p>
              {track ? (
                <AudioTrigger
                  track={track}
                  isPlaying={isCurrentTrackPlaying}
                  onPlay={() => {
                    if (currentTrack?.id === track.id) {
                      togglePlay()
                    } else {
                      playTrack(track)
                    }
                  }}
                />
              ) : (
                <Button type="button" disabled>
                  {t('lesson.not_available')}
                </Button>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
