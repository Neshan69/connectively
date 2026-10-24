import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'
import { isValidEmail } from '../utils/validation'

type LoginValues = {
  email: string
  password: string
}

type LoginErrors = Partial<Record<keyof LoginValues, string>>

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState<LoginValues>({ email: '', password: '' })
  const [errors, setErrors] = useState<LoginErrors>({})
  const [status, setStatus] = useState<string | null>(null)
  const [forgotNotice, setForgotNotice] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function updateField(field: keyof LoginValues) {
    return (value: string) => {
      setValues((current) => ({ ...current, [field]: value }))
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: LoginErrors = {}

    if (!values.email.trim()) {
      nextErrors.email = 'Enter your email address.'
    } else if (!isValidEmail(values.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!values.password) {
      nextErrors.password = 'Enter your password.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setStatus(null)
    try {
      await signIn(values.email, values.password)
      navigate('/')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Sign-in failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthCard
      icon="lock_person"
      title="Welcome back"
      subtitle="Sign in to your NNN Studio workspace."
      notice="Sign in with your Supabase account. Email confirmation may be required."
      footer={
        <>
          <p>
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline"
            >
              Sign up
            </Link>
          </p>
          <p>
            <Link
              to="/"
              className="inline-flex items-center gap-1 font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Back to studio
            </Link>
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={updateField('email')}
          error={errors.email}
          placeholder="you@studio.com"
          autoComplete="email"
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={updateField('password')}
          error={errors.password}
          placeholder="Your password"
          autoComplete="current-password"
          revealable
        />

        <div className="flex justify-end -mt-1">
          <button
            type="button"
            onClick={() => setForgotNotice(true)}
            className="text-[11px] font-medium text-[#0071E3] dark:text-[#2997FF] hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {forgotNotice && (
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-[#0071E3]/[0.06] dark:bg-[#2997FF]/10 border border-[#0071E3]/15 dark:border-[#2997FF]/20">
            <span className="material-symbols-outlined text-[15px] text-[#0071E3] dark:text-[#2997FF] shrink-0 mt-px">
              info
            </span>
            <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Password recovery is UI-only in this milestone — there is no email service connected yet.
            </p>
          </div>
        )}

        {status && (
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-[#0071E3]/[0.06] dark:bg-[#2997FF]/10 border border-[#0071E3]/15 dark:border-[#2997FF]/20">
            <span className="material-symbols-outlined text-[15px] text-[#0071E3] dark:text-[#2997FF] shrink-0 mt-px">
              info
            </span>
            <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              {status}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:bg-[#0071E3] dark:hover:bg-[#0A84FF] active:scale-95 text-white font-medium text-[13px] shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[17px]">login</span>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthCard>
  )
}
