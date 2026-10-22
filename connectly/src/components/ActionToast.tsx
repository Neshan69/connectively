import type { StudioAction } from '../types/studio'

type ActionToastProps = {
  action: StudioAction
  onDismiss: () => void
}

/**
 * Small acknowledgement panel for the island buttons and feature cards.
 *
 * It deliberately states what is still missing instead of pretending the
 * feature works - there is no backend, socket layer or auth yet.
 */
export default function ActionToast({ action, onDismiss }: ActionToastProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      <div
        role="status"
        aria-live="polite"
        className="stitch-toast pointer-events-auto bg-white/90 dark:bg-[#1A1C23]/90 backdrop-blur-2xl border border-black/[0.06] dark:border-white/10 rounded-2xl shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] px-4 py-3 max-w-sm w-full flex items-start gap-3"
      >
        <span className="material-symbols-outlined text-[18px] text-[#0071E3] dark:text-[#2997FF] shrink-0 mt-0.5">
          info
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
            {action.title}
          </p>
          <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] mt-0.5 leading-relaxed">
            {action.note}
          </p>
        </div>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="shrink-0 rounded-full p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  )
}
