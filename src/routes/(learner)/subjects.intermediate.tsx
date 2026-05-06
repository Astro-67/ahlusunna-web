import { Link, redirect, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Lock, Star } from 'lucide-react'

import { BorderOrnament } from '#/components/shared/IslamicPatterns'
import { Button } from '#/components/ui/button'
import { levelService, lessonService } from '#/data/services'
import { isLessonCompleted } from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/(learner)/subjects/intermediate')({
  component: IntermediateSubjectsPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login', search: { redirectTo: '/subjects/intermediate' } })
    }
  },
})

const pageCopy = {
  en: {
    breadcrumbHome: 'Nyumbani',
    breadcrumbSubjects: 'Masomo',
    lockedTitle: 'Kamilisha Hatua ya Awali',
    lockedMessage: 'Tafadhali kamilisha 70% ya hatua ya awali ili kufungua hatua hii.',
    lockedCta: 'Rudi kwa Masomo',
    backSubjects: 'Masomo',
    complete: 'Umemaliza!',
    completeMessage: 'Umefanikiwa kukamilisha masomo yote ya Hatua ya Kati. Hatua ya juu sasa imefunguka.',
    goAdvanced: 'Nenda Kuendelea →',
    lessons: 'masomo',
    progress: 'umefanya',
    progressLabel: 'ya masomo',
  },
  sw: {
    breadcrumbHome: 'Nyumbani',
    breadcrumbSubjects: 'Masomo',
    lockedTitle: 'Kamilisha Hatua ya Awali',
    lockedMessage: 'Tafadhali kamilisha 70% ya hatua ya awali ili kufungua hatua hii.',
    lockedCta: 'Rudi kwa Masomo',
    backSubjects: 'Masomo',
    complete: 'Umemaliza!',
    completeMessage: 'Umefanikiwa kukamilisha masomo yote ya Hatua ya Kati. Hatua ya juu sasa imefunguka.',
    goAdvanced: 'Nenda Kuendelea →',
    lessons: 'masomo',
    progress: 'umefanya',
    progressLabel: 'ya masomo',
  },
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbSubjects: 'المواد',
    lockedTitle: 'أكمل المستوى الأول',
    lockedMessage: 'يرجى إكمال 70% من المستوى الأول لفتح هذا المستوى.',
    lockedCta: 'العودة للمواد',
    backSubjects: 'المواد',
    complete: 'أكملت!',
    completeMessage: 'لقد أكملت جميع دروس المستوى المتوسط. المستوى المتقدم مفتوح الآن.',
    goAdvanced: 'انتقل للمتقدم ←',
    lessons: 'دروس',
    progress: 'تم',
    progressLabel: 'من الدروس',
  },
}

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

function LockedState() {
  const { currentLang } = useLanguage()
  const copy = pageCopy[currentLang]

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full border-2 border-accent/20 bg-accent/5">
          <Lock className="size-10 text-accent" />
        </div>
        <h2 className="mb-3 font-decorative text-[24px] font-bold text-foreground">
          {copy.lockedTitle}
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          {copy.lockedMessage}
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link to="/subjects">
            <Button variant="accent" size="lg" className="gap-2 px-8">
              {copy.lockedCta}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function IntermediateSubjectsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { currentLang, t } = useLanguage()
  const copy = pageCopy[currentLang]

  const level = levelService.getById('kati')
  const hasAccess = user?.levelAccess.includes('kati') ?? false
  const intermediateLessons = lessonService.getByLevel('kati')
  
  const completedCount = user?.progress.filter((slug) =>
    intermediateLessons.some((lesson) => lesson.slug === slug)
  ).length ?? 0
  
  const totalIntermediate = intermediateLessons.length
  const progress = totalIntermediate > 0 ? Math.round((completedCount / totalIntermediate) * 100) : 0
  const allDone = completedCount === totalIntermediate && totalIntermediate > 0

  if (!hasAccess) {
    return (
      <div className="bg-background pb-12 lg:pb-16">
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-linear-to-br from-primary via-[#1B4332] to-primary-dark" />
          <BorderOrnament position="bottom" variant="mosaic" className="h-1.5" />

          <div className="container-main relative z-10 py-8 lg:py-12">
            <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
              <Link to="/subjects" className="flex items-center gap-1 transition-colors hover:text-primary-foreground">
                <ArrowLeft className="size-4" />
                {copy.backSubjects}
              </Link>
            </div>

            <div className="mt-6">
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                {level?.name[currentLang]}
              </p>
              <h1 className="mb-3 font-decorative text-[28px] font-bold leading-tight lg:text-[36px]">
                {level?.name[currentLang]}
              </h1>
              <p className="max-w-xl text-sm text-primary-foreground/70">
                {level?.description[currentLang]}
              </p>
            </div>
          </div>
        </section>
        <LockedState />
      </div>
    )
  }

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
              {copy.backSubjects}
            </Link>
          </div>

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                {level?.name[currentLang]}
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
                {copy.goAdvanced}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div className="rounded-lg bg-primary-foreground/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-primary-foreground/70">
                  {completedCount}/{totalIntermediate} {copy.progress} {copy.progressLabel}
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
              <p className="font-medium text-success">{copy.complete}</p>
              <p className="text-sm text-muted-foreground">
                {copy.completeMessage}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {intermediateLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => void navigate({ to: '/lesson/$slug', params: { slug: lesson.slug } })}
              className={cn(
                "group flex min-h-32 flex-col rounded border border-border bg-white p-6 text-start transition-colors hover:border-primary/50 hover:bg-[#FDFCF8]",
                isLessonCompleted(user, lesson.slug) && "border-primary/20 bg-primary/5"
              )}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm font-bold",
                  isLessonCompleted(user, lesson.slug) 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {isLessonCompleted(user, lesson.slug) ? '✓' : lesson.order}
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
              <div className="mt-auto pt-3">
                {lesson.audioSrc && (
                  <span className="text-xs text-muted-foreground">🔊 Sauti</span>
                )}
                {lesson.videoUrl && (
                  <span className="ml-2 text-xs text-muted-foreground">🎬 Video</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}