import { useEffect } from 'react'

interface ShortcutConfig {
  key: string
  ctrl?: boolean
  cmd?: boolean
  shift?: boolean
  alt?: boolean
  handler: () => void
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // Allow Escape to work even in input fields
        if (event.key !== 'Escape') {
          return
        }
      }

      shortcuts.forEach(({ key, ctrl, cmd, shift, alt, handler }) => {
        // Check modifier keys - only if specified
        const isCtrlMatch = ctrl === undefined || ctrl === event.ctrlKey
        const isCmdMatch = cmd === undefined || cmd === event.metaKey
        const isShiftMatch = shift === undefined || shift === event.shiftKey
        const isAltMatch = alt === undefined || alt === event.altKey
        
        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          isCtrlMatch &&
          isCmdMatch &&
          isShiftMatch &&
          isAltMatch
        ) {
          event.preventDefault()
          handler()
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}