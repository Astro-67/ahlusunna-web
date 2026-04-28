import { CheckCircle } from 'lucide-react'

interface CompletionCheckmarkProps {
  completed: boolean
  size?: number
}

export function CompletionCheckmark({ completed, size = 20 }: CompletionCheckmarkProps) {
  return (
    <CheckCircle
      aria-hidden="true"
      size={size}
      className={completed ? 'text-success' : 'text-border'}
    />
  )
}
