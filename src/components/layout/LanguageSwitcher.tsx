import { useTranslation } from 'react-i18next'
import { cn } from '#/lib/utils'

type Language = 'sw' | 'ar' | 'en'

interface LanguageSwitcherProps {
  className?: string
  size?: 'sm' | 'md'
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'sw', label: 'SW' },
  { code: 'ar', label: 'AR' },
  { code: 'en', label: 'EN' },
]

export function LanguageSwitcher({ className, size = 'md' }: LanguageSwitcherProps) {
  const { i18n: i18nInstance } = useTranslation()
  const currentLang = i18nInstance.language as Language

  const handleLanguageChange = (lang: Language) => {
    i18nInstance.changeLanguage(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  return (
    <div
      className={cn(
        'flex bg-white border border-border p-0.5',
        size === 'sm' ? 'gap-0.5' : 'gap-0.5',
        className
      )}
    >
      {LANGUAGES.map(({ code, label }) => {
        const isActive = currentLang === code

        return (
          <button
            key={code}
            onClick={() => handleLanguageChange(code)}
            className={cn(
              'font-sans text-sm font-medium transition-colors',
              size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-[13px]',
              // Square corners - brand standard
              'rounded-none',
              // Active state
              isActive
                ? 'bg-primary text-white border border-primary'
                : 'text-secondary hover:text-primary',
              // Border between adjacent pills (shared border technique)
              !isActive && 'border border-border'
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}