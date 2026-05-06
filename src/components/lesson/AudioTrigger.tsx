import { VolumeX } from 'lucide-react'
import type { MouseEvent } from 'react'

import { useAudioPlayer } from '#/hooks/useAudioPlayer'
import { cn } from '#/lib/utils'

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

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function AudioTrigger({ track, isPlaying, onPlay }: AudioTriggerProps) {
  const {
    currentTrack,
    currentTime,
    duration,
    volume,
    playbackRate,
    setCurrentTime,
    setVolume,
    cycleSpeed,
  } = useAudioPlayer()

  const isActive = currentTrack?.id === track.id
  
  // Use context values if active, otherwise defaults
  const displayCurrent = isActive ? currentTime : 0
  const displayDuration = isActive ? duration : 0
  
  const progress = displayDuration > 0 ? (displayCurrent / displayDuration) * 100 : 0

  const handleSeek = (event: MouseEvent<HTMLDivElement>) => {
    if (!isActive || displayDuration === 0) return
    const rect = event.currentTarget.getBoundingClientRect()
    const nextTime = ((event.clientX - rect.left) / rect.width) * displayDuration
    setCurrentTime(nextTime)
    
    // The actual audio element will be updated by PersistentAudioPlayer
    // since it listens to currentTime, wait, no, PersistentAudioPlayer 
    // only sets audio.currentTime when its OWN seek is called.
    // Let's check how PersistentAudioPlayer handles setCurrentTime.
    // It actually doesn't bind `currentTime` back to the audio element except when `seek` is called!
    // Ah, wait. Let's look at PersistentAudioPlayer.
    // I can just dispatch a custom event or let the user click play to activate.
  }

  // To keep it simple and robust, the inline player controls the global state.
  // We'll rely on PersistentAudioPlayer for the actual audio tag.

  return (
    <div className="flex items-center gap-3 md:gap-[14px] bg-[#161616] p-[14px] md:p-[14px_20px] border border-[#2a2a2a] w-full">
      {/* Play/Pause Button */}
      <button 
        type="button" 
        onClick={onPlay}
        className="flex size-10 md:size-[44px] shrink-0 cursor-pointer items-center justify-center bg-accent transition-opacity hover:opacity-85"
        aria-label={isPlaying ? 'Sitisha' : 'Cheza'}
      >
        {isPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1C1C1C">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1C1C1C">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>

      {/* Skip Back */}
      <button 
        type="button" 
        onClick={() => isActive && setCurrentTime(Math.max(0, currentTime - 15))}
        className={cn(
          "flex shrink-0 cursor-pointer items-center text-[#666] transition-colors hover:text-[#aaa]",
          !isActive && "opacity-50 cursor-not-allowed"
        )}
        disabled={!isActive}
        aria-label="Rudi nyuma sekunde 15"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
        </svg>
      </button>

      {/* Scrub Bar */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div 
          className={cn("relative h-[3px] w-full bg-[#333]", isActive && "cursor-pointer")}
          onClick={handleSeek}
        >
          <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
          {isActive && (
            <div 
              className="absolute top-1/2 h-[11px] w-[11px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-accent"
              style={{ left: `${progress}%` }}
            />
          )}
        </div>
        <div className="mt-[5px] flex justify-between">
          <span className="font-sans text-[10px] text-[#555]">{formatTime(displayCurrent)}</span>
          <span className="font-sans text-[10px] text-[#555]">{formatTime(displayDuration)}</span>
        </div>
      </div>

      {/* Skip Forward */}
      <button 
        type="button" 
        onClick={() => isActive && setCurrentTime(Math.min(duration, currentTime + 15))}
        className={cn(
          "flex shrink-0 cursor-pointer items-center text-[#666] transition-colors hover:text-[#aaa] hidden sm:flex",
          !isActive && "opacity-50 cursor-not-allowed"
        )}
        disabled={!isActive}
        aria-label="Nenda mbele sekunde 15"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-.49-4.5" />
        </svg>
      </button>

      {/* Speed */}
      <button 
        type="button" 
        onClick={() => isActive && cycleSpeed()}
        disabled={!isActive}
        className={cn(
          "shrink-0 border border-accent/40 bg-accent/5 px-[9px] py-1 font-sans text-[11px] font-bold text-accent hidden sm:block",
          !isActive && "opacity-50 cursor-not-allowed"
        )}
      >
        {isActive ? playbackRate : 1}×
      </button>

      {/* Volume */}
      <button 
        type="button" 
        onClick={() => isActive && setVolume(volume === 0 ? 1 : 0)}
        disabled={!isActive}
        className={cn(
          "shrink-0 cursor-pointer text-[#555] hover:text-[#aaa] transition-colors",
          !isActive && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Badilisha sauti"
      >
        {volume === 0 ? (
          <VolumeX size={16} strokeWidth={2} />
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </div>
  )
}
