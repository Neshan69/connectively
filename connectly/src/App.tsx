import { useState } from 'react'
import './App.css'
import ActionToast from './components/ActionToast'
import AmbientOrbs from './components/AmbientOrbs'
import BrandIsland from './components/BrandIsland'
import IslandNav from './components/IslandNav'
import StudioHub from './components/StudioHub'
import { useTheme } from './hooks/useTheme'
import { STUDIO_ACTIONS, type StudioModuleId } from './types/studio'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [activeModule, setActiveModule] = useState<StudioModuleId | null>(null)
  const [notice, setNotice] = useState<StudioModuleId | null>(null)

  /** Island buttons and feature cards both open a module through this handler. */
  const handleSelect = (module: StudioModuleId) => {
    setActiveModule(module)
    setNotice(module)
  }

  const handleDismiss = () => {
    setNotice(null)
    setActiveModule(null)
  }

  return (
    <>
      <AmbientOrbs />
      <BrandIsland />
      <IslandNav
        theme={theme}
        onToggleTheme={toggleTheme}
        activeModule={activeModule}
        onSelect={handleSelect}
      />
      <StudioHub onSelect={handleSelect} />
      {notice && <ActionToast action={STUDIO_ACTIONS[notice]} onDismiss={handleDismiss} />}
    </>
  )
}

export default App
