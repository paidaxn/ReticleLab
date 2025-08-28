import { CrosshairParams } from '@/types/crosshair'

/**
 * Parses a VALORANT crosshair code and extracts all parameters
 * Handles both old and new format crosshair codes
 */
export function parseCrosshairCode(code: string): CrosshairParams {
  const parts = code.split(';')
  const params: Record<string, string> = {}
  
  // Parse all key-value pairs
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim()
    if (part === '') continue
    
    // Handle first part which might be version
    if (i === 0 && part === '0') continue
    
    // Handle key-value pairs
    if (part.includes(';')) {
      const subParts = part.split(';')
      for (const subPart of subParts) {
        if (subPart.trim() === '') continue
        params[subPart.trim()] = ''
      }
    } else {
      // Look for next part as value
      if (i + 1 < parts.length && !parts[i + 1].match(/^[a-zA-Z]/)) {
        params[part] = parts[i + 1]
        i++ // Skip next part as it's the value
      } else {
        params[part] = ''
      }
    }
  }
  
  // Color mapping
  const colorMap: Record<string, string> = {
    '0': '#FFFFFF', // White
    '1': '#00FF00', // Green  
    '2': '#00FFFF', // Cyan
    '3': '#0000FF', // Blue
    '4': '#FFFF00', // Yellow
    '5': '#FF00FF', // Magenta
    '6': '#FF0000', // Red
    '7': '#FFFFFF', // White
    '8': '#000000', // Black
  }
  
  // Extract color from 'c' parameter or 'u' parameter for custom color
  let color = '#00FF00' // Default green
  if (params.c && colorMap[params.c]) {
    color = colorMap[params.c]
  }
  if (params.u) {
    // Custom color in RRGGBBAA format
    let colorHex = params.u
    
    // Remove FF suffix if present (alpha channel)
    if (colorHex.endsWith('FF')) {
      colorHex = colorHex.slice(0, -2)
    }
    
    // Ensure we have 6 characters for RGB
    if (colorHex.length >= 6) {
      color = '#' + colorHex.substring(0, 6)
    }
  }
  
  return {
    // Basic settings
    color,
    outlineColor: '#000000',
    outlineThickness: parseInt(params.o) || 0,
    outlineOpacity: 100,
    centerDot: params.h !== '0' && params.d !== '0',
    centerDotSize: parseInt(params.z) || 2,
    centerDotOpacity: parseFloat(params.a) ? parseFloat(params.a) * 100 : 100,
    
    // Inner line settings  
    innerLineThickness: parseInt(params['0t']) || parseInt(params.t) || 2,
    innerLineLength: parseInt(params['0l']) || parseInt(params.l) || 4,
    innerLineOffset: parseInt(params['0o']) || parseInt(params.m) || 0,
    innerLineOpacity: params['0a'] ? parseFloat(params['0a']) * 100 : 100,
    innerLineMovement: params['0f'] === '1',
    innerLineMovementError: parseInt(params['0s']) || 0,
    innerLineFiringError: parseInt(params['0e']) || 0,
    
    // Outer line settings
    outerLineThickness: parseInt(params['1t']) || 0,
    outerLineLength: parseInt(params['1l']) || parseInt(params['0v']) || 0,
    outerLineOffset: parseInt(params['1o']) || parseInt(params['0g']) || 0,
    outerLineOpacity: params['1a'] ? parseFloat(params['1a']) * 100 : 100,
    outerLineMovement: params['1f'] === '1',
    outerLineMovementError: parseInt(params['1s']) || 0,
    outerLineFiringError: parseInt(params['1e']) || 0,
  }
}

/**
 * Generates a crosshair code from parameters
 */
export function generateCrosshairCode(params: CrosshairParams): string {
  const colorMap: Record<string, string> = {
    '#FFFFFF': '0',
    '#00FF00': '1', 
    '#00FFFF': '2',
    '#0000FF': '3',
    '#FFFF00': '4',
    '#FF00FF': '5',
    '#FF0000': '6',
    '#000000': '8',
  }
  
  const colorCode = colorMap[params.color.toUpperCase()] || '1'
  
  let code = `0;P;c;${colorCode}`
  
  if (params.outlineThickness > 0) {
    code += `;o;${params.outlineThickness}`
  }
  
  if (params.centerDot) {
    code += `;h;0;d;1`
    if (params.centerDotSize !== 2) {
      code += `;z;${params.centerDotSize}`
    }
  }
  
  if (params.innerLineLength > 0) {
    code += `;0l;${params.innerLineLength}`
    code += `;0o;${params.innerLineOffset}`
    if (params.innerLineThickness !== 2) {
      code += `;0t;${params.innerLineThickness}`
    }
    if (params.innerLineOpacity !== 100) {
      code += `;0a;${params.innerLineOpacity / 100}`
    }
  }
  
  if (params.outerLineLength > 0) {
    code += `;1l;${params.outerLineLength}`
    code += `;1o;${params.outerLineOffset}`
    if (params.outerLineThickness > 0) {
      code += `;1t;${params.outerLineThickness}`
    }
    if (params.outerLineOpacity !== 100) {
      code += `;1a;${params.outerLineOpacity / 100}`
    }
  }
  
  return code
}

/**
 * Validates if a crosshair code is properly formatted
 */
export function validateCrosshairCode(code: string): boolean {
  if (!code || typeof code !== 'string') return false
  
  // Should start with 0; or have basic structure
  const basicPattern = /^0;.*|.*P;.*|.*c;.*|.*l;.*/
  return basicPattern.test(code)
}