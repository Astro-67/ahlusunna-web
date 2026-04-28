import { Pause, Play } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { useLanguage } from '#/hooks/useLanguage'

interface AudioTriggerProps {
  track: {
    id: string
    title: string
    src: string
    type: 'lecture' | 'recitation'
  }
  isPlaying: boolean
  onPlay: () => void
}

export function AudioTrigger({ isPlaying, onPlay }: AudioTriggerProps) {
  const { t } = useLanguage()

  return (
    <Button type="button" onClick={onPlay} variant={isPlaying ? 'default' : 'accent'}>
      {isPlaying ? <Pause data-icon="inline-start" /> : <Play data-icon="inline-start" />}
      {isPlaying ? t('lesson.now_playing') : t('lesson.listen_now')}
    </Button>
  )
}
