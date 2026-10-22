const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const PASSWORD_MIN_LENGTH = 8

/** Checks the shape of an email address. */
export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}

/** Checks that a password is long enough to be acceptable. */
export function isValidPassword(value: string): boolean {
  return value.length >= PASSWORD_MIN_LENGTH
}
