'use client'

import { useState, useMemo } from 'react'
import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { mockCrosshairs } from '@/lib/crosshair/mock-data'
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
import { Separator } from '@/components/ui/separator'

type FilterType = 'all' | 'elite' | 'community' | 'trending'
type SortType = 'popular' | 'copies' | 'newest' | 'likes' | 'verified'

export default function CrosshairsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortType>('popular')

  // Filter and sort crosshairs
  const filteredAndSortedCrosshairs = useMemo(() => {
    let filtered = [...mockCrosshairs]

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
      case 'elite':
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
  }, [searchQuery, activeFilter, sortBy])

  return (
    <div className="min-h-screen bg-valorant-white">
      {/* Header Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="valorant" className="px-6 py-3 text-sm gap-2 mb-8 shadow-lg">
              <Target className="h-5 w-5" />
              TACTICAL ARSENAL
            </Badge>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
              CROSSHAIR CONFIGURATIONS
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Professional-grade crosshair configurations from championship-winning players,
              community favorites, and tactical innovations. Copy with precision.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Filter and Search Section */}
        <div className="mb-12 space-y-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="search"
              placeholder="Search by player, team, or crosshair name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 rounded-xl border-2 border-gray-300 bg-white px-14 text-base font-medium outline-none transition-all duration-300 focus:ring-4 focus:ring-valorant-red/10 focus:border-valorant-red placeholder:text-gray-500 hover:border-gray-400 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-500 text-sm font-medium">Clear</span>
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterType)} className="w-auto">
              <TabsList className="grid grid-cols-4 w-auto bg-white ">
                <TabsTrigger value="all" className="data-[state=active]:bg-valorant-red data-[state=active]:text-white gap-2">
                  <Crosshair className="h-4 w-4" />
                  ALL
                  <Badge variant="secondary" className="ml-1 px-2 py-0.5">
                    {mockCrosshairs.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="elite" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white gap-2">
                  <Shield className="h-4 w-4" />
                  ELITE
                </TabsTrigger>
                <TabsTrigger value="community" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white gap-2">
                  <Users className="h-4 w-4" />
                  COMMUNITY
                </TabsTrigger>
                <TabsTrigger value="trending" className="data-[state=active]:bg-green-500 data-[state=active]:text-white gap-2">
                  <TrendingUp className="h-4 w-4" />
                  TRENDING
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-600 text-sm uppercase tracking-wide">Sort by:</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortType)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="copies">Most Copied</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="verified">Verified First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Results Counter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-lg px-4 py-2">
                <span className="font-bold">{filteredAndSortedCrosshairs.length}</span>
              </Badge>
              <div className="font-semibold text-gray-700">
                {searchQuery && <span>results for &quot;{searchQuery}&quot;</span>}
                {!searchQuery && <span>configurations available</span>}
              </div>
            </div>
            <Badge variant="verified" className="gap-2">
              <Sparkles className="h-4 w-4" />
              UPDATED LIVE
            </Badge>
          </div>
        </div>

        {/* Crosshair Grid */}
        {filteredAndSortedCrosshairs.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No crosshairs found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setActiveFilter('all')
              }}
              variant="valorant"
              size="lg"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
