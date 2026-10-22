import { Link } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'

export default function NotFoundPage() {
  return (
    <GlassPanel width="max-w-md" spacing="space-y-6">
      <div className="text-center space-y-3">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#0071E3]/[0.08] dark:bg-[#0071E3]/20 border border-[#0071E3]/20 dark:border-[#0071E3]/35 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF] shadow-inner">
          <span className="material-symbols-outlined text-[28px]">travel_explore</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white heading-tight mt-0 mb-0">
          Page not found
        </h1>
        <p className="text-[13px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
          That screen is not part of the studio yet.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:bg-[#0071E3] dark:hover:bg-[#0A84FF] active:scale-95 text-white font-medium text-[13px] shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[17px]">home</span>
          Back to studio
        </Link>
        <Link
          to="/messages"
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] active:scale-95 text-[#1D1D1F] dark:text-neutral-200 font-medium text-[13px] transition-all flex items-center justify-center gap-1.5 border border-black/[0.04] dark:border-white/[0.08]"
        >
          <span className="material-symbols-outlined text-[17px]">forum</span>
          Open Messages
        </Link>
      </div>
    </GlassPanel>
  )
}
