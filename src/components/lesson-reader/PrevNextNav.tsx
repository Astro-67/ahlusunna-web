import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { PrevNextModel } from './types'

interface PrevNextNavProps {
  model: PrevNextModel
}

export function PrevNextNav({ model }: PrevNextNavProps) {
  const { currentLang, t } = useLanguage()
  const isRtl = currentLang === 'ar'
  const { prev, next } = model
  const prevLabel = t('lesson.previous_lesson')
  const nextLabel = t('lesson.next_lesson')

  if (!prev && !next) return null

  return (
    <nav
      aria-label="Lesson navigation"
      className="flex flex-col gap-3 border-t border-border pt-8 sm:flex-row"
    >
      {prev ? (
        <Link
          to="/lesson/$slug"
          params={{ slug: prev.slug }}
          aria-label={`${prevLabel}: ${prev.title[currentLang] ?? prev.title.sw}`}
          className={cn(
            'group flex flex-1 items-center gap-3 border border-primary bg-card px-5 py-3 text-start transition-colors hover:bg-primary hover:text-background min-h-[64px]',
          )}
        >
          {isRtl ? (
            <ChevronRight aria-hidden="true" size={20} strokeWidth={2} className="shrink-0 text-primary group-hover:text-background" />
          ) : (
            <ChevronLeft aria-hidden="true" size={20} strokeWidth={2} className="shrink-0 text-primary group-hover:text-background" />
          )}
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground group-hover:text-background/65">
              {prevLabel}
            </div>
            <div className="mt-1 line-clamp-1 text-[14px] font-semibold text-primary group-hover:text-background">
              {prev.title[currentLang] ?? prev.title.sw}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" aria-hidden="true" />
      )}

      {next ? (
        <Link
          to="/lesson/$slug"
          params={{ slug: next.slug }}
          aria-label={`${nextLabel}: ${next.title[currentLang] ?? next.title.sw}`}
          className={cn(
            'group flex flex-1 items-center justify-end gap-3 border border-primary bg-primary px-5 py-3 text-end text-background transition-colors hover:bg-primary-dark min-h-[64px]',
          )}
        >
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-background/60">
              {nextLabel}
            </div>
            <div className="mt-1 line-clamp-1 text-[14px] font-semibold">
              {next.title[currentLang] ?? next.title.sw}
            </div>
          </div>
          {isRtl ? (
            <ChevronLeft aria-hidden="true" size={20} strokeWidth={2} className="shrink-0" />
          ) : (
            <ChevronRight aria-hidden="true" size={20} strokeWidth={2} className="shrink-0" />
          )}
        </Link>
      ) : (
        <div className="flex-1" aria-hidden="true" />
      )}
    </nav>
  )
}
