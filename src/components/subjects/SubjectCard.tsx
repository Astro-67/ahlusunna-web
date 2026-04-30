import { BookOpen, Heart, Lightbulb, Moon, Scroll, Star } from 'lucide-react'

import { IslamicDivider } from '#/components/shared/IslamicPatterns'
import { ProgressBar } from '#/components/shared/ProgressBar'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

interface SubjectCardProps {
  subject: {
    id: string
    name: string
    slug: string
    description: string
    icon: string
    lessonCount: number
  }
  progress?: number
  onClick: () => void
}

function SubjectIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ElementType> = {
    'book-open': BookOpen,
    scroll: Scroll,
    mosque: Moon,
    star: Star,
    'person-standing': Heart,
    lightbulb: Lightbulb,
  }

  const Icon = icons[icon] ?? BookOpen

  return (
    <div className="relative">
      <div className="flex size-14 items-center justify-center border border-accent/30 bg-accent/5">
        <Icon className="size-7 text-accent" aria-hidden="true" />
      </div>
      <div className="absolute -end-1 -bottom-1 size-4 border border-accent/20 bg-primary" />
    </div>
  )
}

export function SubjectCard({ subject, progress, onClick }: SubjectCardProps) {
  const { t } = useLanguage()

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative w-full overflow-hidden border-2 border-[#E5E0D8] bg-white p-6 text-start',
        'transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_rgba(27,67,50,0.12)]',
      )}
      aria-label={`${t('subjects.open_subject')}: ${subject.name}`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-5">
          <SubjectIcon icon={subject.icon} />
        </div>

        <h3 className="mb-3 font-decorative text-[20px] font-bold leading-tight text-foreground md:text-[22px]">
          {subject.name}
        </h3>

        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          {subject.description}
        </p>

        <IslamicDivider variant="simple" className="mb-5" />

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#F4EFE6] px-3 py-1 text-xs font-medium text-muted-foreground">
              {t('subjects.lessons_count', { count: subject.lessonCount })}
            </span>
          </div>

          {progress !== undefined && progress > 0 && (
            <div className="w-20">
              <ProgressBar progress={progress} size="sm" />
            </div>
          )}
        </div>
      </div>

      <div className="absolute end-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent">
          <path
            d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </button>
  )
}
