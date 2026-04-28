import { Link } from '@tanstack/react-router'
import { Lock } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { useLanguage } from '#/hooks/useLanguage'

interface LockOverlayProps {
  message?: string
  ctaText?: string
  ctaHref?: string
}

export function LockOverlay({ message, ctaText, ctaHref = '/login' }: LockOverlayProps) {
  const { t } = useLanguage()

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-primary/80">
      <Lock aria-hidden="true" size={32} className="mb-3 text-accent" />
      <p className="mb-3 text-sm text-primary-foreground">{message ?? t('levels.login_to_access')}</p>
      <Button asChild variant="accent" size="sm">
        <Link to={ctaHref}>{ctaText ?? t('navigation.login')}</Link>
      </Button>
    </div>
  )
}
