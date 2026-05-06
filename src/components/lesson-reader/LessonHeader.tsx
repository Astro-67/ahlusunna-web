import { Clock } from 'lucide-react'

import { IslamicDivider } from '#/components/shared/IslamicPatterns'
import { useLanguage } from '#/hooks/useLanguage'
import type { LessonReaderModel } from './types'

interface LessonHeaderProps {
  lesson: LessonReaderModel
}

export function LessonHeader({ lesson }: LessonHeaderProps) {
  const { currentLang, t } = useLanguage()
  const title = lesson.title[currentLang] ?? lesson.title.sw
  const arabicAltTitle =
    currentLang !== 'ar' && lesson.title.ar && lesson.title.ar !== lesson.title.sw
      ? lesson.title.ar
      : null
  const minutes = lesson.estimatedReadMinutes
  const minuteText = t('lesson.read_minutes', { count: minutes })
  const statusText = t('lesson.status_published')

  return (
    <header className="flex flex-col items-start gap-6">
      <h1
        className="lesson-title-rise font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.015em] text-primary md:text-[44px] lg:text-[48px]"
      >
        {title}
      </h1>

      {arabicAltTitle && (
        <p
          lang="ar"
          dir="rtl"
          className="lesson-title-rise font-arabic text-[28px] font-bold leading-[1.4] text-accent"
          style={{ animationDelay: '60ms' }}
        >
          {arabicAltTitle}
        </p>
      )}

      <div
        className="lesson-title-rise flex flex-wrap items-center gap-2"
        style={{ animationDelay: '120ms' }}
      >
        <span className="inline-flex items-center gap-1.5 border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-muted-foreground">
          <Clock aria-hidden="true" size={13} strokeWidth={2} />
          {minuteText}
        </span>
        {lesson.status === 'published' && (
          <span className="inline-flex items-center gap-1.5 border border-accent/40 bg-accent/10 px-3 py-1.5 text-[12px] font-semibold tracking-[0.06em] text-accent uppercase">
            {statusText}
          </span>
        )}
      </div>

      <div
        className="lesson-title-rise mx-auto w-2/5 min-w-[140px] max-w-[280px] self-center pt-2"
        style={{ animationDelay: '160ms' }}
      >
        <IslamicDivider variant="simple" />
      </div>
    </header>
  )
}
