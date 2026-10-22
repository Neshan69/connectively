import { useLocation } from 'react-router-dom'
import IslandButton from './IslandButton'
import { useStudioUi } from '../context/StudioUiContext'
import type { Theme } from '../types/studio'

type IslandNavProps = {
  theme: Theme
  onToggleTheme: () => void
}

/**
 * The vertical "Dynamic Island" navigation on the right edge.
 * It is the single entry point for every screen of the studio.
 */
export default function IslandNav({ theme, onToggleTheme }: IslandNavProps) {
  const { activeModule, select } = useStudioUi()
  const location = useLocation()

  const isDark = theme === 'dark'
  const themeLabel = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'

  /** A button is lit when it is the selected tool or the screen you are on. */
  const isActive = (module: string, path: string) =>
    activeModule === module || location.pathname === path

  return (
    <aside aria-label="Vertical Dynamic Island Navigation" className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-white/75 dark:bg-[#16181F]/80 backdrop-blur-2xl border border-white/90 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.4)] rounded-full p-2.5 flex flex-col items-center gap-3 transform transition-all duration-300 ease-out origin-right hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
        {/* 1. Green blinking light indicator: You are online */}
        <div className="relative flex items-center justify-center py-1 group cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34C759] ring-2 ring-emerald-500/20" />
          </span>
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-neutral-900/90 dark:bg-black/90 text-white text-[11px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-white/10">
            You are online
          </div>
        </div>

        {/* 2. Profile section button / avatar trigger */}
        <IslandButton
          label="My Profile"
          onClick={() => select('profile')}
          padding="p-2"
          active={isActive('profile', '/profile')}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0071E3] to-[#5AC8FA] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[17px]">account_circle</span>
          </div>
        </IslandButton>

        {/* 3. Dark Mode / Light Mode toggle switch */}
        <IslandButton
          label={themeLabel}
          onClick={onToggleTheme}
          className={
            isDark
              ? 'focus:outline-none text-neutral-600 dark:text-amber-400 hover:text-neutral-900 dark:hover:text-amber-300'
              : 'focus:outline-none'
          }
        >
          <span className="material-symbols-outlined text-[19px] transition-transform duration-300">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </IslandButton>

        {/* Friends section: click to open friends list & connections */}
        <IslandButton
          label="Friends & Creative Connections"
          icon="group"
          onClick={() => select('friends')}
        />

        {/* Divider Line */}
        <div className="w-4 h-[1px] bg-neutral-200/80 dark:bg-neutral-700/60" />

        {/* 5. Remaining island tools intact */}
        {/* Canvas Tool Item (Active) - the camera is the current studio tool */}
        <IslandButton
          label="Camera"
          icon="photo_camera"
          active
          onClick={() => select('camera')}
        />

        {/* Inspector Tool Item */}
        <IslandButton
          label="Inspector"
          icon="tune"
          active={isActive('inspector', '/inspector')}
          onClick={() => select('inspector')}
        />

        {/* Code Tool Item */}
        <IslandButton
          label="Code"
          icon="code"
          active={isActive('code', '/code')}
          onClick={() => select('code')}
        />

        {/* Command Palette (Cmd+K) Item */}
        <IslandButton
          label="Command (Cmd+K)"
          icon="keyboard_command_key"
          active={isActive('command-palette', '/command-palette')}
          onClick={() => select('command-palette')}
        />

        {/* Settings Filter / Preferences Item */}
        <IslandButton
          label="Filters & Settings"
          icon="pageview"
          active={isActive('settings', '/settings')}
          onClick={() => select('settings')}
        />
      </div>
    </aside>
  )
}
