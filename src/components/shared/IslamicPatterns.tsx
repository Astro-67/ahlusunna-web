import { cn } from '#/lib/utils'

interface ArabesquePatternProps {
  opacity?: number
  color?: string
  className?: string
  variant?: 'geometric' | 'diamond' | 'star' | 'intersecting'
}

export function ArabesquePattern({
  opacity = 0.06,
  color = '#C9A84C',
  className,
  variant = 'geometric',
}: ArabesquePatternProps) {
  const patterns = {
    geometric: (
      <pattern id="arabesque-geometric" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <path
          d="M30 5L35 25L55 30L35 35L30 55L25 35L5 30L25 25Z"
          fill="none"
          stroke={color}
          strokeWidth="0.75"
        />
        <circle cx="30" cy="30" r="3" fill={color} />
        <path
          d="M0 0L60 60M60 0L0 60"
          stroke={color}
          strokeWidth="0.3"
          opacity="0.5"
        />
      </pattern>
    ),
    diamond: (
      <pattern id="arabesque-diamond" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <path
          d="M40 5L55 20L75 40L55 60L40 75L25 60L5 40L25 20Z"
          fill="none"
          stroke={color}
          strokeWidth="0.8"
        />
        <path
          d="M40 15L55 30L70 40L55 50L40 65L25 50L10 40L25 30Z"
          fill="none"
          stroke={color}
          strokeWidth="0.4"
          opacity="0.5"
        />
        <circle cx="40" cy="40" r="2" fill={color} opacity="0.7" />
      </pattern>
    ),
    star: (
      <pattern id="arabesque-star" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <polygon
          points="25,5 29,20 45,20 32,29 37,45 25,35 13,45 18,29 5,20 21,20"
          fill="none"
          stroke={color}
          strokeWidth="0.6"
        />
        <circle cx="25" cy="25" r="2" fill={color} />
        <path d="M0 25H50M25 0V50" stroke={color} strokeWidth="0.2" opacity="0.4" />
      </pattern>
    ),
    intersecting: (
      <pattern id="arabesque-intersecting" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
        <circle cx="24" cy="24" r="12" fill="none" stroke={color} strokeWidth="0.6" />
        <circle cx="0" cy="0" r="12" fill="none" stroke={color} strokeWidth="0.6" />
        <circle cx="48" cy="0" r="12" fill="none" stroke={color} strokeWidth="0.6" />
        <circle cx="0" cy="48" r="12" fill="none" stroke={color} strokeWidth="0.6" />
        <circle cx="48" cy="48" r="12" fill="none" stroke={color} strokeWidth="0.6" />
        <path d="M12 12L36 36M36 12L12 36" stroke={color} strokeWidth="0.4" opacity="0.5" />
      </pattern>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
      style={{ opacity }}
    >
      <defs>{patterns[variant]}</defs>
      <rect width="100%" height="100%" fill={`url(#arabesque-${variant})`} />
    </svg>
  )
}

interface IslamicDividerProps {
  className?: string
  variant?: 'simple' | 'ornate' | 'geometric' | 'floral'
  color?: string
}

export function IslamicDivider({ className, variant = 'simple', color = '#C9A84C' }: IslamicDividerProps) {
  const variants = {
    simple: (
      <div className={cn('flex items-center gap-3', className)}>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent to-transparent opacity-40" />
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
          <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" fill={color} />
        </svg>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent to-transparent opacity-40" />
      </div>
    ),
    ornate: (
      <div className={cn('flex items-center justify-center gap-4', className)}>
        <div className="h-px w-20 bg-linear-to-r from-transparent to-accent opacity-50" />
        <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
          <path d="M16 6L8 2L2 6L8 10L16 6Z" fill={color} />
          <path d="M16 6L24 2L30 6L24 10L16 6Z" fill={color} />
          <circle cx="16" cy="6" r="2" fill={color} />
        </svg>
        <div className="h-px w-20 bg-linear-to-l from-transparent to-accent opacity-50" />
      </div>
    ),
    geometric: (
      <div className={cn('flex items-center justify-center gap-2', className)}>
        <div className="h-px w-16 bg-accent opacity-30" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L15 9L21 12L15 15L12 21L9 15L3 12L9 9L12 3Z" stroke={color} strokeWidth="1" fill="none" />
          <circle cx="12" cy="12" r="2" fill={color} />
        </svg>
        <div className="h-px w-16 bg-accent opacity-30" />
      </div>
    ),
    floral: (
      <div className={cn('flex items-center justify-center gap-3', className)}>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
        <div className="flex items-center gap-1">
          <svg width="8" height="8" viewBox="0 0 8 8" fill={color}>
            <circle cx="4" cy="4" r="2" />
          </svg>
          <svg width="12" height="12" viewBox="0 0 12 12" fill={color}>
            <circle cx="6" cy="6" r="3" />
          </svg>
          <svg width="8" height="8" viewBox="0 0 8 8" fill={color}>
            <circle cx="4" cy="4" r="2" />
          </svg>
        </div>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
      </div>
    ),
  }

  return variants[variant]
}

interface BorderOrnamentProps {
  className?: string
  position?: 'top' | 'bottom' | 'both'
  variant?: 'corner' | 'line' | 'mosaic'
  color?: string
}

export function BorderOrnament({
  className,
  position = 'bottom',
  variant = 'line',
  color = '#C9A84C',
}: BorderOrnamentProps) {
  if (variant === 'corner') {
    return (
      <div className={cn('absolute', position === 'both' ? 'inset-0' : position === 'top' ? 'top-0 inset-x-0' : 'bottom-0 inset-x-0', className)}>
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0 20L20 10L40 15L60 10L80 15L100 10V20H0Z"
            fill={color}
            opacity="0.15"
          />
        </svg>
      </div>
    )
  }

  if (variant === 'mosaic') {
    return (
      <div
        className={cn(
          'absolute h-1 overflow-hidden',
          position === 'both' ? 'top-0 inset-x-0' : position === 'top' ? 'top-0 inset-x-0' : 'bottom-0 inset-x-0',
          className,
        )}
      >
        <div className="flex h-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="h-full flex-1"
              style={{
                backgroundColor: i % 3 === 0 ? color : 'transparent',
                opacity: i % 3 === 0 ? 0.2 : 0.1,
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'absolute h-px bg-linear-to-r from-transparent via-accent/40 to-transparent',
        position === 'both' ? 'top-0 inset-x-0' : position === 'top' ? 'top-0 inset-x-0' : 'bottom-0 inset-x-0',
        className,
      )}
    />
  )
}

interface DomeSilhouetteProps {
  className?: string
  color?: string
  side?: 'left' | 'right'
}

export function DomeSilhouette({ className, color = '#C9A84C', side = 'right' }: DomeSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      className={cn('absolute top-0 h-full w-auto', side === 'right' ? 'inset-e-0' : 'inset-s-0', className)}
      style={{ opacity: 0.12 }}
    >
      <path
        d="M100 10C85 10 75 25 70 40C65 55 60 80 60 100V110H140V100C140 80 135 55 130 40C125 25 115 10 100 10Z"
        fill={color}
      />
      <rect x="55" y="100" width="90" height="15" fill={color} />
      <rect x="95" y="5" width="10" height="10" fill={color} />
      <rect x="60" y="105" width="5" height="20" fill={color} />
      <rect x="135" y="105" width="5" height="20" fill={color} />
      <circle cx="100" cy="45" r="8" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  )
}

interface MinaretSilhouetteProps {
  className?: string
  color?: string
  count?: number
}

export function MinaretSilhouette({ className, color = '#C9A84C', count = 2 }: MinaretSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      className={cn('absolute top-0 h-full w-auto', className)}
      style={{ opacity: 0.1 }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <g key={i} transform={`translate(${i * 40}, 0)`}>
          <rect x="15" y="30" width="10" height="65" fill={color} />
          <rect x="10" y="20" width="20" height="15" fill={color} />
          <path d="M20 5L12 20H28L20 5Z" fill={color} />
          <circle cx="20" cy="15" r="2" fill={color} />
        </g>
      ))}
    </svg>
  )
}
