'use client'

import { useRouter, usePathname } from 'next/navigation'
import { type Locale, i18n } from '@/i18n.config'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Globe } from 'lucide-react'

interface LanguageSelectorProps {
  currentLocale: Locale
}

const languages = {
  en: {
    label: 'English',
  },
  zh: {
    label: '简体中文',
  },
}

export function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    router.push(newPath)
  }

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[140px] h-9 bg-background border-border hover:bg-accent hover:text-accent-foreground transition-colors">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {i18n.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {languages[locale].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}