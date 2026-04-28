import { createFileRoute } from '@tanstack/react-router'

import { HeroSection } from '#/components/home/HeroSection'
import { LevelCard } from '#/components/home/LevelCard'
import { levels } from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { user } = useAuth()
  const { currentLang, t } = useLanguage()

  return (
    <>
      <HeroSection />
      <section className="border-b border-border bg-background py-12 lg:py-16">
        <div className="container-main">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-[24px] font-bold leading-[1.3] text-foreground lg:text-[28px]">
              {t('home.levels_title')}
            </h2>
            <p className="mt-3 text-base leading-[1.6] text-muted-foreground">
              {t('home.support_body')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {levels.map((level) => (
              <LevelCard
                key={level.id}
                level={{
                  id: level.id,
                  name: level.name[currentLang],
                  description: level.description[currentLang],
                  order: level.order,
                  isPublic: level.isPublic,
                }}
                href={
                  level.id === 'awali'
                    ? '/subjects'
                    : level.id === 'kati'
                      ? '/subjects/intermediate'
                      : '/subjects/advanced'
                }
                isLocked={!level.isPublic && !user?.levelAccess.includes(level.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="container-main grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-medium text-accent">{t('subjects.beginner_title')}</p>
            <h2 className="text-[24px] font-bold leading-[1.3] text-foreground lg:text-[28px]">
              {t('home.support_title')}
            </h2>
          </div>
          <p className="text-base leading-[1.6] text-muted-foreground">
            {t('home.support_body')}
          </p>
        </div>
      </section>
    </>
  )
}
