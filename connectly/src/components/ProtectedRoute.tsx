import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, status } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-[#6E6E73] dark:text-[#A1A1A6] text-[13px]">
        Loading session…
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />
  }

  return <>{children}</>
}