import { useLanguage } from '#/hooks/useLanguage'
import type { Language } from '#/types'

const languages: Array<{ id: Language; label: string; longLabel: string }> = [
  { id: 'sw', label: 'SW', longLabel: 'Kiswahili' },
  { id: 'ar', label: 'AR', longLabel: 'العربية' },
  { id: 'en', label: 'EN', longLabel: 'English' },
]

interface LanguageToggleProps {
  expandedLabels?: boolean
  inverted?: boolean
}

export function LanguageToggle({ expandedLabels = false, inverted = false }: LanguageToggleProps) {
  const { currentLang, changeLanguage } = useLanguage()

  return (
    <div
      className={
        inverted
          ? 'inline-flex border border-[#C9A84C]/30 bg-[#1B4332]/50'
          : 'inline-flex border border-border bg-background'
      }
    >
      {languages.map((language) => (
        <button
          key={language.id}
          type="button"
          onClick={() => void changeLanguage(language.id)}
          className={
            currentLang === language.id
              ? 'bg-accent px-3 py-2 text-sm font-medium text-accent-foreground transition-colors'
              : inverted
                ? 'px-3 py-2 text-sm font-medium text-[#FAF7F0]/75 transition-colors hover:text-[#FAF7F0]'
                : 'px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
          }
          aria-pressed={currentLang === language.id}
        >
          {expandedLabels ? language.longLabel : language.label}
        </button>
      ))}
    </div>
  )
}
