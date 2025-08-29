import { mockCrosshairs } from '../lib/crosshair/mock-data'
import { parseCrosshairCode } from '../lib/crosshair/parser'
import * as fs from 'fs'
import * as path from 'path'

// Convert the mock data to JSON format
const crosshairsData = mockCrosshairs.map(crosshair => ({
  ...crosshair,
  // Ensure params are properly parsed
  params: typeof crosshair.params === 'object' 
    ? crosshair.params 
    : parseCrosshairCode(crosshair.code)
}))

// Create public/data directory if it doesn't exist
const dataDir = path.join(process.cwd(), 'public', 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Write to JSON file
const jsonPath = path.join(dataDir, 'crosshairs.json')
fs.writeFileSync(jsonPath, JSON.stringify(crosshairsData, null, 2))

console.log(`✅ Successfully converted ${crosshairsData.length} crosshairs to JSON`)
console.log(`📁 File saved to: ${jsonPath}`)