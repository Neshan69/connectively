import ModuleCard from './ModuleCard'
import QuickAction from './QuickAction'
import type { StudioModuleId } from '../types/studio'

type StudioHubProps = {
  onSelect: (module: StudioModuleId) => void
}

/**
 * The main glass workspace card: studio header, headline, the three feature
 * modules and the quick action row.
 */
export default function StudioHub({ onSelect }: StudioHubProps) {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-8 py-12 relative z-10">
      <div className="max-w-3xl w-full glass-card border border-white/70 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden transition-all duration-300">
        {/* Top Subtle Indicator / Stage Badge */}
        <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.08] pb-5 transition-colors duration-300">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-[#0071E3] to-[#5AC8FA] flex items-center justify-center text-white shadow-md shadow-black/10">
              <span className="material-symbols-outlined text-[18px]">videocam</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  FaceTime &amp; Studio Connect
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#34C759]/10 text-[#34C759] dark:bg-[#34C759]/20">
                  Ready to Connect
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#86868B] dark:text-[#A1A1A6]">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
              Encrypted Studio
            </span>
          </div>
        </div>

        {/* Main Stage Heading */}
        <div className="text-center space-y-3 pt-1">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-[#0071E3]/[0.08] dark:bg-[#0071E3]/20 border border-[#0071E3]/20 dark:border-[#0071E3]/35 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF] shadow-inner mb-3">
            <span className="material-symbols-outlined text-[28px]">video_call</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white heading-tight">
            FaceTime &amp; Studio Connect
          </h2>
          <p className="text-[15px] sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed max-w-lg mx-auto">
            Seamless spatial audio calls, 4K HDR video conferences, and end-to-end encrypted
            messaging designed for fluid collaboration.
          </p>
        </div>

        {/* Interactive Starter Modules (Video, Audio, Messages) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          <ModuleCard variant="video" onSelect={() => onSelect('video-call')} />
          <ModuleCard variant="audio" onSelect={() => onSelect('audio-room')} />
          <ModuleCard variant="messages" onSelect={() => onSelect('messages')} />
        </div>

        {/* Quick Action CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <QuickAction icon="video_call" label="Video call" primary onClick={() => onSelect('video-call')} />
          <QuickAction icon="forum" label="Open Messages" onClick={() => onSelect('messages')} />
          <QuickAction icon="hub" label="Quick Connect" onClick={() => onSelect('quick-connect')} />
        </div>
      </div>
    </main>
  )
}
