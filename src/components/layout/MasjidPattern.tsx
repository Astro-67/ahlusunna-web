import { cn } from '#/lib/utils'

interface MasjidPatternProps {
  opacity?: number
  color?: string
  className?: string
}

export function MasjidPattern({
  opacity = 0.05,
  color = '#C9A84C',
  className,
}: MasjidPatternProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
      style={{ opacity }}
    >
      <defs>
        <pattern id="geometric-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M20 0L23 17L40 20L23 23L20 40L17 23L0 20L17 17Z"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
    </svg>
  )
}
