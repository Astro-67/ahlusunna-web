import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { ArrowLeft, Lock, Star } from 'lucide-react'

import { LessonCard } from '#/components/subjects/LessonCard'
import { BorderOrnament } from '#/components/shared/IslamicPatterns'
import { Button } from '#/components/ui/button'
import { levels } from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'

export const Route = createFileRoute('/(learner)/subjects/advanced')({
  component: AdvancedSubjectsPage,
})

function LockedState() {
  const { user } = useAuth()
  const { currentLang, t } = useLanguage()

  const title = user ? (
    currentLang === 'ar' ? 'أكمل المرحلة السابقة' : currentLang === 'sw' ? 'Kamilisha Hatua ya Kati' : 'Complete Previous Level'
  ) : (
    t('levels.advanced') + ' - ' + t('levels.locked')
  )

  const message = user ? (
    currentLang === 'ar' 
      ? 'يرجى إكمال ٧٠٪ من المستوى المتوسط لفتح هذا المستوى.' 
      : currentLang === 'sw' 
        ? 'Tafadhali kamilisha 70% ya hatua ya kati ili kufungua hatua hii.' 
        : 'Please complete 70% of the Intermediate level to unlock this stage.'
  ) : (
    currentLang === 'ar'
      ? 'انضم مجانًا للوصول إلى دروس هذا المستوى ومواصلة رحلتك التعليمية.'
      : currentLang === 'sw'
        ? 'Jiunge bure ili uweze kusoma masomo ya hatua hii na kuendelea na safari yako ya elimu.'
        : 'Join for free to access lessons at this level and continue your educational journey.'
  )

  const ctaText = user 
    ? (currentLang === 'ar' ? 'العودة للمواد' : currentLang === 'sw' ? 'Rudi kwa Masomo' : 'Back to Subjects')
    : (currentLang === 'ar' ? 'انضم إلينا ←' : currentLang === 'sw' ? 'Jiunge Nasi →' : 'Join Us →')

  const ctaHref = user ? '/subjects' : '/register'

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full border-2 border-accent/20 bg-accent/5">
          <Lock className="size-10 text-accent" />
        </div>
        <h2 className="mb-3 font-decorative text-[24px] font-bold text-foreground">
          {title}
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          {message}
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button asChild variant="accent" size="lg" className="gap-2 px-8">
            <Link to={ctaHref}>
              {ctaText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function ComingSoonCard({ title }: { title: string }) {
  return (
    <div className="group relative overflow-hidden border-2 border-dashed border-[#E5E0D8] bg-white p-6 text-center transition-all hover:border-accent/30">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-accent/20 bg-accent/5 mx-auto">
        <Star className="size-6 text-accent/50" />
      </div>
      <h3 className="mb-2 font-decorative text-[18px] font-semibold text-foreground/60">{title}</h3>
      <p className="text-sm text-muted-foreground/60">Coming soon</p>
    </div>
  )
}

function AdvancedSubjectsPage() {
  const { user } = useAuth()
  const { currentLang, t } = useLanguage()
  const level = levels.find((candidate) => candidate.id === 'endelea')
  const canAccessAdvanced = user?.levelAccess.includes('endelea')

  if (!canAccessAdvanced) {
    return (
      <div className="bg-background">
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1B4332] to-[#143828]" />
          <BorderOrnament position="bottom" variant="mosaic" className="h-1.5" />
          <div className="container-main relative z-10 py-10 lg:py-14">
            <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
              <Link to="/subjects" className="flex items-center gap-1 transition-colors hover:text-primary-foreground">
                <ArrowLeft className="size-4" />
                {t('navigation.subjects')}
              </Link>
            </div>
            <h1 className="mt-6 font-decorative text-[28px] font-bold lg:text-[36px]">
              {level?.name[currentLang]}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/70">
              {level?.description[currentLang]}
            </p>
          </div>
        </section>
        <LockedState />
      </div>
    )
  }

  return (
    <div className="bg-background pb-12 lg:pb-16">
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1B4332] to-[#143828]" />
        <div className="absolute inset-0 opacity-10">
          <svg className="size-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <defs>
              <pattern id="adv-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 5L35 25L55 30L35 35L30 55L25 35L5 30L25 25Z" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#adv-pattern)" />
          </svg>
        </div>

        <BorderOrnament position="bottom" variant="mosaic" className="h-1.5" />

        <div className="container-main relative z-10 py-8 lg:py-12">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
            <Link to="/subjects" className="flex items-center gap-1 transition-colors hover:text-primary-foreground">
              <ArrowLeft className="size-4" />
              {t('navigation.subjects')}
            </Link>
          </div>

          <div className="mt-6">
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-accent">
              <span className="size-1.5 rounded-full bg-accent" />
              {t('levels.advanced')}
            </p>
            <h1 className="mb-3 font-decorative text-[28px] font-bold leading-tight lg:text-[36px]">
              {level?.name[currentLang]}
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-primary-foreground/70">
              {level?.description[currentLang]}
            </p>
          </div>
        </div>
      </section>

      <section className="container-main py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <ComingSoonCard
              key={item}
              title={`Advanced Lesson ${item}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
