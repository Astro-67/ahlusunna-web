import { createFileRoute, redirect, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowLeft, Play, Headphones, PlayCircle, FileText, Check } from 'lucide-react'

import {
  checkLessonAccess,
  getLessonBySlug,
  getSubjectById,
  isLessonCompleted,
  lessons,
  getLessonsBySubject,
} from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { useAudioPlayer } from '#/hooks/useAudioPlayer'
import { cn } from '#/lib/utils'
import { Button } from '#/components/ui/button'

import { VideoEmbed } from '#/components/lesson/VideoEmbed'
import { WrittenContent } from '#/components/lesson/WrittenContent'
import { AudioTrigger } from '#/components/lesson/AudioTrigger'

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
  const navigate = useNavigate()
  const { user, updateProgress } = useAuth()
  const { currentLang, t } = useLanguage()
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudioPlayer()
  const [showUnlockToast, setShowUnlockToast] = useState(false)
  const lesson = getLessonBySlug(slug)

  useEffect(() => {
    if (!showUnlockToast) return
    const timeout = window.setTimeout(() => setShowUnlockToast(false), 5000)
    return () => window.clearTimeout(timeout)
  }, [showUnlockToast])

  // Mark lesson as complete on mount for now (or when user interacts)
  // According to original logic, there was a "Mark as Complete" button. 
  // We can just automatically mark it complete or keep a button at the bottom.
  const handleComplete = () => {
    if (!lesson) return
    const hadAdvancedBefore = Boolean(user?.levelAccess.includes('endelea'))
    const completed = isLessonCompleted(user, lesson.slug)
    if (completed) return

    updateProgress(lesson.slug)

    const intermediateLessons = lessons.filter((c) => c.levelId === 'kati')
    const completedIntermediateAfter = intermediateLessons.filter((c) =>
      c.slug === lesson.slug ? true : Boolean(user?.progress.includes(c.slug)),
    ).length
    const unlocksAdvanced =
      !hadAdvancedBefore &&
      intermediateLessons.length > 0 &&
      completedIntermediateAfter === intermediateLessons.length

    if (unlocksAdvanced) {
      setShowUnlockToast(true)
    }
  }

  if (!lesson) {
    return (
      <div className="container-main py-16">
        <h1 className="text-[28px] font-bold text-foreground">{t('lesson.not_found')}</h1>
      </div>
    )
  }

  const subject = getSubjectById(lesson.subjectId)
  const subjectLessons = subject ? getLessonsBySubject(subject.id) : []
  const lessonIndex = subjectLessons.findIndex(l => l.id === lesson.id)
  const prevLesson = lessonIndex > 0 ? subjectLessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < subjectLessons.length - 1 ? subjectLessons[lessonIndex + 1] : null

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

  const formattedNum = String(lessonIndex + 1).padStart(2, '0')
  const totalLessonsStr = String(subjectLessons.length).padStart(2, '0')

  return (
    <div className="bg-background flex flex-col min-h-[calc(100vh-64px)]">
      {showUnlockToast && (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 bg-[#2D6A4F] px-6 py-3 text-[#FAF7F0] shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
          <p className="text-sm font-medium">
            Hongera! Umeufungua kiwango cha Kuendelea (Advanced).
          </p>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-6 py-8 lg:px-12 lg:py-10">
        <div className="absolute inset-y-0 right-0 w-[400px] opacity-[0.06] pointer-events-none hidden md:block">
          <svg viewBox="0 0 400 500" fill="none" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
            <defs>
              <pattern id="geo3" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect x="20" y="20" width="40" height="40" stroke="#C9A84C" strokeWidth="0.8" fill="none" transform="rotate(45 40 40)" />
                <circle cx="40" cy="40" r="3" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
                <line x1="0" y1="40" x2="20" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="60" y1="40" x2="80" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="0" x2="40" y2="20" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="60" x2="40" y2="80" stroke="#C9A84C" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="400" height="500" fill="url(#geo3)" />
          </svg>
        </div>

        <div className="container-main relative z-10">
          <div className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-[#FAF7F0]/55 font-medium">
            <Link to="/" className="flex items-center gap-1 transition-colors hover:text-[#FAF7F0]/90">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              {t('navigation.home')}
            </Link>
            <span className="text-[10px] text-[#FAF7F0]/25">›</span>
            <Link to="/subjects" className="transition-colors hover:text-[#FAF7F0]/90">{t('navigation.subjects')}</Link>
            <span className="text-[10px] text-[#FAF7F0]/25">›</span>
            <Link to={`/subjects/${subject?.slug}`} className="transition-colors hover:text-[#FAF7F0]/90">{subject?.name[currentLang]}</Link>
            <span className="text-[10px] text-[#FAF7F0]/25">›</span>
            <span className="text-[#FAF7F0]/85 font-semibold">{lesson.title[currentLang]}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
            <div className="flex size-[36px] shrink-0 items-center justify-center border border-[#FAF7F0]/20 bg-white/10 hidden sm:flex">
              <FileText className="size-4 text-[#FAF7F0]/80" strokeWidth={1.2} />
            </div>
            
            <div className="flex-1">
              <h1 className="mb-2 text-[24px] sm:text-[28px] font-bold leading-tight tracking-[-0.02em] text-[#FAF7F0]">
                {lesson.title[currentLang]}
              </h1>

              <div className="flex flex-wrap items-center gap-2.5 mt-4">
                <span className="border border-[#FAF7F0]/15 px-2.5 py-1 text-[11px] font-medium text-[#FAF7F0]/55">
                  Somo la {formattedNum} / {totalLessonsStr}
                </span>
                {lesson.audioSrc && (
                  <span className="flex items-center gap-1.5 border border-accent/30 bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent">
                    <Headphones className="size-3" strokeWidth={2.5} />
                    Sauti
                  </span>
                )}
                {lesson.videoUrl && (
                  <span className="flex items-center gap-1.5 border border-accent/30 bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent">
                    <PlayCircle className="size-3" strokeWidth={2.5} />
                    Video
                  </span>
                )}
                <span className="border border-[#FAF7F0]/15 px-2.5 py-1 text-[11px] font-medium text-[#FAF7F0]/55">
                  {lesson.duration}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex shrink-0 items-start gap-2 md:mt-0">
              <Button asChild variant="outline" className="border-white/30 bg-transparent text-white/70 hover:bg-white/10 hover:text-white">
                <Link to={`/subjects/${subject?.slug}`}>← Nyuma</Link>
              </Button>
              {nextLesson && (
                <Button variant="accent" onClick={() => navigate({ to: '/lesson/$slug', params: { slug: nextLesson.slug } })}>
                  Somo Lifuatalo →
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="container-main flex flex-col lg:flex-row flex-1">
        
        {/* MAIN: Article */}
        <div className="flex-1 p-6 lg:p-10 lg:px-12 max-w-[820px] mx-auto min-w-0">
          
          {/* Video Section */}
          {lesson.videoUrl && (
            <div className="mb-8">
              <VideoEmbed videoUrl={lesson.videoUrl} />
            </div>
          )}

          {/* Audio Section */}
          {lesson.audioSrc && track && (
            <div className="mb-8">
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
            </div>
          )}

          {/* Content */}
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-[16px] prose-p:leading-[1.8] prose-p:text-foreground prose-a:text-accent hover:prose-a:text-primary">
            {lesson.content ? (
              <WrittenContent content={lesson.content[currentLang]} language={currentLang} />
            ) : (
              <div className="bg-background border border-dashed border-[#d0c9b8] p-5 text-center text-[13px] text-[#bbb] italic mt-2">
                [ Hakuna maelezo ya ziada kwa somo hili ]
              </div>
            )}
          </div>

          <div className="mt-8">
            <Button 
              variant="outline" 
              className={cn("w-full border-primary text-primary hover:bg-primary hover:text-white", isLessonCompleted(user, lesson.slug) && "bg-primary text-white")}
              onClick={handleComplete}
            >
              {isLessonCompleted(user, lesson.slug) ? "Imekamilika ✓" : "Tia Alama Kamili"}
            </Button>
          </div>

          {/* Lesson Navigation */}
          <div className="mt-12 flex justify-between gap-4 border-t border-border pt-7">
            {prevLesson ? (
              <div 
                onClick={() => navigate({ to: '/lesson/$slug', params: { slug: prevLesson.slug } })}
                className="flex cursor-pointer items-center gap-3 border-[1.5px] border-border bg-white px-6 py-3.5 transition-colors hover:border-primary flex-1 max-w-[260px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Somo la Awali</div>
                  <div className="mt-0.5 text-[13px] font-semibold text-foreground line-clamp-1">{prevLesson.title[currentLang]}</div>
                </div>
              </div>
            ) : <div className="flex-1" />}

            {nextLesson ? (
              <div 
                onClick={() => navigate({ to: '/lesson/$slug', params: { slug: nextLesson.slug } })}
                className="flex cursor-pointer items-center justify-end gap-3 border-[1.5px] border-primary bg-primary px-6 py-3.5 transition-colors hover:bg-primary-dark flex-1 max-w-[260px]"
              >
                <div className="text-right">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-white/50">Somo Lifuatalo</div>
                  <div className="mt-0.5 text-[13px] font-semibold text-white line-clamp-1">{nextLesson.title[currentLang]}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
              </div>
            ) : <div className="flex-1" />}
          </div>
          
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[220px] shrink-0 border-l border-border bg-[#FDFCF8] p-6 py-10 lg:p-9 lg:px-4">
          <div className="sticky top-[88px]">
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Masomo ya {subject?.name[currentLang]}</h3>
            <div className="flex flex-col">
              {subjectLessons.map((l, i) => {
                const isDone = isLessonCompleted(user, l.slug)
                const isCurrent = l.slug === lesson.slug

                return (
                  <div 
                    key={l.id} 
                    onClick={() => navigate({ to: '/lesson/$slug', params: { slug: l.slug } })}
                    className="flex cursor-pointer items-start gap-2 border-b border-border py-2 text-[12px] last:border-none hover:bg-black/5 px-1 -mx-1"
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      ) : isCurrent ? (
                        <div className="size-2 rounded-full bg-accent mt-[1px]" />
                      ) : (
                        <div className="size-2.5 rounded-full border-[1.5px] border-border mt-[1px]" />
                      )}
                    </div>
                    <span className={cn(
                      "leading-[1.4] line-clamp-2 flex-1",
                      isDone && "text-[#bbb] line-through",
                      isCurrent && "font-bold text-primary",
                      !isDone && !isCurrent && "text-muted-foreground hover:text-primary"
                    )}>
                      {String(i + 1).padStart(2, '0')}. {l.title[currentLang]}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="mt-4">
              <Link to={`/subjects/${subject?.slug}`} className="flex items-center gap-1.5 text-[12px] font-semibold text-primary hover:underline">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                Rudi kwa Masomo Yote
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
