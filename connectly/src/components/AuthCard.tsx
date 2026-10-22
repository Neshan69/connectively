import type { ReactNode } from 'react'
import GlassPanel from './GlassPanel'

type AuthCardProps = {
  /** Material Symbols ligature shown in the gradient badge. */
  icon: string
  title: string
  subtitle: string
  /** Short, honest note about what is not connected yet. */
  notice: string
  /** The form itself. */
  children: ReactNode
  /** Link row below the form. */
  footer: ReactNode
}

/**
 * Shared frame for the sign in / sign up screens.
 */
export default function AuthCard({
  icon,
  title,
  subtitle,
  notice,
  children,
  footer,
}: AuthCardProps) {
  return (
    <GlassPanel width="max-w-md" spacing="space-y-6">
      <div className="text-center space-y-3">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-b from-[#0071E3] to-[#5AC8FA] flex items-center justify-center text-white shadow-md shadow-black/10">
          <span className="material-symbols-outlined text-[28px]">{icon}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white heading-tight mt-0 mb-0">
          {title}
        </h1>
        <p className="text-[13px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-sm mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-[#0071E3]/[0.06] dark:bg-[#2997FF]/10 border border-[#0071E3]/15 dark:border-[#2997FF]/20">
        <span className="material-symbols-outlined text-[15px] text-[#0071E3] dark:text-[#2997FF] shrink-0 mt-px">
          info
        </span>
        <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">{notice}</p>
      </div>

      {children}

      <div className="text-center text-[12px] text-[#6E6E73] dark:text-[#A1A1A6] pt-1 space-y-3">
        {footer}
      </div>
    </GlassPanel>
  )
}
