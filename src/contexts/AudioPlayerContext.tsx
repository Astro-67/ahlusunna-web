import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
  
} from 'react'
import type {ReactNode} from 'react';

import type { AudioTrack } from '#/types'

interface AudioPlayerContextValue {
  currentTrack: AudioTrack | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  playbackRate: number
  isExpanded: boolean
  isVisible: boolean
  playTrack: (track: AudioTrack) => void
  togglePlay: () => void
  closePlayer: () => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
  cycleSpeed: () => void
  setExpanded: (expanded: boolean) => void
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null)

const playbackRates = [1, 1.25, 1.5, 2]

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isExpanded, setExpanded] = useState(false)
  const [isVisible, setVisible] = useState(false)

  const playTrack = useCallback(
    (track: AudioTrack) => {
      setCurrentTrack((existingTrack) => {
        if (existingTrack?.id !== track.id) {
          setCurrentTime(0)
        }
        return track
      })
      setVisible(true)
      setIsPlaying(true)
    },
    [],
  )

  const togglePlay = useCallback(() => {
    if (!currentTrack) return
    setIsPlaying((playing) => !playing)
    setVisible(true)
  }, [currentTrack])

  const closePlayer = useCallback(() => {
    setIsPlaying(false)
    setVisible(false)
    setExpanded(false)
  }, [])

  const cycleSpeed = useCallback(() => {
    setPlaybackRate((rate) => {
      const currentIndex = playbackRates.indexOf(rate)
      return playbackRates[(currentIndex + 1) % playbackRates.length] ?? 1
    })
  }, [])

  const value = useMemo<AudioPlayerContextValue>(
    () => ({
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      playbackRate,
      isExpanded,
      isVisible,
      playTrack,
      togglePlay,
      closePlayer,
      setCurrentTime,
      setDuration,
      setVolume,
      cycleSpeed,
      setExpanded,
    }),
    [
      closePlayer,
      currentTime,
      currentTrack,
      cycleSpeed,
      duration,
      isExpanded,
      isPlaying,
      isVisible,
      playTrack,
      playbackRate,
      togglePlay,
      volume,
    ],
  )

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>
}

export const useAudioPlayer = (): AudioPlayerContextValue => {
  const context = useContext(AudioPlayerContext)
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider')
  }
  return context
}
