import { Crosshair, CrosshairParams } from '@/types/crosshair'
import { mockCrosshairs as rawMockCrosshairs } from './mock-data'

interface RawMockCrosshair {
  id: string
  name: string
  playerName?: string
  teamName?: string
  code: string
  params: CrosshairParams
  copies: number
  likes: number
  isVerified?: boolean
  lastUpdated?: string
}

// Helper function to add missing fields to mock data
function enhanceMockCrosshair(crosshair: RawMockCrosshair, index: number): Crosshair {
  // Use deterministic dates based on index instead of Math.random()
  const baseTime = new Date('2024-01-01').getTime()
  const dayInMs = 24 * 60 * 60 * 1000
  
  // Create dates based on index for deterministic results
  const createdDate = new Date(baseTime + (index * dayInMs * 3)) // Space out by 3 days
  const updatedDate = new Date(createdDate.getTime() + dayInMs * 2) // Updated 2 days after creation
  
  // Deterministic views calculation based on copies
  const viewMultiplier = 2 + (index % 5) // Results in 2-6x multiplier
  
  return {
    ...crosshair,
    category: crosshair.isVerified ? 'pro' : 'community' as 'pro' | 'popular' | 'community' | 'custom',
    views: crosshair.copies * viewMultiplier,
    tags: crosshair.playerName ? ['pro', 'verified', crosshair.teamName?.toLowerCase() || ''] : ['community'],
    isVerified: crosshair.isVerified ?? false,
    createdAt: createdDate,
    updatedAt: updatedDate,
  }
}

// Export enhanced mock crosshairs with index for deterministic generation
export const mockCrosshairs: Crosshair[] = rawMockCrosshairs.map((crosshair, index) => 
  enhanceMockCrosshair(crosshair, index)
)