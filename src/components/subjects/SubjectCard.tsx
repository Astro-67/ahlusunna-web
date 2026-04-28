import { useLanguage } from '#/hooks/useLanguage'
import { ProgressBar } from '#/components/shared/ProgressBar'
import { SubjectIcon } from '#/components/subjects/SubjectIcon'

interface SubjectCardProps {
  subject: {
    id: string
    name: string
    slug: string
    description: string
    icon: string
    lessonCount: number
  }
  progress?: number
  onClick: () => void
}

export function SubjectCard({ subject, progress, onClick }: SubjectCardProps) {
  const { t } = useLanguage()

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[200px] w-full flex-col border border-border bg-white p-6 text-start transition-all duration-200 hover:border-accent hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
      aria-label={`${t('subjects.open_subject')}: ${subject.name}`}
    >
      <div className="mb-4 text-accent transition-transform duration-200 group-hover:scale-110">
        <SubjectIcon icon={subject.icon} />
      </div>
      <h3 className="mb-2 text-[20px] font-semibold leading-[1.4] text-foreground lg:text-[22px]">
        {subject.name}
      </h3>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{subject.description}</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="bg-background px-2 py-1 text-xs text-muted-foreground">
          {t('subjects.lessons_count', { count: subject.lessonCount })}
        </span>
        {progress !== undefined && progress > 0 && (
          <div className="w-24">
            <ProgressBar progress={progress} size="sm" />
          </div>
        )}
      </div>
    </button>
  )
}
