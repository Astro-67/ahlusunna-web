import { Link } from '@tanstack/react-router'

import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  showDivider?: boolean
  viewAllHref?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  showDivider = true,
  viewAllHref,
  centered = false,
  className,
}: SectionHeaderProps) {
  const { t } = useLanguage()

  return (
    <div
      className={cn(
        'mb-10',
        centered && 'text-center',
        className,
      )}
    >
      {badge && (
        <div className="mb-3 inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="text-sm font-medium uppercase tracking-wider text-accent">
            {badge}
          </span>
        </div>
      )}

      <h2 className="font-decorative text-[24px] font-bold leading-tight text-foreground md:text-[28px] lg:text-[32px]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-gray-500">
          {subtitle}
        </p>
      )}

      {showDivider && (
        <div className={cn('mt-4 h-1 w-12 rounded-full bg-accent', centered && 'mx-auto')} />
      )}

      {viewAllHref && (
        <div className="mt-4">
          <Link
            to={viewAllHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            {t('common.view_all')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  )
}
