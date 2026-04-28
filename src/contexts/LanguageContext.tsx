import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
  
} from 'react'
import type {ReactNode} from 'react';
import { useTranslation } from 'react-i18next'

import type { Language } from '#/types'
import '#/i18n/config'

interface LanguageContextValue {
  currentLang: Language
  changeLanguage: (language: Language) => Promise<void>
  t: (key: string, options?: Record<string, unknown>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const normalizeLanguage = (language: string | undefined): Language => {
  if (language === 'ar' || language === 'en' || language === 'sw') return language
  return 'sw'
}

const applyDocumentLanguage = (language: Language) => {
  document.documentElement.lang = language
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n, t } = useTranslation()
  const [currentLang, setCurrentLang] = useState<Language>(() =>
    normalizeLanguage(i18n.resolvedLanguage ?? i18n.language),
  )

  useEffect(() => {
    applyDocumentLanguage(currentLang)
  }, [currentLang])

  useEffect(() => {
    const handleChange = (language: string) => {
      setCurrentLang(normalizeLanguage(language))
    }

    i18n.on('languageChanged', handleChange)
    return () => {
      i18n.off('languageChanged', handleChange)
    }
  }, [i18n])

  const changeLanguage = useCallback(
    async (language: Language) => {
      await i18n.changeLanguage(language)
      setCurrentLang(language)
      applyDocumentLanguage(language)
    },
    [i18n],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      currentLang,
      changeLanguage,
      t: (key, options) => t(key, options),
    }),
    [changeLanguage, currentLang, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
