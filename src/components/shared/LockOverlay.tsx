import { Link } from '@tanstack/react-router'
import { Lock } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

interface LockOverlayProps {
  message?: string
  ctaText?: string
  ctaHref?: string
  className?: string
}

export function LockOverlay({ message, ctaText, ctaHref = '/login', className }: LockOverlayProps) {
  const { t } = useLanguage()

  return (
    <div
      className={cn(
        'absolute inset-0 z-10 flex flex-col items-center justify-center bg-primary/95 backdrop-blur-sm',
        className,
      )}
    >
      <div className="mb-6 flex size-16 items-center justify-center border-2 border-accent/30 bg-accent/10">
        <Lock aria-hidden="true" size={28} className="text-accent" />
      </div>
      <p className="mb-6 max-w-[260px] px-6 text-center text-sm leading-relaxed text-primary-foreground/80">
        {message ?? t('levels.login_to_access')}
      </p>
      <Button asChild variant="accent" size="sm" className="gap-2">
        <Link to={ctaHref}>
          {ctaText ?? t('navigation.login')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent-foreground">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </Button>
    </div>
  )
}
