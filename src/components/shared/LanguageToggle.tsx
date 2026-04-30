import { Check, ChevronDown, Globe2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { Language } from '#/types'

const languages: Array<{
  id: Language
  name: string
  nativeName: string
  shortLabel: string
  emoji: string
}> = [
  {
    id: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    shortLabel: 'SW',
    emoji: '🇹🇿',
  },
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    shortLabel: 'EN',
    emoji: '🇬🇧',
  },
  {
    id: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    shortLabel: 'AR',
    emoji: '🇴🇲',
  },
]

interface LanguageToggleProps {
  expandedLabels?: boolean
  inverted?: boolean
}

export function LanguageToggle({ expandedLabels = false, inverted = false }: LanguageToggleProps) {
  const { currentLang, changeLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const current = languages.find((language) => language.id === currentLang) ?? languages[0]

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div ref={menuRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'inline-flex h-10 items-center gap-2 rounded-[8px] border px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          inverted
            ? 'border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/16'
            : 'border-border bg-card text-foreground hover:bg-secondary',
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe2 aria-hidden="true" className="size-4 text-accent" />
        <span className="text-lg">{current.emoji}</span>
        <span>{expandedLabels ? current.name : current.shortLabel}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn('size-4 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          className="absolute end-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-[8px] border border-border bg-popover py-1 text-popover-foreground shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
          role="listbox"
          aria-label="Choose language"
        >
          {languages.map((language) => {
            const isSelected = language.id === currentLang

            return (
              <button
                key={language.id}
                type="button"
                onClick={() => {
                  void changeLanguage(language.id)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center gap-3 px-3 py-2.5 text-start text-sm transition-colors hover:bg-secondary',
                  isSelected && 'bg-secondary',
                )}
                role="option"
                aria-selected={isSelected}
              >
                <span className="text-lg">{language.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-foreground">{language.name}</span>
                  <span className="block text-xs text-muted-foreground">{language.nativeName}</span>
                </span>
                {isSelected && <Check aria-hidden="true" className="size-4 text-accent" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
