import { CrosshairParams } from '@/types/crosshair'

/**
 * Parses a VALORANT crosshair code and extracts all parameters
 * Based on the actual Valorant crosshair code format
 * 
 * Format explanation:
 * - The code is semicolon-separated
 * - Each parameter is a key followed by its value
 * - Special sections: P (Primary), A (ADS), S (Sniper)
 */
export function parseCrosshairCode(code: string): CrosshairParams {
  if (!code || typeof code !== 'string') {
    return getDefaultParams()
  }

  const segments = code.split(';').filter(s => s.trim() !== '')
  const params: Record<string, string> = {}
  
  // Parse the code into key-value pairs
  let i = 0
  while (i < segments.length) {
    const segment = segments[i].trim()
    
    // Skip version marker or section markers
    if (segment === '0' || segment === 'P' || segment === 'A' || segment === 'S') {
      i++
      continue
    }
    
    // Key-value pair
    if (i + 1 < segments.length) {
      const key = segment
      const value = segments[i + 1]
      
      // Check if next segment is actually a value (not another key)
      if (!/^[a-zA-Z]/.test(value) || value.length > 10) {
        params[key] = value
        i += 2
      } else {
        params[key] = '1' // Default value for flags
        i++
      }
    } else {
      params[segment] = '1' // Default value for flags at the end
      i++
    }
  }
  
  // Color mapping - based on Valorant's actual color codes
  const colorMap: Record<string, string> = {
    '0': '#FFFFFF', // White
    '1': '#00FF00', // Green  
    '2': '#7FFF00', // Yellow Green
    '3': '#00FFFF', // Cyan
    '4': '#FFFF00', // Yellow
    '5': '#00FFFF', // Cyan (duplicate)
    '6': '#FF69B4', // Pink
    '7': '#FF0000', // Red
    '8': '#FFFFFF', // White (custom)
  }
  
  // Extract color
  let color = '#00FFFF' // Default cyan (most popular)
  if (params.c && colorMap[params.c]) {
    color = colorMap[params.c]
  }
  
  // Handle custom color (u parameter)
  if (params.u) {
    const customColor = params.u.toUpperCase()
    // Remove alpha channel (last 2 characters) if present
    const colorHex = customColor.length >= 8 ? customColor.substring(0, 6) : customColor
    if (colorHex.length >= 6) {
      color = '#' + colorHex
    }
  }
  
  // Parse outline settings
  const hasOutlines = params.o === '1' || params.h === '0'
  const outlineOpacity = params.o === '1' ? 100 : (params.o === '0' ? 0 : 50)
  
  // Parse center dot settings
  const hasCenterDot = params.d === '1'
  const centerDotSize = parseInt(params.z) || 1
  
  // Parse inner lines (0-prefixed parameters)
  const innerThickness = parseInt(params['0t']) || 2
  const innerLength = parseInt(params['0l']) || 4
  const innerOffset = parseInt(params['0o']) || 0
  const innerOpacity = params['0a'] ? Math.round(parseFloat(params['0a']) * 100) : 100
  const innerVerticalOffset = parseInt(params['0v']) || 0
  const innerGap = parseInt(params['0g']) || 0
  
  // Parse outer lines (1-prefixed parameters)
  const outerThickness = parseInt(params['1t']) || 0
  const outerLength = parseInt(params['1l']) || 0
  const outerOffset = parseInt(params['1o']) || 0
  const outerOpacity = params['1a'] ? Math.round(parseFloat(params['1a']) * 100) : 100
  const outerVerticalOffset = parseInt(params['1v']) || 0
  const outerGap = parseInt(params['1g']) || 0
  
  // Parse movement and firing error
  const showMovementError = params['0f'] === '1' || params['1f'] === '1'
  // const showFiringError = params['0b'] === '1' || params['1b'] === '1' // Reserved for future use
  
  return {
    // Basic settings
    color,
    outlineColor: '#000000',
    outlineThickness: hasOutlines ? 1 : 0,
    outlineOpacity,
    centerDot: hasCenterDot,
    centerDotSize,
    centerDotOpacity: 100,
    
    // Inner line settings
    innerLineThickness: innerThickness,
    innerLineLength: innerLength,
    innerLineOffset: innerOffset,
    innerLineOpacity: innerOpacity,
    innerLineMovement: showMovementError,
    innerLineMovementError: innerVerticalOffset,
    innerLineFiringError: innerGap,
    
    // Outer line settings
    outerLineThickness: outerThickness,
    outerLineLength: outerLength || innerVerticalOffset, // Sometimes 0v is used for outer length
    outerLineOffset: outerOffset || innerGap, // Sometimes 0g is used for outer offset
    outerLineOpacity: outerOpacity,
    outerLineMovement: showMovementError,
    outerLineMovementError: outerVerticalOffset,
    outerLineFiringError: outerGap,
  }
}

/**
 * Returns default crosshair parameters
 */
function getDefaultParams(): CrosshairParams {
  return {
    color: '#00FFFF',
    outlineColor: '#000000',
    outlineThickness: 1,
    outlineOpacity: 100,
    centerDot: false,
    centerDotSize: 2,
    centerDotOpacity: 100,
    innerLineThickness: 2,
    innerLineLength: 4,
    innerLineOffset: 2,
    innerLineOpacity: 100,
    innerLineMovement: false,
    innerLineMovementError: 0,
    innerLineFiringError: 0,
    outerLineThickness: 0,
    outerLineLength: 0,
    outerLineOffset: 0,
    outerLineOpacity: 100,
    outerLineMovement: false,
    outerLineMovementError: 0,
    outerLineFiringError: 0,
  }
}

/**
 * Validates if a crosshair code is properly formatted
 */
export function validateCrosshairCode(code: string): boolean {
  if (!code || typeof code !== 'string') return false
  
  // Should contain semicolons and have basic structure
  const hasBasicStructure = code.includes(';')
  
  return hasBasicStructure && code.length > 5
}

/**
 * Generates a crosshair code from parameters (simplified version)
 */
export function generateCrosshairCode(params: CrosshairParams): string {
  const colorMap: Record<string, string> = {
    '#FFFFFF': '0',
    '#00FF00': '1',
    '#00FFFF': '5',
    '#FFFF00': '4',
    '#FF0000': '7',
  }
  
  let code = '0;P'
  
  // Add color
  const colorCode = colorMap[params.color.toUpperCase()]
  if (colorCode) {
    code += `;c;${colorCode}`
  } else {
    // Custom color
    const hex = params.color.replace('#', '')
    code += `;u;${hex}FF`
  }
  
  // Add outline
  if (params.outlineThickness > 0) {
    code += `;o;1`
  }
  
  // Add center dot
  if (params.centerDot) {
    code += `;d;1`
    if (params.centerDotSize !== 1) {
      code += `;z;${params.centerDotSize}`
    }
  }
  
  // Add inner lines
  if (params.innerLineLength > 0) {
    code += `;0l;${params.innerLineLength}`
    code += `;0o;${params.innerLineOffset}`
    if (params.innerLineThickness !== 2) {
      code += `;0t;${params.innerLineThickness}`
    }
    if (params.innerLineOpacity !== 100) {
      code += `;0a;${(params.innerLineOpacity / 100).toFixed(1)}`
    }
  }
  
  // Add outer lines
  if (params.outerLineLength > 0) {
    code += `;1l;${params.outerLineLength}`
    code += `;1o;${params.outerLineOffset}`
    if (params.outerLineThickness > 0) {
      code += `;1t;${params.outerLineThickness}`
    }
    if (params.outerLineOpacity !== 100) {
      code += `;1a;${(params.outerLineOpacity / 100).toFixed(1)}`
    }
  }
  
  // Add error settings
  if (params.innerLineMovement) {
    code += `;0f;1`
  }
  if (params.innerLineFiringError > 0) {
    code += `;0b;1`
  }
  
  return code
}