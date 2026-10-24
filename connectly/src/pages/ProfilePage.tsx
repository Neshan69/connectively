import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

type Profile = {
  display_name: string | null
  avatar_url: string | null
  bio: string | null
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    let mounted = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    supabase
      .from('profiles')
      .select('display_name, avatar_url, bio')
      .eq('id', user.id)
      .single()
      .then(({ data, error }) => {
        if (!mounted) return
        if (error) setError(error.message)
        else setProfile(data as Profile)
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [user])

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

      {loading && (
        <p className="text-[13px] text-[#6E6E73] dark:text-[#A1A1A6]">Loading your profile…</p>
      )}

      {error && (
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-red-500/[0.08] border border-red-500/20 text-[11px] text-red-600 dark:text-red-400 leading-relaxed">
          <span className="material-symbols-outlined text-[15px] shrink-0 mt-px">error</span>
          {error}
        </div>
      )}

      {!loading && !error && profile && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0071E3] to-[#5AC8FA] flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-[28px]">account_circle</span>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-[#1D1D1F] dark:text-white">
                {profile.display_name ?? user?.email}
              </p>
              <p className="text-[12px] text-[#6E6E73] dark:text-[#A1A1A6]">{user?.email}</p>
            </div>
          </div>
          <p className="text-[12px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            {profile.bio ?? 'No bio yet. Profile editing will be added with the settings API.'}
          </p>
        </div>
      )}
    </GlassPanel>
  )
}
