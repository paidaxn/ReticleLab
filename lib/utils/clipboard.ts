/**
 * Utility functions for clipboard operations
 */

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    // Fallback for older browsers or when clipboard API is not available
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    } catch (fallbackError) {
      console.error('Failed to copy to clipboard:', fallbackError)
      return false
    }
  }
}

export function isClipboardSupported(): boolean {
  return !!(navigator.clipboard && navigator.clipboard.writeText)
}