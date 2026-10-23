import { useSearchParams, Link } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'
import { useAuth } from '../context/AuthContext'

type Action = 'video' | 'audio' | 'message'

const ACTION_META: Record<Action, { title: string; icon: string; description: string }> = {
  video: {
    title: 'Start a video call',
    icon: 'video_call',
    description: 'Pick someone to call. You will be taken to the call screen once a friend is chosen.',
  },
  audio: {
    title: 'Start an audio call',
    icon: 'headset',
    description: 'Pick someone to call. You will be taken to the audio room once a friend is chosen.',
  },
  message: {
    title: 'Start a conversation',
    icon: 'forum',
    description: 'Pick someone to message. The conversation will open once a friend is chosen.',
  },
}

function parseAction(raw: string | null): Action {
  if (raw === 'audio' || raw === 'message') return raw
  return 'video'
}

export default function ConnectPage() {
  const [params] = useSearchParams()
  const action = parseAction(params.get('action'))
  const meta = ACTION_META[action]
  const { isAuthenticated } = useAuth()

  return (
    <GlassPanel width="max-w-2xl" spacing="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0071E3]/[0.08] dark:bg-[#0071E3]/20 border border-[#0071E3]/20 dark:border-[#0071E3]/35 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF]">
            <span className="material-symbols-outlined text-[20px]">{meta.icon}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white heading-tight">
            {meta.title}
          </h1>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          Back to studio
        </Link>
      </div>

      <p className="text-[13px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">{meta.description}</p>

      {!isAuthenticated ? (
        <div className="flex flex-col gap-4">
          <div className="px-4 py-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06]">
            <h2 className="text-[14px] font-semibold text-[#1D1D1F] dark:text-white">
              Quick Connect
            </h2>
            <p className="text-[12px] text-[#6E6E73] dark:text-[#A1A1A6] mt-1 leading-relaxed">
              You are not signed in. Sign in or create an account to reach your friends, or explore
              guest access where supported. Guest mode is not available yet — there is no anonymous
              session service connected.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:hover:bg-[#0A84FF] active:scale-95 text-white font-medium text-[13px] shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[17px]">login</span>
              Sign in
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] active:scale-95 text-[#1D1D1F] dark:text-neutral-200 font-medium text-[13px] transition-all flex items-center justify-center gap-2 border border-black/[0.04] dark:border-white/[0.08]"
            >
              <span className="material-symbols-outlined text-[17px]">person_add</span>
              Create account
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-neutral-400 dark:text-neutral-500">
              search
            </span>
            <input
              type="search"
              placeholder="Search friends…"
              aria-label="Search friends"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none focus:border-[#0071E3]/60 dark:focus:border-[#2997FF]/60 focus:ring-2 focus:ring-[#0071E3]/20 dark:focus:ring-[#2997FF]/20 transition-colors"
            />
          </div>
          <div className="flex flex-col items-center text-center gap-3 py-10 px-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06]">
            <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/[0.08] dark:bg-[#0071E3]/20 border border-[#0071E3]/20 dark:border-[#0071E3]/35 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF]">
              <span className="material-symbols-outlined text-[24px]">{meta.icon}</span>
            </div>
            <h2 className="text-[15px] font-semibold text-[#1D1D1F] dark:text-white">
              No friends to choose from yet
            </h2>
            <p className="text-[12px] text-[#6E6E73] dark:text-[#A1A1A6] max-w-sm leading-relaxed">
              Friend selection needs a connected account and friends API. Visit the Friends page to
              see where your connections will appear.
            </p>
            <Link
              to="/friends"
              className="px-5 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:hover:bg-[#0A84FF] active:scale-95 text-white font-medium text-[13px] shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[17px]">group</span>
              Open Friends
            </Link>
          </div>
        </div>
      )}
    </GlassPanel>
  )
}
