import { Link } from '@tanstack/react-router'
import { Home, ChevronRight } from 'lucide-react'

import { useLanguage } from '#/hooks/useLanguage'
import type { BreadcrumbModel } from './types'

interface BreadcrumbProps {
  model: BreadcrumbModel
}

export function Breadcrumb({ model }: BreadcrumbProps) {
  const { currentLang } = useLanguage()
  const isRtl = currentLang === 'ar'
  const Chevron = ChevronRight

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-medium text-muted-foreground"
    >
      <Link
        to="/"
        className="inline-flex min-h-[32px] items-center gap-1.5 text-muted-foreground transition-colors hover:text-accent focus-visible:text-accent"
      >
        <Home aria-hidden="true" size={13} strokeWidth={2} />
        <span className="sr-only">Nyumbani</span>
      </Link>
      {model.crumbs.map((crumb, idx) => {
        const isLast = idx === model.crumbs.length - 1
        const label = crumb.label[currentLang] ?? crumb.label.sw
        return (
          <span key={`${idx}-${label}`} className="inline-flex items-center gap-x-2">
            <Chevron
              aria-hidden="true"
              size={12}
              strokeWidth={2}
              className={isRtl ? 'rotate-180 text-border' : 'text-border'}
            />
            {crumb.to && !isLast ? (
              <Link
                to={crumb.to}
                className="transition-colors hover:text-accent focus-visible:text-accent"
              >
                {label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? 'page' : undefined}
                className={
                  isLast
                    ? 'font-semibold text-foreground'
                    : 'text-muted-foreground'
                }
              >
                {label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
