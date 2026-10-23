import { useState } from 'react'
import { Link } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'

export default function MessagesPage() {
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')

  return (
    <GlassPanel width="max-w-4xl" spacing="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white heading-tight">
          Messages
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          Back to studio
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-3 min-h-[420px]">
        {/* Conversation sidebar */}
        <aside className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] p-3 flex flex-col gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[15px] text-neutral-400 dark:text-neutral-500">
              search
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search conversations"
              aria-label="Search conversations"
              className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] text-[12px] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none focus:border-[#0071E3]/60 dark:focus:border-[#2997FF]/60 transition-colors"
            />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 py-6">
            <span className="material-symbols-outlined text-[28px] text-neutral-400 dark:text-neutral-500">
              forum
            </span>
            <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              No conversations yet. Messaging requires a connected account and message service.
            </p>
          </div>
        </aside>

        {/* Conversation view */}
        <section className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] p-4 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
            <span className="material-symbols-outlined text-[32px] text-neutral-400 dark:text-neutral-500">
              chat_bubble
            </span>
            <h2 className="text-[14px] font-semibold text-[#1D1D1F] dark:text-white">
              Select a conversation
            </h2>
            <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] max-w-xs leading-relaxed">
              Messages are not connected to a backend yet. Nothing here is delivered or encrypted.
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center gap-2">
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Message (disabled until a service is connected)"
              disabled
              aria-label="Message composer"
              className="flex-1 px-3 py-2 rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              disabled
              aria-label="Send message"
              className="px-4 py-2 rounded-full bg-[#0071E3]/40 text-white font-medium text-[13px] flex items-center gap-1.5 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[17px]">send</span>
              Send
            </button>
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}
