'use client'

import Link from 'next/link'
import { ReticleLabLogo } from '@/components/icons/ReticleLabLogo'
import { Menu, X, Target, Settings, HelpCircle, Globe, Heart } from 'lucide-react'
import { useState } from 'react'
import { type Locale } from '@/i18n.config'
import { usePathname } from 'next/navigation'
import { type Dictionary } from '@/lib/dictionary'

interface HeaderProps {
  locale: Locale
  dictionary: Dictionary
}

export function Header({ locale, dictionary }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-valorant-white border-b-2 border-valorant-gray-200" role="banner">
      <div className="container mx-auto px-6 flex h-20 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href={`/${locale}`} className="group">
            <ReticleLabLogo className="hover:scale-105 transition-transform duration-300" />
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <Link href={`/${locale}/crosshairs`} className="text-valorant-black hover:text-valorant-red font-bold tracking-wide uppercase text-sm transition-colors duration-200 flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>{dictionary.header.browse}</span>
            </Link>
            <Link href={`/${locale}/favorites`} className="text-valorant-black hover:text-valorant-red font-bold tracking-wide uppercase text-sm transition-colors duration-200 flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>{dictionary.header.favorites}</span>
            </Link>
            <Link href={`/${locale}/how-to-use`} className="text-valorant-black hover:text-valorant-red font-bold tracking-wide uppercase text-sm transition-colors duration-200 flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>{dictionary.header.howTo}</span>
            </Link>
            <Link href={`/${locale}/editor`} className="text-valorant-black hover:text-valorant-red font-bold tracking-wide uppercase text-sm transition-colors duration-200 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>{dictionary.header.editor}</span>
              <span className="ml-1 text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full font-bold">SOON</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href={locale === 'en' ? pathname.replace('/en', '/zh') : pathname.replace('/zh', '/en')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-valorant-gray-200 hover:border-valorant-red transition-all duration-300 text-valorant-black hover:text-valorant-red font-bold text-sm"
            aria-label={`Switch language to ${locale === 'en' ? 'Chinese' : 'English'}`}
          >
            <Globe className="h-4 w-4" />
            <span>{locale === 'en' ? '中文' : 'EN'}</span>
          </Link>

          <button
            className="lg:hidden p-3 rounded-lg border-2 border-valorant-gray-200 bg-valorant-white hover:border-valorant-red hover:bg-valorant-red/5 transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-valorant-black" />
            ) : (
              <Menu className="h-5 w-5 text-valorant-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-valorant-gray-200 bg-valorant-white">
          <nav className="container mx-auto px-6 flex flex-col space-y-2 py-6" role="navigation" aria-label="Mobile navigation">
            <Link
              href={`/${locale}/crosshairs`}
              className="flex items-center gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-valorant-red/10 text-valorant-black hover:text-valorant-red"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Target className="h-5 w-5" />
              <span className="font-bold tracking-wide uppercase text-lg">{dictionary.header.browse}</span>
            </Link>
            <Link
              href={`/${locale}/favorites`}
              className="flex items-center gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-valorant-red/10 text-valorant-black hover:text-valorant-red"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Heart className="h-5 w-5" />
              <span className="font-bold tracking-wide uppercase text-lg">{dictionary.header.favorites}</span>
            </Link>
            <Link
              href={`/${locale}/how-to-use`}
              className="flex items-center gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-valorant-red/10 text-valorant-black hover:text-valorant-red"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HelpCircle className="h-5 w-5" />
              <span className="font-bold tracking-wide uppercase text-lg">{dictionary.header.howTo}</span>
            </Link>
            <Link
              href={`/${locale}/editor`}
              className="flex items-center gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-valorant-red/10 text-valorant-black hover:text-valorant-red"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Settings className="h-5 w-5" />
              <span className="font-bold tracking-wide uppercase text-lg">{dictionary.header.editor}</span>
              <span className="ml-auto text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full font-bold">SOON</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}