import { Outlet } from 'react-router-dom'
import ActionToast from '../components/ActionToast'
import AmbientOrbs from '../components/AmbientOrbs'
import { AuthProvider } from '../context/AuthProvider'
import BrandIsland from '../components/BrandIsland'
import IslandNav from '../components/IslandNav'
import { useStudioUi } from '../context/StudioUiContext'
import { StudioUiProvider } from '../context/StudioUiProvider'
import { useTheme } from '../hooks/useTheme'
import { STUDIO_ACTIONS } from '../types/studio'

/** Shows the "not built yet" notice for the module that was selected. */
function StudioNotice() {
  const { notice, dismiss } = useStudioUi()

  if (!notice) return null

  return <ActionToast action={STUDIO_ACTIONS[notice]} onDismiss={dismiss} />
}

/**
 * The shell that surrounds every page: ambient background, the NNN brand
 * island, the floating navigation and the notice toast. The routed screen is
 * rendered through <Outlet />.
 */
export default function AppLayout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <AuthProvider>
      <StudioUiProvider>
        <AmbientOrbs />
        <BrandIsland />
        <IslandNav theme={theme} onToggleTheme={toggleTheme} />
        <Outlet />
        <StudioNotice />
      </StudioUiProvider>
    </AuthProvider>
  )
}
