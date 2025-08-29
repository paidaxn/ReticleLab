/**
 * Client-side storage for crosshair statistics
 * This will persist data in localStorage for now
 * Can be replaced with API calls when backend is ready
 */

const STORAGE_KEY = 'crosshair_stats'
const FAVORITES_KEY = 'user_favorites'

interface CrosshairStats {
  [crosshairId: string]: {
    copies: number
    likes: number
    lastUpdated: string
  }
}

interface UserFavorites {
  [crosshairId: string]: boolean
}

// Get all stats from localStorage
export function getAllStats(): CrosshairStats {
  if (typeof window === 'undefined') return {}
  
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : {}
}

// Get stats for a specific crosshair
export function getStats(crosshairId: string) {
  const allStats = getAllStats()
  return allStats[crosshairId] || null
}

// Update stats for a crosshair
export function updateStats(crosshairId: string, updates: { copies?: number; likes?: number }) {
  const allStats = getAllStats()
  const current = allStats[crosshairId] || { copies: 0, likes: 0 }
  
  allStats[crosshairId] = {
    copies: updates.copies ?? current.copies,
    likes: updates.likes ?? current.likes,
    lastUpdated: new Date().toISOString()
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allStats))
  return allStats[crosshairId]
}

// Increment copy count
export function incrementCopies(crosshairId: string, initialCount: number = 0) {
  const current = getStats(crosshairId)
  const currentCopies = current?.copies ?? initialCount
  return updateStats(crosshairId, { copies: currentCopies + 1 })
}

// Get user favorites
export function getUserFavorites(): UserFavorites {
  if (typeof window === 'undefined') return {}
  
  const stored = localStorage.getItem(FAVORITES_KEY)
  return stored ? JSON.parse(stored) : {}
}

// Check if a crosshair is favorited
export function isFavorited(crosshairId: string): boolean {
  const favorites = getUserFavorites()
  return favorites[crosshairId] || false
}

// Toggle favorite status
export function toggleFavorite(crosshairId: string, initialLikes: number = 0): { favorited: boolean; likes: number } {
  const favorites = getUserFavorites()
  const stats = getStats(crosshairId) || { copies: 0, likes: initialLikes }
  
  const newFavorited = !favorites[crosshairId]
  favorites[crosshairId] = newFavorited
  
  // Update likes count
  const newLikes = newFavorited ? stats.likes + 1 : Math.max(0, stats.likes - 1)
  updateStats(crosshairId, { likes: newLikes })
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  
  return { favorited: newFavorited, likes: newLikes }
}

// Initialize stats from initial data (e.g., from props)
export function initializeStats(crosshairId: string, copies: number, likes: number) {
  const existing = getStats(crosshairId)
  if (!existing) {
    updateStats(crosshairId, { copies, likes })
  }
  return existing || { copies, likes }
}