import { createFileRoute, redirect } from '@tanstack/react-router'

import { LessonCard } from '#/components/subjects/LessonCard'
import { LockOverlay } from '#/components/shared/LockOverlay'
import { levels } from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'

export const Route = createFileRoute('/(learner)/subjects/advanced')({
  component: AdvancedSubjectsPage,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
  },
})

function AdvancedSubjectsPage() {
  const { user } = useAuth()
  const { currentLang, t } = useLanguage()
  const level = levels.find((candidate) => candidate.id === 'endelea')
  const hasAccess = Boolean(user?.levelAccess.includes('endelea'))

  return (
    <div className="container-main py-12 lg:py-16">
      <h1 className="text-[28px] font-bold leading-[1.3] text-foreground lg:text-[36px]">
        {level?.name[currentLang] ?? t('subjects.advanced_title')}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-[1.6] text-muted-foreground">
        {level?.description[currentLang] ?? t('subjects.locked_body')}
      </p>
      <div className="relative mt-8 min-h-[260px] border border-border bg-white p-6">
        <div className="grid grid-cols-1 gap-4 opacity-40 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <LessonCard
              key={item}
              lesson={{
                id: `advanced-${item}`,
                title: `${t('subjects.advanced_title')} ${item}`,
                slug: `advanced-${item}`,
                duration: '00:00',
                hasText: true,
                hasVideo: false,
                hasAudio: false,
              }}
              onClick={() => undefined}
            />
          ))}
        </div>
        {!hasAccess && <LockOverlay />}
      </div>
    </div>
  )
}
