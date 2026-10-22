import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { STUDIO_ROUTES, type StudioModuleId } from '../types/studio'
import { StudioUiContext } from './StudioUiContext'

/**
 * Holds the shell state that the island navigation, the hub cards and the
 * notice toast all share.
 */
export function StudioUiProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [activeModule, setActiveModule] = useState<StudioModuleId | null>(null)
  const [notice, setNotice] = useState<StudioModuleId | null>(null)

  const select = useCallback(
    (module: StudioModuleId) => {
      const route = STUDIO_ROUTES[module]

      if (route) {
        setNotice(null)
        setActiveModule(null)
        navigate(route)
        return
      }

      setActiveModule(module)
      setNotice(module)
    },
    [navigate],
  )

  const dismiss = useCallback(() => {
    setNotice(null)
    setActiveModule(null)
  }, [])

  const value = useMemo(
    () => ({ activeModule, notice, select, dismiss }),
    [activeModule, notice, select, dismiss],
  )

  return <StudioUiContext.Provider value={value}>{children}</StudioUiContext.Provider>
}
