import type { ReactNode } from 'react'

type IslandButtonProps = {
  /** Tooltip text and accessible name of the button. */
  label: string
  /** Material Symbols ligature, e.g. "group". */
  icon?: string
  /** Renders the button in the blue "current tool" state. */
  active?: boolean
  onClick?: () => void
  /** Custom content, used by the profile avatar button. */
  children?: ReactNode
  /**
   * Padding utility of the button. It is a prop instead of a plain class so
   * that only one padding rule is ever emitted - two competing utilities
   * would be resolved by the stylesheet order, not by the intent.
   */
  padding?: string
  className?: string
}

const BASE =
  'hover:bg-neutral-900/5 dark:hover:bg-white/10 rounded-full transition-transform active:scale-95 relative group flex items-center justify-center'

const ACTIVE = 'text-[#0071E3] dark:text-[#2997FF] bg-[#0071E3]/10 dark:bg-[#2997FF]/15'

const IDLE = 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'

const TOOLTIP =
  'absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-neutral-900/90 dark:bg-black/90 text-white text-[11px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-white/10'

/**
 * One button of the vertical "Dynamic Island" navigation.
 * Every island button in the design shares the same hover tooltip treatment.
 */
export default function IslandButton({
  label,
  icon,
  active = false,
  onClick,
  children,
  padding = 'p-2.5',
  className = '',
}: IslandButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`${BASE} ${padding} ${active ? ACTIVE : IDLE} ${className}`}
    >
      {icon ? <span className="material-symbols-outlined text-[19px]">{icon}</span> : children}
      <span className={TOOLTIP}>{label}</span>
    </button>
  )
}
