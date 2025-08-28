'use client'

import Link from 'next/link'
import { ReticleLabLogo } from '@/components/icons/ReticleLabLogo'
import { Search, Menu, X, Target, Settings, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { useLanguage } from '@/contexts/LanguageContext'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full bg-valorant-white border-b-2 border-valorant-gray-200">
      <div className="container mx-auto px-6 flex h-20 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="group">
            <ReticleLabLogo className="hover:scale-105 transition-transform duration-300" />
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/crosshairs" className="text-valorant-black hover:text-valorant-red font-bold tracking-wide uppercase text-sm transition-colors duration-200 flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>{t('header.browse')}</span>
            </Link>
            <Link href="/how-to-use" className="text-valorant-black hover:text-valorant-red font-bold tracking-wide uppercase text-sm transition-colors duration-200 flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>{t('header.howTo')}</span>
            </Link>
            <Link href="/editor" className="text-valorant-black hover:text-valorant-red font-bold tracking-wide uppercase text-sm transition-colors duration-200 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>{t('header.editor')}</span>
              <span className="ml-1 text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full font-bold">SOON</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <LanguageSwitcher />
          <div className="hidden xl:flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-valorant-gray-500 group-focus-within:text-valorant-red transition-colors" />
              <input
                type="search"
                placeholder="Search crosshairs..."
                className="w-[280px] h-12 rounded-lg border-2 border-valorant-gray-200 bg-valorant-white px-12 text-sm font-medium outline-none transition-all duration-300 focus:ring-2 focus:ring-valorant-red/20 focus:border-valorant-red placeholder:text-valorant-gray-500 hover:border-valorant-gray-300"
              />
            </div>
          </div>

          <button
            className="lg:hidden p-3 rounded-lg border-2 border-valorant-gray-200 bg-valorant-white hover:border-valorant-red hover:bg-valorant-red/5 transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          <nav className="container mx-auto px-6 flex flex-col space-y-2 py-6">
            <Link
              href="/crosshairs"
              className="flex items-center gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-valorant-red/10 text-valorant-black hover:text-valorant-red"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Target className="h-5 w-5" />
              <span className="font-bold tracking-wide uppercase text-lg">{t('header.browse')}</span>
            </Link>
            <Link
              href="/how-to-use"
              className="flex items-center gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-valorant-red/10 text-valorant-black hover:text-valorant-red"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HelpCircle className="h-5 w-5" />
              <span className="font-bold tracking-wide uppercase text-lg">{t('header.howTo')}</span>
            </Link>
            <Link
              href="/editor"
              className="flex items-center gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-valorant-red/10 text-valorant-black hover:text-valorant-red"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Settings className="h-5 w-5" />
              <span className="font-bold tracking-wide uppercase text-lg">{t('header.editor')}</span>
              <span className="ml-auto text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full font-bold">SOON</span>
            </Link>
            
            <div className="pt-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-valorant-gray-500 group-focus-within:text-valorant-red transition-colors" />
                <input
                  type="search"
                  placeholder="Search crosshairs..."
                  className="w-full h-12 rounded-lg border-2 border-valorant-gray-200 bg-valorant-white px-12 text-sm font-medium outline-none focus:ring-2 focus:ring-valorant-red/20 focus:border-valorant-red"
                />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}