import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

type Profile = { id: string; display_name: string | null; avatar_url: string | null }
type Conversation = { id: string; updated_at: string; other: Profile | null }
type Message = { id: string; conversation_id: string; sender_id: string; content: string; created_at: string }

export default function MessagesPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loadingConvs, setLoadingConvs] = useState(true)
  const [loadingMsgs, setLoadingMsgs] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)

  // New conversation search
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<Profile[]>([])
  const [searching, setSearching] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load conversations
  async function loadConversations() {
    if (!user) return
    setLoadingConvs(true)
    setError(null)
    const { data: parts, error: pErr } = await supabase
      .from('conversation_participants')
      .select('conversation_id, conversations(updated_at)')
      .eq('user_id', user.id)
    if (pErr) {
      setError(pErr.message)
      setLoadingConvs(false)
      return
    }
    const convIds = (parts ?? []).map((p: { conversation_id: string }) => p.conversation_id)
    if (convIds.length === 0) {
      setConversations([])
      setLoadingConvs(false)
      return
    }
    // fetch other participants
    const { data: allParts } = await supabase
      .from('conversation_participants')
      .select('conversation_id, user_id, profiles(id, display_name, avatar_url)')
      .in('conversation_id', convIds)
    const convMap = new Map<string, Conversation>()
    for (const cid of convIds) {
      const others = (allParts ?? []).filter(
        (p: { conversation_id: string; user_id: string }) =>
          p.conversation_id === cid && p.user_id !== user.id,
      )
      const otherProfile = (others[0] as { profiles?: Profile[] } | undefined)?.profiles?.[0] ?? null
      const upd = (parts ?? []).find(
        (p: { conversation_id: string }) => p.conversation_id === cid,
      ) as { conversations?: { updated_at: string }[] } | undefined
      const updated = upd?.conversations?.[0]?.updated_at ?? ''
      convMap.set(cid, { id: cid, updated_at: updated, other: otherProfile })
    }
    setConversations(Array.from(convMap.values()).sort((a, b) => b.updated_at.localeCompare(a.updated_at)))
    setLoadingConvs(false)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadConversations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // Load messages for active conversation
  useEffect(() => {
    if (!activeId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages([])
      return
    }
    let mounted = true
    setLoadingMsgs(true)
    supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', activeId)
      .order('created_at', { ascending: true })
      .then(({ data, error: e }) => {
        if (!mounted) return
        if (e) setError(e.message)
        else setMessages((data as Message[]) ?? [])
        setLoadingMsgs(false)
      })
    return () => {
      mounted = false
    }
  }, [activeId])

  // Realtime subscription
  useEffect(() => {
    if (!activeId) return
    const channel = supabase
      .channel(`messages:${activeId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${activeId}` },
        (payload) => {
          const m = payload.new as Message
          setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]))
        },
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [activeId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function searchUsers() {
    if (!search.trim()) {
      setSearchResults([])
      return
    }
    setSearching(true)
    const { data } = await supabase
      .from('profiles')
      .select('id, display_name, avatar_url')
      .ilike('display_name', `%${search.trim()}%`)
      .neq('id', user?.id ?? '')
      .limit(10)
    setSearchResults((data as Profile[]) ?? [])
    setSearching(false)
  }

  useEffect(() => {
    const t = setTimeout(searchUsers, 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  async function startConversation(otherId: string) {
    if (!user) return
    // check existing
    const { data: myParts } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', user.id)
    const myConvIds = (myParts ?? []).map((p: { conversation_id: string }) => p.conversation_id)
    let existing: string | null = null
    if (myConvIds.length) {
      const { data: otherParts } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', otherId)
        .in('conversation_id', myConvIds)
      if (otherParts && otherParts.length) existing = otherParts[0].conversation_id
    }
    let convId = existing
    if (!convId) {
      const { data: conv, error: cErr } = await supabase
        .from('conversations')
        .insert({})
        .select('id')
        .single()
      if (cErr || !conv) {
        setError(cErr?.message ?? 'Failed to create conversation')
        return
      }
      convId = conv.id
      await supabase.from('conversation_participants').insert([
        { conversation_id: convId, user_id: user.id },
        { conversation_id: convId, user_id: otherId },
      ])
    }
    setShowNew(false)
    setSearch('')
    setSearchResults([])
    await loadConversations()
    setActiveId(convId)
  }

  async function sendMessage() {
    if (!user || !activeId || !draft.trim()) return
    setSending(true)
    const content = draft.trim()
    setDraft('')
    const { error: e } = await supabase
      .from('messages')
      .insert({ conversation_id: activeId, sender_id: user.id, content })
    setSending(false)
    if (e) {
      setError(e.message)
      setDraft(content)
    }
  }


  return (
    <GlassPanel width="max-w-5xl" spacing="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white heading-tight">
          Messages
        </h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowNew((v) => !v)}
            className="px-4 py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:hover:bg-[#0A84FF] active:scale-95 text-white font-medium text-[13px] shadow-sm transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[17px]">edit_square</span>
            New
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Back
          </Link>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-red-500/[0.08] border border-red-500/20 text-[11px] text-red-600 dark:text-red-400 leading-relaxed">
          <span className="material-symbols-outlined text-[15px] shrink-0 mt-px">error</span>
          {error}
        </div>
      )}

      {showNew && (
        <div className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] p-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name…"
            aria-label="Search users"
            className="w-full px-3 py-2 rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] outline-none focus:border-[#0071E3]/60 dark:focus:border-[#2997FF]/60 transition-colors"
          />
          {searching && <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] mt-2">Searching…</p>}
          <div className="mt-2 flex flex-col gap-1">
            {searchResults.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => startConversation(p.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-black/[0.05] dark:hover:bg-white/10 text-left transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0071E3] to-[#5AC8FA] flex items-center justify-center text-white text-[12px] font-semibold overflow-hidden">
                  {p.avatar_url ? (
                    <img src={p.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    (p.display_name ?? '?').charAt(0).toUpperCase()
                  )}
                </div>
                <span className="text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {p.display_name ?? 'Unnamed user'}
                </span>
              </button>
            ))}
            {search && !searching && searchResults.length === 0 && (
              <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] px-3 py-2">No users found.</p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-3 min-h-[460px]">
        {/* Conversation list */}
        <aside className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] p-2 flex flex-col gap-1 overflow-y-auto">
          {loadingConvs && <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] p-2">Loading…</p>}
          {!loadingConvs && conversations.length === 0 && (
            <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] p-2 leading-relaxed">
              No conversations yet. Use "New" to find someone.
            </p>
          )}
          {conversations.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
                activeId === c.id
                  ? 'bg-[#0071E3]/10 dark:bg-[#2997FF]/15'
                  : 'hover:bg-black/[0.05] dark:hover:bg-white/10'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0071E3] to-[#5AC8FA] flex items-center justify-center text-white text-[12px] font-semibold overflow-hidden shrink-0">
                {c.other?.avatar_url ? (
                  <img src={c.other.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  (c.other?.display_name ?? '?').charAt(0).toUpperCase()
                )}
              </div>
              <span className="text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
                {c.other?.display_name ?? 'Unknown user'}
              </span>
            </button>
          ))}
        </aside>

        {/* Chat panel */}
        <section className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] p-3 flex flex-col">
          {!activeId ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
              <span className="material-symbols-outlined text-[32px] text-neutral-400 dark:text-neutral-500">
                chat_bubble
              </span>
              <p className="text-[12px] text-[#6E6E73] dark:text-[#A1A1A6]">Select a conversation.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto flex flex-col gap-2 py-2">
                {loadingMsgs && <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6]">Loading…</p>}
                {messages.map((m) => {
                  const mine = m.sender_id === user?.id
                  return (
                    <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[75%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed ${
                          mine
                            ? 'bg-[#0071E3] text-white rounded-br-sm'
                            : 'bg-white/70 dark:bg-white/[0.06] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-bl-sm'
                        }`}
                      >
                        <p>{m.content}</p>
                        <p className={`text-[9px] mt-1 ${mine ? 'text-white/70' : 'text-[#86868B] dark:text-[#8E8E93]'}`}>
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
              <div className="mt-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center gap-2">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                  placeholder="Type a message…"
                  aria-label="Message composer"
                  className="flex-1 px-3 py-2 rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none focus:border-[#0071E3]/60 dark:focus:border-[#2997FF]/60 focus:ring-2 focus:ring-[#0071E3]/20 dark:focus:ring-[#2997FF]/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={sending || !draft.trim()}
                  aria-label="Send message"
                  className="px-4 py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:hover:bg-[#0A84FF] active:scale-95 text-white font-medium text-[13px] shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[17px]">send</span>
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </GlassPanel>
  )
}
