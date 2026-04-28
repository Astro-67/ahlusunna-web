import { createFileRoute } from '@tanstack/react-router'

import { MasjidPattern } from '#/components/layout/MasjidPattern'
import { useLanguage } from '#/hooks/useLanguage'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <MasjidPattern opacity={0.08} />
        <div className="container-main relative py-14 lg:py-20">
          <h1 className="text-[28px] font-bold leading-[1.3] lg:text-[36px]">
            {t('navigation.about')}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-[1.6] text-primary-foreground/75">
            {t('home.hero_subtitle')}
          </p>
        </div>
      </section>
      <section className="container-main py-12 lg:py-16">
        <div className="max-w-3xl border-s-4 border-accent bg-white p-6">
          <h2 className="mb-3 text-[24px] font-bold text-foreground lg:text-[28px]">
            {t('home.support_title')}
          </h2>
          <p className="text-base leading-[1.6] text-muted-foreground">{t('home.support_body')}</p>
        </div>
      </section>
    </div>
  )
}
