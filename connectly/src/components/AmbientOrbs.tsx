/**
 * The two blurred gradient orbs that sit behind the whole app.
 * They are decorative only, so they never capture pointer events.
 */
export default function AmbientOrbs() {
  return (
    <>
      <div className="pointer-events-none fixed -top-40 right-[-10%] w-[580px] h-[580px] rounded-full bg-gradient-to-br from-indigo-200/35 via-sky-200/25 to-transparent dark:from-indigo-600/15 dark:via-blue-600/10 blur-3xl opacity-70 transition-colors duration-300" />
      <div className="pointer-events-none fixed -bottom-40 left-[-10%] w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-amber-100/40 via-purple-100/25 to-transparent dark:from-purple-800/15 dark:via-blue-900/10 blur-3xl opacity-60 transition-colors duration-300" />
    </>
  )
}
