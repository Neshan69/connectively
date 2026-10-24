import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type AccountMenuProps = {
  /** Rendered as the trigger button. */
  trigger: ReactNode
}

/**
 * Account entry point in the dynamic island. Shows honest sign-in / sign-up
 * options while no auth backend exists; leaves room for the authenticated
 * (profile / settings / sign out) variant later.
 */
export default function AccountMenu({ trigger }: AccountMenuProps) {
  const { isAuthenticated, user, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handlePointer(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  useEffect(() => {
    if (open && menuRef.current) {
      const first = menuRef.current.querySelector<HTMLElement>('a, button')
      first?.focus()
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center justify-center"
      >
        {trigger}
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Account"
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 w-64 rounded-2xl bg-white/90 dark:bg-[#16181F]/90 backdrop-blur-2xl border border-white/90 dark:border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.18)] p-2 z-50"
        >
          {!isAuthenticated ? (
            <>
              <div className="px-3 py-2.5">
                <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                  Sign in to unlock friends, messaging and calls.
                </p>
              </div>
              <div className="h-px bg-black/[0.06] dark:bg-white/10 my-1" />
              <Link
                to="/login"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px] text-[#0071E3] dark:text-[#2997FF]">
                  login
                </span>
                Sign in
              </Link>
              <Link
                to="/signup"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px] text-[#0071E3] dark:text-[#2997FF]">
                  person_add
                </span>
                Create account
              </Link>
            </>
          ) : (
            <>
              <div className="px-3 py-2.5">
                <p className="text-[12px] font-semibold text-[#1D1D1F] dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] truncate">
                  {user?.email}
                </p>
              </div>
              <div className="h-px bg-black/[0.06] dark:bg-white/10 my-1" />
              <Link
                to="/profile"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px]">account_circle</span>
                Profile
              </Link>
              <Link
                to="/settings"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px]">settings</span>
                Account settings
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={async () => {
                  setOpen(false)
                  await signOut()
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium text-red-500 dark:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px]">logout</span>
                Sign out
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
