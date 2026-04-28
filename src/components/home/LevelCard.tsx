import { Link } from '@tanstack/react-router'
import { Lock } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { useLanguage } from '#/hooks/useLanguage'

interface LevelCardProps {
  level: {
    id: string
    name: string
    description: string
    order: number
    isPublic: boolean
  }
  isLocked: boolean
  href: string
}

export function LevelCard({ level, isLocked, href }: LevelCardProps) {
  const { t } = useLanguage()

  return (
    <div
      className={
        isLocked
          ? 'relative min-h-[220px] border border-border bg-white p-6'
          : 'relative min-h-[220px] border border-s-4 border-border border-s-accent bg-white p-6 transition-all duration-200 hover:border-accent hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]'
      }
    >
      {!isLocked && <Link to={href} className="absolute inset-0" aria-label={level.name} />}
      <div
        className={
          isLocked
            ? 'mb-4 flex size-10 items-center justify-center bg-primary/10 text-sm font-bold text-muted-foreground'
            : 'mb-4 flex size-10 items-center justify-center bg-primary text-sm font-bold text-primary-foreground'
        }
      >
        {level.order}
      </div>
      <h3 className="mb-2 text-[20px] font-semibold leading-[1.4] text-foreground lg:text-[22px]">
        {level.name}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{level.description}</p>

      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/80">
          <Lock aria-hidden="true" size={32} className="mb-3 text-accent" />
          <p className="mb-3 text-sm text-primary-foreground">{t('levels.login_to_access')}</p>
          <Button asChild variant="accent" size="sm">
            <Link to="/login">{t('navigation.login')}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
