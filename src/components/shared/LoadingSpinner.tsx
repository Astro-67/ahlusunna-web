interface LoadingSpinnerProps {
  size?: number
  color?: string
}

export function LoadingSpinner({ size = 24, color = '#C9A84C' }: LoadingSpinnerProps) {
  return (
    <div
      aria-label="Inapakia"
      className="animate-spin rounded-full border-2 border-current border-t-transparent"
      role="status"
      style={{ width: size, height: size, color }}
    />
  )
}
