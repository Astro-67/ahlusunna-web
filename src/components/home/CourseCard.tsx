import { Link } from '@tanstack/react-router'

import { IslamicDivider } from '#/components/shared/IslamicPatterns'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

interface CourseCardProps {
  course: {
    id: string
    slug: string
    title: string
    description: string
    thumbnail?: string
    lessonsCount?: number
  }
  onClick?: () => void
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const { t } = useLanguage()

  const content = (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative w-full overflow-hidden border-2 border-[#E5E0D8] bg-white text-start',
        'transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_rgba(27,67,50,0.12)]',
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative aspect-video overflow-hidden bg-[#F4EFE6]">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt=""
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex size-16 items-center justify-center">
              <svg viewBox="0 0 48 48" fill="none" className="size-12 text-accent/30">
                <path d="M24 4C20 4 17 7 16 11C15 15 14 20 14 26V42H34V26C34 20 33 15 32 11C31 7 28 4 24 4Z" fill="currentColor" />
                <rect x="8" y="18" width="4" height="24" fill="currentColor" />
                <rect x="36" y="18" width="4" height="24" fill="currentColor" />
              </svg>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="relative z-10 p-5">
        <h3 className="mb-2 font-decorative text-[18px] font-bold leading-tight text-foreground line-clamp-2">
          {course.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>

        <IslamicDivider variant="simple" className="mb-4" />

        <div className="flex items-center justify-between">
          {course.lessonsCount !== undefined && (
            <span className="rounded-full bg-[#F4EFE6] px-3 py-1 text-xs font-medium text-muted-foreground">
              {t('courses.lessons_count', { count: course.lessonsCount })}
            </span>
          )}
        </div>
      </div>

      <div className="absolute end-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent">
          <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" fill="currentColor" />
        </svg>
      </div>
    </button>
  )

  if (onClick) return content

  return (
    <Link to={`/courses/${course.slug}`} className="block">
      {content}
    </Link>
  )
}
