import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { MasjidPattern } from '#/components/layout/MasjidPattern'
import { Button } from '#/components/ui/button'
import { useLanguage } from '#/hooks/useLanguage'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative flex min-h-[calc(78svh-3.5rem)] items-center overflow-hidden bg-primary lg:min-h-[calc(76svh-4rem)]">
      <MasjidPattern opacity={0.08} color="#C9A84C" />
      <div className="absolute inset-y-0 end-0 hidden w-1/2 opacity-20 lg:block">
        <img
          src="/Ahlusunna-logo.png"
          alt=""
          className="h-full w-full scale-125 object-contain object-center"
        />
      </div>
      <div className="container-main relative z-10 py-20 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-8 flex items-center gap-4">
            <img
              src="/Ahlusunna-logo.png"
              alt="Ahlusunna"
              className="size-16 border border-accent/40 bg-white object-contain p-2"
            />
            <div>
              <p className="text-lg font-semibold text-primary-foreground">Ahlusunna</p>
              <p className="font-decorative text-2xl leading-none text-accent" dir="rtl">
                العِلْمُ النَّافِعُ
              </p>
            </div>
          </div>

          <p className="mb-4 inline-flex border border-accent/60 px-4 py-2 text-sm font-medium text-accent">
            {t('home.public_label')}
          </p>
          <h1 className="max-w-3xl text-[32px] font-bold leading-[1.2] tracking-normal text-primary-foreground lg:text-[48px]">
            {t('home.hero_title')}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.6] text-primary-foreground/80 lg:text-lg">
            {t('home.hero_subtitle')}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link to="/subjects">
                {t('home.cta_start')}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/about">{t('home.cta_learn_more')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
