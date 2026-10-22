import { useState } from 'react'

type FormFieldProps = {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  autoComplete?: string
  /** Adds a show / hide button, used for password inputs. */
  revealable?: boolean
}

const FIELD_BASE =
  'w-full rounded-xl border bg-white/70 dark:bg-white/[0.04] px-3.5 py-2.5 text-[13px] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none transition-colors focus:ring-2'

const FIELD_OK =
  'border-black/[0.08] dark:border-white/10 focus:border-[#0071E3]/60 dark:focus:border-[#2997FF]/60 focus:ring-[#0071E3]/20 dark:focus:ring-[#2997FF]/20'

const FIELD_ERROR =
  'border-red-400/70 dark:border-red-400/60 focus:border-red-400 focus:ring-red-400/20'

/**
 * A labelled text input with inline validation message and an optional
 * show / hide toggle for password fields.
 */
export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  revealable = false,
}: FormFieldProps) {
  const [revealed, setRevealed] = useState(false)
  const inputType = revealable && revealed ? 'text' : type

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold text-[#6E6E73] dark:text-[#A1A1A6] mb-1.5"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${FIELD_BASE} ${error ? FIELD_ERROR : FIELD_OK} ${revealable ? 'pr-11' : ''}`}
        />

        {revealable && (
          <button
            type="button"
            onClick={() => setRevealed((current) => !current)}
            aria-label={revealed ? 'Hide password' : 'Show password'}
            title={revealed ? 'Hide password' : 'Show password'}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">
              {revealed ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1 text-[11px] text-red-500 dark:text-red-400"
        >
          <span className="material-symbols-outlined text-[13px]">error</span>
          {error}
        </p>
      )}
    </div>
  )
}
