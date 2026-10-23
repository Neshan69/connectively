import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '../types/studio'

const STORAGE_KEY = 'connectly-theme'

/**
 * The original Stitch document always opened in dark mode, so dark stays the
 * default when nothing has been saved yet.
 */
function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'dark' || saved === 'light') return saved

  // Respect the system preference when nothing has been saved yet.
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }

  return 'dark'
}

/**
 * Keeps the `dark` class on <html> in sync with React state, because the
 * Tailwind CDN is configured with `darkMode: 'class'`.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
