'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { Search, TrendingUp, Users, Shield, Target, Crosshair as CrosshairIcon, Sparkles } from 'lucide-react'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type Locale } from '@/i18n.config'
import { type Crosshair } from '@/types/crosshair'
import { type Dictionary } from '@/lib/dictionary'

type FilterType = 'all' | 'professional' | 'community' | 'trending'
type SortType = 'popular' | 'copies' | 'newest' | 'likes' | 'verified'

interface CrosshairsClientProps {
  initialCrosshairs: Crosshair[]
  locale: Locale
  dictionary: Dictionary
}

export function CrosshairsClient({ initialCrosshairs, locale, dictionary }: CrosshairsClientProps) {
  // Log received data on client side
  useEffect(() => {
    console.log('[Client] CrosshairsClient mounted')
    console.log('[Client] Initial crosshairs count:', initialCrosshairs?.length || 0)
    console.log('[Client] Sample crosshair:', initialCrosshairs?.[0])
    console.log('[Client] Locale:', locale)
  }, [])
  
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortType>('popular')
  const resultsRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const sortSelectRef = useRef<HTMLButtonElement>(null)
  const previousFilter = useRef<FilterType>(activeFilter)

  // Filter tabs configuration
  const filterTabs = [
    { value: 'all' as FilterType, icon: Target },
    { value: 'professional' as FilterType, icon: Shield },
    { value: 'community' as FilterType, icon: Users,},
    { value: 'trending' as FilterType, icon: TrendingUp},
  ]

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: '/',
      handler: () => {
        searchInputRef.current?.focus()
      }
    },
    {
      key: '1',
      handler: () => setActiveFilter('all')
    },
    {
      key: '2',
      handler: () => setActiveFilter('professional')
    },
    {
      key: '3',
      handler: () => setActiveFilter('community')
    },
    {
      key: '4',
      handler: () => setActiveFilter('trending')
    },
    {
      key: 'Escape',
      handler: () => {
        setSearchQuery('')
        searchInputRef.current?.blur()
      }
    },
    {
      key: 's',
      handler: () => {
        sortSelectRef.current?.click()
      }
    }
  ])

  // Scroll to top of results only when filter tabs change
  useEffect(() => {
    // Only scroll if the filter actually changed (not on initial render)
    if (previousFilter.current !== activeFilter && resultsRef.current) {
      previousFilter.current = activeFilter

      // Calculate the offset considering the sticky header
      const yOffset = -100 // Adjust based on your sticky header height
      const element = resultsRef.current
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [activeFilter])

  // Filter and sort crosshairs
  const filteredAndSortedCrosshairs = useMemo(() => {
    let filtered = [...initialCrosshairs]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(crosshair =>
        crosshair.name.toLowerCase().includes(query) ||
        crosshair.playerName?.toLowerCase().includes(query) ||
        crosshair.teamName?.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    switch (activeFilter) {
      case 'professional':
        filtered = filtered.filter(c => c.isVerified && c.playerName)
        break
      case 'community':
        filtered = filtered.filter(c => !c.playerName)
        break
      case 'trending':
        // Get top 5 most copied in last "period"
        filtered = filtered.sort((a, b) => b.copies - a.copies).slice(0, 5)
        break
      case 'all':
      default:
        // No additional filter
        break
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.copies + b.likes) - (a.copies + a.likes))
        break
      case 'copies':
        filtered.sort((a, b) => b.copies - a.copies)
        break
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes)
        break
      case 'newest':
        // In real app, would sort by creation date
        filtered.reverse()
        break
      case 'verified':
        filtered.sort((a, b) => {
          if (a.isVerified === b.isVerified) return (b.copies + b.likes) - (a.copies + a.likes)
          return a.isVerified ? -1 : 1
        })
        break
    }

    return filtered
  }, [searchQuery, activeFilter, sortBy, initialCrosshairs])

  return (
    <div className="min-h-screen bg-valorant-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-valorant-black to-valorant-gray-900 text-white py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl">
            <Badge variant="valorant" className="mb-4 px-3 py-1.5 text-xs">
              <CrosshairIcon className="h-3 w-3" />
              VALORANT CROSSHAIRS • {initialCrosshairs.length} TOTAL
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black mb-4 sm:mb-6 tracking-tight">
              {dictionary.crosshairs.title}
            </h1>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-valorant-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={dictionary.crosshairs.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-valorant-white/10 backdrop-blur border-2 border-valorant-white/20 rounded-xl text-white placeholder:text-valorant-gray-400 focus:outline-none focus:border-valorant-red transition-colors text-sm sm:text-base"
                aria-label="Search crosshairs"
                role="search"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block px-2 py-1 text-xs font-mono bg-valorant-black/20 border border-valorant-white/20 rounded">
                /
              </kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="sticky top-20 z-40 bg-valorant-white border-b-2 border-valorant-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Filter Tabs */}
            <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterType)} aria-label="Filter crosshairs">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-valorant-gray-50 h-auto">
                {filterTabs.map((tab) => {
                  const Icon = tab.icon
                  const shortLabel = tab.value === 'all' ? 'All' :
                                    tab.value === 'professional' ? 'Pro' :
                                    tab.value === 'community' ? 'Community' : 'Trending'

                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="data-[state=active]:bg-valorant-red data-[state=active]:text-white relative py-2 sm:py-2.5 px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      <Icon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">{dictionary.crosshairs.filter[tab.value]}</span>
                      <span className="sm:hidden">{shortLabel}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>

            {/* Sort Select */}
            <div className="flex items-center gap-2 sm:gap-3 justify-between sm:justify-start">
              <span className="text-xs sm:text-sm font-bold text-valorant-gray-600 uppercase">{dictionary.crosshairs.sortBy}</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortType)}>
                <SelectTrigger ref={sortSelectRef} className="w-[140px] sm:w-[180px] border-2 border-valorant-gray-200 focus:border-valorant-red text-xs sm:text-sm" aria-label="Sort crosshairs by">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{dictionary.crosshairs.sort.popular}</SelectItem>
                  <SelectItem value="copies">{dictionary.crosshairs.sort.copies}</SelectItem>
                  <SelectItem value="likes">{dictionary.crosshairs.sort.likes}</SelectItem>
                  <SelectItem value="newest">{dictionary.crosshairs.sort.newest}</SelectItem>
                  <SelectItem value="verified">{dictionary.crosshairs.sort.verified}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div ref={resultsRef} className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <p className="text-sm sm:text-base text-valorant-gray-600">
            <span className="font-black text-valorant-black">{filteredAndSortedCrosshairs.length}</span> {dictionary.crosshairs.results}
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery('')}
              className="border-valorant-gray-300 hover:border-valorant-red min-h-[44px] text-sm"
            >
              {dictionary.crosshairs.clearFilters}
            </Button>
          )}
        </div>
      </div>

      {/* Crosshair Grid */}
      <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        {filteredAndSortedCrosshairs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" role="list" aria-label="Crosshair list">
            {filteredAndSortedCrosshairs.map((crosshair) => (
              <CrosshairCard
                key={crosshair.id}
                id={crosshair.id}
                name={crosshair.name}
                playerName={crosshair.playerName}
                teamName={crosshair.teamName}
                code={crosshair.code}
                params={crosshair.params}
                copies={crosshair.copies}
                likes={crosshair.likes}
                isVerified={crosshair.isVerified}
                locale={locale}
                dictionary={dictionary}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-20 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-valorant-gray-100 rounded-full mb-4 sm:mb-6">
              <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-valorant-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-2 text-valorant-gray-700">
              {dictionary.crosshairs.noResults}
            </h3>
            <p className="text-sm sm:text-base text-valorant-gray-500 mb-4 sm:mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setActiveFilter('all')
              }}
              variant="outline"
              className="border-valorant-black hover:bg-valorant-black hover:text-white min-h-[44px] text-sm"
            >
              {dictionary.crosshairs.clearFilters}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
