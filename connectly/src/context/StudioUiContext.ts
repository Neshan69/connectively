import { createContext, useContext } from 'react'
import type { StudioModuleId } from '../types/studio'

export type StudioUiValue = {
  /** Studio tool the user picked that does not have a screen yet. */
  activeModule: StudioModuleId | null
  /** Module whose "not built yet" note is currently on screen. */
  notice: StudioModuleId | null
  /** Opens a module: navigates when a route exists, otherwise shows the notice. */
  select: (module: StudioModuleId) => void
  /** Closes the notice and clears the active tool. */
  dismiss: () => void
}

export const StudioUiContext = createContext<StudioUiValue | null>(null)

/** Reads the shared studio UI state. Must be used inside <StudioUiProvider>. */
export function useStudioUi() {
  const context = useContext(StudioUiContext)

  if (!context) {
    throw new Error('useStudioUi must be used inside <StudioUiProvider>')
  }

  return context
}
