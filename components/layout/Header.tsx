'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-valorant-red rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-xl">ReticleLab</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/crosshairs" className="transition-colors hover:text-primary">
              准星库
            </Link>
            <Link href="/crosshairs/pro" className="transition-colors hover:text-primary">
              职业选手
            </Link>
            <Link href="/editor" className="transition-colors hover:text-primary">
              编辑器
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="搜索准星..."
                className="w-[200px] lg:w-[300px] h-9 rounded-md border border-input bg-background px-8 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          
          <Button variant="valorant" size="sm">
            登录
          </Button>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              href="/crosshairs"
              className="transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              准星库
            </Link>
            <Link
              href="/crosshairs/pro"
              className="transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              职业选手
            </Link>
            <Link
              href="/editor"
              className="transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              编辑器
            </Link>
            <div className="pt-4">
              <input
                type="search"
                placeholder="搜索准星..."
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}