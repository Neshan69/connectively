import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function AccountSettingsPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // Password change
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwError, setPwError] = useState<string | null>(null)
  const [pwSuccess, setPwSuccess] = useState<string | null>(null)
  const [pwSaving, setPwSaving] = useState(false)

  // Delete account
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    setPwError(null)
    setPwSuccess(null)
    if (newPassword.length < 8) {
      setPwError('Password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPwError('Passwords do not match.')
      return
    }
    setPwSaving(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPwSaving(false)
    if (error) {
      setPwError(error.message)
      return
    }
    setPwSuccess('Password updated.')
    setNewPassword('')
    setConfirmPassword('')
  }

  async function deleteAccount() {
    if (deleteConfirm !== 'DELETE') return
    setDeleting(true)
    setDeleteError(null)
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData.session?.access_token
      if (!token) throw new Error('Not authenticated.')
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-account`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error ?? `Deletion failed (${res.status}).`)
      }
      await signOut()
      navigate('/login')
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Deletion failed.')
    } finally {
      setDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <GlassPanel width="max-w-2xl" spacing="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white heading-tight">
          Account Settings
        </h1>
        <Link
          to="/profile"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          Back to profile
        </Link>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-[14px] font-semibold text-[#1D1D1F] dark:text-white">Account email</h2>
        <p className="text-[13px] text-[#6E6E73] dark:text-[#A1A1A6]">{user?.email}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-[14px] font-semibold text-[#1D1D1F] dark:text-white">Change password</h2>
        <form onSubmit={changePassword} className="flex flex-col gap-3" noValidate>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password (min 8 chars)"
            autoComplete="new-password"
            className="w-full rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-3.5 py-2.5 text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] outline-none focus:border-[#0071E3]/60 dark:focus:border-[#2997FF]/60 focus:ring-2 focus:ring-[#0071E3]/20 dark:focus:ring-[#2997FF]/20 transition-colors"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            autoComplete="new-password"
            className="w-full rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-3.5 py-2.5 text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] outline-none focus:border-[#0071E3]/60 dark:focus:border-[#2997FF]/60 focus:ring-2 focus:ring-[#0071E3]/20 dark:focus:ring-[#2997FF]/20 transition-colors"
          />
          {pwError && (
            <p className="text-[11px] text-red-500 dark:text-red-400">{pwError}</p>
          )}
          {pwSuccess && (
            <p className="text-[11px] text-[#34C759]">{pwSuccess}</p>
          )}
          <button
            type="submit"
            disabled={pwSaving}
            className="self-start px-5 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:hover:bg-[#0A84FF] active:scale-95 text-white font-medium text-[13px] shadow-sm transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pwSaving ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-red-500/30 bg-red-500/[0.05] p-4">
        <h2 className="text-[14px] font-semibold text-red-600 dark:text-red-400">Danger zone</h2>
        <p className="text-[12px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
          Permanently delete your account and profile. This cannot be undone. All of your profile
          data will be removed.
        </p>
        <button
          type="button"
          onClick={() => setShowDeleteDialog(true)}
          className="self-start px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-medium text-[13px] shadow-sm transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[17px]">delete_forever</span>
          Delete account
        </button>
      </section>

      {showDeleteDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowDeleteDialog(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white dark:bg-[#16181F] border border-black/[0.08] dark:border-white/10 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-[#1D1D1F] dark:text-white">
              Delete your account?
            </h3>
            <p className="text-[12px] text-[#6E6E73] dark:text-[#A1A1A6] mt-2 leading-relaxed">
              This is permanent. Type <strong>DELETE</strong> to confirm.
            </p>
            <input
              type="text"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="DELETE"
              className="mt-3 w-full rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-3.5 py-2.5 text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-colors"
            />
            {deleteError && (
              <p className="mt-2 text-[11px] text-red-500 dark:text-red-400">{deleteError}</p>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteDialog(false)
                  setDeleteConfirm('')
                  setDeleteError(null)
                }}
                className="px-4 py-2 rounded-full bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-[#1D1D1F] dark:text-neutral-200 font-medium text-[13px] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteAccount}
                disabled={deleting || deleteConfirm !== 'DELETE'}
                className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium text-[13px] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {deleting ? 'Deleting…' : 'Delete permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </GlassPanel>
  )
}
