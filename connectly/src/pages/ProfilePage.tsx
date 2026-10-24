import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

type Profile = {
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
}

const BIO_LIMIT = 280
const NAME_LIMIT = 60

export default function ProfilePage() {
  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState('')
  const [draftBio, setDraftBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    let mounted = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    supabase
      .from('profiles')
      .select('display_name, avatar_url, bio, created_at')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!mounted) return
        if (error) setError(error.message)
        else {
          const p = data as Profile | null
          setProfile(p)
          setDraftName(p?.display_name ?? '')
          setDraftBio(p?.bio ?? '')
        }
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [user])

  function startEdit() {
    setDraftName(profile?.display_name ?? '')
    setDraftBio(profile?.bio ?? '')
    setEditing(true)
    setSuccess(null)
    setError(null)
  }

  function cancelEdit() {
    setDraftName(profile?.display_name ?? '')
    setDraftBio(profile?.bio ?? '')
    setEditing(false)
    setError(null)
  }

  async function save() {
    if (!user) return
    const name = draftName.trim()
    if (!name) {
      setError('Display name cannot be empty.')
      return
    }
    if (name.length > NAME_LIMIT) {
      setError(`Display name must be ${NAME_LIMIT} characters or fewer.`)
      return
    }
    if (draftBio.length > BIO_LIMIT) {
      setError(`Bio must be ${BIO_LIMIT} characters or fewer.`)
      return
    }
    setSaving(true)
    setError(null)
    const { error: upErr } = await supabase
      .from('profiles')
      .update({ display_name: name, bio: draftBio.trim() || null })
      .eq('id', user.id)
    setSaving(false)
    if (upErr) {
      setError(upErr.message)
      return
    }
    setProfile((p) =>
      p ? { ...p, display_name: name, bio: draftBio.trim() || null } : p,
    )
    setEditing(false)
    setSuccess('Profile updated.')
  }

  async function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file || !user) return
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be 2 MB or smaller.')
      return
    }
    setUploading(true)
    setError(null)
    const ext = file.name.split('.').pop() ?? 'png'
    const path = `${user.id}/avatar.${ext}`
    const { error: upErr } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type })
    if (upErr) {
      setUploading(false)
      setError(upErr.message)
      return
    }
    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    const url = `${data.publicUrl}?t=${Date.now()}`
    const { error: dbErr } = await supabase
      .from('profiles')
      .update({ avatar_url: url })
      .eq('id', user.id)
    setUploading(false)
    if (dbErr) {
      setError(dbErr.message)
      return
    }
    setProfile((p) => (p ? { ...p, avatar_url: url } : p))
    setSuccess('Avatar updated.')
  }

  return (
    <GlassPanel width="max-w-2xl" spacing="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white heading-tight">
          My Profile
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          Back to studio
        </Link>
      </div>

      {loading && <p className="text-[13px] text-[#6E6E73] dark:text-[#A1A1A6]">Loading your profile…</p>}

      {error && (
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-red-500/[0.08] border border-red-500/20 text-[11px] text-red-600 dark:text-red-400 leading-relaxed">
          <span className="material-symbols-outlined text-[15px] shrink-0 mt-px">error</span>
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-[#34C759]/[0.08] border border-[#34C759]/20 text-[11px] text-[#34C759] leading-relaxed">
          <span className="material-symbols-outlined text-[15px] shrink-0 mt-px">check_circle</span>
          {success}
        </div>
      )}

      {!loading && !error && profile && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              aria-label="Change profile picture"
              className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-tr from-[#0071E3] to-[#5AC8FA] flex items-center justify-center text-white shadow-md disabled:opacity-60"
            >
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-[32px]">account_circle</span>
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[18px] text-white">
                  {uploading ? 'hourglass_top' : 'photo_camera'}
                </span>
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <div>
              <p className="text-[15px] font-semibold text-[#1D1D1F] dark:text-white">
                {profile.display_name ?? user?.email}
              </p>
              <p className="text-[12px] text-[#6E6E73] dark:text-[#A1A1A6]">{user?.email}</p>
              <p className="text-[11px] text-[#86868B] dark:text-[#8E8E93] mt-0.5">
                Member since {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {!editing ? (
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-[11px] font-semibold text-[#6E6E73] dark:text-[#A1A1A6] mb-1">
                  Bio
                </p>
                <p className="text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed">
                  {profile.bio ?? 'No bio yet.'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={startEdit}
                  className="px-5 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:hover:bg-[#0A84FF] active:scale-95 text-white font-medium text-[13px] shadow-sm transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[17px]">edit</span>
                  Edit profile
                </button>
                <Link
                  to="/account"
                  className="px-5 py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] active:scale-95 text-[#1D1D1F] dark:text-neutral-200 font-medium text-[13px] transition-all flex items-center gap-2 border border-black/[0.04] dark:border-white/[0.08]"
                >
                  <span className="material-symbols-outlined text-[17px]">settings</span>
                  Account settings
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="display_name"
                  className="block text-[11px] font-semibold text-[#6E6E73] dark:text-[#A1A1A6] mb-1.5"
                >
                  Display name
                </label>
                <input
                  id="display_name"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  maxLength={NAME_LIMIT}
                  className="w-full rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-3.5 py-2.5 text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] outline-none focus:border-[#0071E3]/60 dark:focus:border-[#2997FF]/60 focus:ring-2 focus:ring-[#0071E3]/20 dark:focus:ring-[#2997FF]/20 transition-colors"
                />
                <p className="mt-1 text-[10px] text-[#86868B] dark:text-[#8E8E93]">
                  {draftName.length}/{NAME_LIMIT}
                </p>
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-[11px] font-semibold text-[#6E6E73] dark:text-[#A1A1A6] mb-1.5"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={draftBio}
                  onChange={(e) => setDraftBio(e.target.value)}
                  maxLength={BIO_LIMIT}
                  rows={4}
                  className="w-full rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-3.5 py-2.5 text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] outline-none focus:border-[#0071E3]/60 dark:focus:border-[#2997FF]/60 focus:ring-2 focus:ring-[#0071E3]/20 dark:focus:ring-[#2997FF]/20 transition-colors resize-none"
                />
                <p className="mt-1 text-[10px] text-[#86868B] dark:text-[#8E8E93]">
                  {draftBio.length}/{BIO_LIMIT}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={save}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:hover:bg-[#0A84FF] active:scale-95 text-white font-medium text-[13px] shadow-sm transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[17px]">save</span>
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] active:scale-95 text-[#1D1D1F] dark:text-neutral-200 font-medium text-[13px] transition-all flex items-center gap-2 border border-black/[0.04] dark:border-white/[0.08]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </GlassPanel>
  )
}
