import { useMemo, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import type { AuthValue } from './AuthContext'

/**
 * Honest provider: no backend exists, so the studio is always unauthenticated.
 * The methods are intentionally no-ops that reject, so callers cannot mistake
 * them for working authentication.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AuthValue>(
    () => ({
      status: 'unauthenticated',
      user: null,
      isAuthenticated: false,
      signIn: async () => {
        throw new Error('Authentication is not connected yet.')
      },
      signUp: async () => {
        throw new Error('Registration is not connected yet.')
      },
      signOut: async () => {
        // Nothing to sign out of yet.
      },
    }),
    [],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}