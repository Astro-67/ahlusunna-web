import { BookOpen, FileText, Headphones, Play } from 'lucide-react'

import type { LessonTab } from '#/types'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

interface ContentTabsProps {
  activeTab: LessonTab
  onTabChange: (tab: LessonTab) => void
  hasText: boolean
  hasVideo: boolean
  hasAudio: boolean
}

const tabIcons: Record<LessonTab, React.ElementType> = {
  text: FileText,
  video: Play,
  audio: Headphones,
}

export function ContentTabs({ activeTab, onTabChange, hasText, hasVideo, hasAudio }: ContentTabsProps) {
  const { t } = useLanguage()
  const tabs: Array<{ id: LessonTab; label: string; available: boolean }> = [
    { id: 'text', label: t('lesson.written_tab'), available: hasText },
    { id: 'video', label: t('lesson.video_tab'), available: hasVideo },
    { id: 'audio', label: t('lesson.audio_tab'), available: hasAudio },
  ]

  return (
    <div className="border-b border-[#E5E0D8] bg-white">
      <div className="container-main">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tabIcons[tab.id]
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => tab.available && onTabChange(tab.id)}
                disabled={!tab.available}
                className={cn(
                  'relative flex items-center gap-2 border-b-2 px-5 py-4 text-sm font-medium transition-all',
                  isActive
                    ? 'border-accent text-foreground'
                    : tab.available
                      ? 'border-transparent text-muted-foreground hover:border-[#E5E0D8] hover:text-foreground'
                      : 'cursor-not-allowed border-transparent text-muted-foreground/40',
                )}
              >
                {tab.available ? (
                  <Icon
                    className={cn(
                      'size-4 transition-colors',
                      isActive ? 'text-accent' : 'text-muted-foreground',
                    )}
                  />
                ) : (
                  <BookOpen className="size-4 text-muted-foreground/40" />
                )}
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 start-0 end-0 h-0.5 bg-accent" />
                )}
                {!tab.available && (
                  <span className="ml-1 text-xs text-muted-foreground/40">
                    ({t('lesson.not_available')})
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
