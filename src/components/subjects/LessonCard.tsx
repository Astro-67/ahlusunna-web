import { CheckCircle, FileText, Headphones, Play } from 'lucide-react'

import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

interface LessonCardProps {
  lesson: {
    id: string
    title: string
    slug: string
    duration: string
    hasText: boolean
    hasVideo: boolean
    hasAudio: boolean
    thumbnail?: string
  }
  completed?: boolean
  onClick: () => void
}

function MediaIndicator({
  hasText,
  hasVideo,
  hasAudio,
}: {
  hasText: boolean
  hasVideo: boolean
  hasAudio: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      {hasText && (
        <div className="flex items-center justify-center rounded-full bg-[#F4EFE6] p-1.5" title="Text content">
          <FileText className="size-3.5 text-muted-foreground" aria-hidden="true" />
        </div>
      )}
      {hasVideo && (
        <div className="flex items-center justify-center rounded-full bg-primary/10 p-1.5" title="Video">
          <Play className="size-3.5 text-primary" aria-hidden="true" />
        </div>
      )}
      {hasAudio && (
        <div className="flex items-center justify-center rounded-full bg-accent/10 p-1.5" title="Audio">
          <Headphones className="size-3.5 text-accent" aria-hidden="true" />
        </div>
      )}
    </div>
  )
}

export function LessonCard({ lesson, completed = false, onClick }: LessonCardProps) {
  const { t } = useLanguage()

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative w-full overflow-hidden border-2 border-[#E5E0D8] bg-white text-start',
        'transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_rgba(27,67,50,0.12)]',
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-[#F4EFE6]">
        {lesson.thumbnail ? (
          <img
            src={lesson.thumbnail}
            alt=""
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rotate-45 border border-accent/30" />
                <FileText className="size-10 text-accent/50" aria-hidden="true" />
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {completed && (
          <div className="absolute end-3 top-3 flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full bg-success p-1">
              <CheckCircle className="size-4 text-white" aria-hidden="true" />
            </div>
          </div>
        )}

        <div className="absolute start-3 bottom-3 flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
            <span className="text-xs font-medium text-white">{lesson.duration}</span>
          </div>
        </div>

        <div className="absolute end-3 bottom-3 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <MediaIndicator hasText={lesson.hasText} hasVideo={lesson.hasVideo} hasAudio={lesson.hasAudio} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-3 line-clamp-2 font-decorative text-[16px] font-semibold leading-snug text-foreground">
          {lesson.title}
        </h3>

        <div className="flex items-center justify-between gap-3">
          <MediaIndicator hasText={lesson.hasText} hasVideo={lesson.hasVideo} hasAudio={lesson.hasAudio} />
          {completed && (
            <span className="text-xs font-medium text-success">{t('lesson.completed')}</span>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  )
}
