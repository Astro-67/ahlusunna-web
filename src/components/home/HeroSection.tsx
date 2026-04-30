import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lock,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '#/components/ui/button'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { Language } from '#/types'

const heroImages = [
  {
    src: '/Hero-images/hero5.png',
    alt: 'Open Quran on a wooden rehal with the green dome of Masjid an-Nabawi',
  },
  {
    src: '/Hero-images/hero1.png',
    alt: 'Islamic learning subjects shown through ornate arch artwork',
  },
  {
    src: '/Hero-images/hero3.png',
    alt: 'Digital Islamic learning on laptop and tablet screens',
  },
]

const heroCopy: Record<
  Language,
  {
    badge: string
    title: string
    subtitle: string
    note: string
    primaryCta: string
    secondaryCta: string
    levelTitle: string
    levelsCount: string
    levelNote: string
  }
> = {
  en: {
    badge: 'Ahlusunna Islamic Learning',
    title: 'Structured Islamic Learning for Every Muslim',
    subtitle:
      "Study Qur'an, Hadith, Fiqh, Tawhid, and Sirah through organised lessons by respected Sheikh.",
    note: 'Built especially for Swahili-speaking learners, with English and Arabic support.',
    primaryCta: 'Start Learning',
    secondaryCta: 'About Ahlusunna',
    levelTitle: 'Choose your level',
    levelsCount: '3 Levels',
    levelNote: 'Beginner is open. Higher levels continue after login.',
  },
  sw: {
    badge: 'Ahlusunna Elimu ya Kiislamu',
    title: 'Kujifunza Uislamu kwa Mpangilio kwa Kila Muislamu',
    subtitle:
      "Jifunze Qur'an, Hadith, Fiqhi, Tawhidi, na Sira kupitia masomo yaliyopangwa na Sheikh anayeheshimika.",
    note: 'Imeandaliwa hasa kwa watu wa Kiswahili, pamoja na msaada wa Kiingereza na Kiarabu.',
    primaryCta: 'Anza Kujifunza',
    secondaryCta: 'Kuhusu Ahlusunna',
    levelTitle: 'Chagua kiwango chako',
    levelsCount: 'Hatua 3',
    levelNote: 'Beginner iko wazi. Hatua zinazofuata zinaendelea baada ya kuingia.',
  },
  ar: {
    badge: 'أهل السنة للتعليم الإسلامي',
    title: 'تعلم إسلامي منظم لكل مسلم',
    subtitle:
      'ادرس القرآن والحديث والفقه والتوحيد والسيرة من خلال دروس منظمة يقدمها شيخ موثوق.',
    note: 'معد خصيصًا للمتعلمين الناطقين بالسواحيلية مع دعم الإنجليزية والعربية.',
    primaryCta: 'ابدأ التعلم',
    secondaryCta: 'عن أهل السنة',
    levelTitle: 'اختر مستواك',
    levelsCount: '3 مستويات',
    levelNote: 'المبتدئ مفتوح. المستويات التالية تتابع بعد تسجيل الدخول.',
  },
}

const levels: Array<{
  title: Record<Language, string>
  subtitle: Record<Language, string>
  description: Record<Language, string>
  href: '/subjects' | '/subjects/intermediate' | '/subjects/advanced'
  status: Record<Language, string>
  Icon: LucideIcon
}> = [
  {
    title: { en: 'Beginner', sw: 'Beginner', ar: 'مبتدئ' },
    subtitle: { en: 'Hatua ya Awali', sw: 'Hatua ya Awali', ar: 'المرحلة الأولى' },
    description: {
      en: "Open lessons for everyone starting Qur'an, Hadith, Fiqh, Tawhid, and Sirah.",
      sw: "Masomo ya wazi kwa kila anayeanza Qur'an, Hadith, Fiqhi, Tawhidi, na Sira.",
      ar: 'دروس مفتوحة لكل من يبدأ القرآن والحديث والفقه والتوحيد والسيرة.',
    },
    href: '/subjects',
    status: { en: 'Free access', sw: 'Wazi kwa wote', ar: 'متاح للجميع' },
    Icon: BookOpen,
  },
  {
    title: { en: 'Intermediate', sw: 'Intermediate', ar: 'متوسط' },
    subtitle: { en: 'Hatua ya Kati', sw: 'Hatua ya Kati', ar: 'المرحلة المتوسطة' },
    description: {
      en: 'For learners ready to continue after the beginner foundation.',
      sw: 'Kwa mwanafunzi aliye tayari kuendelea baada ya msingi wa awali.',
      ar: 'للمتعلم المستعد للمتابعة بعد أساسيات المستوى الأول.',
    },
    href: '/subjects/intermediate',
    status: { en: 'Login required', sw: 'Inahitaji kuingia', ar: 'يتطلب الدخول' },
    Icon: Lock,
  },
  {
    title: { en: 'Advanced', sw: 'Advanced', ar: 'متقدم' },
    subtitle: { en: 'Kuendelea', sw: 'Kuendelea', ar: 'مرحلة التقدم' },
    description: {
      en: 'Advanced study for serious learners who want deeper understanding.',
      sw: 'Masomo ya juu kwa wanafunzi wanaotaka ufahamu wa kina zaidi.',
      ar: 'دراسة متقدمة للطلاب الجادين الباحثين عن فهم أعمق.',
    },
    href: '/subjects/advanced',
    status: { en: 'Login required', sw: 'Inahitaji kuingia', ar: 'يتطلب الدخول' },
    Icon: CheckCircle2,
  },
]

const AUTOPLAY_MS = 5500

export function HeroSection() {
  const { currentLang } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const copy = heroCopy[currentLang]

  useEffect(() => {
    if (paused) return

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroImages.length)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(interval)
  }, [paused])

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-primary text-primary-foreground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="absolute inset-0 -z-10"
        aria-roledescription="carousel"
        aria-label="Ahlusunna learning imagery"
      >
        {heroImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={cn(
              'absolute inset-0 size-full object-cover object-center transition-opacity duration-1000 ease-in-out',
              index === activeIndex ? 'opacity-100' : 'opacity-0',
            )}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/30" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/90 to-transparent" />
      </div>

      <div className="container-main relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-between gap-8 py-10 lg:min-h-[calc(100svh-76px)] lg:py-12">
        <div className="min-w-0 max-w-[358px] animate-[hero-enter_700ms_ease-out_both] pt-4 sm:max-w-2xl lg:pt-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-[8px] border border-accent/35 bg-primary/55 px-3 py-1.5 text-sm font-medium text-accent backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-accent" />
            {copy.badge}
          </div>

          <h1 className="font-decorative text-[40px] font-bold leading-[1.05] text-primary-foreground md:text-[56px] lg:text-[68px]">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-primary-foreground/94 md:text-lg">
            {copy.subtitle}
          </p>

          <p className="mt-4 max-w-xl text-sm leading-7 text-primary-foreground/82 md:text-base">
            {copy.note}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg" className="w-full gap-2 sm:w-auto">
              <Link to="/subjects">
                {copy.primaryCta}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-primary-foreground/45 bg-primary/25 text-primary-foreground backdrop-blur-md hover:bg-primary-foreground/10 sm:w-auto"
            >
              <Link to="/about">{copy.secondaryCta}</Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2" aria-label="Carousel controls">
            {heroImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'w-9 bg-accent'
                    : 'w-2 bg-primary-foreground/55 hover:bg-primary-foreground/85',
                )}
                aria-label={`Show ${image.alt}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </div>

        <div className="min-w-0 animate-[hero-enter_900ms_ease-out_120ms_both]">
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-primary-foreground/82">{copy.levelTitle}</p>
              <h2 className="font-decorative text-2xl font-bold text-primary-foreground">
                {copy.levelsCount}
              </h2>
            </div>
            <p className="max-w-xl text-xs leading-5 text-primary-foreground/74 sm:text-end">
              {copy.levelNote}
            </p>
          </div>

          <div className="scrollbar-none -mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <div className="grid min-w-[680px] grid-cols-3 gap-3 sm:min-w-0 lg:gap-4">
              {levels.map((level, index) => {
                const Icon = level.Icon

                return (
                  <Link
                    key={level.href}
                    to={level.href}
                    className="group flex min-h-24 items-center gap-3 rounded-[8px] border border-accent/28 bg-primary-dark/95 p-3 text-primary-foreground shadow-[0_14px_45px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/70 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:p-4"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-accent text-accent-foreground">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-3">
                        <span className="min-w-0">
                          <span className="block truncate font-decorative text-xl font-bold leading-tight">
                            {level.title[currentLang]}
                          </span>
                          <span className="block truncate text-sm font-medium text-accent">
                            {level.subtitle[currentLang]}
                          </span>
                        </span>
                        <span className="shrink-0 text-xs text-accent">0{index + 1}</span>
                      </span>
                      <span className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-primary-foreground/92">
                        {level.status[currentLang]}
                        <ArrowRight
                          aria-hidden="true"
                          className="size-3.5 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
