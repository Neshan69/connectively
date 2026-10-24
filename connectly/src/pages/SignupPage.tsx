import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'
import { isValidEmail, isValidPassword, PASSWORD_MIN_LENGTH } from '../utils/validation'

type SignupValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type SignupErrors = Partial<Record<keyof SignupValues, string>>

export default function SignupPage() {
  const { signUp } = useAuth()
  const [values, setValues] = useState<SignupValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<SignupErrors>({})
  const [status, setStatus] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function updateField(field: keyof SignupValues) {
    return (value: string) => {
      setValues((current) => ({ ...current, [field]: value }))
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  /** Everything is checked in the browser - there is no account service yet. */
  function validate(): SignupErrors {
    const nextErrors: SignupErrors = {}

    if (!values.name.trim()) {
      nextErrors.name = 'Enter your name.'
    } else if (values.name.trim().length < 2) {
      nextErrors.name = 'Use at least 2 characters.'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Enter your email address.'
    } else if (!isValidEmail(values.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!values.password) {
      nextErrors.password = 'Choose a password.'
    } else if (!isValidPassword(values.password)) {
      nextErrors.password = `Use at least ${PASSWORD_MIN_LENGTH} characters.`
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.'
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    return nextErrors
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setStatus(null)
    try {
      await signUp(values.name, values.email, values.password)
      setStatus('Account created. Check your email to confirm, then sign in.')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Registration failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthCard
      icon="person_add"
      title="Create your account"
      subtitle="Join NNN Studio and start building your creative workspace."
      notice="Create a real account via Supabase. Email confirmation may be required."
      footer={
        <>
          <p>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline"
            >
              Sign in
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
          id="name"
          label="Full name"
          value={values.name}
          onChange={updateField('name')}
          error={errors.name}
          placeholder="Ada Lovelace"
          autoComplete="name"
        />

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
          placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
          autoComplete="new-password"
          revealable
        />

        <FormField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={values.confirmPassword}
          onChange={updateField('confirmPassword')}
          error={errors.confirmPassword}
          placeholder="Repeat your password"
          autoComplete="new-password"
          revealable
        />

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
          <span className="material-symbols-outlined text-[17px]">how_to_reg</span>
          {submitting ? 'Creating…' : 'Create account'}
        </button>
      </form>
    </AuthCard>
  )
}
