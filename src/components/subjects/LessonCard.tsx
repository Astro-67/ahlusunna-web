import { CheckCircle, FileText, Headphones, Play } from 'lucide-react'

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

export function LessonCard({ lesson, completed = false, onClick }: LessonCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border border-border bg-white text-start transition-all duration-200 hover:border-accent hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
    >
      <div className="relative aspect-video bg-primary/10">
        {lesson.thumbnail ? (
          <img src={lesson.thumbnail} alt={lesson.title} className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-accent">
            <FileText aria-hidden="true" size={32} />
          </div>
        )}
        {completed && (
          <div className="absolute end-2 top-2 flex size-6 items-center justify-center bg-success text-white">
            <CheckCircle aria-hidden="true" size={16} />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-foreground">{lesson.title}</h3>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
          <div className="flex items-center gap-2 text-muted-foreground">
            {lesson.hasText && <FileText aria-hidden="true" size={14} />}
            {lesson.hasVideo && <Play aria-hidden="true" size={14} />}
            {lesson.hasAudio && <Headphones aria-hidden="true" size={14} />}
          </div>
        </div>
      </div>
    </button>
  )
}
