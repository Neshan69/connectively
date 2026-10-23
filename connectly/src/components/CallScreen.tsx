import { useParams, Link } from 'react-router-dom'
import GlassPanel from './GlassPanel'

type CallMode = 'video' | 'audio'

type CallScreenProps = {
  mode: CallMode
}

export default function CallScreen({ mode }: CallScreenProps) {
  const { roomId } = useParams()
  const isVideo = mode === 'video'

  return (
    <GlassPanel width="max-w-3xl" spacing="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0071E3]/[0.08] dark:bg-[#0071E3]/20 border border-[#0071E3]/20 dark:border-[#0071E3]/35 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF]">
            <span className="material-symbols-outlined text-[20px]">
              {isVideo ? 'videocam' : 'headset'}
            </span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white heading-tight">
              {isVideo ? 'Video call preview' : 'Audio call preview'}
            </h1>
            <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] mt-0.5">
              Room {roomId ?? '—'} · calling service not connected
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          Back to studio
        </Link>
      </div>

      <div className="px-3 py-2.5 rounded-xl bg-amber-500/[0.08] border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed flex items-start gap-2">
        <span className="material-symbols-outlined text-[15px] shrink-0 mt-px">info</span>
        <span>
          This is a preview of the call interface. WebRTC, signalling and media permissions are not
          implemented, so no camera or microphone is requested and no call is placed.
        </span>
      </div>

      {isVideo ? (
        <div className="aspect-video rounded-2xl bg-black/[0.06] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/10 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-[#6E6E73] dark:text-[#A1A1A6]">
            <span className="material-symbols-outlined text-[40px]">videocam_off</span>
            <span className="text-[12px]">Video stage placeholder</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0071E3] to-[#5AC8FA] flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined text-[40px]">person</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label={isVideo ? 'Toggle camera' : 'Toggle microphone'}
          className="w-11 h-11 rounded-full bg-black/[0.06] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.14] flex items-center justify-center text-[#1D1D1F] dark:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isVideo ? 'videocam' : 'mic'}
          </span>
        </button>
        <button
          type="button"
          aria-label="Toggle microphone"
          className="w-11 h-11 rounded-full bg-black/[0.06] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.14] flex items-center justify-center text-[#1D1D1F] dark:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">mic</span>
        </button>
        <button
          type="button"
          aria-label="End call"
          className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-sm transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">call_end</span>
        </button>
      </div>

      <div className="text-center text-[11px] text-[#86868B] dark:text-[#8E8E93]">
        Connection status: not connected
      </div>
    </GlassPanel>
  )
}
