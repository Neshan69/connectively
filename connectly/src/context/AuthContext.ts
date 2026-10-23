import { createContext, useContext } from 'react'

/**
 * A deliberately honest authentication abstraction.
 *
 * There is no backend in this milestone, so the studio is always treated as
 * unauthenticated. The shape below is the contract a real provider will have to
 * satisfy later; nothing here invents a logged-in user or persists credentials.
 */
export type AuthUser = {
  id: string
  name: string
  email: string
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export type AuthValue = {
  status: AuthStatus
  user: AuthUser | null
  /** Convenience flag derived from status. */
  isAuthenticated: boolean
  /** Stub: a real implementation will call the auth API. */
  signIn: (email: string, password: string) => Promise<void>
  /** Stub: a real implementation will call the auth API. */
  signUp: (name: string, email: string, password: string) => Promise<void>
  /** Stub: a real implementation will call the auth API. */
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthValue | null>(null)

export function useAuth(): AuthValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return context
}
