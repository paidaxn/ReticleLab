'use client'

import { useState, useEffect, useRef } from 'react'
import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { getUserFavorites } from '@/lib/storage/crosshair-stats'
import { type Crosshair } from '@/types/crosshair'
import { type Locale } from '@/i18n.config'
import { type Dictionary } from '@/lib/dictionary'
import { Heart, Search, ArrowLeft, Sparkles, SortAsc, Clock, User } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FavoritesClientProps {
  crosshairs: Crosshair[]
  locale: Locale
  dictionary: Dictionary
}

type SortType = 'recent' | 'name' | 'player' | 'copies' | 'likes'

export function FavoritesClient({ crosshairs, locale, dictionary }: FavoritesClientProps) {
  const [favoritedCrosshairs, setFavoritedCrosshairs] = useState<Crosshair[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortType>('recent')
  const [isLoading, setIsLoading] = useState(true)
  const sortSelectRef = useRef<HTMLButtonElement>(null)

  // Load favorited crosshairs
  useEffect(() => {
    const favorites = getUserFavorites()
    const favoriteIds = Object.keys(favorites).filter(id => favorites[id])
    
    const favoritedList = crosshairs.filter(crosshair => 
      favoriteIds.includes(crosshair.id)
    )
    
    setFavoritedCrosshairs(favoritedList)
    setIsLoading(false)
  }, [crosshairs])

  // Filter and sort crosshairs
  const filteredCrosshairs = favoritedCrosshairs
    .filter(crosshair => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        crosshair.name.toLowerCase().includes(query) ||
        crosshair.playerName?.toLowerCase().includes(query) ||
        crosshair.teamName?.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'player':
          return (a.playerName || '').localeCompare(b.playerName || '')
        case 'copies':
          return b.copies - a.copies
        case 'likes':
          return b.likes - a.likes
        case 'recent':
        default:
          return 0 // Keep original order (most recently added)
      }
    })

  // Handle removing a favorite (called when unfavorited from card)
  // const handleUnfavorite = (crosshairId: string) => {
  //   setFavoritedCrosshairs(prev => prev.filter(c => c.id !== crosshairId))
  // }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valorant-red"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-valorant-white">
      {/* Header - Similar to crosshairs page */}
      <div className="bg-gradient-to-r from-valorant-black to-valorant-gray-900 text-white py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl">
            <Link 
              href={`/${locale}/crosshairs`}
              className="inline-flex items-center gap-2 text-valorant-gray-400 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-wide"
            >
              <ArrowLeft className="w-4 h-4" />
              {dictionary.common?.back || 'Back to Collection'}
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-valorant-red/20 backdrop-blur rounded-xl border-2 border-valorant-red/50">
                <Heart className="w-8 h-8 text-valorant-red" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                  {dictionary.favorites?.title || 'My Favorites'}
                </h1>
                <p className="text-valorant-gray-400 mt-2 text-sm sm:text-base">
                  <span className="font-black text-white">{filteredCrosshairs.length}</span> {dictionary.favorites?.subtitle?.replace('{count}', '').trim() || 'crosshairs in your collection'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 pt-8">

        {/* Filters and Sorting */}
        {favoritedCrosshairs.length > 0 && (
          <div className="sticky top-20 z-40 bg-valorant-white border-b-2 border-valorant-gray-200 shadow-sm mb-8 -mx-4 sm:-mx-6 px-4 sm:px-6 py-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-valorant-gray-400" />
                <input
                  type="text"
                  placeholder={dictionary.favorites?.search || dictionary.common?.search || 'Search favorites...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-white border-2 border-valorant-gray-200 rounded-xl placeholder:text-valorant-gray-400 focus:outline-none focus:border-valorant-red transition-colors text-sm sm:text-base"
                  aria-label="Search favorites"
                />
              </div>
            
              {/* Sort Select - Same style as crosshairs page */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-bold text-valorant-gray-600 uppercase">{dictionary.crosshairs?.sortBy || 'Sort by:'}</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortType)}>
                <SelectTrigger 
                  ref={sortSelectRef} 
                  className="w-[140px] sm:w-[180px] border-2 border-valorant-gray-200 focus:border-valorant-red text-xs sm:text-sm"
                  aria-label="Sort favorites by"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{dictionary.favorites?.sortRecent || 'Recently Added'}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="name">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-3 w-3" />
                      <span>{dictionary.favorites?.sortName || 'Name (A-Z)'}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="player">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span>{dictionary.favorites?.sortPlayer || 'Player Name'}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="copies">
                    <div className="flex items-center gap-2">
                      <span>{dictionary.crosshairs?.sort?.copies || 'Most Copied'}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="likes">
                    <div className="flex items-center gap-2">
                      <Heart className="h-3 w-3" />
                      <span>{dictionary.crosshairs?.sort?.likes || 'Most Liked'}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {favoritedCrosshairs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {dictionary.favorites?.emptyTitle || 'No Favorites Yet'}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {dictionary.favorites?.emptyDescription || 'Start building your collection by clicking the heart icon on any crosshair you like.'}
            </p>
            <Link
              href={`/${locale}/crosshairs`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-valorant-red text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              {dictionary.favorites?.browseCrosshairs || 'Browse Crosshairs'}
            </Link>
          </motion.div>
        )}

        {/* No Results */}
        {favoritedCrosshairs.length > 0 && filteredCrosshairs.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {dictionary.favorites?.noResults || 'No matches found'}
            </h2>
            <p className="text-gray-600">
              {dictionary.favorites?.tryDifferentSearch || 'Try a different search term'}
            </p>
          </div>
        )}

        {/* Crosshair Grid */}
        {filteredCrosshairs.length > 0 && (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCrosshairs.map((crosshair, index) => (
                <motion.div
                  key={crosshair.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <CrosshairCard
                    {...crosshair}
                    locale={locale}
                    dictionary={dictionary}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {/* Stats Section */}
        {favoritedCrosshairs.length > 0 && (
          <div className="mt-12 p-6 bg-gradient-to-r from-valorant-red/5 to-valorant-red/10 rounded-xl border-2 border-valorant-red/20">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-valorant-red" fill="currentColor" />
              <h3 className="text-lg font-bold text-valorant-black">
                {dictionary.favorites?.statsTitle || 'Your Collection Stats'}
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-2xl font-bold text-valorant-red">
                  {favoritedCrosshairs.length}
                </p>
                <p className="text-sm text-gray-600">
                  {dictionary.favorites?.totalFavorites || 'Total Favorites'}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {favoritedCrosshairs.filter(c => c.isVerified).length}
                </p>
                <p className="text-sm text-gray-600">
                  {dictionary.favorites?.proCrosshairs || 'Pro Crosshairs'}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {Array.from(new Set(favoritedCrosshairs.map(c => c.playerName).filter(Boolean))).length}
                </p>
                <p className="text-sm text-gray-600">
                  {dictionary.favorites?.differentPlayers || 'Different Players'}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {Array.from(new Set(favoritedCrosshairs.map(c => c.teamName).filter(Boolean))).length}
                </p>
                <p className="text-sm text-gray-600">
                  {dictionary.favorites?.differentTeams || 'Different Teams'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}