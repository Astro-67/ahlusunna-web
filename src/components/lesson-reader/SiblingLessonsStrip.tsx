import { Link } from '@tanstack/react-router'
import { Clock, FileText, Headphones, PlayCircle } from 'lucide-react'

import { useLanguage } from '#/hooks/useLanguage'
import type { SiblingModel } from './types'

interface SiblingLessonsStripProps {
  siblings: SiblingModel[]
}

const minuteFormatters: Record<string, (n: number) => string> = {
  sw: (n) => `Dakika ${n}`,
  en: (n) => `${n} min`,
  ar: (n) => `${n} د`,
}

export function SiblingLessonsStrip({ siblings }: SiblingLessonsStripProps) {
  const { currentLang, t } = useLanguage()
  if (siblings.length === 0) return null
  const heading = t('lesson.related_lessons')
  const minutes = minuteFormatters[currentLang] ?? minuteFormatters.sw

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="mb-4 font-display text-[18px] font-semibold uppercase tracking-[0.06em] text-foreground">
        {heading}
      </h2>

      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none snap-x snap-mandatory sm:mx-0 sm:px-0 sm:gap-4 sm:overflow-visible sm:grid sm:grid-cols-2 sm:pb-0">
        {siblings.map((s) => {
          const title = s.title[currentLang] ?? s.title.sw
          return (
            <Link
              key={s.id}
              to="/lesson/$slug"
              params={{ slug: s.slug }}
              className="group flex w-[260px] shrink-0 snap-start flex-col gap-3 border border-border bg-card p-4 transition-colors hover:border-primary focus-visible:border-primary sm:w-auto"
              style={{ borderRadius: '4px' }}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText aria-hidden="true" size={14} strokeWidth={2} className="shrink-0 text-primary" />
                {s.mediaKinds.includes('AUDIO') && (
                  <Headphones aria-hidden="true" size={14} strokeWidth={2} className="shrink-0 text-accent" />
                )}
                {s.mediaKinds.includes('VIDEO_EMBED') && (
                  <PlayCircle aria-hidden="true" size={14} strokeWidth={2} className="shrink-0 text-accent" />
                )}
                <span className="ms-auto inline-flex items-center gap-1 text-[11px] font-medium">
                  <Clock aria-hidden="true" size={12} strokeWidth={2} />
                  {minutes(s.estimatedReadMinutes)}
                </span>
              </div>
              <h3 className="line-clamp-2 font-display text-[15px] font-semibold leading-[1.35] text-foreground transition-colors group-hover:text-primary">
                {title}
              </h3>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
