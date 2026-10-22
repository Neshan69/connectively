import type { ReactNode } from 'react'

type GlassPanelProps = {
  children: ReactNode
  /** Maximum width of the card, e.g. "max-w-3xl". */
  width?: string
  /** Vertical rhythm between the direct children of the card. */
  spacing?: string
  className?: string
}

/**
 * The frosted glass card that frames every screen of the studio.
 *
 * The markup was extracted from the Stitch hub so the new pages can reuse the
 * exact same surface instead of inventing a second container style.
 */
export default function GlassPanel({
  children,
  width = 'max-w-3xl',
  spacing = 'space-y-8',
  className = '',
}: GlassPanelProps) {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-8 py-12 relative z-10">
      <div
        className={`${width} w-full glass-card border border-white/70 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl ${spacing} relative overflow-hidden transition-all duration-300 ${className}`}
      >
        {children}
      </div>
    </main>
  )
}
