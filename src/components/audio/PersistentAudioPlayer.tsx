import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Headphones,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { useEffect, useRef  } from 'react'
import type {MouseEvent} from 'react';

import { useAudioPlayer } from '#/hooks/useAudioPlayer'

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function PersistentAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    playbackRate,
    isExpanded,
    isVisible,
    togglePlay,
    closePlayer,
    setCurrentTime,
    setDuration,
    setVolume,
    cycleSpeed,
    setExpanded,
  } = useAudioPlayer()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    audio.playbackRate = playbackRate
  }, [playbackRate, volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    if (isPlaying) {
      void audio.play().catch(() => undefined)
    } else {
      audio.pause()
    }
  }, [currentTrack, isPlaying])

  if (!currentTrack || !isVisible) return null

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const TrackIcon = currentTrack.type === 'recitation' ? BookOpen : Headphones

  const seek = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const nextTime = ((event.clientX - rect.left) / rect.width) * duration
    if (audioRef.current && Number.isFinite(nextTime)) {
      audioRef.current.currentTime = nextTime
      setCurrentTime(nextTime)
    }
  }

  const skipBy = (seconds: number) => {
    if (!audioRef.current) return
    const nextTime = Math.min(duration, Math.max(0, audioRef.current.currentTime + seconds))
    audioRef.current.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const toggleMute = () => setVolume(volume === 0 ? 1 : 0)

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 hidden h-16 border-t-2 border-accent bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] md:block">
        <div className="container-main flex h-full items-center gap-4">
          <div className="flex w-52 items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-primary text-primary-foreground">
              <TrackIcon aria-hidden="true" size={20} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{currentTrack.title}</p>
              <p className="truncate text-xs text-muted-foreground">{currentTrack.subject}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center gap-1">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => skipBy(-15)} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Rudi nyuma sekunde 15">
                <SkipBack aria-hidden="true" size={20} />
              </button>
              <button type="button" onClick={togglePlay} className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-dark" aria-label={isPlaying ? 'Sitisha' : 'Cheza'}>
                {isPlaying ? <Pause aria-hidden="true" size={20} /> : <Play aria-hidden="true" size={20} />}
              </button>
              <button type="button" onClick={() => skipBy(15)} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Nenda mbele sekunde 15">
                <SkipForward aria-hidden="true" size={20} />
              </button>
            </div>

            <div className="flex w-full items-center gap-2">
              <span className="w-10 text-end text-xs text-muted-foreground">{formatTime(currentTime)}</span>
              <div className="h-1 flex-1 cursor-pointer rounded-full bg-border" onClick={seek} role="slider" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={currentTime}>
                <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
              </div>
              <span className="w-10 text-xs text-muted-foreground">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex w-52 items-center justify-end gap-3">
            <button type="button" onClick={cycleSpeed} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {playbackRate}x
            </button>
            <button type="button" onClick={toggleMute} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Badilisha sauti">
              {volume === 0 ? <VolumeX aria-hidden="true" size={20} /> : <Volume2 aria-hidden="true" size={20} />}
            </button>
            <button type="button" onClick={closePlayer} className="text-muted-foreground transition-colors hover:text-destructive" aria-label="Funga kicheza sauti">
              <X aria-hidden="true" size={20} />
            </button>
          </div>
        </div>
      </div>

      {!isExpanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="fixed inset-x-0 bottom-0 z-40 flex h-12 items-center gap-3 border-t-2 border-accent bg-white px-4 md:hidden"
          aria-label="Fungua kicheza sauti"
        >
          <span
            onClick={(event) => {
              event.stopPropagation()
              togglePlay()
            }}
            className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            {isPlaying ? <Pause aria-hidden="true" size={16} /> : <Play aria-hidden="true" size={16} />}
          </span>
          <span className="min-w-0 flex-1 truncate text-start text-sm font-medium text-foreground">
            {currentTrack.title}
          </span>
          <ChevronUp aria-hidden="true" size={20} className="text-muted-foreground" />
        </button>
      )}

      {isExpanded && (
        <div className="fixed inset-x-0 bottom-0 z-40 h-[200px] border-t-2 border-accent bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] md:hidden">
          <div className="flex h-full flex-col p-4">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-12 items-center justify-center bg-primary text-primary-foreground">
                  <TrackIcon aria-hidden="true" size={22} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{currentTrack.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{currentTrack.subject}</p>
                </div>
              </div>
              <button type="button" onClick={() => setExpanded(false)} aria-label="Funga">
                <ChevronDown aria-hidden="true" size={20} className="text-muted-foreground" />
              </button>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
              <div className="h-2 flex-1 rounded-full bg-border" onClick={seek} role="slider" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={currentTime}>
                <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button type="button" onClick={() => skipBy(-15)} aria-label="Rudi nyuma">
                <SkipBack aria-hidden="true" size={24} />
              </button>
              <button type="button" onClick={togglePlay} className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-label={isPlaying ? 'Sitisha' : 'Cheza'}>
                {isPlaying ? <Pause aria-hidden="true" size={24} /> : <Play aria-hidden="true" size={24} />}
              </button>
              <button type="button" onClick={() => skipBy(15)} aria-label="Nenda mbele">
                <SkipForward aria-hidden="true" size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={togglePlay}
      />
    </>
  )
}
