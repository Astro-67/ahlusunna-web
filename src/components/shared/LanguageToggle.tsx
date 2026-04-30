import { Check, ChevronDown, Globe2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { Language } from '#/types'

function TanzaniaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
      <rect width="36" height="24" fill="#1EB53A" />
      <polygon points="36 0 36 24 0 24" fill="#00A3DD" />
      <polygon points="0 21 31.5 0 36 0 4.5 24 0 24" fill="#FCD116" />
      <polygon points="0 18 27 0 36 0 9 24 0 24" fill="#000" />
    </svg>
  )
}

function UKFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
      <rect width="36" height="24" fill="#012169" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#fff" strokeWidth="5" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#C8102E" strokeWidth="3" />
      <path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="8" />
      <path d="M18 0v24M0 12h36" stroke="#C8102E" strokeWidth="4.5" />
    </svg>
  )
}

function SaudiFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
      <rect width="36" height="24" fill="#006C35" />
      <path
        d="M9 9h18M10 16h16"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13 6.5h10M15 11.5h6"
        stroke="#fff"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

const languages: Array<{
  id: Language
  name: string
  nativeName: string
  shortLabel: string
  Flag: (props: { className?: string }) => JSX.Element
}> = [
  {
    id: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    shortLabel: 'SW',
    Flag: TanzaniaFlag,
  },
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    shortLabel: 'EN',
    Flag: UKFlag,
  },
  {
    id: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    shortLabel: 'AR',
    Flag: SaudiFlag,
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
  const CurrentFlag = current.Flag

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
        <span className="overflow-hidden rounded-[3px] border border-black/10">
          <CurrentFlag className="h-4 w-6" />
        </span>
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
            const Flag = language.Flag

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
                <span className="overflow-hidden rounded-[3px] border border-border">
                  <Flag className="h-4 w-6" />
                </span>
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
