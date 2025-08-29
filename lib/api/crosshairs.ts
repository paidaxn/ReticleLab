export interface CrosshairApiResponse {
  success: boolean
  error?: string
}

export interface CopyResponse extends CrosshairApiResponse {
  copies: number
}

export interface FavoriteResponse extends CrosshairApiResponse {
  likes: number
  favorited: boolean
}

export interface StatsResponse extends CrosshairApiResponse {
  likes: number
  copies: number
  favorited: boolean
}

// Track copy action
export async function trackCopy(crosshairId: string, userId?: string): Promise<CopyResponse> {
  try {
    const response = await fetch(`/api/crosshairs/${crosshairId}/copy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error tracking copy:', error)
    return { success: false, copies: 0 }
  }
}

// Toggle favorite/like
export async function toggleFavorite(
  crosshairId: string, 
  action: 'like' | 'unlike',
  userId?: string
): Promise<FavoriteResponse> {
  try {
    const response = await fetch(`/api/crosshairs/${crosshairId}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, action }),
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error toggling favorite:', error)
    return { success: false, likes: 0, favorited: false }
  }
}

// Get crosshair stats
export async function getCrosshairStats(
  crosshairId: string,
  userId?: string
): Promise<StatsResponse> {
  try {
    const url = new URL(`/api/crosshairs/${crosshairId}/favorite`, window.location.origin)
    if (userId) {
      url.searchParams.append('userId', userId)
    }
    
    const response = await fetch(url.toString())
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error getting stats:', error)
    return { success: false, likes: 0, copies: 0, favorited: false }
  }
}

// Get all crosshairs
export async function getCrosshairs(params?: {
  category?: string
  page?: number
  limit?: number
  sortBy?: string
}) {
  try {
    const url = new URL('/api/crosshairs', window.location.origin)
    
    if (params?.category) url.searchParams.append('category', params.category)
    if (params?.page) url.searchParams.append('page', params.page.toString())
    if (params?.limit) url.searchParams.append('limit', params.limit.toString())
    if (params?.sortBy) url.searchParams.append('sortBy', params.sortBy)
    
    const response = await fetch(url.toString())
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching crosshairs:', error)
    return { success: false, crosshairs: [], pagination: {} }
  }
}

// Get single crosshair
export async function getCrosshair(id: string) {
  try {
    const response = await fetch(`/api/crosshairs/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching crosshair:', error)
    return { success: false, crosshair: null }
  }
}