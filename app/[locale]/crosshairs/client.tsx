'use client'

import { useState, useMemo } from 'react'
import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { Search, TrendingUp, Users, Shield, Target, Crosshair, Sparkles } from 'lucide-react'
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

type FilterType = 'all' | 'professional' | 'community' | 'trending'
type SortType = 'popular' | 'copies' | 'newest' | 'likes' | 'verified'

interface CrosshairsClientProps {
  crosshairs: any[]
  locale: Locale
  dictionary: any
}

export function CrosshairsClient({ crosshairs, locale, dictionary }: CrosshairsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortType>('popular')

  // Filter and sort crosshairs
  const filteredAndSortedCrosshairs = useMemo(() => {
    let filtered = [...crosshairs]

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
  }, [searchQuery, activeFilter, sortBy, crosshairs])

  return (
    <div className="min-h-screen bg-valorant-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-valorant-black to-valorant-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <Badge variant="valorant" className="mb-4 px-3 py-1.5 text-xs">
              <Crosshair className="h-3 w-3" />
              VALORANT ARSENAL
            </Badge>
            <h1 className="text-5xl font-black mb-6 tracking-tight">
              {dictionary.crosshairs.title}
            </h1>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-valorant-gray-400" />
              <input
                type="text"
                placeholder={dictionary.crosshairs.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-valorant-white/10 backdrop-blur border-2 border-valorant-white/20 rounded-xl text-white placeholder:text-valorant-gray-400 focus:outline-none focus:border-valorant-red transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="sticky top-20 z-40 bg-valorant-white border-b-2 border-valorant-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Filter Tabs */}
            <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterType)}>
              <TabsList className="grid w-full grid-cols-4 bg-valorant-gray-50">
                <TabsTrigger value="all" className="data-[state=active]:bg-valorant-red data-[state=active]:text-white">
                  <Target className="h-4 w-4 mr-2" />
                  {dictionary.crosshairs.filter.all}
                </TabsTrigger>
                <TabsTrigger value="professional" className="data-[state=active]:bg-valorant-red data-[state=active]:text-white">
                  <Shield className="h-4 w-4 mr-2" />
                  {dictionary.crosshairs.filter.professional}
                </TabsTrigger>
                <TabsTrigger value="community" className="data-[state=active]:bg-valorant-red data-[state=active]:text-white">
                  <Users className="h-4 w-4 mr-2" />
                  {dictionary.crosshairs.filter.community}
                </TabsTrigger>
                <TabsTrigger value="trending" className="data-[state=active]:bg-valorant-red data-[state=active]:text-white">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {dictionary.crosshairs.filter.trending}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Sort Select */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-valorant-gray-600 uppercase">{dictionary.crosshairs.sortBy}</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortType)}>
                <SelectTrigger className="w-[180px] border-2 border-valorant-gray-200 focus:border-valorant-red">
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
      <div className="container mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-valorant-gray-600">
            <span className="font-black text-valorant-black">{filteredAndSortedCrosshairs.length}</span> {dictionary.crosshairs.results}
          </p>
          {searchQuery && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSearchQuery('')}
              className="border-valorant-gray-300 hover:border-valorant-red"
            >
              {dictionary.crosshairs.clearFilters}
            </Button>
          )}
        </div>
      </div>

      {/* Crosshair Grid */}
      <div className="container mx-auto px-6 pb-20">
        {filteredAndSortedCrosshairs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-valorant-gray-100 rounded-full mb-6">
              <Sparkles className="h-10 w-10 text-valorant-gray-400" />
            </div>
            <h3 className="text-2xl font-black mb-2 text-valorant-gray-700">
              {dictionary.crosshairs.noResults}
            </h3>
            <p className="text-valorant-gray-500 mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setActiveFilter('all')
              }}
              variant="outline"
              className="border-valorant-black hover:bg-valorant-black hover:text-white"
            >
              {dictionary.crosshairs.clearFilters}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}