import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'

import { AudioTrigger } from '#/components/lesson/AudioTrigger'
import { ContentTabs } from '#/components/lesson/ContentTabs'
import { LessonHeader } from '#/components/lesson/LessonHeader'
import { VideoEmbed } from '#/components/lesson/VideoEmbed'
import { WrittenContent } from '#/components/lesson/WrittenContent'
import { Button } from '#/components/ui/button'
import { checkLessonAccess, getLessonBySlug, getSubjectById, isLessonCompleted } from '#/data/seed'
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
  const lesson = getLessonBySlug(slug)

  if (!lesson) {
    return (
      <div className="container-main py-16">
        <h1 className="text-[28px] font-bold text-foreground">{t('lesson.not_found')}</h1>
      </div>
    )
  }

  const subject = getSubjectById(lesson.subjectId)
  const completed = isLessonCompleted(user, lesson.slug)
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
      <LessonHeader
        lesson={{
          title: lesson.title[currentLang],
          slug: lesson.slug,
          subjectId: lesson.subjectId,
          levelId: lesson.levelId,
        }}
        subjectName={subject?.name[currentLang] ?? ''}
        completed={completed}
        onToggleComplete={() => updateProgress(lesson.slug)}
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
