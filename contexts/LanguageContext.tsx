'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, Language, TranslationKey } from '@/lib/i18n/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
      setLanguageState(savedLang)
    } else {
      // Auto-detect language from browser
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.includes('zh')) {
        setLanguageState('zh')
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations['en'][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}