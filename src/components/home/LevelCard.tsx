import { Link } from '@tanstack/react-router'
import { ArrowRight, Clock, Lock } from 'lucide-react'

import { lessonService } from '#/data/services'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { LevelId } from '#/types'

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

function LevelBadge({ order, isLocked }: { order: number; isLocked: boolean }) {
  return (
    <div
      className={cn(
        'flex size-16 items-center justify-center md:size-20',
        isLocked ? 'bg-accent/10' : 'bg-accent',
      )}
    >
      <span
        className={cn(
          'font-decorative text-2xl font-bold md:text-3xl',
          isLocked ? 'text-accent' : 'text-white',
        )}
      >
        {order === 1 ? 'I' : order === 2 ? 'II' : 'III'}
      </span>
    </div>
  )
}

export function LevelCard({ level, isLocked, href }: LevelCardProps) {
  const { user } = useAuth()
  const { t } = useLanguage()

  const isAdvanced = level.id === 'endelea'
  const isLoggedIn = Boolean(user)

  const levelLessons = lessonService.getByLevel(level.id as LevelId)
  const totalLessons = levelLessons.length

  const lockedMessage = t('levels.locked')
  const lockedCtaHref = isLoggedIn && isAdvanced ? '/subjects/intermediate' : '/login'
  const lockedCtaText = isLoggedIn ? t('levels.locked') : t('navigation.login')

  const cardContent = (
    <div
      className={cn(
        'group relative overflow-hidden border bg-white p-8 transition-all duration-300',
        isLocked
          ? 'cursor-not-allowed border-gray-200'
          : 'cursor-pointer border-gray-200 hover:border-primary hover:shadow-lg',
      )}
    >
      <div className="mb-8 flex items-start justify-between">
        <LevelBadge order={level.order} isLocked={isLocked} />
        {!isLocked && level.isPublic && (
          <span className="bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {t('levels.active')}
          </span>
        )}
      </div>

      <h3 className="mb-4 font-decorative text-[26px] font-bold leading-tight text-foreground md:text-[32px]">
        {level.name}
      </h3>

      <p className="mb-8 text-base leading-relaxed text-muted-foreground">
        {level.description}
      </p>

      <div className="mb-8 h-px w-full bg-gray-100" />

      {!isLocked && (
        <div className="flex items-center gap-4 text-base text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" />
            <span>{totalLessons} lessons</span>
          </div>
        </div>
      )}

      {!isLocked && (
        <div className="mt-6 flex items-center gap-2 text-base font-medium text-primary">
          <span className="transition-transform group-hover:translate-x-1">
            {t('subjects.open_subject')}
          </span>
          <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" />
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95">
          <div className="mb-4 flex size-16 items-center justify-center bg-gray-100">
            <Lock className="size-8 text-gray-400" aria-hidden="true" />
          </div>
          <p className="mb-6 max-w-[240px] px-6 text-center text-base leading-relaxed text-muted-foreground">
            {lockedMessage}
          </p>
          <Link
            to={lockedCtaHref}
            className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-base font-medium text-white transition-colors hover:bg-primary/90"
          >
            {lockedCtaText}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      )}
    </div>
  )

  if (isLocked) {
    return cardContent
  }

  return (
    <Link to={href} className="block">
      {cardContent}
    </Link>
  )
}
