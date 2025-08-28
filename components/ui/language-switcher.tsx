'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en')
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="gap-2 border-gray-600 hover:border-valorant-red"
    >
      <Globe className="h-4 w-4" />
      <span className="font-bold">{language === 'en' ? '中文' : 'EN'}</span>
    </Button>
  )
}