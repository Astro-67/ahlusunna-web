import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lock,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '#/hooks/useMediaQuery'

import { Button } from '#/components/ui/button'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { Language } from '#/types'

const heroCopy: Record<
  Language,
  {
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    levelTitle: string
    levelsCount: string
  }
> = {
  en: {
    title: 'Jifunze Dini Yako kwa Lugha Yako',
    subtitle:
      "Study Qur'an, Hadith, Fiqh, Tawhid, and Sirah through organized lessons, audio, and video — all in your language.",
    primaryCta: 'Anza Kujifunza',
    secondaryCta: 'Kuhusu Ahlusunna',
    levelTitle: 'Choose your level',
    levelsCount: '3 Levels',
  },
  sw: {
    title: 'Jifunze Dini Yako kwa Lugha Yako',
    subtitle:
      "Jifunze Qur'an, Hadith, Fiqhi, Tawhidi, na Sira kupitia masomo yaliyopangiliwa, sauti, na video — vyote kwa lugha yako.",
    primaryCta: 'Anza Kujifunza',
    secondaryCta: 'Kuhusu Ahlusunna',
    levelTitle: 'Chagua kiwango chako',
    levelsCount: 'Hatua 3',
  },
  ar: {
    title: 'تعلم دينك بلغتك',
    subtitle:
      'ادرس القرآن والحديث والفقه والتوحيد والسيرة من خلال دروس منظمة وصوت وفيديو — كل ذلك بلغتك.',
    primaryCta: 'ابدأ التعلم',
    secondaryCta: 'عن أهل السنة',
    levelTitle: 'اختر مستواك',
    levelsCount: '3 مستويات',
  },
}

const levels: Array<{
  title: Record<Language, string>
  subtitle: Record<Language, string>
  arabicSubtitle: string
  description: Record<Language, string>
  href: '/subjects' | '/subjects/intermediate' | '/subjects/advanced'
  status: Record<Language, string>
  Icon: LucideIcon
  isLocked: boolean
}> = [
  {
    title: { en: 'Beginner', sw: 'Beginner', ar: 'مبتدئ' },
    subtitle: { en: 'Hatua ya Awali', sw: 'Hatua ya Awali', ar: 'المرحلة الأولى' },
    arabicSubtitle: 'مبتدئ',
    description: {
      en: "Open lessons for everyone starting Qur'an, Hadith, Fiqh, Tawhid, and Sirah.",
      sw: "Masomo ya wazi kwa kila anayeanza Qur'an, Hadith, Fiqhi, Tawhidi, na Sira.",
      ar: 'دروس مفتوحة لكل من يبدأ القرآن والحديث والفقه والتوحيد والسيرة.',
    },
    href: '/subjects',
    status: { en: 'No login needed', sw: 'Bila Akaunti', ar: 'لا تسجيل مطلوب' },
    Icon: BookOpen,
    isLocked: false,
  },
  {
    title: { en: 'Intermediate', sw: 'Intermediate', ar: 'متوسط' },
    subtitle: { en: 'Hatua ya Kati', sw: 'Hatua ya Kati', ar: 'المرحلة المتوسطة' },
    arabicSubtitle: 'متوسط',
    description: {
      en: 'For learners ready to continue after the beginner foundation.',
      sw: 'Kwa mwanafunzi aliye tayari kuendelea baada ya msingi wa awali.',
      ar: 'للمتعلم المستعد للمتابعة بعد أساسيات المستوى الأول.',
    },
    href: '/subjects/intermediate',
    status: { en: 'Login required', sw: 'Akaunti Inahitajika', ar: 'يتطلب الدخول' },
    Icon: BookOpen,
    isLocked: true,
  },
  {
    title: { en: 'Advanced', sw: 'Advanced', ar: 'متقدم' },
    subtitle: { en: 'Kuendelea', sw: 'Kuendelea', ar: 'مرحلة التقدم' },
    arabicSubtitle: 'متقدم',
    description: {
      en: 'Advanced study for serious learners who want deeper understanding.',
      sw: 'Masomo ya juu kwa wanafunzi wanaotaka ufahamu wa kina zaidi.',
      ar: 'دراسة متقدمة للطلاب الجادين الباحثين عن فهم أعمق.',
    },
    href: '/subjects/advanced',
    status: { en: 'Login required', sw: 'Akaunti Inahitajika', ar: 'يتطلب الدخول' },
    Icon: CheckCircle2,
    isLocked: true,
  },
]

const AUTOPLAY_MS = 5500

interface LoginPromptProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  currentLang: Language
}

function LoginPrompt({ isOpen, onClose, title, message, currentLang }: LoginPromptProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-lg border-2 border-accent/40 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold top accent */}
        <div className="h-1.5 w-full bg-linear-to-r from-transparent via-accent to-transparent" />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center pt-8">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
            <div className="relative flex size-20 items-center justify-center rounded-full border-2 border-accent/30 bg-accent/10">
              <Lock className="size-10 text-accent" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 pt-6 text-center">
          <h3 className="font-decorative text-2xl font-bold text-foreground">
            {title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {message}
          </p>

          {/* Decorative divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-border" />
            <div className="size-2 rounded-full bg-accent" />
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-border" />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button asChild variant="accent" size="lg" className="w-full py-6 text-lg">
              <Link to="/login" onClick={onClose}>
                {currentLang === 'ar' ? 'تسجيل الدخول' : currentLang === 'sw' ? 'Ingia' : 'Login'}
                <ArrowRight className="mr-2 size-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full py-5">
              <Link to="/register" onClick={onClose}>
                {currentLang === 'ar' ? 'إنشاء حساب جديد' : currentLang === 'sw' ? 'Jiunge Nasi' : 'Create Account'}
              </Link>
            </Button>
            <button
              onClick={onClose}
              className="mt-2 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {currentLang === 'ar' ? 'العودة' : currentLang === 'sw' ? 'Rudi nyuma' : 'Go Back'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const { currentLang } = useLanguage()
  const { isAuthenticated } = useAuth()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const copy = heroCopy[currentLang]
  const isRtl = currentLang === 'ar'

  // Only autoplay on desktop (md+)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const ltrHeroImages = [
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

  const rtlHeroImages = [
    {
      src: '/Rtl-Hero-images/rtl-hero1.png',
      alt: 'Islamic learning imagery suited for RTL layout',
    },
    {
      src: '/Rtl-Hero-images/rtl-hero2.png',
      alt: 'Islamic learning imagery suited for RTL layout',
    },
    {
      src: '/Rtl-Hero-images/rtl-hero3.png',
      alt: 'Islamic learning imagery suited for RTL layout',
    },
  ]

  const heroImages = isRtl ? rtlHeroImages : ltrHeroImages

  // Reset carousel when language changes
  useEffect(() => {
    setActiveIndex(0)
  }, [currentLang])

  // Autoplay interval - only on desktop
  useEffect(() => {
    // Don't autoplay on mobile or when paused
    if (!isDesktop || paused || heroImages.length <= 1) return

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroImages.length)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(interval)
  }, [paused, heroImages.length, isDesktop])

  const handleLevelClick = (level: typeof levels[0], e: React.MouseEvent) => {
    if (level.isLocked && !isAuthenticated) {
      e.preventDefault()
      setShowLoginPrompt(true)
    }
  }

  const promptCopy = {
    en: {
      title: 'Login Required',
      message: 'Please login or create an account to access intermediate and advanced lessons. Continue your learning journey!',
    },
    sw: {
      title: 'Akaunti Inahitajika',
      message: 'Tafadhali ingia au uunde akaunti ili kufikia masomo ya kati na ya juu. Endelea na safari yako ya kujifunza!',
    },
    ar: {
      title: 'الدخول مطلوب',
      message: 'يرجى تسجيل الدخول أو إنشاء حساب للوصول إلى دروس المستوى المتوسط والمتقدم. استمر في رحلة تعلمك!',
    },
  }

  return (
    <>
      <section
        id="home"
        className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden bg-primary text-primary-foreground sm:min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-76px)]"
        onMouseEnter={() => isDesktop && setPaused(true)}
        onMouseLeave={() => isDesktop && setPaused(false)}
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
                'absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-in-out',
                isRtl ? 'object-left' : 'object-[58%_center] sm:object-center',
                index === activeIndex ? 'opacity-100' : 'opacity-0',
              )}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
          <div className={cn(
              'absolute inset-0 bg-linear-to-b from-primary via-primary/90 to-primary/45 sm:bg-linear-to-r sm:from-primary sm:via-primary/90 sm:to-primary/30',
              isRtl && 'sm:bg-linear-to-l sm:from-primary sm:via-primary/90 sm:to-primary/30'
            )} />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-primary/90 to-transparent sm:h-40" />
        </div>

        <div className="container-main relative z-10 flex min-h-[calc(100svh-3.5rem)] flex-col justify-start gap-7 py-6 sm:min-h-[calc(100svh-4rem)] sm:justify-between sm:gap-8 sm:py-8 lg:min-h-[calc(100svh-76px)] lg:py-12">
          <div className="min-w-0 max-w-[min(100%,36rem)] animate-[hero-enter_700ms_ease-out_both] pt-2 sm:max-w-2xl sm:pt-6 lg:pt-12">
            <h1 className="font-decorative text-[34px] font-bold leading-[1.08] text-primary-foreground sm:text-[44px] md:text-[56px] lg:text-[68px]">
              {copy.title}
            </h1>

            <p className="mt-4 max-w-136 text-base leading-7 text-primary-foreground/94 sm:mt-5 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
              {copy.subtitle}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Button asChild variant="accent" size="lg" className="w-full gap-2 sm:w-auto sm:px-8 sm:py-4">
                <Link to="/subjects">
                  {copy.primaryCta}
                  <ArrowRight data-icon="inline-end" className="size-5" />
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

            <div className="mt-6 flex items-center gap-2 sm:mt-8" aria-label="Carousel controls">
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
            </div>

            <div className="pb-1">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 lg:gap-4">
                {levels.map((level, index) => {
                  const Icon = level.Icon
                  const isLocked = level.isLocked && !isAuthenticated

                  return (
                    <div
                      key={level.href}
                      onClick={(e) => isLocked ? handleLevelClick(level, e) : undefined}
                      className={cn(
                        "group flex min-h-20 cursor-pointer items-center gap-3 p-3 shadow-[0_14px_45px_rgba(0,0,0,0.22)] transition-all duration-300 sm:min-h-24 sm:hover:-translate-y-0.5 lg:p-4",
                        isLocked
                          ? "cursor-pointer border border-white/10 bg-primary-dark/95 opacity-80 hover:opacity-100"
                          : "border border-accent/28 bg-primary-dark/95 hover:border-accent/70 hover:bg-primary"
                      )}
                    >
                      {isLocked ? (
                        <div
                          onClick={(e) => {
                            e.preventDefault()
                            handleLevelClick(level, e)
                          }}
                          className="flex min-h-full w-full items-center gap-3"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center bg-white/10 text-white/60 sm:size-11">
                            <Lock aria-hidden="true" className="size-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-start justify-between gap-3">
                              <span className="min-w-0">
                                <span className="block truncate font-decorative text-xl font-bold leading-tight text-white/80 sm:text-2xl">
                                  {level.subtitle[currentLang]}
                                </span>
                                <span className="block truncate text-sm font-medium text-accent">
                                  {level.title[currentLang]}
                                </span>
                                <span className="block truncate text-xs font-medium text-accent/80">
                                  {level.arabicSubtitle}
                                </span>
                              </span>
                              <span className="shrink-0 text-sm text-white/50">
                                0{index + 1}
                              </span>
                            </span>
                            <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-white/60">
                              {level.status[currentLang]}
                              <Lock aria-hidden="true" className="size-3.5" />
                            </span>
                          </span>
                        </div>
                      ) : (
                        <Link
                          to={level.href}
                          className="flex min-h-full w-full items-center gap-3"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center bg-accent text-accent-foreground sm:size-11">
                            <Icon aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-start justify-between gap-3">
                              <span className="min-w-0">
                                <span className="block truncate font-decorative text-xl font-bold leading-tight sm:text-2xl">
                                  {level.subtitle[currentLang]}
                                </span>
                                <span className="block truncate text-sm font-medium text-accent">
                                  {level.title[currentLang]}
                                </span>
                                <span className="block truncate text-xs font-medium text-accent/80">
                                  {level.arabicSubtitle}
                                </span>
                              </span>
                              <span className="shrink-0 text-sm text-accent">
                                0{index + 1}
                              </span>
                            </span>
                            <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/92">
                              {level.status[currentLang]}
                              <ArrowRight
                                aria-hidden="true"
                                className="size-3.5 transition-transform group-hover:translate-x-1"
                              />
                            </span>
                          </span>
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

<LoginPrompt
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        title={promptCopy[currentLang].title}
        message={promptCopy[currentLang].message}
        currentLang={currentLang}
      />
    </>
  )
}