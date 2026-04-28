interface ProgressBarProps {
  progress: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ProgressBar({ progress, size = 'md', showLabel = true }: ProgressBarProps) {
  const normalizedProgress = Math.min(100, Math.max(0, progress))
  const heightClass = size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-3'

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 rounded-full bg-border ${heightClass}`}>
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
      {showLabel && (
        <span className={size === 'sm' ? 'text-xs text-muted-foreground' : 'text-sm text-muted-foreground'}>
          {Math.round(normalizedProgress)}%
        </span>
      )}
    </div>
  )
}
