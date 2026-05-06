import { Pause, Play, RotateCcw, RotateCw, Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'

import { cn } from '#/lib/utils'

interface InPageAudioBarProps {
  src: string
  title?: string
  className?: string
}

const speeds = [0.75, 1, 1.25, 1.5]

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function InPageAudioBar({ src, title, className }: InPageAudioBarProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speedIdx, setSpeedIdx] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.playbackRate = speeds[speedIdx] ?? 1
  }, [speedIdx])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      void audio.play().then(() => setPlaying(true)).catch(() => undefined)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const skipBy = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + seconds))
    setCurrentTime(audio.currentTime)
  }

  const cycleSpeed = () => setSpeedIdx((i) => (i + 1) % speeds.length)

  const seek = (event: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    const next = ratio * duration
    if (Number.isFinite(next)) {
      audio.currentTime = next
      setCurrentTime(next)
    }
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t-2 border-accent bg-foreground text-background shadow-[0_-8px_24px_rgba(0,0,0,0.25)] lg:static lg:border lg:border-foreground lg:shadow-none',
        className,
      )}
    >
      <div className="flex flex-col gap-3 px-5 py-4 lg:px-6 lg:py-5">
        {title && (
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-background/65">
            <Volume2 aria-hidden="true" size={14} strokeWidth={2} />
            <span className="line-clamp-1">{title}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => skipBy(-15)}
            aria-label="Rudi nyuma sekunde 15"
            className="flex size-12 shrink-0 items-center justify-center text-background/80 transition-colors hover:text-accent focus-visible:text-accent"
          >
            <RotateCcw aria-hidden="true" size={22} strokeWidth={2} />
            <span className="sr-only">15s</span>
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Sitisha' : 'Cheza'}
            className="flex size-14 shrink-0 items-center justify-center bg-accent text-foreground transition-colors hover:bg-accent-dark focus-visible:bg-accent-dark"
          >
            {isPlaying ? (
              <Pause aria-hidden="true" size={26} strokeWidth={2} />
            ) : (
              <Play aria-hidden="true" size={26} strokeWidth={2} className="ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => skipBy(15)}
            aria-label="Nenda mbele sekunde 15"
            className="flex size-12 shrink-0 items-center justify-center text-background/80 transition-colors hover:text-accent focus-visible:text-accent"
          >
            <RotateCw aria-hidden="true" size={22} strokeWidth={2} />
            <span className="sr-only">15s</span>
          </button>

          <div className="flex flex-1 items-center gap-2">
            <span className="w-10 text-end text-[11px] font-mono text-background/60">
              {formatTime(currentTime)}
            </span>
            <div
              role="slider"
              tabIndex={0}
              aria-label="Skali ya muda"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={currentTime}
              onClick={seek}
              className="relative h-2 flex-1 cursor-pointer bg-background/15"
            >
              <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${progress}%` }} />
              <div
                className="absolute top-1/2 size-3 -translate-y-1/2 bg-accent"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>
            <span className="w-10 text-[11px] font-mono text-background/60">
              {formatTime(duration)}
            </span>
          </div>

          <button
            type="button"
            onClick={cycleSpeed}
            aria-label={`Mwendo wa kucheza: ${speeds[speedIdx]}x`}
            className="flex h-12 min-w-[52px] shrink-0 items-center justify-center border border-background/20 px-2 text-[12px] font-semibold text-background/85 transition-colors hover:border-accent hover:text-accent focus-visible:border-accent"
          >
            {speeds[speedIdx]}x
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  )
}
