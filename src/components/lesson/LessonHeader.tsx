import { Link } from '@tanstack/react-router'
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react'

import { BorderOrnament, IslamicDivider } from '#/components/shared/IslamicPatterns'
import { Button } from '#/components/ui/button'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

interface LessonHeaderProps {
  lesson: {
    title: string
    slug: string
    subjectId: string
    levelId: string
  }
  subjectName: string
  completed: boolean
  onToggleComplete: () => void
}

export function LessonHeader({ lesson, subjectName, completed, onToggleComplete }: LessonHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1B4332] to-[#143828]" />
      <div className="absolute inset-0 opacity-10">
        <svg className="size-full" viewBox="0 0 400 200" preserveAspectRatio="none">
          <defs>
            <pattern id="lesson-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 5L25 15L35 20L25 25L20 35L15 25L5 20L15 15Z" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lesson-pattern)" />
        </svg>
      </div>

      <BorderOrnament position="bottom" variant="mosaic" className="h-1.5" />

      <div className="container-main relative z-10 py-8 lg:py-12">
        <nav
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-primary-foreground/60"
          aria-label="Breadcrumb"
        >
          <Link
            to="/subjects"
            className="flex items-center gap-1 transition-colors hover:text-primary-foreground"
          >
            <ArrowLeft className="size-4" />
            {t('navigation.subjects')}
          </Link>
          <span>/</span>
          <span className="text-primary-foreground/80">{subjectName}</span>
          <span>/</span>
          <span className="text-primary-foreground">{lesson.title}</span>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <span className="size-1.5 rounded-full bg-accent-foreground" />
                {subjectName}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground/80">
                {t(`levels.${lesson.levelId}`)}
              </span>
            </div>

            <h1 className="mb-4 font-decorative text-[28px] font-bold leading-tight lg:text-[36px]">
              {lesson.title}
            </h1>

            <IslamicDivider variant="simple" className="max-w-[120px]" />
          </div>

          <Button
            type="button"
            onClick={onToggleComplete}
            variant="ghost"
            className={cn(
              'gap-2 px-6 py-3 text-sm font-medium transition-all',
              completed
                ? 'bg-success text-white hover:bg-success/90'
                : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20',
            )}
          >
            {completed ? (
              <>
                <CheckCircle className="size-5" />
                {t('lesson.completed')}
              </>
            ) : (
              <>
                <Circle className="size-5" />
                {t('lesson.mark_complete')}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
