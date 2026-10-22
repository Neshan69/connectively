type QuickActionProps = {
  icon: string
  label: string
  /** The filled blue button is the primary call to action. */
  primary?: boolean
  onClick?: () => void
}

const PRIMARY =
  'w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:bg-[#0071E3] dark:hover:bg-[#0A84FF] active:scale-95 text-white font-medium text-[13px] shadow-sm transition-all flex items-center justify-center gap-2'

const SECONDARY =
  'w-full sm:w-auto px-5 py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] active:scale-95 text-[#1D1D1F] dark:text-neutral-200 font-medium text-[13px] transition-all flex items-center justify-center gap-1.5 border border-black/[0.04] dark:border-white/[0.08]'

/** One of the three round call-to-action buttons below the feature cards. */
export default function QuickAction({ icon, label, primary = false, onClick }: QuickActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={primary ? PRIMARY : SECONDARY}
    >
      <span className="material-symbols-outlined text-[17px]">{icon}</span>
      {label}
    </button>
  )
}
