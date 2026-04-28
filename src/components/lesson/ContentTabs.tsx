import type { LessonTab } from '#/types'
import { useLanguage } from '#/hooks/useLanguage'

interface ContentTabsProps {
  activeTab: LessonTab
  onTabChange: (tab: LessonTab) => void
  hasText: boolean
  hasVideo: boolean
  hasAudio: boolean
}

export function ContentTabs({ activeTab, onTabChange, hasText, hasVideo, hasAudio }: ContentTabsProps) {
  const { t } = useLanguage()
  const tabs: Array<{ id: LessonTab; label: string; available: boolean }> = [
    { id: 'text', label: t('lesson.written_tab'), available: hasText },
    { id: 'video', label: t('lesson.video_tab'), available: hasVideo },
    { id: 'audio', label: t('lesson.audio_tab'), available: hasAudio },
  ]

  return (
    <div className="border-b border-border bg-white">
      <div className="container-main">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => tab.available && onTabChange(tab.id)}
              disabled={!tab.available}
              className={
                activeTab === tab.id
                  ? 'border-b-2 border-accent px-4 py-3 text-sm font-medium text-foreground transition-colors'
                  : tab.available
                    ? 'border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
                    : 'cursor-not-allowed border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground/50'
              }
            >
              {tab.label}
              {!tab.available && ` (${t('lesson.not_available')})`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
