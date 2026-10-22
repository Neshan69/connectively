import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import GlassPanel from './GlassPanel'

type PlaceholderPanelProps = {
  /** Material Symbols ligature shown in the badge. */
  icon: string
  title: string
  description: string
  /** What this screen will contain once the backend exists. */
  planned: string[]
  children?: ReactNode
}

/**
 * Frame for the screens that are not built yet. It shows what is planned
 * instead of pretending the feature works.
 */
export default function PlaceholderPanel({
  icon,
  title,
  description,
  planned,
  children,
}: PlaceholderPanelProps) {
  return (
    <GlassPanel width="max-w-xl" spacing="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors"
      >
        <span className="material-symbols-outlined text-[14px]">arrow_back</span>
        Back to studio
      </Link>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 dark:bg-[#2997FF]/15 border border-[#0071E3]/20 dark:border-[#2997FF]/30 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF] shrink-0">
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-[18px] font-semibold text-[#1D1D1F] dark:text-white mt-0 mb-0">
            {title}
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#34C759]/10 text-[#34C759] dark:bg-[#34C759]/20">
            Coming soon
          </span>
        </div>
      </div>

      <p className="text-[13px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">{description}</p>

      <ul className="space-y-2">
        {planned.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-[12px] text-[#6E6E73] dark:text-[#A1A1A6]"
          >
            <span className="material-symbols-outlined text-[15px] text-[#0071E3] dark:text-[#2997FF] shrink-0 mt-px">
              check_circle
            </span>
            {item}
          </li>
        ))}
      </ul>

      {children}
    </GlassPanel>
  )
}
