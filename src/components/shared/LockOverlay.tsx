import { Link } from '@tanstack/react-router'
import { Lock } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { useLanguage } from '#/hooks/useLanguage'
import type { Language } from '#/types'
import { cn } from '#/lib/utils'

interface LockOverlayProps {
  title?: string
  message?: string
  ctaText?: string
  ctaHref?: string
  className?: string
}

const copy: Record<Language, any> = {
  sw: {
    title: 'Maudhui Yamefungwa',
    message: 'Jiunge bure ili uweze kusoma masomo ya hatua hii na kuendelea na safari yako ya elimu.',
    ctaText: 'Jiunge Nasi →',
  },
  en: {
    title: 'Locked Content',
    message: 'Join for free to access lessons at this level and continue your educational journey.',
    ctaText: 'Join Us →',
  },
  ar: {
    title: 'محتوى مقفل',
    message: 'انضم مجانًا للوصول إلى دروس هذا المستوى ومواصلة رحلتك التعليمية.',
    ctaText: 'انضم إلينا ←',
  }
}

export function LockOverlay({ title, message, ctaText, ctaHref = '/register', className }: LockOverlayProps) {
  const { currentLang } = useLanguage()
  const t = copy[currentLang]
  const isRtl = currentLang === 'ar'

  return (
    <div
      className={cn(
        'absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FDFCF8]/95 backdrop-blur-sm border border-border p-6 text-center',
        className,
      )}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="mb-5 flex size-[72px] items-center justify-center bg-[#1B4332]/5 border-2 border-accent">
        <Lock aria-hidden="true" size={32} className="text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="mb-2 text-[20px] font-bold text-foreground">
        {title ?? t.title}
      </h3>
      <p className="mb-6 max-w-[320px] text-[14px] leading-[1.65] text-muted-foreground">
        {message ?? t.message}
      </p>
      <Button asChild variant="accent" size="lg" className="px-8 py-3 font-semibold shadow-none">
        <Link to={ctaHref}>
          {ctaText ?? t.ctaText}
        </Link>
      </Button>
    </div>
  )
}
