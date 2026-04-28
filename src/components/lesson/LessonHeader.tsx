import { Link } from '@tanstack/react-router'
import { CheckCircle, Circle } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { useLanguage } from '#/hooks/useLanguage'

interface LessonHeaderProps {
  lesson: {
    title: string
    slug: string
    subjectId: string
    levelId: string
  }
  subjectName: string
  completed: boolean
  onToggleComplete: () => void
}

export function LessonHeader({ lesson, subjectName, completed, onToggleComplete }: LessonHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container-main py-8 lg:py-12">
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-primary-foreground/70" aria-label="Breadcrumb">
          <Link to="/subjects" className="transition-colors hover:text-primary-foreground">
            {t('navigation.subjects')}
          </Link>
          <span>/</span>
          <Link to="/subjects" search={{ subject: lesson.subjectId }} className="transition-colors hover:text-primary-foreground">
            {subjectName}
          </Link>
          <span>/</span>
          <span className="text-primary-foreground">{lesson.title}</span>
        </nav>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="mb-4 text-[28px] font-bold leading-[1.3] lg:text-[36px]">
              {lesson.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                {subjectName}
              </span>
              <span className="bg-primary-foreground/20 px-2 py-1 text-xs text-primary-foreground">
                {t(`levels.${lesson.levelId}`)}
              </span>
            </div>
          </div>

          <Button
            type="button"
            onClick={onToggleComplete}
            variant={completed ? 'secondary' : 'ghost'}
            className={
              completed
                ? 'bg-success text-white hover:bg-success'
                : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground'
            }
          >
            {completed ? <CheckCircle data-icon="inline-start" /> : <Circle data-icon="inline-start" />}
            {completed ? t('lesson.completed') : t('lesson.mark_complete')}
          </Button>
        </div>
      </div>
    </div>
  )
}
